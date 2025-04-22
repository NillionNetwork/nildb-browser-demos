import { Buffer } from 'buffer';
import { v4 as uuidv4 } from 'uuid';
import { getPublicKey, Signature, signAsync, verify } from '@noble/secp256k1';
import { PrivateKey, decrypt, encrypt } from "eciesjs";
import { sha256 } from '@noble/hashes/sha256';
import { utf8ToBytes } from '@noble/hashes/utils';
import { createJWT, ES256KSigner } from 'did-jwt';

window.Buffer = Buffer; // Required for in-browser use of eciesjs.

/* Constant representing a missing public key. */
const MISSING = "000000000000000000000000000000000000000000000000000000000000000000";

/* Organization configuration for nilDB. */
const NILDB = {
  orgCredentials: {
    secretKey: '0ac97ffdd83769c6c5032cb202d0957800e0ef151f015b0aaec52e2d864d4fc6',
    orgDid: 'did:nil:testnet:nillion1v596szek38l22jm9et4r4j7txu3v7eff3uffue',
  },
  nodes: [
    {
      url: 'https://nildb-nx8v.nillion.network',
      did: 'did:nil:testnet:nillion1qfrl8nje3nvwh6cryj63mz2y6gsdptvn07nx8v',
    },
    {
      url: 'https://nildb-p3mx.nillion.network',
      did: 'did:nil:testnet:nillion1uak7fgsp69kzfhdd6lfqv69fnzh3lprg2mp3mx',
    },
    {
      url: 'https://nildb-rugk.nillion.network',
      did: 'did:nil:testnet:nillion1kfremrp2mryxrynx66etjl8s7wazxc3rssrugk',
    },
  ],
};

/* Schema identifier for nilDB. */
const SCHEMA = 'ef77663b-deca-47aa-8143-b95b82f88748';

class SecretVaultWrapper {
  constructor(
    nodes,
    credentials,
    schemaId = null,
    operation = 'store',
    tokenExpirySeconds = 3600
  ) {
    this.nodes = nodes;
    this.nodesJwt = null;
    this.credentials = credentials;
    this.schemaId = schemaId;
    this.operation = operation;
    this.tokenExpirySeconds = tokenExpirySeconds;
  }

  async init() {
    const nodeConfigs = await Promise.all(
      this.nodes.map(async (node) => ({
        url: node.url,
        jwt: await this.generateNodeToken(node.did),
      }))
    );
    this.nodesJwt = nodeConfigs;
  }

  setSchemaId(schemaId, operation = this.operation) {
    this.schemaId = schemaId;
    this.operation = operation;
  }

  async generateNodeToken(nodeDid) {
    const signer = ES256KSigner(Buffer.from(this.credentials.secretKey, "hex"));
    const payload = {
      iss: this.credentials.orgDid,
      aud: nodeDid,
      exp: Math.floor(Date.now() / 1000) + this.tokenExpirySeconds,
    };
    return await createJWT(payload, {
      issuer: this.credentials.orgDid,
      signer,
    });
  }

  async generateTokensForAllNodes() {
    const tokens = await Promise.all(
      this.nodes.map(async (node) => {
        const token = await this.generateNodeToken(node.did);
        return { node: node.url, token };
      })
    );
    return tokens;
  }

  async makeRequest(nodeUrl, endpoint, token, payload, method = 'POST') {
    try {
      const response = await fetch(`${nodeUrl}/api/v1/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: method === 'GET' ? null : JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${text}`
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return {
          status: response.status,
          ...data,
        };
      }
      return {
        status: response.status,
      };
    } catch (error) {
      console.error(
        `❌ Failed to ${method} ${endpoint} from ${nodeUrl}:`,
        error.message
      );
      const statusMatch = error.message.match(/status: (\d+)/);
      const bodyMatch = error.message.match(/body: ({.*})/);

      const errorJson = {
        status: statusMatch ? parseInt(statusMatch[1]) : null,
        error: bodyMatch ? JSON.parse(bodyMatch[1]) : { errors: [error] },
      };
      return errorJson;
    }
  }

  async flushData() {
    const results = [];
    for (const node of this.nodes) {
      const jwt = await this.generateNodeToken(node.did);
      const payload = { schema: this.schemaId };
      const result = await this.makeRequest(
        node.url,
        'data/flush',
        jwt,
        payload
      );
      results.push({ ...result, node });
    }
    return results;
  }

  async getSchemas() {
    const results = [];
    for (const node of this.nodes) {
      const jwt = await this.generateNodeToken(node.did);
      try {
        const result = await this.makeRequest(
          node.url,
          'schemas',
          jwt,
          {},
          'GET'
        );
        results.push({ ...result, node });
      } catch (error) {
        console.error(
          `❌ Failed to get schemas from ${node.url}:`,
          error.message
        );
        results.push({ error, node });
      }
    }
    return results;
  }

