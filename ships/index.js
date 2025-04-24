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
const SCHEMA = '5df27a74-9478-4fe2-b80d-594781f0a5fc';

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

async function putRandom() {
  let random = Math.random();

  const collection = new SecretVaultWrapper(
    NILDB.nodes,
    NILDB.orgCredentials,
    SCHEMA
  );
  await collection.init();

  const message = {
    "random": random
  };

  const dataWritten = await collection.writeToNodes([message]);
}

async function getRandom() {
  const collection = new SecretVaultWrapper(
    NILDB.nodes,
    NILDB.orgCredentials,
    SCHEMA
  );
  await collection.init();

  const dataRead = await collection.readFromNodes({});
  for (let i = 0; i < dataRead.length; i++) {
    
    const payload = dataRead[i][0]["random"];
    return payload;
  }
}

async function main() {
  // Functions invoked directly by `index.html`.
  document.putRandom = putRandom;
  document.getRandom = getRandom;
}

main();