  async createSchema(schema, schemaName, schemaId = null) {
    if (!schemaId) {
      schemaId = uuidv4();
    }
    const schemaPayload = {
      _id: schemaId,
      name: schemaName,
      schema,
    };
    const results = [];
    for (const node of this.nodes) {
      const jwt = await this.generateNodeToken(node.did);
      try {
        const result = await this.makeRequest(
          node.url,
          'schemas',
          jwt,
          schemaPayload
        );
        results.push({
          ...result,
          node,
          schemaId,
          name: schemaName,
        });
      } catch (error) {
        console.error(
          `❌ Error while creating schema on ${node.url}:`,
          error.message
        );
        results.push({ error, node });
      }
    }
    return results;
  }

  async writeToNodes(data) {
    // Add an "_id" field to each record if it doesn't exist.
    const idData = data.map((record) => {
      if (!record._id) {
        return { ...record, _id: uuidv4() };
      }
      return record;
    });
    const results = [];

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      try {
        const jwt = await this.generateNodeToken(node.did);
        const payload = {
          schema: this.schemaId,
          data: idData,
        };
        const result = await this.makeRequest(
          node.url,
          'data/create',
          jwt,
          payload
        );

        results.push({
          ...result,
          node,
          schemaId: this.schemaId,
        });
      } catch (error) {
        console.error(`❌ Failed to write to ${node.url}:`, error.message);
        results.push({ node, error });
      }
    }

    return results;
  }

  async readFromNodes(filter = {}) {
    const results = [];

    for (const node of this.nodes) {
      try {
        const jwt = await this.generateNodeToken(node.did);
        const payload = { schema: this.schemaId, filter };
        const result = await this.makeRequest(
          node.url,
          'data/read',
          jwt,
          payload
        );
        results.push({ ...result, node });
      } catch (error) {
        console.error(`❌ Failed to read from ${node.url}:`, error.message);
        results.push({ error, node });
      }
    }

    // Group records across nodes by _id
    const recordGroups = results.reduce((acc, nodeResult) => {
      nodeResult.data.forEach((record) => {
        const existingGroup = acc.find((group) =>
          group.shares.some((share) => share._id === record._id)
        );
        if (existingGroup) {
          existingGroup.shares.push(record);
        } else {
          acc.push({ shares: [record], recordIndex: record._id });
        }
      });
      return acc;
    }, []);

    const recombinedRecords = await Promise.all(
      recordGroups.map(async (record) => {
        const recombined = record.shares;
        return recombined;
      })
    );
    return recombinedRecords;
  }

  async deleteDataFromNodes(filter = {}) {
    const results = [];

    for (const node of this.nodes) {
      try {
        const jwt = await this.generateNodeToken(node.did);
        const payload = { schema: this.schemaId, filter };
        const result = await this.makeRequest(
          node.url,
          'data/delete',
          jwt,
          payload
        );
        results.push({ ...result, node });
      } catch (error) {
        console.error(`❌ Failed to delete from ${node.url}:`, error.message);
        results.push({ error, node });
      }
    }
    return results;
  }
}

function scrub(string) {
  return string.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function uint8ArrayToHex(uint8Array) {
  return Array.from(uint8Array)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

function uint8ArrayFromHex(hex) {
  return new Uint8Array(Buffer.from(hex, "hex"));
}

function secretKeyRetrieve() {
  return new Uint8Array(
    Buffer.from(document.getElementById("secret").value, "hex")
  );
}

function publicKeyRetrieve() {
  try {
    const secretKeyUint8Array = secretKeyRetrieve();
    const publicKeyUint8Array = getPublicKey(secretKeyUint8Array);
    return publicKeyUint8Array;
  } catch {
    return MISSING;
  }
}

function publicKeyFromHex(publicKeyHex) {
  return new Uint8Array(Buffer.from(publicKeyHex, "hex"));
}

async function verifyPayloadSignature(publicKeyHex, payload, signatureHex) {
  if (signatureHex == undefined || signatureHex == null) {
    return false;
  }

  const publicKey = publicKeyFromHex(publicKeyHex);
  const hash = await sha256(utf8ToBytes(payload));
  const signature = Signature.fromCompact(signatureHex);

  return verify(signature, hash, publicKey);
}

function setPublicKey(element) {
  let publicKey = element.children[0].innerHTML.replaceAll("<br>", "");
  if (publicKey == MISSING) {
    publicKey = "";
  }
  document.getElementById("public").value = publicKey;
}

async function list() {
  const collection = new SecretVaultWrapper(
    NILDB.nodes,
    NILDB.orgCredentials,
    SCHEMA
  );
  await collection.init();

  const dataRead = await collection.readFromNodes({});
  let html = "<table>";
  for (let i = 0; i < dataRead.length; i++) {
    // Remove message permanently after retrieval.
    //collection.deleteDataFromNodes({"_id": dataRead[i][0]["_id"]}); continue;

    const payload = dataRead[i][0]["content"];
    let message = payload;
    const senderPublicKeyHex = dataRead[i][0]["sender"];
    const signature = dataRead[i][0]["signature"];
    const isEncrypted = dataRead[i][0]["encrypted"];
    const isVerified = await verifyPayloadSignature(senderPublicKeyHex, payload, signature);
    let isDecrypted = false;

    // Attempt to decrypt (and fail silently otherwise, as the message might not be encrypted).
    try {
      const privateKey = new PrivateKey(secretKeyRetrieve());
      const decrypted = await decrypt(privateKey.toHex(), uint8ArrayFromHex(payload));
      message = new TextDecoder().decode(decrypted);
      isDecrypted = true;
    } catch {

    }

    const colorComponents = publicKeyFromHex(senderPublicKeyHex).slice(0, 3);
    const color = ("rgb(" + 
      (200 + (colorComponents[0] % 56)) + ", " +
      (128 + (colorComponents[1] % 128)) + ", " +
      (128 + (colorComponents[2] % 128)) +
    ")");

    const senderPublicKeyString =
      senderPublicKeyHex.substr(0, 22) + "<br/>" +
      senderPublicKeyHex.substr(22, 22) + "<br/>" +
      senderPublicKeyHex.substr(44, 22);

    message = scrub(message);
    html +=
      '<tr class="message-row">' +
        '<td ' +
          'class="message-row-sender noselect" ' +
          'style="vertical-align:top; padding-top:10px" ' +
          'onclick="setPublicKey(this);"' +
        '>' +
          '<div class="pk" style="color:' + color + ';">' + senderPublicKeyString + "</div>" +
        "</td>" +
        "<td>" +
          '<div class="msg ' + (
            (isEncrypted && !isDecrypted) ? " message-content-encrypted" : "") +
          '">' +
            message +
            ((isEncrypted && !isDecrypted)
              ? '&nbsp;<i class="fa fa-lock message-icon" style="color:#FF0000;"></i>'
              : ""
            ) +
            (
              isDecrypted
                ? '&nbsp;<i class="fa fa-unlock message-icon" style="color:#00AA00;"></i>'
                : ""
            ) +
            (
              isVerified
                ? '&nbsp;<i class="fas fa-file-signature message-icon" style="color:#00AA00;"></i>'
                : ""
            ) +
          "</div>" +
        "</td>" +
      "</tr>";
  }
  html += "</table>";
  document.getElementById("messages").innerHTML = html;
}

async function send() {
  const secretKeyUint8Array = secretKeyRetrieve();
  const publicKeyUint8Array = publicKeyRetrieve();
  const content = scrub(document.getElementById("content").value);

  if (content.length == 0) {
    return;
  }

  let payload = content;
  let isEncrypted = false;
  let signature = null;

  const collection = new SecretVaultWrapper(
    NILDB.nodes,
    NILDB.orgCredentials,
    SCHEMA
  );
  await collection.init();

  // Attempt to encrypt with recipient public key (and fail quietly otherwise).
  if (document.doEncrypt) {
    try {
      const recipientPublicKey = new Uint8Array(
        Buffer.from(document.getElementById("public").value, "hex")
      );
      const encrypted = encrypt(recipientPublicKey, Buffer.from(content));

      // Verify that decryption is possible.
      //const pk = new PrivateKey(document.secretKey);
      //const decrypted = decrypt(pk.toHex(), encrypted);
      //console.log(decrypted);

      payload = uint8ArrayToHex(encrypted);
      isEncrypted = true;
    } catch {

    }
  }

  // Attempt to sign with sender secret key (and fail quietly otherwise).
  if (document.doSign) {
    try {
      const hash = await sha256(utf8ToBytes(payload));
      signature = await signAsync(hash, secretKeyUint8Array);
      const isValid = verify(signature, hash, document.publicKey);
      signature = signature.toCompactHex();
    } catch {

    }
  }

  const message = {
    "sender": uint8ArrayToHex(publicKeyUint8Array),
    "content": payload,
    "encrypted": isEncrypted
  };

  if (signature != null) {
    message["signature"] = signature;
  }
  const dataWritten = await collection.writeToNodes([message]);

  await list();
}

function toggleSign() {
  document.doSign = !document.doSign;
  const element = document.getElementById("sign");
  element.classList.remove("button-mini-active");
  if (document.doSign) {
    element.classList.add("button-mini-active");
  }
}

function toggleEncrypt() {
  document.doEncrypt = !document.doEncrypt;
  const element = document.getElementById("encrypt");
  element.classList.remove("button-mini-active");
  if (document.doEncrypt) {
    element.classList.add("button-mini-active");
  }
}

async function main() {
  // Functions invoked directly by `index.html`.
  document.list = list;
  document.send = send;
  document.toggleSign = toggleSign;
  document.toggleEncrypt = toggleEncrypt;
  document.setPublicKey = setPublicKey;

  // Secret and public keys for the current session.
  const secretKeyUint8Array = new Uint8Array(32);
  window.crypto.getRandomValues(secretKeyUint8Array);
  document.secretKey = secretKeyUint8Array;
  document.secretKeyHex = uint8ArrayToHex(document.secretKey);
  document.publicKey = getPublicKey(secretKeyUint8Array);
  document.publicKeyHex = uint8ArrayToHex(document.publicKey);

  // Initial toggle settings.
  document.doEncrypt = false;
  document.doSign = false;

  // When the page loads, populate the secret key input box with the generated secret key.
  window.onload = function () {
    document.getElementById("secret").value = document.secretKeyHex;
    document.list();
  };
}

main();
