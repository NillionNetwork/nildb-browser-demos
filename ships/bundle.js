(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };
  var __copyProps = (to, from3, except, desc) => {
    if (from3 && typeof from3 === "object" || typeof from3 === "function") {
      for (let key of __getOwnPropNames(from3))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code2.length; i < len; ++i) {
        lookup[i] = code2[i];
        revLookup[code2.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE2, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE2 ? nBytes - 1 : 0;
        var d = isLE2 ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE2, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE2 ? 0 : nBytes - 1;
        var d = isLE2 ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base642 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length2) {
        if (length2 > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length2 + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length2);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length2) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe2(arg);
        }
        return from3(arg, encodingOrOffset, length2);
      }
      Buffer3.poolSize = 8192;
      function from3(value, encodingOrOffset, length2) {
        if (typeof value === "string") {
          return fromString3(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length2);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length2);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length2);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length2);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length2) {
        return from3(value, encodingOrOffset, length2);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe2(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe2(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe2(size);
      };
      function fromString3(string2, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length2 = byteLength(string2, encoding) | 0;
        let buf = createBuffer(length2);
        const actual = buf.write(string2, encoding);
        if (actual !== length2) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length2 = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length2);
        for (let i = 0; i < length2; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length2) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length2 || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length2 === void 0) {
          buf = new Uint8Array(array);
        } else if (length2 === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length2);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length2) {
        if (length2 >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length2 | 0;
      }
      function SlowBuffer(length2) {
        if (+length2 != length2) {
          length2 = 0;
        }
        return Buffer3.alloc(+length2);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare2(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat2(list, length2) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length2 === void 0) {
          length2 = 0;
          for (i = 0; i < list.length; ++i) {
            length2 += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length2);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string2, encoding) {
        if (Buffer3.isBuffer(string2)) {
          return string2.length;
        }
        if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
          return string2.byteLength;
        }
        if (typeof string2 !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2
          );
        }
        const len = string2.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes3(string2).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes2(string2).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes3(string2).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString3() {
        const length2 = this.length;
        if (length2 === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length2);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals4(b) {
        if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read2(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read2(arr, i + j) !== read2(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string2, offset, length2) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length2) {
          length2 = remaining;
        } else {
          length2 = Number(length2);
          if (length2 > remaining) {
            length2 = remaining;
          }
        }
        const strLen = string2.length;
        if (length2 > strLen / 2) {
          length2 = strLen / 2;
        }
        let i;
        for (i = 0; i < length2; ++i) {
          const parsed = parseInt(string2.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string2, offset, length2) {
        return blitBuffer(utf8ToBytes3(string2, buf.length - offset), buf, offset, length2);
      }
      function asciiWrite(buf, string2, offset, length2) {
        return blitBuffer(asciiToBytes(string2), buf, offset, length2);
      }
      function base64Write(buf, string2, offset, length2) {
        return blitBuffer(base64ToBytes2(string2), buf, offset, length2);
      }
      function ucs2Write(buf, string2, offset, length2) {
        return blitBuffer(utf16leToBytes(string2, buf.length - offset), buf, offset, length2);
      }
      Buffer3.prototype.write = function write(string2, offset, length2, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length2 = this.length;
          offset = 0;
        } else if (length2 === void 0 && typeof offset === "string") {
          encoding = offset;
          length2 = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length2)) {
            length2 = length2 >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length2;
            length2 = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length2 === void 0 || length2 > remaining) length2 = remaining;
        if (string2.length > 0 && (length2 < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string2, offset, length2);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string2, offset, length2);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string2, offset, length2);
            case "base64":
              return base64Write(this, string2, offset, length2);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string2, offset, length2);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base642.fromByteArray(buf);
        } else {
          return base642.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length2) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length2) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code2 = val.charCodeAt(0);
            if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
              val = code2;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name2) {
          if (name2) {
            return `${name2} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name2, actual) {
          return `The "${name2}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name2) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name2, "number", value);
        }
      }
      function boundsError(value, length2, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length2 < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length2}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes3(string2, units) {
        units = units || Infinity;
        let codePoint;
        const length2 = string2.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length2; ++i) {
          codePoint = string2.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length2) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes2(str) {
        return base642.toByteArray(base64clean(str));
      }
      function blitBuffer(src2, dst, offset, length2) {
        let i;
        for (i = 0; i < length2; ++i) {
          if (i + offset >= dst.length || i >= src2.length) break;
          dst[i + offset] = src2[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet3 = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet3[i] + alphabet3[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/@noble/ciphers/_assert.js
  var require_assert = __commonJS({
    "node_modules/@noble/ciphers/_assert.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.abool = abool2;
      exports.abytes = abytes4;
      exports.aexists = aexists3;
      exports.ahash = ahash2;
      exports.anumber = anumber4;
      exports.aoutput = aoutput3;
      exports.isBytes = isBytes5;
      function anumber4(n) {
        if (!Number.isSafeInteger(n) || n < 0)
          throw new Error("positive integer expected, got " + n);
      }
      function isBytes5(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function abytes4(b, ...lengths) {
        if (!isBytes5(b))
          throw new Error("Uint8Array expected");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
      }
      function ahash2(h) {
        if (typeof h !== "function" || typeof h.create !== "function")
          throw new Error("Hash should be wrapped by utils.wrapConstructor");
        anumber4(h.outputLen);
        anumber4(h.blockLen);
      }
      function aexists3(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function aoutput3(out, instance) {
        abytes4(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error("digestInto() expects output buffer of length at least " + min);
        }
      }
      function abool2(b) {
        if (typeof b !== "boolean")
          throw new Error(`boolean expected, not ${b}`);
      }
    }
  });

  // node_modules/@noble/ciphers/utils.js
  var require_utils = __commonJS({
    "node_modules/@noble/ciphers/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCipher = exports.Hash = exports.nextTick = exports.isLE = exports.createView = exports.u32 = exports.u8 = void 0;
      exports.bytesToHex = bytesToHex3;
      exports.hexToBytes = hexToBytes3;
      exports.hexToNumber = hexToNumber2;
      exports.bytesToNumberBE = bytesToNumberBE2;
      exports.numberToBytesBE = numberToBytesBE2;
      exports.utf8ToBytes = utf8ToBytes3;
      exports.bytesToUtf8 = bytesToUtf8;
      exports.toBytes = toBytes3;
      exports.overlapBytes = overlapBytes;
      exports.complexOverlapBytes = complexOverlapBytes;
      exports.concatBytes = concatBytes3;
      exports.checkOpts = checkOpts;
      exports.equalBytes = equalBytes;
      exports.getOutput = getOutput;
      exports.setBigUint64 = setBigUint643;
      exports.u64Lengths = u64Lengths;
      exports.isAligned32 = isAligned32;
      exports.copyBytes = copyBytes;
      exports.clean = clean2;
      var _assert_js_1 = require_assert();
      var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      exports.u8 = u8;
      var u322 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      exports.u32 = u322;
      var createView3 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      exports.createView = createView3;
      exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
      if (!exports.isLE)
        throw new Error("Non little-endian hardware is not supported");
      var hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex3(bytes) {
        (0, _assert_js_1.abytes)(bytes);
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes2[bytes[i]];
        }
        return hex;
      }
      var asciis2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function asciiToBase162(ch) {
        if (ch >= asciis2._0 && ch <= asciis2._9)
          return ch - asciis2._0;
        if (ch >= asciis2.A && ch <= asciis2.F)
          return ch - (asciis2.A - 10);
        if (ch >= asciis2.a && ch <= asciis2.f)
          return ch - (asciis2.a - 10);
        return;
      }
      function hexToBytes3(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error("hex string expected, got unpadded hex of length " + hl);
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase162(hex.charCodeAt(hi));
          const n2 = asciiToBase162(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      function hexToNumber2(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        return BigInt(hex === "" ? "0" : "0x" + hex);
      }
      function bytesToNumberBE2(bytes) {
        return hexToNumber2(bytesToHex3(bytes));
      }
      function numberToBytesBE2(n, len) {
        return hexToBytes3(n.toString(16).padStart(len * 2, "0"));
      }
      var nextTick = async () => {
      };
      exports.nextTick = nextTick;
      function utf8ToBytes3(str) {
        if (typeof str !== "string")
          throw new Error("string expected");
        return new Uint8Array(new TextEncoder().encode(str));
      }
      function bytesToUtf8(bytes) {
        return new TextDecoder().decode(bytes);
      }
      function toBytes3(data) {
        if (typeof data === "string")
          data = utf8ToBytes3(data);
        else if ((0, _assert_js_1.isBytes)(data))
          data = copyBytes(data);
        else
          throw new Error("Uint8Array expected, got " + typeof data);
        return data;
      }
      function overlapBytes(a, b) {
        return a.buffer === b.buffer && // probably will fail with some obscure proxies, but this is best we can do
        a.byteOffset < b.byteOffset + b.byteLength && // a starts before b end
        b.byteOffset < a.byteOffset + a.byteLength;
      }
      function complexOverlapBytes(input, output) {
        if (overlapBytes(input, output) && input.byteOffset < output.byteOffset)
          throw new Error("complex overlap of input and output is not supported");
      }
      function concatBytes3(...arrays) {
        let sum = 0;
        for (let i = 0; i < arrays.length; i++) {
          const a = arrays[i];
          (0, _assert_js_1.abytes)(a);
          sum += a.length;
        }
        const res = new Uint8Array(sum);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const a = arrays[i];
          res.set(a, pad);
          pad += a.length;
        }
        return res;
      }
      function checkOpts(defaults, opts) {
        if (opts == null || typeof opts !== "object")
          throw new Error("options must be defined");
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      function equalBytes(a, b) {
        if (a.length !== b.length)
          return false;
        let diff = 0;
        for (let i = 0; i < a.length; i++)
          diff |= a[i] ^ b[i];
        return diff === 0;
      }
      var Hash3 = class {
      };
      exports.Hash = Hash3;
      var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
        function wrappedCipher(key, ...args) {
          (0, _assert_js_1.abytes)(key);
          if (params.nonceLength !== void 0) {
            const nonce = args[0];
            if (!nonce)
              throw new Error("nonce / iv required");
            if (params.varSizeNonce)
              (0, _assert_js_1.abytes)(nonce);
            else
              (0, _assert_js_1.abytes)(nonce, params.nonceLength);
          }
          const tagl = params.tagLength;
          if (tagl && args[1] !== void 0) {
            (0, _assert_js_1.abytes)(args[1]);
          }
          const cipher = constructor(key, ...args);
          const checkOutput = (fnLength, output) => {
            if (output !== void 0) {
              if (fnLength !== 2)
                throw new Error("cipher output not supported");
              (0, _assert_js_1.abytes)(output);
            }
          };
          let called = false;
          const wrCipher = {
            encrypt(data, output) {
              if (called)
                throw new Error("cannot encrypt() twice with same key + nonce");
              called = true;
              (0, _assert_js_1.abytes)(data);
              checkOutput(cipher.encrypt.length, output);
              return cipher.encrypt(data, output);
            },
            decrypt(data, output) {
              (0, _assert_js_1.abytes)(data);
              if (tagl && data.length < tagl)
                throw new Error("invalid ciphertext length: smaller than tagLength=" + tagl);
              checkOutput(cipher.decrypt.length, output);
              return cipher.decrypt(data, output);
            }
          };
          return wrCipher;
        }
        Object.assign(wrappedCipher, params);
        return wrappedCipher;
      };
      exports.wrapCipher = wrapCipher;
      function getOutput(expectedLength, out, onlyAligned = true) {
        if (out === void 0)
          return new Uint8Array(expectedLength);
        if (out.length !== expectedLength)
          throw new Error("invalid output length, expected " + expectedLength + ", got: " + out.length);
        if (onlyAligned && !isAligned32(out))
          throw new Error("invalid output, must be aligned");
        return out;
      }
      function setBigUint643(view, byteOffset, value, isLE2) {
        if (typeof view.setBigUint64 === "function")
          return view.setBigUint64(byteOffset, value, isLE2);
        const _32n3 = BigInt(32);
        const _u32_max = BigInt(4294967295);
        const wh = Number(value >> _32n3 & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE2 ? 4 : 0;
        const l = isLE2 ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE2);
        view.setUint32(byteOffset + l, wl, isLE2);
      }
      function u64Lengths(ciphertext, AAD) {
        const num = new Uint8Array(16);
        const view = (0, exports.createView)(num);
        setBigUint643(view, 0, BigInt(AAD ? AAD.length : 0), true);
        setBigUint643(view, 8, BigInt(ciphertext.length), true);
        return num;
      }
      function isAligned32(bytes) {
        return bytes.byteOffset % 4 === 0;
      }
      function copyBytes(bytes) {
        return Uint8Array.from(bytes);
      }
      function clean2(...arrays) {
        for (let i = 0; i < arrays.length; i++) {
          arrays[i].fill(0);
        }
      }
    }
  });

  // node_modules/eciesjs/dist/consts.js
  var require_consts = __commonJS({
    "node_modules/eciesjs/dist/consts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AEAD_TAG_LENGTH = exports.XCHACHA20_NONCE_LENGTH = exports.CURVE25519_PUBLIC_KEY_SIZE = exports.ETH_PUBLIC_KEY_SIZE = exports.UNCOMPRESSED_PUBLIC_KEY_SIZE = exports.COMPRESSED_PUBLIC_KEY_SIZE = exports.SECRET_KEY_LENGTH = void 0;
      exports.SECRET_KEY_LENGTH = 32;
      exports.COMPRESSED_PUBLIC_KEY_SIZE = 33;
      exports.UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;
      exports.ETH_PUBLIC_KEY_SIZE = 64;
      exports.CURVE25519_PUBLIC_KEY_SIZE = 32;
      exports.XCHACHA20_NONCE_LENGTH = 24;
      exports.AEAD_TAG_LENGTH = 16;
    }
  });

  // node_modules/eciesjs/dist/config.js
  var require_config = __commonJS({
    "node_modules/eciesjs/dist/config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ephemeralKeySize = exports.symmetricNonceLength = exports.symmetricAlgorithm = exports.isHkdfKeyCompressed = exports.isEphemeralKeyCompressed = exports.ellipticCurve = exports.ECIES_CONFIG = void 0;
      var consts_1 = require_consts();
      var Config = (
        /** @class */
        /* @__PURE__ */ function() {
          function Config2() {
            this.ellipticCurve = "secp256k1";
            this.isEphemeralKeyCompressed = false;
            this.isHkdfKeyCompressed = false;
            this.symmetricAlgorithm = "aes-256-gcm";
            this.symmetricNonceLength = 16;
          }
          return Config2;
        }()
      );
      exports.ECIES_CONFIG = new Config();
      var ellipticCurve = function() {
        return exports.ECIES_CONFIG.ellipticCurve;
      };
      exports.ellipticCurve = ellipticCurve;
      var isEphemeralKeyCompressed = function() {
        return exports.ECIES_CONFIG.isEphemeralKeyCompressed;
      };
      exports.isEphemeralKeyCompressed = isEphemeralKeyCompressed;
      var isHkdfKeyCompressed = function() {
        return exports.ECIES_CONFIG.isHkdfKeyCompressed;
      };
      exports.isHkdfKeyCompressed = isHkdfKeyCompressed;
      var symmetricAlgorithm = function() {
        return exports.ECIES_CONFIG.symmetricAlgorithm;
      };
      exports.symmetricAlgorithm = symmetricAlgorithm;
      var symmetricNonceLength = function() {
        return exports.ECIES_CONFIG.symmetricNonceLength;
      };
      exports.symmetricNonceLength = symmetricNonceLength;
      var ephemeralKeySize = function() {
        var mapping = {
          secp256k1: exports.ECIES_CONFIG.isEphemeralKeyCompressed ? consts_1.COMPRESSED_PUBLIC_KEY_SIZE : consts_1.UNCOMPRESSED_PUBLIC_KEY_SIZE,
          x25519: consts_1.CURVE25519_PUBLIC_KEY_SIZE,
          ed25519: consts_1.CURVE25519_PUBLIC_KEY_SIZE
        };
        if (exports.ECIES_CONFIG.ellipticCurve in mapping) {
          return mapping[exports.ECIES_CONFIG.ellipticCurve];
        } else {
          throw new Error("Not implemented");
        }
      };
      exports.ephemeralKeySize = ephemeralKeySize;
    }
  });

  // node_modules/@noble/ciphers/crypto.js
  var require_crypto = __commonJS({
    "node_modules/@noble/ciphers/crypto.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.crypto = void 0;
      exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
    }
  });

  // node_modules/@noble/ciphers/webcrypto.js
  var require_webcrypto = __commonJS({
    "node_modules/@noble/ciphers/webcrypto.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.gcm = exports.ctr = exports.cbc = exports.utils = void 0;
      exports.randomBytes = randomBytes2;
      exports.getWebcryptoSubtle = getWebcryptoSubtle;
      exports.managedNonce = managedNonce;
      var crypto_1 = require_crypto();
      var _assert_js_1 = require_assert();
      var utils_js_1 = require_utils();
      function randomBytes2(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
          return crypto_1.crypto.randomBytes(bytesLength);
        }
        throw new Error("crypto.getRandomValues must be defined");
      }
      function getWebcryptoSubtle() {
        if (crypto_1.crypto && typeof crypto_1.crypto.subtle === "object" && crypto_1.crypto.subtle != null)
          return crypto_1.crypto.subtle;
        throw new Error("crypto.subtle must be defined");
      }
      function managedNonce(fn) {
        const { nonceLength } = fn;
        (0, _assert_js_1.anumber)(nonceLength);
        return (key, ...args) => ({
          encrypt(plaintext, ...argsEnc) {
            const nonce = randomBytes2(nonceLength);
            const ciphertext = fn(key, nonce, ...args).encrypt(plaintext, ...argsEnc);
            const out = (0, utils_js_1.concatBytes)(nonce, ciphertext);
            ciphertext.fill(0);
            return out;
          },
          decrypt(ciphertext, ...argsDec) {
            const nonce = ciphertext.subarray(0, nonceLength);
            const data = ciphertext.subarray(nonceLength);
            return fn(key, nonce, ...args).decrypt(data, ...argsDec);
          }
        });
      }
      exports.utils = {
        async encrypt(key, keyParams, cryptParams, plaintext) {
          const cr = getWebcryptoSubtle();
          const iKey = await cr.importKey("raw", key, keyParams, true, ["encrypt"]);
          const ciphertext = await cr.encrypt(cryptParams, iKey, plaintext);
          return new Uint8Array(ciphertext);
        },
        async decrypt(key, keyParams, cryptParams, ciphertext) {
          const cr = getWebcryptoSubtle();
          const iKey = await cr.importKey("raw", key, keyParams, true, ["decrypt"]);
          const plaintext = await cr.decrypt(cryptParams, iKey, ciphertext);
          return new Uint8Array(plaintext);
        }
      };
      var mode = {
        CBC: "AES-CBC",
        CTR: "AES-CTR",
        GCM: "AES-GCM"
      };
      function getCryptParams(algo, nonce, AAD) {
        if (algo === mode.CBC)
          return { name: mode.CBC, iv: nonce };
        if (algo === mode.CTR)
          return { name: mode.CTR, counter: nonce, length: 64 };
        if (algo === mode.GCM) {
          if (AAD)
            return { name: mode.GCM, iv: nonce, additionalData: AAD };
          else
            return { name: mode.GCM, iv: nonce };
        }
        throw new Error("unknown aes block mode");
      }
      function generate(algo) {
        return (key, nonce, AAD) => {
          (0, _assert_js_1.abytes)(key);
          (0, _assert_js_1.abytes)(nonce);
          const keyParams = { name: algo, length: key.length * 8 };
          const cryptParams = getCryptParams(algo, nonce, AAD);
          let consumed = false;
          return {
            // keyLength,
            encrypt(plaintext) {
              (0, _assert_js_1.abytes)(plaintext);
              if (consumed)
                throw new Error("Cannot encrypt() twice with same key / nonce");
              consumed = true;
              return exports.utils.encrypt(key, keyParams, cryptParams, plaintext);
            },
            decrypt(ciphertext) {
              (0, _assert_js_1.abytes)(ciphertext);
              return exports.utils.decrypt(key, keyParams, cryptParams, ciphertext);
            }
          };
        };
      }
      exports.cbc = (() => generate(mode.CBC))();
      exports.ctr = (() => generate(mode.CTR))();
      exports.gcm = /* @__PURE__ */ (() => generate(mode.GCM))();
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/_assert.js
  var require_assert2 = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/_assert.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.anumber = anumber4;
      exports.abytes = abytes4;
      exports.ahash = ahash2;
      exports.aexists = aexists3;
      exports.aoutput = aoutput3;
      function anumber4(n) {
        if (!Number.isSafeInteger(n) || n < 0)
          throw new Error("positive integer expected, got " + n);
      }
      function isBytes5(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function abytes4(b, ...lengths) {
        if (!isBytes5(b))
          throw new Error("Uint8Array expected");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
      }
      function ahash2(h) {
        if (typeof h !== "function" || typeof h.create !== "function")
          throw new Error("Hash should be wrapped by utils.wrapConstructor");
        anumber4(h.outputLen);
        anumber4(h.blockLen);
      }
      function aexists3(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function aoutput3(out, instance) {
        abytes4(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error("digestInto() expects output buffer of length at least " + min);
        }
      }
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/crypto.js
  var require_crypto2 = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/crypto.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.crypto = void 0;
      exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/utils.js
  var require_utils2 = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Hash = exports.nextTick = exports.byteSwapIfBE = exports.isLE = void 0;
      exports.isBytes = isBytes5;
      exports.u8 = u8;
      exports.u32 = u322;
      exports.createView = createView3;
      exports.rotr = rotr3;
      exports.rotl = rotl2;
      exports.byteSwap = byteSwap2;
      exports.byteSwap32 = byteSwap322;
      exports.bytesToHex = bytesToHex3;
      exports.hexToBytes = hexToBytes3;
      exports.asyncLoop = asyncLoop;
      exports.utf8ToBytes = utf8ToBytes3;
      exports.toBytes = toBytes3;
      exports.concatBytes = concatBytes3;
      exports.checkOpts = checkOpts;
      exports.wrapConstructor = wrapConstructor2;
      exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
      exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
      exports.randomBytes = randomBytes2;
      var crypto_1 = require_crypto2();
      var _assert_ts_1 = require_assert2();
      function isBytes5(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function u8(arr) {
        return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function u322(arr) {
        return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      }
      function createView3(arr) {
        return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function rotr3(word, shift) {
        return word << 32 - shift | word >>> shift;
      }
      function rotl2(word, shift) {
        return word << shift | word >>> 32 - shift >>> 0;
      }
      exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
      function byteSwap2(word) {
        return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
      }
      exports.byteSwapIfBE = exports.isLE ? (n) => n : (n) => byteSwap2(n);
      function byteSwap322(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = byteSwap2(arr[i]);
        }
      }
      var hasHexBuiltin3 = (
        // @ts-ignore
        typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
      );
      var hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex3(bytes) {
        (0, _assert_ts_1.abytes)(bytes);
        if (hasHexBuiltin3)
          return bytes.toHex();
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes2[bytes[i]];
        }
        return hex;
      }
      var asciis2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function asciiToBase162(ch) {
        if (ch >= asciis2._0 && ch <= asciis2._9)
          return ch - asciis2._0;
        if (ch >= asciis2.A && ch <= asciis2.F)
          return ch - (asciis2.A - 10);
        if (ch >= asciis2.a && ch <= asciis2.f)
          return ch - (asciis2.a - 10);
        return;
      }
      function hexToBytes3(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        if (hasHexBuiltin3)
          return Uint8Array.fromHex(hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error("hex string expected, got unpadded hex of length " + hl);
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase162(hex.charCodeAt(hi));
          const n2 = asciiToBase162(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      var nextTick = async () => {
      };
      exports.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick)
            continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }
      function utf8ToBytes3(str) {
        if (typeof str !== "string")
          throw new Error("utf8ToBytes expected string, got " + typeof str);
        return new Uint8Array(new TextEncoder().encode(str));
      }
      function toBytes3(data) {
        if (typeof data === "string")
          data = utf8ToBytes3(data);
        (0, _assert_ts_1.abytes)(data);
        return data;
      }
      function concatBytes3(...arrays) {
        let sum = 0;
        for (let i = 0; i < arrays.length; i++) {
          const a = arrays[i];
          (0, _assert_ts_1.abytes)(a);
          sum += a.length;
        }
        const res = new Uint8Array(sum);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const a = arrays[i];
          res.set(a, pad);
          pad += a.length;
        }
        return res;
      }
      var Hash3 = class {
        // Safe version that clones internal state
        clone() {
          return this._cloneInto();
        }
      };
      exports.Hash = Hash3;
      function checkOpts(defaults, opts) {
        if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
          throw new Error("Options should be object or undefined");
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      function wrapConstructor2(hashCons) {
        const hashC = (msg) => hashCons().update(toBytes3(msg)).digest();
        const tmp = hashCons();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashCons();
        return hashC;
      }
      function wrapConstructorWithOpts(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes3(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      function wrapXOFConstructorWithOpts(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes3(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      function randomBytes2(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
          return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
        }
        throw new Error("crypto.getRandomValues must be defined");
      }
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/_md.js
  var require_md = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/_md.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HashMD = void 0;
      exports.setBigUint64 = setBigUint643;
      exports.Chi = Chi3;
      exports.Maj = Maj3;
      var _assert_ts_1 = require_assert2();
      var utils_ts_1 = require_utils2();
      function setBigUint643(view, byteOffset, value, isLE2) {
        if (typeof view.setBigUint64 === "function")
          return view.setBigUint64(byteOffset, value, isLE2);
        const _32n3 = BigInt(32);
        const _u32_max = BigInt(4294967295);
        const wh = Number(value >> _32n3 & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE2 ? 4 : 0;
        const l = isLE2 ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE2);
        view.setUint32(byteOffset + l, wl, isLE2);
      }
      function Chi3(a, b, c) {
        return a & b ^ ~a & c;
      }
      function Maj3(a, b, c) {
        return a & b ^ a & c ^ b & c;
      }
      var HashMD3 = class extends utils_ts_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE2) {
          super();
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE2;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_ts_1.createView)(this.buffer);
        }
        update(data) {
          (0, _assert_ts_1.aexists)(this);
          const { view, buffer, blockLen } = this;
          data = (0, utils_ts_1.toBytes)(data);
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = (0, utils_ts_1.createView)(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          (0, _assert_ts_1.aexists)(this);
          (0, _assert_ts_1.aoutput)(out, this);
          this.finished = true;
          const { buffer, view, blockLen, isLE: isLE2 } = this;
          let { pos } = this;
          buffer[pos++] = 128;
          this.buffer.subarray(pos).fill(0);
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
          setBigUint643(view, blockLen - 8, BigInt(this.length * 8), isLE2);
          this.process(view, 0);
          const oview = (0, utils_ts_1.createView)(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE2);
        }
        digest() {
          const { buffer, outputLen } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer, length: length2, finished, destroyed, pos } = this;
          to.length = length2;
          to.pos = pos;
          to.finished = finished;
          to.destroyed = destroyed;
          if (length2 % blockLen)
            to.buffer.set(buffer);
          return to;
        }
      };
      exports.HashMD = HashMD3;
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/sha256.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha224 = exports.sha256 = exports.SHA256 = void 0;
      var _md_ts_1 = require_md();
      var utils_ts_1 = require_utils2();
      var SHA256_K3 = /* @__PURE__ */ new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      var SHA256_IV3 = /* @__PURE__ */ new Uint32Array([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      var SHA256_W3 = /* @__PURE__ */ new Uint32Array(64);
      var SHA2563 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 32) {
          super(64, outputLen, 8, false);
          this.A = SHA256_IV3[0] | 0;
          this.B = SHA256_IV3[1] | 0;
          this.C = SHA256_IV3[2] | 0;
          this.D = SHA256_IV3[3] | 0;
          this.E = SHA256_IV3[4] | 0;
          this.F = SHA256_IV3[5] | 0;
          this.G = SHA256_IV3[6] | 0;
          this.H = SHA256_IV3[7] | 0;
        }
        get() {
          const { A, B, C, D, E, F, G, H } = this;
          return [A, B, C, D, E, F, G, H];
        }
        // prettier-ignore
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W3[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W3[i - 15];
            const W2 = SHA256_W3[i - 2];
            const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W3[i] = s1 + SHA256_W3[i - 7] + s0 + SHA256_W3[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
            const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K3[i] + SHA256_W3[i] | 0;
            const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
            const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          SHA256_W3.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          this.buffer.fill(0);
        }
      };
      exports.SHA256 = SHA2563;
      var SHA2242 = class extends SHA2563 {
        constructor() {
          super(28);
          this.A = 3238371032 | 0;
          this.B = 914150663 | 0;
          this.C = 812702999 | 0;
          this.D = 4144912697 | 0;
          this.E = 4290775857 | 0;
          this.F = 1750603025 | 0;
          this.G = 1694076839 | 0;
          this.H = 3204075428 | 0;
        }
      };
      exports.sha256 = (0, utils_ts_1.wrapConstructor)(() => new SHA2563());
      exports.sha224 = (0, utils_ts_1.wrapConstructor)(() => new SHA2242());
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/_u64.js
  var require_u64 = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/_u64.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.add5L = exports.add5H = exports.add4H = exports.add4L = exports.add3H = exports.add3L = exports.rotlBL = exports.rotlBH = exports.rotlSL = exports.rotlSH = exports.rotr32L = exports.rotr32H = exports.rotrBL = exports.rotrBH = exports.rotrSL = exports.rotrSH = exports.shrSL = exports.shrSH = exports.toBig = void 0;
      exports.fromBig = fromBig3;
      exports.split = split3;
      exports.add = add2;
      var U32_MASK643 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      var _32n3 = /* @__PURE__ */ BigInt(32);
      function fromBig3(n, le = false) {
        if (le)
          return { h: Number(n & U32_MASK643), l: Number(n >> _32n3 & U32_MASK643) };
        return { h: Number(n >> _32n3 & U32_MASK643) | 0, l: Number(n & U32_MASK643) | 0 };
      }
      function split3(lst, le = false) {
        let Ah = new Uint32Array(lst.length);
        let Al = new Uint32Array(lst.length);
        for (let i = 0; i < lst.length; i++) {
          const { h, l } = fromBig3(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      var toBig2 = (h, l) => BigInt(h >>> 0) << _32n3 | BigInt(l >>> 0);
      exports.toBig = toBig2;
      var shrSH2 = (h, _l, s) => h >>> s;
      exports.shrSH = shrSH2;
      var shrSL2 = (h, l, s) => h << 32 - s | l >>> s;
      exports.shrSL = shrSL2;
      var rotrSH2 = (h, l, s) => h >>> s | l << 32 - s;
      exports.rotrSH = rotrSH2;
      var rotrSL2 = (h, l, s) => h << 32 - s | l >>> s;
      exports.rotrSL = rotrSL2;
      var rotrBH2 = (h, l, s) => h << 64 - s | l >>> s - 32;
      exports.rotrBH = rotrBH2;
      var rotrBL2 = (h, l, s) => h >>> s - 32 | l << 64 - s;
      exports.rotrBL = rotrBL2;
      var rotr32H2 = (_h, l) => l;
      exports.rotr32H = rotr32H2;
      var rotr32L2 = (h, _l) => h;
      exports.rotr32L = rotr32L2;
      var rotlSH3 = (h, l, s) => h << s | l >>> 32 - s;
      exports.rotlSH = rotlSH3;
      var rotlSL3 = (h, l, s) => l << s | h >>> 32 - s;
      exports.rotlSL = rotlSL3;
      var rotlBH3 = (h, l, s) => l << s - 32 | h >>> 64 - s;
      exports.rotlBH = rotlBH3;
      var rotlBL3 = (h, l, s) => h << s - 32 | l >>> 64 - s;
      exports.rotlBL = rotlBL3;
      function add2(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
      }
      var add3L2 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      exports.add3L = add3L2;
      var add3H2 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      exports.add3H = add3H2;
      var add4L2 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      exports.add4L = add4L2;
      var add4H2 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      exports.add4H = add4H2;
      var add5L2 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      exports.add5L = add5L2;
      var add5H2 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      exports.add5H = add5H2;
      var u642 = {
        fromBig: fromBig3,
        split: split3,
        toBig: toBig2,
        shrSH: shrSH2,
        shrSL: shrSL2,
        rotrSH: rotrSH2,
        rotrSL: rotrSL2,
        rotrBH: rotrBH2,
        rotrBL: rotrBL2,
        rotr32H: rotr32H2,
        rotr32L: rotr32L2,
        rotlSH: rotlSH3,
        rotlSL: rotlSL3,
        rotlBH: rotlBH3,
        rotlBL: rotlBL3,
        add: add2,
        add3L: add3L2,
        add3H: add3H2,
        add4L: add4L2,
        add4H: add4H2,
        add5H: add5H2,
        add5L: add5L2
      };
      exports.default = u642;
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/sha512.js
  var require_sha512 = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/sha512.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha384 = exports.sha512_256 = exports.sha512_224 = exports.sha512 = exports.SHA384 = exports.SHA512_256 = exports.SHA512_224 = exports.SHA512 = void 0;
      var _md_ts_1 = require_md();
      var _u64_ts_1 = require_u64();
      var utils_ts_1 = require_utils2();
      var [SHA512_Kh2, SHA512_Kl2] = /* @__PURE__ */ (() => _u64_ts_1.default.split([
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817"
      ].map((n) => BigInt(n))))();
      var SHA512_W_H2 = /* @__PURE__ */ new Uint32Array(80);
      var SHA512_W_L2 = /* @__PURE__ */ new Uint32Array(80);
      var SHA5122 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 64) {
          super(128, outputLen, 16, false);
          this.Ah = 1779033703 | 0;
          this.Al = 4089235720 | 0;
          this.Bh = 3144134277 | 0;
          this.Bl = 2227873595 | 0;
          this.Ch = 1013904242 | 0;
          this.Cl = 4271175723 | 0;
          this.Dh = 2773480762 | 0;
          this.Dl = 1595750129 | 0;
          this.Eh = 1359893119 | 0;
          this.El = 2917565137 | 0;
          this.Fh = 2600822924 | 0;
          this.Fl = 725511199 | 0;
          this.Gh = 528734635 | 0;
          this.Gl = 4215389547 | 0;
          this.Hh = 1541459225 | 0;
          this.Hl = 327033209 | 0;
        }
        // prettier-ignore
        get() {
          const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }
        // prettier-ignore
        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H2[i] = view.getUint32(offset);
            SHA512_W_L2[i] = view.getUint32(offset += 4);
          }
          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H2[i - 15] | 0;
            const W15l = SHA512_W_L2[i - 15] | 0;
            const s0h = _u64_ts_1.default.rotrSH(W15h, W15l, 1) ^ _u64_ts_1.default.rotrSH(W15h, W15l, 8) ^ _u64_ts_1.default.shrSH(W15h, W15l, 7);
            const s0l = _u64_ts_1.default.rotrSL(W15h, W15l, 1) ^ _u64_ts_1.default.rotrSL(W15h, W15l, 8) ^ _u64_ts_1.default.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H2[i - 2] | 0;
            const W2l = SHA512_W_L2[i - 2] | 0;
            const s1h = _u64_ts_1.default.rotrSH(W2h, W2l, 19) ^ _u64_ts_1.default.rotrBH(W2h, W2l, 61) ^ _u64_ts_1.default.shrSH(W2h, W2l, 6);
            const s1l = _u64_ts_1.default.rotrSL(W2h, W2l, 19) ^ _u64_ts_1.default.rotrBL(W2h, W2l, 61) ^ _u64_ts_1.default.shrSL(W2h, W2l, 6);
            const SUMl = _u64_ts_1.default.add4L(s0l, s1l, SHA512_W_L2[i - 7], SHA512_W_L2[i - 16]);
            const SUMh = _u64_ts_1.default.add4H(SUMl, s0h, s1h, SHA512_W_H2[i - 7], SHA512_W_H2[i - 16]);
            SHA512_W_H2[i] = SUMh | 0;
            SHA512_W_L2[i] = SUMl | 0;
          }
          let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          for (let i = 0; i < 80; i++) {
            const sigma1h = _u64_ts_1.default.rotrSH(Eh, El, 14) ^ _u64_ts_1.default.rotrSH(Eh, El, 18) ^ _u64_ts_1.default.rotrBH(Eh, El, 41);
            const sigma1l = _u64_ts_1.default.rotrSL(Eh, El, 14) ^ _u64_ts_1.default.rotrSL(Eh, El, 18) ^ _u64_ts_1.default.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = _u64_ts_1.default.add5L(Hl, sigma1l, CHIl, SHA512_Kl2[i], SHA512_W_L2[i]);
            const T1h = _u64_ts_1.default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh2[i], SHA512_W_H2[i]);
            const T1l = T1ll | 0;
            const sigma0h = _u64_ts_1.default.rotrSH(Ah, Al, 28) ^ _u64_ts_1.default.rotrBH(Ah, Al, 34) ^ _u64_ts_1.default.rotrBH(Ah, Al, 39);
            const sigma0l = _u64_ts_1.default.rotrSL(Ah, Al, 28) ^ _u64_ts_1.default.rotrBL(Ah, Al, 34) ^ _u64_ts_1.default.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = _u64_ts_1.default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = _u64_ts_1.default.add3L(T1l, sigma0l, MAJl);
            Ah = _u64_ts_1.default.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }
          ({ h: Ah, l: Al } = _u64_ts_1.default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({ h: Bh, l: Bl } = _u64_ts_1.default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({ h: Ch, l: Cl } = _u64_ts_1.default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({ h: Dh, l: Dl } = _u64_ts_1.default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({ h: Eh, l: El } = _u64_ts_1.default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({ h: Fh, l: Fl } = _u64_ts_1.default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({ h: Gh, l: Gl } = _u64_ts_1.default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({ h: Hh, l: Hl } = _u64_ts_1.default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }
        roundClean() {
          SHA512_W_H2.fill(0);
          SHA512_W_L2.fill(0);
        }
        destroy() {
          this.buffer.fill(0);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      };
      exports.SHA512 = SHA5122;
      var SHA512_224 = class extends SHA5122 {
        constructor() {
          super(28);
          this.Ah = 2352822216 | 0;
          this.Al = 424955298 | 0;
          this.Bh = 1944164710 | 0;
          this.Bl = 2312950998 | 0;
          this.Ch = 502970286 | 0;
          this.Cl = 855612546 | 0;
          this.Dh = 1738396948 | 0;
          this.Dl = 1479516111 | 0;
          this.Eh = 258812777 | 0;
          this.El = 2077511080 | 0;
          this.Fh = 2011393907 | 0;
          this.Fl = 79989058 | 0;
          this.Gh = 1067287976 | 0;
          this.Gl = 1780299464 | 0;
          this.Hh = 286451373 | 0;
          this.Hl = 2446758561 | 0;
        }
      };
      exports.SHA512_224 = SHA512_224;
      var SHA512_256 = class extends SHA5122 {
        constructor() {
          super(32);
          this.Ah = 573645204 | 0;
          this.Al = 4230739756 | 0;
          this.Bh = 2673172387 | 0;
          this.Bl = 3360449730 | 0;
          this.Ch = 596883563 | 0;
          this.Cl = 1867755857 | 0;
          this.Dh = 2520282905 | 0;
          this.Dl = 1497426621 | 0;
          this.Eh = 2519219938 | 0;
          this.El = 2827943907 | 0;
          this.Fh = 3193839141 | 0;
          this.Fl = 1401305490 | 0;
          this.Gh = 721525244 | 0;
          this.Gl = 746961066 | 0;
          this.Hh = 246885852 | 0;
          this.Hl = 2177182882 | 0;
        }
      };
      exports.SHA512_256 = SHA512_256;
      var SHA384 = class extends SHA5122 {
        constructor() {
          super(48);
          this.Ah = 3418070365 | 0;
          this.Al = 3238371032 | 0;
          this.Bh = 1654270250 | 0;
          this.Bl = 914150663 | 0;
          this.Ch = 2438529370 | 0;
          this.Cl = 812702999 | 0;
          this.Dh = 355462360 | 0;
          this.Dl = 4144912697 | 0;
          this.Eh = 1731405415 | 0;
          this.El = 4290775857 | 0;
          this.Fh = 2394180231 | 0;
          this.Fl = 1750603025 | 0;
          this.Gh = 3675008525 | 0;
          this.Gl = 1694076839 | 0;
          this.Hh = 1203062813 | 0;
          this.Hl = 3204075428 | 0;
        }
      };
      exports.SHA384 = SHA384;
      exports.sha512 = (0, utils_ts_1.wrapConstructor)(() => new SHA5122());
      exports.sha512_224 = (0, utils_ts_1.wrapConstructor)(() => new SHA512_224());
      exports.sha512_256 = (0, utils_ts_1.wrapConstructor)(() => new SHA512_256());
      exports.sha384 = (0, utils_ts_1.wrapConstructor)(() => new SHA384());
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/sha2.js
  var require_sha2 = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/sha2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha512_256 = exports.sha512_224 = exports.sha512 = exports.sha384 = exports.sha256 = exports.sha224 = void 0;
      var sha256_ts_1 = require_sha256();
      Object.defineProperty(exports, "sha224", { enumerable: true, get: function() {
        return sha256_ts_1.sha224;
      } });
      Object.defineProperty(exports, "sha256", { enumerable: true, get: function() {
        return sha256_ts_1.sha256;
      } });
      var sha512_ts_1 = require_sha512();
      Object.defineProperty(exports, "sha384", { enumerable: true, get: function() {
        return sha512_ts_1.sha384;
      } });
      Object.defineProperty(exports, "sha512", { enumerable: true, get: function() {
        return sha512_ts_1.sha512;
      } });
      Object.defineProperty(exports, "sha512_224", { enumerable: true, get: function() {
        return sha512_ts_1.sha512_224;
      } });
      Object.defineProperty(exports, "sha512_256", { enumerable: true, get: function() {
        return sha512_ts_1.sha512_256;
      } });
    }
  });

  // node_modules/@noble/curves/abstract/utils.js
  var require_utils3 = __commonJS({
    "node_modules/@noble/curves/abstract/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.notImplemented = exports.bitMask = void 0;
      exports.isBytes = isBytes5;
      exports.abytes = abytes4;
      exports.abool = abool2;
      exports.numberToHexUnpadded = numberToHexUnpadded2;
      exports.hexToNumber = hexToNumber2;
      exports.bytesToHex = bytesToHex3;
      exports.hexToBytes = hexToBytes3;
      exports.bytesToNumberBE = bytesToNumberBE2;
      exports.bytesToNumberLE = bytesToNumberLE2;
      exports.numberToBytesBE = numberToBytesBE2;
      exports.numberToBytesLE = numberToBytesLE2;
      exports.numberToVarBytesBE = numberToVarBytesBE;
      exports.ensureBytes = ensureBytes2;
      exports.concatBytes = concatBytes3;
      exports.equalBytes = equalBytes;
      exports.utf8ToBytes = utf8ToBytes3;
      exports.inRange = inRange2;
      exports.aInRange = aInRange2;
      exports.bitLen = bitLen2;
      exports.bitGet = bitGet;
      exports.bitSet = bitSet;
      exports.createHmacDrbg = createHmacDrbg2;
      exports.validateObject = validateObject2;
      exports.memoized = memoized2;
      var _0n9 = /* @__PURE__ */ BigInt(0);
      var _1n9 = /* @__PURE__ */ BigInt(1);
      function isBytes5(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function abytes4(item) {
        if (!isBytes5(item))
          throw new Error("Uint8Array expected");
      }
      function abool2(title, value) {
        if (typeof value !== "boolean")
          throw new Error(title + " boolean expected, got " + value);
      }
      function numberToHexUnpadded2(num) {
        const hex = num.toString(16);
        return hex.length & 1 ? "0" + hex : hex;
      }
      function hexToNumber2(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        return hex === "" ? _0n9 : BigInt("0x" + hex);
      }
      var hasHexBuiltin3 = (
        // @ts-ignore
        typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
      );
      var hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex3(bytes) {
        abytes4(bytes);
        if (hasHexBuiltin3)
          return bytes.toHex();
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes2[bytes[i]];
        }
        return hex;
      }
      var asciis2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function asciiToBase162(ch) {
        if (ch >= asciis2._0 && ch <= asciis2._9)
          return ch - asciis2._0;
        if (ch >= asciis2.A && ch <= asciis2.F)
          return ch - (asciis2.A - 10);
        if (ch >= asciis2.a && ch <= asciis2.f)
          return ch - (asciis2.a - 10);
        return;
      }
      function hexToBytes3(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        if (hasHexBuiltin3)
          return Uint8Array.fromHex(hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error("hex string expected, got unpadded hex of length " + hl);
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase162(hex.charCodeAt(hi));
          const n2 = asciiToBase162(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      function bytesToNumberBE2(bytes) {
        return hexToNumber2(bytesToHex3(bytes));
      }
      function bytesToNumberLE2(bytes) {
        abytes4(bytes);
        return hexToNumber2(bytesToHex3(Uint8Array.from(bytes).reverse()));
      }
      function numberToBytesBE2(n, len) {
        return hexToBytes3(n.toString(16).padStart(len * 2, "0"));
      }
      function numberToBytesLE2(n, len) {
        return numberToBytesBE2(n, len).reverse();
      }
      function numberToVarBytesBE(n) {
        return hexToBytes3(numberToHexUnpadded2(n));
      }
      function ensureBytes2(title, hex, expectedLength) {
        let res;
        if (typeof hex === "string") {
          try {
            res = hexToBytes3(hex);
          } catch (e) {
            throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
          }
        } else if (isBytes5(hex)) {
          res = Uint8Array.from(hex);
        } else {
          throw new Error(title + " must be hex string or Uint8Array");
        }
        const len = res.length;
        if (typeof expectedLength === "number" && len !== expectedLength)
          throw new Error(title + " of length " + expectedLength + " expected, got " + len);
        return res;
      }
      function concatBytes3(...arrays) {
        let sum = 0;
        for (let i = 0; i < arrays.length; i++) {
          const a = arrays[i];
          abytes4(a);
          sum += a.length;
        }
        const res = new Uint8Array(sum);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const a = arrays[i];
          res.set(a, pad);
          pad += a.length;
        }
        return res;
      }
      function equalBytes(a, b) {
        if (a.length !== b.length)
          return false;
        let diff = 0;
        for (let i = 0; i < a.length; i++)
          diff |= a[i] ^ b[i];
        return diff === 0;
      }
      function utf8ToBytes3(str) {
        if (typeof str !== "string")
          throw new Error("string expected");
        return new Uint8Array(new TextEncoder().encode(str));
      }
      var isPosBig2 = (n) => typeof n === "bigint" && _0n9 <= n;
      function inRange2(n, min, max) {
        return isPosBig2(n) && isPosBig2(min) && isPosBig2(max) && min <= n && n < max;
      }
      function aInRange2(title, n, min, max) {
        if (!inRange2(n, min, max))
          throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
      }
      function bitLen2(n) {
        let len;
        for (len = 0; n > _0n9; n >>= _1n9, len += 1)
          ;
        return len;
      }
      function bitGet(n, pos) {
        return n >> BigInt(pos) & _1n9;
      }
      function bitSet(n, pos, value) {
        return n | (value ? _1n9 : _0n9) << BigInt(pos);
      }
      var bitMask2 = (n) => (_1n9 << BigInt(n)) - _1n9;
      exports.bitMask = bitMask2;
      var u8n2 = (len) => new Uint8Array(len);
      var u8fr2 = (arr) => Uint8Array.from(arr);
      function createHmacDrbg2(hashLen, qByteLen, hmacFn) {
        if (typeof hashLen !== "number" || hashLen < 2)
          throw new Error("hashLen must be a number");
        if (typeof qByteLen !== "number" || qByteLen < 2)
          throw new Error("qByteLen must be a number");
        if (typeof hmacFn !== "function")
          throw new Error("hmacFn must be a function");
        let v = u8n2(hashLen);
        let k = u8n2(hashLen);
        let i = 0;
        const reset = () => {
          v.fill(1);
          k.fill(0);
          i = 0;
        };
        const h = (...b) => hmacFn(k, v, ...b);
        const reseed = (seed = u8n2(0)) => {
          k = h(u8fr2([0]), seed);
          v = h();
          if (seed.length === 0)
            return;
          k = h(u8fr2([1]), seed);
          v = h();
        };
        const gen2 = () => {
          if (i++ >= 1e3)
            throw new Error("drbg: tried 1000 values");
          let len = 0;
          const out = [];
          while (len < qByteLen) {
            v = h();
            const sl = v.slice();
            out.push(sl);
            len += v.length;
          }
          return concatBytes3(...out);
        };
        const genUntil = (seed, pred) => {
          reset();
          reseed(seed);
          let res = void 0;
          while (!(res = pred(gen2())))
            reseed();
          reset();
          return res;
        };
        return genUntil;
      }
      var validatorFns2 = {
        bigint: (val) => typeof val === "bigint",
        function: (val) => typeof val === "function",
        boolean: (val) => typeof val === "boolean",
        string: (val) => typeof val === "string",
        stringOrUint8Array: (val) => typeof val === "string" || isBytes5(val),
        isSafeInteger: (val) => Number.isSafeInteger(val),
        array: (val) => Array.isArray(val),
        field: (val, object) => object.Fp.isValid(val),
        hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
      };
      function validateObject2(object, validators, optValidators = {}) {
        const checkField = (fieldName, type, isOptional) => {
          const checkVal = validatorFns2[type];
          if (typeof checkVal !== "function")
            throw new Error("invalid validator function");
          const val = object[fieldName];
          if (isOptional && val === void 0)
            return;
          if (!checkVal(val, object)) {
            throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
          }
        };
        for (const [fieldName, type] of Object.entries(validators))
          checkField(fieldName, type, false);
        for (const [fieldName, type] of Object.entries(optValidators))
          checkField(fieldName, type, true);
        return object;
      }
      var notImplemented = () => {
        throw new Error("not implemented");
      };
      exports.notImplemented = notImplemented;
      function memoized2(fn) {
        const map = /* @__PURE__ */ new WeakMap();
        return (arg, ...args) => {
          const val = map.get(arg);
          if (val !== void 0)
            return val;
          const computed = fn(arg, ...args);
          map.set(arg, computed);
          return computed;
        };
      }
    }
  });

  // node_modules/@noble/curves/abstract/modular.js
  var require_modular = __commonJS({
    "node_modules/@noble/curves/abstract/modular.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isNegativeLE = void 0;
      exports.mod = mod2;
      exports.pow = pow3;
      exports.pow2 = pow22;
      exports.invert = invert2;
      exports.tonelliShanks = tonelliShanks2;
      exports.FpSqrt = FpSqrt2;
      exports.validateField = validateField2;
      exports.FpPow = FpPow2;
      exports.FpInvertBatch = FpInvertBatch2;
      exports.FpDiv = FpDiv;
      exports.FpLegendre = FpLegendre;
      exports.FpIsSquare = FpIsSquare;
      exports.nLength = nLength2;
      exports.Field = Field2;
      exports.FpSqrtOdd = FpSqrtOdd;
      exports.FpSqrtEven = FpSqrtEven2;
      exports.hashToPrivateScalar = hashToPrivateScalar;
      exports.getFieldBytesLength = getFieldBytesLength2;
      exports.getMinHashLength = getMinHashLength2;
      exports.mapHashToField = mapHashToField2;
      var utils_ts_1 = require_utils3();
      var _0n9 = BigInt(0);
      var _1n9 = BigInt(1);
      var _2n7 = /* @__PURE__ */ BigInt(2);
      var _3n4 = /* @__PURE__ */ BigInt(3);
      var _4n3 = /* @__PURE__ */ BigInt(4);
      var _5n3 = /* @__PURE__ */ BigInt(5);
      var _8n4 = /* @__PURE__ */ BigInt(8);
      var _9n2 = /* @__PURE__ */ BigInt(9);
      var _16n2 = /* @__PURE__ */ BigInt(16);
      function mod2(a, b) {
        const result = a % b;
        return result >= _0n9 ? result : b + result;
      }
      function pow3(num, power, modulo) {
        if (power < _0n9)
          throw new Error("invalid exponent, negatives unsupported");
        if (modulo <= _0n9)
          throw new Error("invalid modulus");
        if (modulo === _1n9)
          return _0n9;
        let res = _1n9;
        while (power > _0n9) {
          if (power & _1n9)
            res = res * num % modulo;
          num = num * num % modulo;
          power >>= _1n9;
        }
        return res;
      }
      function pow22(x, power, modulo) {
        let res = x;
        while (power-- > _0n9) {
          res *= res;
          res %= modulo;
        }
        return res;
      }
      function invert2(number, modulo) {
        if (number === _0n9)
          throw new Error("invert: expected non-zero number");
        if (modulo <= _0n9)
          throw new Error("invert: expected positive modulus, got " + modulo);
        let a = mod2(number, modulo);
        let b = modulo;
        let x = _0n9, y = _1n9, u = _1n9, v = _0n9;
        while (a !== _0n9) {
          const q = b / a;
          const r = b % a;
          const m = x - u * q;
          const n = y - v * q;
          b = a, a = r, x = u, y = v, u = m, v = n;
        }
        const gcd2 = b;
        if (gcd2 !== _1n9)
          throw new Error("invert: does not exist");
        return mod2(x, modulo);
      }
      function tonelliShanks2(P) {
        const legendreC = (P - _1n9) / _2n7;
        let Q, S, Z;
        for (Q = P - _1n9, S = 0; Q % _2n7 === _0n9; Q /= _2n7, S++)
          ;
        for (Z = _2n7; Z < P && pow3(Z, legendreC, P) !== P - _1n9; Z++) {
          if (Z > 1e3)
            throw new Error("Cannot find square root: likely non-prime P");
        }
        if (S === 1) {
          const p1div4 = (P + _1n9) / _4n3;
          return function tonelliFast(Fp2, n) {
            const root = Fp2.pow(n, p1div4);
            if (!Fp2.eql(Fp2.sqr(root), n))
              throw new Error("Cannot find square root");
            return root;
          };
        }
        const Q1div2 = (Q + _1n9) / _2n7;
        return function tonelliSlow(Fp2, n) {
          if (Fp2.pow(n, legendreC) === Fp2.neg(Fp2.ONE))
            throw new Error("Cannot find square root");
          let r = S;
          let g = Fp2.pow(Fp2.mul(Fp2.ONE, Z), Q);
          let x = Fp2.pow(n, Q1div2);
          let b = Fp2.pow(n, Q);
          while (!Fp2.eql(b, Fp2.ONE)) {
            if (Fp2.eql(b, Fp2.ZERO))
              return Fp2.ZERO;
            let m = 1;
            for (let t2 = Fp2.sqr(b); m < r; m++) {
              if (Fp2.eql(t2, Fp2.ONE))
                break;
              t2 = Fp2.sqr(t2);
            }
            const ge = Fp2.pow(g, _1n9 << BigInt(r - m - 1));
            g = Fp2.sqr(ge);
            x = Fp2.mul(x, ge);
            b = Fp2.mul(b, g);
            r = m;
          }
          return x;
        };
      }
      function FpSqrt2(P) {
        if (P % _4n3 === _3n4) {
          const p1div4 = (P + _1n9) / _4n3;
          return function sqrt3mod4(Fp2, n) {
            const root = Fp2.pow(n, p1div4);
            if (!Fp2.eql(Fp2.sqr(root), n))
              throw new Error("Cannot find square root");
            return root;
          };
        }
        if (P % _8n4 === _5n3) {
          const c1 = (P - _5n3) / _8n4;
          return function sqrt5mod8(Fp2, n) {
            const n2 = Fp2.mul(n, _2n7);
            const v = Fp2.pow(n2, c1);
            const nv = Fp2.mul(n, v);
            const i = Fp2.mul(Fp2.mul(nv, _2n7), v);
            const root = Fp2.mul(nv, Fp2.sub(i, Fp2.ONE));
            if (!Fp2.eql(Fp2.sqr(root), n))
              throw new Error("Cannot find square root");
            return root;
          };
        }
        if (P % _16n2 === _9n2) {
        }
        return tonelliShanks2(P);
      }
      var isNegativeLE2 = (num, modulo) => (mod2(num, modulo) & _1n9) === _1n9;
      exports.isNegativeLE = isNegativeLE2;
      var FIELD_FIELDS2 = [
        "create",
        "isValid",
        "is0",
        "neg",
        "inv",
        "sqrt",
        "sqr",
        "eql",
        "add",
        "sub",
        "mul",
        "pow",
        "div",
        "addN",
        "subN",
        "mulN",
        "sqrN"
      ];
      function validateField2(field) {
        const initial = {
          ORDER: "bigint",
          MASK: "bigint",
          BYTES: "isSafeInteger",
          BITS: "isSafeInteger"
        };
        const opts = FIELD_FIELDS2.reduce((map, val) => {
          map[val] = "function";
          return map;
        }, initial);
        return (0, utils_ts_1.validateObject)(field, opts);
      }
      function FpPow2(f, num, power) {
        if (power < _0n9)
          throw new Error("invalid exponent, negatives unsupported");
        if (power === _0n9)
          return f.ONE;
        if (power === _1n9)
          return num;
        let p = f.ONE;
        let d = num;
        while (power > _0n9) {
          if (power & _1n9)
            p = f.mul(p, d);
          d = f.sqr(d);
          power >>= _1n9;
        }
        return p;
      }
      function FpInvertBatch2(f, nums) {
        const tmp = new Array(nums.length);
        const lastMultiplied = nums.reduce((acc, num, i) => {
          if (f.is0(num))
            return acc;
          tmp[i] = acc;
          return f.mul(acc, num);
        }, f.ONE);
        const inverted = f.inv(lastMultiplied);
        nums.reduceRight((acc, num, i) => {
          if (f.is0(num))
            return acc;
          tmp[i] = f.mul(acc, tmp[i]);
          return f.mul(acc, num);
        }, inverted);
        return tmp;
      }
      function FpDiv(f, lhs, rhs) {
        return f.mul(lhs, typeof rhs === "bigint" ? invert2(rhs, f.ORDER) : f.inv(rhs));
      }
      function FpLegendre(order) {
        const legendreConst = (order - _1n9) / _2n7;
        return (f, x) => f.pow(x, legendreConst);
      }
      function FpIsSquare(f) {
        const legendre = FpLegendre(f.ORDER);
        return (x) => {
          const p = legendre(f, x);
          return f.eql(p, f.ZERO) || f.eql(p, f.ONE);
        };
      }
      function nLength2(n, nBitLength) {
        const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
        const nByteLength = Math.ceil(_nBitLength / 8);
        return { nBitLength: _nBitLength, nByteLength };
      }
      function Field2(ORDER, bitLen2, isLE2 = false, redef = {}) {
        if (ORDER <= _0n9)
          throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
        const { nBitLength: BITS, nByteLength: BYTES } = nLength2(ORDER, bitLen2);
        if (BYTES > 2048)
          throw new Error("invalid field: expected ORDER of <= 2048 bytes");
        let sqrtP;
        const f = Object.freeze({
          ORDER,
          isLE: isLE2,
          BITS,
          BYTES,
          MASK: (0, utils_ts_1.bitMask)(BITS),
          ZERO: _0n9,
          ONE: _1n9,
          create: (num) => mod2(num, ORDER),
          isValid: (num) => {
            if (typeof num !== "bigint")
              throw new Error("invalid field element: expected bigint, got " + typeof num);
            return _0n9 <= num && num < ORDER;
          },
          is0: (num) => num === _0n9,
          isOdd: (num) => (num & _1n9) === _1n9,
          neg: (num) => mod2(-num, ORDER),
          eql: (lhs, rhs) => lhs === rhs,
          sqr: (num) => mod2(num * num, ORDER),
          add: (lhs, rhs) => mod2(lhs + rhs, ORDER),
          sub: (lhs, rhs) => mod2(lhs - rhs, ORDER),
          mul: (lhs, rhs) => mod2(lhs * rhs, ORDER),
          pow: (num, power) => FpPow2(f, num, power),
          div: (lhs, rhs) => mod2(lhs * invert2(rhs, ORDER), ORDER),
          // Same as above, but doesn't normalize
          sqrN: (num) => num * num,
          addN: (lhs, rhs) => lhs + rhs,
          subN: (lhs, rhs) => lhs - rhs,
          mulN: (lhs, rhs) => lhs * rhs,
          inv: (num) => invert2(num, ORDER),
          sqrt: redef.sqrt || ((n) => {
            if (!sqrtP)
              sqrtP = FpSqrt2(ORDER);
            return sqrtP(f, n);
          }),
          invertBatch: (lst) => FpInvertBatch2(f, lst),
          // TODO: do we really need constant cmov?
          // We don't have const-time bigints anyway, so probably will be not very useful
          cmov: (a, b, c) => c ? b : a,
          toBytes: (num) => isLE2 ? (0, utils_ts_1.numberToBytesLE)(num, BYTES) : (0, utils_ts_1.numberToBytesBE)(num, BYTES),
          fromBytes: (bytes) => {
            if (bytes.length !== BYTES)
              throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
            return isLE2 ? (0, utils_ts_1.bytesToNumberLE)(bytes) : (0, utils_ts_1.bytesToNumberBE)(bytes);
          }
        });
        return Object.freeze(f);
      }
      function FpSqrtOdd(Fp2, elm) {
        if (!Fp2.isOdd)
          throw new Error("Field doesn't have isOdd");
        const root = Fp2.sqrt(elm);
        return Fp2.isOdd(root) ? root : Fp2.neg(root);
      }
      function FpSqrtEven2(Fp2, elm) {
        if (!Fp2.isOdd)
          throw new Error("Field doesn't have isOdd");
        const root = Fp2.sqrt(elm);
        return Fp2.isOdd(root) ? Fp2.neg(root) : root;
      }
      function hashToPrivateScalar(hash, groupOrder, isLE2 = false) {
        hash = (0, utils_ts_1.ensureBytes)("privateHash", hash);
        const hashLen = hash.length;
        const minLen = nLength2(groupOrder).nByteLength + 8;
        if (minLen < 24 || hashLen < minLen || hashLen > 1024)
          throw new Error("hashToPrivateScalar: expected " + minLen + "-1024 bytes of input, got " + hashLen);
        const num = isLE2 ? (0, utils_ts_1.bytesToNumberLE)(hash) : (0, utils_ts_1.bytesToNumberBE)(hash);
        return mod2(num, groupOrder - _1n9) + _1n9;
      }
      function getFieldBytesLength2(fieldOrder) {
        if (typeof fieldOrder !== "bigint")
          throw new Error("field order must be bigint");
        const bitLength = fieldOrder.toString(2).length;
        return Math.ceil(bitLength / 8);
      }
      function getMinHashLength2(fieldOrder) {
        const length2 = getFieldBytesLength2(fieldOrder);
        return length2 + Math.ceil(length2 / 2);
      }
      function mapHashToField2(key, fieldOrder, isLE2 = false) {
        const len = key.length;
        const fieldLen = getFieldBytesLength2(fieldOrder);
        const minLen = getMinHashLength2(fieldOrder);
        if (len < 16 || len < minLen || len > 1024)
          throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
        const num = isLE2 ? (0, utils_ts_1.bytesToNumberLE)(key) : (0, utils_ts_1.bytesToNumberBE)(key);
        const reduced = mod2(num, fieldOrder - _1n9) + _1n9;
        return isLE2 ? (0, utils_ts_1.numberToBytesLE)(reduced, fieldLen) : (0, utils_ts_1.numberToBytesBE)(reduced, fieldLen);
      }
    }
  });

  // node_modules/@noble/curves/abstract/curve.js
  var require_curve = __commonJS({
    "node_modules/@noble/curves/abstract/curve.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wNAF = wNAF2;
      exports.pippenger = pippenger2;
      exports.precomputeMSMUnsafe = precomputeMSMUnsafe;
      exports.validateBasic = validateBasic2;
      var modular_ts_1 = require_modular();
      var utils_ts_1 = require_utils3();
      var _0n9 = BigInt(0);
      var _1n9 = BigInt(1);
      function constTimeNegate2(condition, item) {
        const neg = item.negate();
        return condition ? neg : item;
      }
      function validateW2(W, bits) {
        if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
          throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
      }
      function calcWOpts2(W, scalarBits) {
        validateW2(W, scalarBits);
        const windows = Math.ceil(scalarBits / W) + 1;
        const windowSize = 2 ** (W - 1);
        const maxNumber = 2 ** W;
        const mask = (0, utils_ts_1.bitMask)(W);
        const shiftBy = BigInt(W);
        return { windows, windowSize, mask, maxNumber, shiftBy };
      }
      function calcOffsets2(n, window2, wOpts) {
        const { windowSize, mask, maxNumber, shiftBy } = wOpts;
        let wbits = Number(n & mask);
        let nextN = n >> shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          nextN += _1n9;
        }
        const offsetStart = window2 * windowSize;
        const offset = offsetStart + Math.abs(wbits) - 1;
        const isZero = wbits === 0;
        const isNeg = wbits < 0;
        const isNegF = window2 % 2 !== 0;
        const offsetF = offsetStart;
        return { nextN, offset, isZero, isNeg, isNegF, offsetF };
      }
      function validateMSMPoints2(points, c) {
        if (!Array.isArray(points))
          throw new Error("array expected");
        points.forEach((p, i) => {
          if (!(p instanceof c))
            throw new Error("invalid point at index " + i);
        });
      }
      function validateMSMScalars2(scalars, field) {
        if (!Array.isArray(scalars))
          throw new Error("array of scalars expected");
        scalars.forEach((s, i) => {
          if (!field.isValid(s))
            throw new Error("invalid scalar at index " + i);
        });
      }
      var pointPrecomputes2 = /* @__PURE__ */ new WeakMap();
      var pointWindowSizes2 = /* @__PURE__ */ new WeakMap();
      function getW2(P) {
        return pointWindowSizes2.get(P) || 1;
      }
      function wNAF2(c, bits) {
        return {
          constTimeNegate: constTimeNegate2,
          hasPrecomputes(elm) {
            return getW2(elm) !== 1;
          },
          // non-const time multiplication ladder
          unsafeLadder(elm, n, p = c.ZERO) {
            let d = elm;
            while (n > _0n9) {
              if (n & _1n9)
                p = p.add(d);
              d = d.double();
              n >>= _1n9;
            }
            return p;
          },
          /**
           * Creates a wNAF precomputation window. Used for caching.
           * Default window size is set by `utils.precompute()` and is equal to 8.
           * Number of precomputed points depends on the curve size:
           * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
           * - 𝑊 is the window size
           * - 𝑛 is the bitlength of the curve order.
           * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
           * @param elm Point instance
           * @param W window size
           * @returns precomputed point tables flattened to a single array
           */
          precomputeWindow(elm, W) {
            const { windows, windowSize } = calcWOpts2(W, bits);
            const points = [];
            let p = elm;
            let base3 = p;
            for (let window2 = 0; window2 < windows; window2++) {
              base3 = p;
              points.push(base3);
              for (let i = 1; i < windowSize; i++) {
                base3 = base3.add(p);
                points.push(base3);
              }
              p = base3.double();
            }
            return points;
          },
          /**
           * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
           * @param W window size
           * @param precomputes precomputed tables
           * @param n scalar (we don't check here, but should be less than curve order)
           * @returns real and fake (for const-time) points
           */
          wNAF(W, precomputes, n) {
            let p = c.ZERO;
            let f = c.BASE;
            const wo = calcWOpts2(W, bits);
            for (let window2 = 0; window2 < wo.windows; window2++) {
              const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets2(n, window2, wo);
              n = nextN;
              if (isZero) {
                f = f.add(constTimeNegate2(isNegF, precomputes[offsetF]));
              } else {
                p = p.add(constTimeNegate2(isNeg, precomputes[offset]));
              }
            }
            return { p, f };
          },
          /**
           * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
           * @param W window size
           * @param precomputes precomputed tables
           * @param n scalar (we don't check here, but should be less than curve order)
           * @param acc accumulator point to add result of multiplication
           * @returns point
           */
          wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
            const wo = calcWOpts2(W, bits);
            for (let window2 = 0; window2 < wo.windows; window2++) {
              if (n === _0n9)
                break;
              const { nextN, offset, isZero, isNeg } = calcOffsets2(n, window2, wo);
              n = nextN;
              if (isZero) {
                continue;
              } else {
                const item = precomputes[offset];
                acc = acc.add(isNeg ? item.negate() : item);
              }
            }
            return acc;
          },
          getPrecomputes(W, P, transform) {
            let comp = pointPrecomputes2.get(P);
            if (!comp) {
              comp = this.precomputeWindow(P, W);
              if (W !== 1)
                pointPrecomputes2.set(P, transform(comp));
            }
            return comp;
          },
          wNAFCached(P, n, transform) {
            const W = getW2(P);
            return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
          },
          wNAFCachedUnsafe(P, n, transform, prev) {
            const W = getW2(P);
            if (W === 1)
              return this.unsafeLadder(P, n, prev);
            return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
          },
          // We calculate precomputes for elliptic curve point multiplication
          // using windowed method. This specifies window size and
          // stores precomputed values. Usually only base point would be precomputed.
          setWindowSize(P, W) {
            validateW2(W, bits);
            pointWindowSizes2.set(P, W);
            pointPrecomputes2.delete(P);
          }
        };
      }
      function pippenger2(c, fieldN, points, scalars) {
        validateMSMPoints2(points, c);
        validateMSMScalars2(scalars, fieldN);
        if (points.length !== scalars.length)
          throw new Error("arrays of points and scalars must have equal length");
        const zero = c.ZERO;
        const wbits = (0, utils_ts_1.bitLen)(BigInt(points.length));
        const windowSize = wbits > 12 ? wbits - 3 : wbits > 4 ? wbits - 2 : wbits ? 2 : 1;
        const MASK = (0, utils_ts_1.bitMask)(windowSize);
        const buckets = new Array(Number(MASK) + 1).fill(zero);
        const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
        let sum = zero;
        for (let i = lastBits; i >= 0; i -= windowSize) {
          buckets.fill(zero);
          for (let j = 0; j < scalars.length; j++) {
            const scalar = scalars[j];
            const wbits2 = Number(scalar >> BigInt(i) & MASK);
            buckets[wbits2] = buckets[wbits2].add(points[j]);
          }
          let resI = zero;
          for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
            sumI = sumI.add(buckets[j]);
            resI = resI.add(sumI);
          }
          sum = sum.add(resI);
          if (i !== 0)
            for (let j = 0; j < windowSize; j++)
              sum = sum.double();
        }
        return sum;
      }
      function precomputeMSMUnsafe(c, fieldN, points, windowSize) {
        validateW2(windowSize, fieldN.BITS);
        validateMSMPoints2(points, c);
        const zero = c.ZERO;
        const tableSize = 2 ** windowSize - 1;
        const chunks = Math.ceil(fieldN.BITS / windowSize);
        const MASK = (0, utils_ts_1.bitMask)(windowSize);
        const tables = points.map((p) => {
          const res = [];
          for (let i = 0, acc = p; i < tableSize; i++) {
            res.push(acc);
            acc = acc.add(p);
          }
          return res;
        });
        return (scalars) => {
          validateMSMScalars2(scalars, fieldN);
          if (scalars.length > points.length)
            throw new Error("array of scalars must be smaller than array of points");
          let res = zero;
          for (let i = 0; i < chunks; i++) {
            if (res !== zero)
              for (let j = 0; j < windowSize; j++)
                res = res.double();
            const shiftBy = BigInt(chunks * windowSize - (i + 1) * windowSize);
            for (let j = 0; j < scalars.length; j++) {
              const n = scalars[j];
              const curr = Number(n >> shiftBy & MASK);
              if (!curr)
                continue;
              res = res.add(tables[j][curr - 1]);
            }
          }
          return res;
        };
      }
      function validateBasic2(curve) {
        (0, modular_ts_1.validateField)(curve.Fp);
        (0, utils_ts_1.validateObject)(curve, {
          n: "bigint",
          h: "bigint",
          Gx: "field",
          Gy: "field"
        }, {
          nBitLength: "isSafeInteger",
          nByteLength: "isSafeInteger"
        });
        return Object.freeze({
          ...(0, modular_ts_1.nLength)(curve.n, curve.nBitLength),
          ...curve,
          ...{ p: curve.Fp.ORDER }
        });
      }
    }
  });

  // node_modules/@noble/curves/abstract/edwards.js
  var require_edwards = __commonJS({
    "node_modules/@noble/curves/abstract/edwards.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.twistedEdwards = twistedEdwards2;
      var curve_ts_1 = require_curve();
      var modular_ts_1 = require_modular();
      var utils_ts_1 = require_utils3();
      var _0n9 = BigInt(0);
      var _1n9 = BigInt(1);
      var _2n7 = BigInt(2);
      var _8n4 = BigInt(8);
      var VERIFY_DEFAULT2 = { zip215: true };
      function validateOpts3(curve) {
        const opts = (0, curve_ts_1.validateBasic)(curve);
        (0, utils_ts_1.validateObject)(curve, {
          hash: "function",
          a: "bigint",
          d: "bigint",
          randomBytes: "function"
        }, {
          adjustScalarBytes: "function",
          domain: "function",
          uvRatio: "function",
          mapToCurve: "function"
        });
        return Object.freeze({ ...opts });
      }
      function twistedEdwards2(curveDef) {
        const CURVE = validateOpts3(curveDef);
        const { Fp: Fp2, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes2, nByteLength, h: cofactor } = CURVE;
        const MASK = _2n7 << BigInt(nByteLength * 8) - _1n9;
        const modP = Fp2.create;
        const Fn = (0, modular_ts_1.Field)(CURVE.n, CURVE.nBitLength);
        const uvRatio2 = CURVE.uvRatio || ((u, v) => {
          try {
            return { isValid: true, value: Fp2.sqrt(u * Fp2.inv(v)) };
          } catch (e) {
            return { isValid: false, value: _0n9 };
          }
        });
        const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes) => bytes);
        const domain = CURVE.domain || ((data, ctx, phflag) => {
          (0, utils_ts_1.abool)("phflag", phflag);
          if (ctx.length || phflag)
            throw new Error("Contexts/pre-hash are not supported");
          return data;
        });
        function aCoordinate(title, n, banZero = false) {
          const min = banZero ? _1n9 : _0n9;
          (0, utils_ts_1.aInRange)("coordinate " + title, n, min, MASK);
        }
        function aextpoint(other) {
          if (!(other instanceof Point2))
            throw new Error("ExtendedPoint expected");
        }
        const toAffineMemo = (0, utils_ts_1.memoized)((p, iz) => {
          const { ex: x, ey: y, ez: z } = p;
          const is0 = p.is0();
          if (iz == null)
            iz = is0 ? _8n4 : Fp2.inv(z);
          const ax = modP(x * iz);
          const ay = modP(y * iz);
          const zz = modP(z * iz);
          if (is0)
            return { x: _0n9, y: _1n9 };
          if (zz !== _1n9)
            throw new Error("invZ was invalid");
          return { x: ax, y: ay };
        });
        const assertValidMemo = (0, utils_ts_1.memoized)((p) => {
          const { a, d } = CURVE;
          if (p.is0())
            throw new Error("bad point: ZERO");
          const { ex: X, ey: Y, ez: Z, et: T } = p;
          const X2 = modP(X * X);
          const Y2 = modP(Y * Y);
          const Z2 = modP(Z * Z);
          const Z4 = modP(Z2 * Z2);
          const aX2 = modP(X2 * a);
          const left = modP(Z2 * modP(aX2 + Y2));
          const right = modP(Z4 + modP(d * modP(X2 * Y2)));
          if (left !== right)
            throw new Error("bad point: equation left != right (1)");
          const XY = modP(X * Y);
          const ZT = modP(Z * T);
          if (XY !== ZT)
            throw new Error("bad point: equation left != right (2)");
          return true;
        });
        class Point2 {
          constructor(ex, ey, ez, et) {
            aCoordinate("x", ex);
            aCoordinate("y", ey);
            aCoordinate("z", ez, true);
            aCoordinate("t", et);
            this.ex = ex;
            this.ey = ey;
            this.ez = ez;
            this.et = et;
            Object.freeze(this);
          }
          get x() {
            return this.toAffine().x;
          }
          get y() {
            return this.toAffine().y;
          }
          static fromAffine(p) {
            if (p instanceof Point2)
              throw new Error("extended point not allowed");
            const { x, y } = p || {};
            aCoordinate("x", x);
            aCoordinate("y", y);
            return new Point2(x, y, _1n9, modP(x * y));
          }
          static normalizeZ(points) {
            const toInv = Fp2.invertBatch(points.map((p) => p.ez));
            return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
          }
          // Multiscalar Multiplication
          static msm(points, scalars) {
            return (0, curve_ts_1.pippenger)(Point2, Fn, points, scalars);
          }
          // "Private method", don't use it directly
          _setWindowSize(windowSize) {
            wnaf.setWindowSize(this, windowSize);
          }
          // Not required for fromHex(), which always creates valid points.
          // Could be useful for fromAffine().
          assertValidity() {
            assertValidMemo(this);
          }
          // Compare one point to another.
          equals(other) {
            aextpoint(other);
            const { ex: X1, ey: Y1, ez: Z1 } = this;
            const { ex: X2, ey: Y2, ez: Z2 } = other;
            const X1Z2 = modP(X1 * Z2);
            const X2Z1 = modP(X2 * Z1);
            const Y1Z2 = modP(Y1 * Z2);
            const Y2Z1 = modP(Y2 * Z1);
            return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
          }
          is0() {
            return this.equals(Point2.ZERO);
          }
          negate() {
            return new Point2(modP(-this.ex), this.ey, this.ez, modP(-this.et));
          }
          // Fast algo for doubling Extended Point.
          // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
          // Cost: 4M + 4S + 1*a + 6add + 1*2.
          double() {
            const { a } = CURVE;
            const { ex: X1, ey: Y1, ez: Z1 } = this;
            const A = modP(X1 * X1);
            const B = modP(Y1 * Y1);
            const C = modP(_2n7 * modP(Z1 * Z1));
            const D = modP(a * A);
            const x1y1 = X1 + Y1;
            const E = modP(modP(x1y1 * x1y1) - A - B);
            const G2 = D + B;
            const F = G2 - C;
            const H = D - B;
            const X3 = modP(E * F);
            const Y3 = modP(G2 * H);
            const T3 = modP(E * H);
            const Z3 = modP(F * G2);
            return new Point2(X3, Y3, Z3, T3);
          }
          // Fast algo for adding 2 Extended Points.
          // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
          // Cost: 9M + 1*a + 1*d + 7add.
          add(other) {
            aextpoint(other);
            const { a, d } = CURVE;
            const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
            const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
            const A = modP(X1 * X2);
            const B = modP(Y1 * Y2);
            const C = modP(T1 * d * T2);
            const D = modP(Z1 * Z2);
            const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
            const F = D - C;
            const G2 = D + C;
            const H = modP(B - a * A);
            const X3 = modP(E * F);
            const Y3 = modP(G2 * H);
            const T3 = modP(E * H);
            const Z3 = modP(F * G2);
            return new Point2(X3, Y3, Z3, T3);
          }
          subtract(other) {
            return this.add(other.negate());
          }
          wNAF(n) {
            return wnaf.wNAFCached(this, n, Point2.normalizeZ);
          }
          // Constant-time multiplication.
          multiply(scalar) {
            const n = scalar;
            (0, utils_ts_1.aInRange)("scalar", n, _1n9, CURVE_ORDER);
            const { p, f } = this.wNAF(n);
            return Point2.normalizeZ([p, f])[0];
          }
          // Non-constant-time multiplication. Uses double-and-add algorithm.
          // It's faster, but should only be used when you don't care about
          // an exposed private key e.g. sig verification.
          // Does NOT allow scalars higher than CURVE.n.
          // Accepts optional accumulator to merge with multiply (important for sparse scalars)
          multiplyUnsafe(scalar, acc = Point2.ZERO) {
            const n = scalar;
            (0, utils_ts_1.aInRange)("scalar", n, _0n9, CURVE_ORDER);
            if (n === _0n9)
              return I;
            if (this.is0() || n === _1n9)
              return this;
            return wnaf.wNAFCachedUnsafe(this, n, Point2.normalizeZ, acc);
          }
          // Checks if point is of small order.
          // If you add something to small order point, you will have "dirty"
          // point with torsion component.
          // Multiplies point by cofactor and checks if the result is 0.
          isSmallOrder() {
            return this.multiplyUnsafe(cofactor).is0();
          }
          // Multiplies point by curve order and checks if the result is 0.
          // Returns `false` is the point is dirty.
          isTorsionFree() {
            return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
          }
          // Converts Extended point to default (x, y) coordinates.
          // Can accept precomputed Z^-1 - for example, from invertBatch.
          toAffine(iz) {
            return toAffineMemo(this, iz);
          }
          clearCofactor() {
            const { h: cofactor2 } = CURVE;
            if (cofactor2 === _1n9)
              return this;
            return this.multiplyUnsafe(cofactor2);
          }
          // Converts hash string or Uint8Array to Point.
          // Uses algo from RFC8032 5.1.3.
          static fromHex(hex, zip215 = false) {
            const { d, a } = CURVE;
            const len = Fp2.BYTES;
            hex = (0, utils_ts_1.ensureBytes)("pointHex", hex, len);
            (0, utils_ts_1.abool)("zip215", zip215);
            const normed = hex.slice();
            const lastByte = hex[len - 1];
            normed[len - 1] = lastByte & ~128;
            const y = (0, utils_ts_1.bytesToNumberLE)(normed);
            const max = zip215 ? MASK : Fp2.ORDER;
            (0, utils_ts_1.aInRange)("pointHex.y", y, _0n9, max);
            const y2 = modP(y * y);
            const u = modP(y2 - _1n9);
            const v = modP(d * y2 - a);
            let { isValid, value: x } = uvRatio2(u, v);
            if (!isValid)
              throw new Error("Point.fromHex: invalid y coordinate");
            const isXOdd = (x & _1n9) === _1n9;
            const isLastByteOdd = (lastByte & 128) !== 0;
            if (!zip215 && x === _0n9 && isLastByteOdd)
              throw new Error("Point.fromHex: x=0 and x_0=1");
            if (isLastByteOdd !== isXOdd)
              x = modP(-x);
            return Point2.fromAffine({ x, y });
          }
          static fromPrivateKey(privKey) {
            const { scalar } = getPrivateScalar(privKey);
            return G.multiply(scalar);
          }
          toRawBytes() {
            const { x, y } = this.toAffine();
            const bytes = (0, utils_ts_1.numberToBytesLE)(y, Fp2.BYTES);
            bytes[bytes.length - 1] |= x & _1n9 ? 128 : 0;
            return bytes;
          }
          toHex() {
            return (0, utils_ts_1.bytesToHex)(this.toRawBytes());
          }
        }
        Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, _1n9, modP(CURVE.Gx * CURVE.Gy));
        Point2.ZERO = new Point2(_0n9, _1n9, _1n9, _0n9);
        const { BASE: G, ZERO: I } = Point2;
        const wnaf = (0, curve_ts_1.wNAF)(Point2, nByteLength * 8);
        function modN(a) {
          return (0, modular_ts_1.mod)(a, CURVE_ORDER);
        }
        function modN_LE(hash) {
          return modN((0, utils_ts_1.bytesToNumberLE)(hash));
        }
        function getPrivateScalar(key) {
          const len = Fp2.BYTES;
          key = (0, utils_ts_1.ensureBytes)("private key", key, len);
          const hashed = (0, utils_ts_1.ensureBytes)("hashed private key", cHash(key), 2 * len);
          const head = adjustScalarBytes2(hashed.slice(0, len));
          const prefix = hashed.slice(len, 2 * len);
          const scalar = modN_LE(head);
          return { head, prefix, scalar };
        }
        function getExtendedPublicKey(key) {
          const { head, prefix, scalar } = getPrivateScalar(key);
          const point = G.multiply(scalar);
          const pointBytes = point.toRawBytes();
          return { head, prefix, scalar, point, pointBytes };
        }
        function getPublicKey(privKey) {
          return getExtendedPublicKey(privKey).pointBytes;
        }
        function hashDomainToScalar(context = new Uint8Array(), ...msgs) {
          const msg = (0, utils_ts_1.concatBytes)(...msgs);
          return modN_LE(cHash(domain(msg, (0, utils_ts_1.ensureBytes)("context", context), !!prehash)));
        }
        function sign(msg, privKey, options = {}) {
          msg = (0, utils_ts_1.ensureBytes)("message", msg);
          if (prehash)
            msg = prehash(msg);
          const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
          const r = hashDomainToScalar(options.context, prefix, msg);
          const R = G.multiply(r).toRawBytes();
          const k = hashDomainToScalar(options.context, R, pointBytes, msg);
          const s = modN(r + k * scalar);
          (0, utils_ts_1.aInRange)("signature.s", s, _0n9, CURVE_ORDER);
          const res = (0, utils_ts_1.concatBytes)(R, (0, utils_ts_1.numberToBytesLE)(s, Fp2.BYTES));
          return (0, utils_ts_1.ensureBytes)("result", res, Fp2.BYTES * 2);
        }
        const verifyOpts = VERIFY_DEFAULT2;
        function verify(sig, msg, publicKey, options = verifyOpts) {
          const { context, zip215 } = options;
          const len = Fp2.BYTES;
          sig = (0, utils_ts_1.ensureBytes)("signature", sig, 2 * len);
          msg = (0, utils_ts_1.ensureBytes)("message", msg);
          publicKey = (0, utils_ts_1.ensureBytes)("publicKey", publicKey, len);
          if (zip215 !== void 0)
            (0, utils_ts_1.abool)("zip215", zip215);
          if (prehash)
            msg = prehash(msg);
          const s = (0, utils_ts_1.bytesToNumberLE)(sig.slice(len, 2 * len));
          let A, R, SB;
          try {
            A = Point2.fromHex(publicKey, zip215);
            R = Point2.fromHex(sig.slice(0, len), zip215);
            SB = G.multiplyUnsafe(s);
          } catch (error) {
            return false;
          }
          if (!zip215 && A.isSmallOrder())
            return false;
          const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
          const RkA = R.add(A.multiplyUnsafe(k));
          return RkA.subtract(SB).clearCofactor().equals(Point2.ZERO);
        }
        G._setWindowSize(8);
        const utils = {
          getExtendedPublicKey,
          /** ed25519 priv keys are uniform 32b. No need to check for modulo bias, like in secp256k1. */
          randomPrivateKey: () => randomBytes2(Fp2.BYTES),
          /**
           * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
           * values. This slows down first getPublicKey() by milliseconds (see Speed section),
           * but allows to speed-up subsequent getPublicKey() calls up to 20x.
           * @param windowSize 2, 4, 8, 16
           */
          precompute(windowSize = 8, point = Point2.BASE) {
            point._setWindowSize(windowSize);
            point.multiply(BigInt(3));
            return point;
          }
        };
        return {
          CURVE,
          getPublicKey,
          sign,
          verify,
          ExtendedPoint: Point2,
          utils
        };
      }
    }
  });

  // node_modules/@noble/curves/abstract/hash-to-curve.js
  var require_hash_to_curve = __commonJS({
    "node_modules/@noble/curves/abstract/hash-to-curve.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.expand_message_xmd = expand_message_xmd;
      exports.expand_message_xof = expand_message_xof;
      exports.hash_to_field = hash_to_field;
      exports.isogenyMap = isogenyMap;
      exports.createHasher = createHasher2;
      var modular_ts_1 = require_modular();
      var utils_ts_1 = require_utils3();
      var os2ip = utils_ts_1.bytesToNumberBE;
      function i2osp(value, length2) {
        anum(value);
        anum(length2);
        if (value < 0 || value >= 1 << 8 * length2)
          throw new Error("invalid I2OSP input: " + value);
        const res = Array.from({ length: length2 }).fill(0);
        for (let i = length2 - 1; i >= 0; i--) {
          res[i] = value & 255;
          value >>>= 8;
        }
        return new Uint8Array(res);
      }
      function strxor(a, b) {
        const arr = new Uint8Array(a.length);
        for (let i = 0; i < a.length; i++) {
          arr[i] = a[i] ^ b[i];
        }
        return arr;
      }
      function anum(item) {
        if (!Number.isSafeInteger(item))
          throw new Error("number expected");
      }
      function expand_message_xmd(msg, DST, lenInBytes, H) {
        (0, utils_ts_1.abytes)(msg);
        (0, utils_ts_1.abytes)(DST);
        anum(lenInBytes);
        if (DST.length > 255)
          DST = H((0, utils_ts_1.concatBytes)((0, utils_ts_1.utf8ToBytes)("H2C-OVERSIZE-DST-"), DST));
        const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
        const ell = Math.ceil(lenInBytes / b_in_bytes);
        if (lenInBytes > 65535 || ell > 255)
          throw new Error("expand_message_xmd: invalid lenInBytes");
        const DST_prime = (0, utils_ts_1.concatBytes)(DST, i2osp(DST.length, 1));
        const Z_pad = i2osp(0, r_in_bytes);
        const l_i_b_str = i2osp(lenInBytes, 2);
        const b = new Array(ell);
        const b_0 = H((0, utils_ts_1.concatBytes)(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
        b[0] = H((0, utils_ts_1.concatBytes)(b_0, i2osp(1, 1), DST_prime));
        for (let i = 1; i <= ell; i++) {
          const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
          b[i] = H((0, utils_ts_1.concatBytes)(...args));
        }
        const pseudo_random_bytes = (0, utils_ts_1.concatBytes)(...b);
        return pseudo_random_bytes.slice(0, lenInBytes);
      }
      function expand_message_xof(msg, DST, lenInBytes, k, H) {
        (0, utils_ts_1.abytes)(msg);
        (0, utils_ts_1.abytes)(DST);
        anum(lenInBytes);
        if (DST.length > 255) {
          const dkLen = Math.ceil(2 * k / 8);
          DST = H.create({ dkLen }).update((0, utils_ts_1.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(DST).digest();
        }
        if (lenInBytes > 65535 || DST.length > 255)
          throw new Error("expand_message_xof: invalid lenInBytes");
        return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
      }
      function hash_to_field(msg, count, options) {
        (0, utils_ts_1.validateObject)(options, {
          DST: "stringOrUint8Array",
          p: "bigint",
          m: "isSafeInteger",
          k: "isSafeInteger",
          hash: "hash"
        });
        const { p, k, m, hash, expand, DST: _DST } = options;
        (0, utils_ts_1.abytes)(msg);
        anum(count);
        const DST = typeof _DST === "string" ? (0, utils_ts_1.utf8ToBytes)(_DST) : _DST;
        const log2p = p.toString(2).length;
        const L = Math.ceil((log2p + k) / 8);
        const len_in_bytes = count * m * L;
        let prb;
        if (expand === "xmd") {
          prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
        } else if (expand === "xof") {
          prb = expand_message_xof(msg, DST, len_in_bytes, k, hash);
        } else if (expand === "_internal_pass") {
          prb = msg;
        } else {
          throw new Error('expand must be "xmd" or "xof"');
        }
        const u = new Array(count);
        for (let i = 0; i < count; i++) {
          const e = new Array(m);
          for (let j = 0; j < m; j++) {
            const elm_offset = L * (j + i * m);
            const tv = prb.subarray(elm_offset, elm_offset + L);
            e[j] = (0, modular_ts_1.mod)(os2ip(tv), p);
          }
          u[i] = e;
        }
        return u;
      }
      function isogenyMap(field, map) {
        const COEFF = map.map((i) => Array.from(i).reverse());
        return (x, y) => {
          const [xNum, xDen, yNum, yDen] = COEFF.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
          if (field.is0(xDen) || field.is0(yDen))
            throw new Error("bad point: ZERO");
          x = field.div(xNum, xDen);
          y = field.mul(y, field.div(yNum, yDen));
          return { x, y };
        };
      }
      function createHasher2(Point2, mapToCurve, def) {
        if (typeof mapToCurve !== "function")
          throw new Error("mapToCurve() must be defined");
        return {
          // Encodes byte string to elliptic curve.
          // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
          hashToCurve(msg, options) {
            const u = hash_to_field(msg, 2, { ...def, DST: def.DST, ...options });
            const u0 = Point2.fromAffine(mapToCurve(u[0]));
            const u1 = Point2.fromAffine(mapToCurve(u[1]));
            const P = u0.add(u1).clearCofactor();
            P.assertValidity();
            return P;
          },
          // Encodes byte string to elliptic curve.
          // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
          encodeToCurve(msg, options) {
            const u = hash_to_field(msg, 1, { ...def, DST: def.encodeDST, ...options });
            const P = Point2.fromAffine(mapToCurve(u[0])).clearCofactor();
            P.assertValidity();
            return P;
          },
          // Same as encodeToCurve, but without hash
          mapToCurve(scalars) {
            if (!Array.isArray(scalars))
              throw new Error("mapToCurve: expected array of bigints");
            for (const i of scalars)
              if (typeof i !== "bigint")
                throw new Error("mapToCurve: expected array of bigints");
            const P = Point2.fromAffine(mapToCurve(scalars)).clearCofactor();
            P.assertValidity();
            return P;
          }
        };
      }
    }
  });

  // node_modules/@noble/curves/abstract/montgomery.js
  var require_montgomery = __commonJS({
    "node_modules/@noble/curves/abstract/montgomery.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.montgomery = montgomery;
      var modular_ts_1 = require_modular();
      var utils_ts_1 = require_utils3();
      var _0n9 = BigInt(0);
      var _1n9 = BigInt(1);
      function validateOpts3(curve) {
        (0, utils_ts_1.validateObject)(curve, {
          a: "bigint"
        }, {
          montgomeryBits: "isSafeInteger",
          nByteLength: "isSafeInteger",
          adjustScalarBytes: "function",
          domain: "function",
          powPminus2: "function",
          Gu: "bigint"
        });
        return Object.freeze({ ...curve });
      }
      function montgomery(curveDef) {
        const CURVE = validateOpts3(curveDef);
        const { P } = CURVE;
        const modP = (n) => (0, modular_ts_1.mod)(n, P);
        const montgomeryBits = CURVE.montgomeryBits;
        const montgomeryBytes = Math.ceil(montgomeryBits / 8);
        const fieldLen = CURVE.nByteLength;
        const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes) => bytes);
        const powPminus2 = CURVE.powPminus2 || ((x) => (0, modular_ts_1.pow)(x, P - BigInt(2), P));
        function cswap(swap, x_2, x_3) {
          const dummy = modP(swap * (x_2 - x_3));
          x_2 = modP(x_2 - dummy);
          x_3 = modP(x_3 + dummy);
          return [x_2, x_3];
        }
        const a24 = (CURVE.a - BigInt(2)) / BigInt(4);
        function montgomeryLadder(u, scalar) {
          (0, utils_ts_1.aInRange)("u", u, _0n9, P);
          (0, utils_ts_1.aInRange)("scalar", scalar, _0n9, P);
          const k = scalar;
          const x_1 = u;
          let x_2 = _1n9;
          let z_2 = _0n9;
          let x_3 = u;
          let z_3 = _1n9;
          let swap = _0n9;
          let sw;
          for (let t = BigInt(montgomeryBits - 1); t >= _0n9; t--) {
            const k_t = k >> t & _1n9;
            swap ^= k_t;
            sw = cswap(swap, x_2, x_3);
            x_2 = sw[0];
            x_3 = sw[1];
            sw = cswap(swap, z_2, z_3);
            z_2 = sw[0];
            z_3 = sw[1];
            swap = k_t;
            const A = x_2 + z_2;
            const AA = modP(A * A);
            const B = x_2 - z_2;
            const BB = modP(B * B);
            const E = AA - BB;
            const C = x_3 + z_3;
            const D = x_3 - z_3;
            const DA = modP(D * A);
            const CB = modP(C * B);
            const dacb = DA + CB;
            const da_cb = DA - CB;
            x_3 = modP(dacb * dacb);
            z_3 = modP(x_1 * modP(da_cb * da_cb));
            x_2 = modP(AA * BB);
            z_2 = modP(E * (AA + modP(a24 * E)));
          }
          sw = cswap(swap, x_2, x_3);
          x_2 = sw[0];
          x_3 = sw[1];
          sw = cswap(swap, z_2, z_3);
          z_2 = sw[0];
          z_3 = sw[1];
          const z2 = powPminus2(z_2);
          return modP(x_2 * z2);
        }
        function encodeUCoordinate(u) {
          return (0, utils_ts_1.numberToBytesLE)(modP(u), montgomeryBytes);
        }
        function decodeUCoordinate(uEnc) {
          const u = (0, utils_ts_1.ensureBytes)("u coordinate", uEnc, montgomeryBytes);
          if (fieldLen === 32)
            u[31] &= 127;
          return (0, utils_ts_1.bytesToNumberLE)(u);
        }
        function decodeScalar(n) {
          const bytes = (0, utils_ts_1.ensureBytes)("scalar", n);
          const len = bytes.length;
          if (len !== montgomeryBytes && len !== fieldLen) {
            let valid = "" + montgomeryBytes + " or " + fieldLen;
            throw new Error("invalid scalar, expected " + valid + " bytes, got " + len);
          }
          return (0, utils_ts_1.bytesToNumberLE)(adjustScalarBytes2(bytes));
        }
        function scalarMult(scalar, u) {
          const pointU = decodeUCoordinate(u);
          const _scalar = decodeScalar(scalar);
          const pu = montgomeryLadder(pointU, _scalar);
          if (pu === _0n9)
            throw new Error("invalid private or public key received");
          return encodeUCoordinate(pu);
        }
        const GuBytes = encodeUCoordinate(CURVE.Gu);
        function scalarMultBase(scalar) {
          return scalarMult(scalar, GuBytes);
        }
        return {
          scalarMult,
          scalarMultBase,
          getSharedSecret: (privateKey, publicKey) => scalarMult(privateKey, publicKey),
          getPublicKey: (privateKey) => scalarMultBase(privateKey),
          utils: { randomPrivateKey: () => CURVE.randomBytes(CURVE.nByteLength) },
          GuBytes
        };
      }
    }
  });

  // node_modules/@noble/curves/ed25519.js
  var require_ed25519 = __commonJS({
    "node_modules/@noble/curves/ed25519.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hash_to_ristretto255 = exports.hashToRistretto255 = exports.RistrettoPoint = exports.encodeToCurve = exports.hashToCurve = exports.edwardsToMontgomery = exports.x25519 = exports.ed25519ph = exports.ed25519ctx = exports.ed25519 = exports.ED25519_TORSION_SUBGROUP = void 0;
      exports.edwardsToMontgomeryPub = edwardsToMontgomeryPub;
      exports.edwardsToMontgomeryPriv = edwardsToMontgomeryPriv;
      var sha2_1 = require_sha2();
      var utils_1 = require_utils2();
      var curve_ts_1 = require_curve();
      var edwards_ts_1 = require_edwards();
      var hash_to_curve_ts_1 = require_hash_to_curve();
      var modular_ts_1 = require_modular();
      var montgomery_ts_1 = require_montgomery();
      var utils_ts_1 = require_utils3();
      var ED25519_P2 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
      var ED25519_SQRT_M12 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
      var _0n9 = BigInt(0);
      var _1n9 = BigInt(1);
      var _2n7 = BigInt(2);
      var _3n4 = BigInt(3);
      var _5n3 = BigInt(5);
      var _8n4 = BigInt(8);
      function ed25519_pow_2_252_32(x) {
        const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
        const P = ED25519_P2;
        const x2 = x * x % P;
        const b2 = x2 * x % P;
        const b4 = (0, modular_ts_1.pow2)(b2, _2n7, P) * b2 % P;
        const b5 = (0, modular_ts_1.pow2)(b4, _1n9, P) * x % P;
        const b10 = (0, modular_ts_1.pow2)(b5, _5n3, P) * b5 % P;
        const b20 = (0, modular_ts_1.pow2)(b10, _10n, P) * b10 % P;
        const b40 = (0, modular_ts_1.pow2)(b20, _20n, P) * b20 % P;
        const b80 = (0, modular_ts_1.pow2)(b40, _40n, P) * b40 % P;
        const b160 = (0, modular_ts_1.pow2)(b80, _80n, P) * b80 % P;
        const b240 = (0, modular_ts_1.pow2)(b160, _80n, P) * b80 % P;
        const b250 = (0, modular_ts_1.pow2)(b240, _10n, P) * b10 % P;
        const pow_p_5_8 = (0, modular_ts_1.pow2)(b250, _2n7, P) * x % P;
        return { pow_p_5_8, b2 };
      }
      function adjustScalarBytes2(bytes) {
        bytes[0] &= 248;
        bytes[31] &= 127;
        bytes[31] |= 64;
        return bytes;
      }
      function uvRatio2(u, v) {
        const P = ED25519_P2;
        const v3 = (0, modular_ts_1.mod)(v * v * v, P);
        const v7 = (0, modular_ts_1.mod)(v3 * v3 * v, P);
        const pow3 = ed25519_pow_2_252_32(u * v7).pow_p_5_8;
        let x = (0, modular_ts_1.mod)(u * v3 * pow3, P);
        const vx2 = (0, modular_ts_1.mod)(v * x * x, P);
        const root1 = x;
        const root2 = (0, modular_ts_1.mod)(x * ED25519_SQRT_M12, P);
        const useRoot1 = vx2 === u;
        const useRoot2 = vx2 === (0, modular_ts_1.mod)(-u, P);
        const noRoot = vx2 === (0, modular_ts_1.mod)(-u * ED25519_SQRT_M12, P);
        if (useRoot1)
          x = root1;
        if (useRoot2 || noRoot)
          x = root2;
        if ((0, modular_ts_1.isNegativeLE)(x, P))
          x = (0, modular_ts_1.mod)(-x, P);
        return { isValid: useRoot1 || useRoot2, value: x };
      }
      exports.ED25519_TORSION_SUBGROUP = [
        "0100000000000000000000000000000000000000000000000000000000000000",
        "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
        "0000000000000000000000000000000000000000000000000000000000000080",
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
        "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
        "0000000000000000000000000000000000000000000000000000000000000000",
        "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"
      ];
      var Fp2 = /* @__PURE__ */ (() => (0, modular_ts_1.Field)(ED25519_P2, void 0, true))();
      var ed25519Defaults2 = /* @__PURE__ */ (() => ({
        // Removing Fp.create() will still work, and is 10% faster on sign
        a: Fp2.create(BigInt(-1)),
        // d is -121665/121666 a.k.a. Fp.neg(121665 * Fp.inv(121666))
        d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
        // Finite field 2n**255n - 19n
        Fp: Fp2,
        // Subgroup order 2n**252n + 27742317777372353535851937790883648493n;
        n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
        h: _8n4,
        Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
        Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
        hash: sha2_1.sha512,
        randomBytes: utils_1.randomBytes,
        adjustScalarBytes: adjustScalarBytes2,
        // dom2
        // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
        // Constant-time, u/√v
        uvRatio: uvRatio2
      }))();
      exports.ed25519 = (() => (0, edwards_ts_1.twistedEdwards)(ed25519Defaults2))();
      function ed25519_domain(data, ctx, phflag) {
        if (ctx.length > 255)
          throw new Error("Context is too big");
        return (0, utils_1.concatBytes)((0, utils_1.utf8ToBytes)("SigEd25519 no Ed25519 collisions"), new Uint8Array([phflag ? 1 : 0, ctx.length]), ctx, data);
      }
      exports.ed25519ctx = (() => (0, edwards_ts_1.twistedEdwards)({
        ...ed25519Defaults2,
        domain: ed25519_domain
      }))();
      exports.ed25519ph = (() => (0, edwards_ts_1.twistedEdwards)(Object.assign({}, ed25519Defaults2, {
        domain: ed25519_domain,
        prehash: sha2_1.sha512
      })))();
      exports.x25519 = (() => (0, montgomery_ts_1.montgomery)({
        P: ED25519_P2,
        a: BigInt(486662),
        montgomeryBits: 255,
        // n is 253 bits
        nByteLength: 32,
        Gu: BigInt(9),
        powPminus2: (x) => {
          const P = ED25519_P2;
          const { pow_p_5_8, b2 } = ed25519_pow_2_252_32(x);
          return (0, modular_ts_1.mod)((0, modular_ts_1.pow2)(pow_p_5_8, _3n4, P) * b2, P);
        },
        adjustScalarBytes: adjustScalarBytes2,
        randomBytes: utils_1.randomBytes
      }))();
      function edwardsToMontgomeryPub(edwardsPub) {
        const { y } = exports.ed25519.ExtendedPoint.fromHex(edwardsPub);
        const _1n10 = BigInt(1);
        return Fp2.toBytes(Fp2.create((_1n10 + y) * Fp2.inv(_1n10 - y)));
      }
      exports.edwardsToMontgomery = edwardsToMontgomeryPub;
      function edwardsToMontgomeryPriv(edwardsPriv) {
        const hashed = ed25519Defaults2.hash(edwardsPriv.subarray(0, 32));
        return ed25519Defaults2.adjustScalarBytes(hashed).subarray(0, 32);
      }
      var ELL2_C1 = /* @__PURE__ */ (() => (Fp2.ORDER + _3n4) / _8n4)();
      var ELL2_C2 = /* @__PURE__ */ (() => Fp2.pow(_2n7, ELL2_C1))();
      var ELL2_C3 = /* @__PURE__ */ (() => Fp2.sqrt(Fp2.neg(Fp2.ONE)))();
      function map_to_curve_elligator2_curve25519(u) {
        const ELL2_C4 = (Fp2.ORDER - _5n3) / _8n4;
        const ELL2_J = BigInt(486662);
        let tv1 = Fp2.sqr(u);
        tv1 = Fp2.mul(tv1, _2n7);
        let xd = Fp2.add(tv1, Fp2.ONE);
        let x1n = Fp2.neg(ELL2_J);
        let tv2 = Fp2.sqr(xd);
        let gxd = Fp2.mul(tv2, xd);
        let gx1 = Fp2.mul(tv1, ELL2_J);
        gx1 = Fp2.mul(gx1, x1n);
        gx1 = Fp2.add(gx1, tv2);
        gx1 = Fp2.mul(gx1, x1n);
        let tv3 = Fp2.sqr(gxd);
        tv2 = Fp2.sqr(tv3);
        tv3 = Fp2.mul(tv3, gxd);
        tv3 = Fp2.mul(tv3, gx1);
        tv2 = Fp2.mul(tv2, tv3);
        let y11 = Fp2.pow(tv2, ELL2_C4);
        y11 = Fp2.mul(y11, tv3);
        let y12 = Fp2.mul(y11, ELL2_C3);
        tv2 = Fp2.sqr(y11);
        tv2 = Fp2.mul(tv2, gxd);
        let e1 = Fp2.eql(tv2, gx1);
        let y1 = Fp2.cmov(y12, y11, e1);
        let x2n = Fp2.mul(x1n, tv1);
        let y21 = Fp2.mul(y11, u);
        y21 = Fp2.mul(y21, ELL2_C2);
        let y22 = Fp2.mul(y21, ELL2_C3);
        let gx2 = Fp2.mul(gx1, tv1);
        tv2 = Fp2.sqr(y21);
        tv2 = Fp2.mul(tv2, gxd);
        let e2 = Fp2.eql(tv2, gx2);
        let y2 = Fp2.cmov(y22, y21, e2);
        tv2 = Fp2.sqr(y1);
        tv2 = Fp2.mul(tv2, gxd);
        let e3 = Fp2.eql(tv2, gx1);
        let xn = Fp2.cmov(x2n, x1n, e3);
        let y = Fp2.cmov(y2, y1, e3);
        let e4 = Fp2.isOdd(y);
        y = Fp2.cmov(y, Fp2.neg(y), e3 !== e4);
        return { xMn: xn, xMd: xd, yMn: y, yMd: _1n9 };
      }
      var ELL2_C1_EDWARDS = /* @__PURE__ */ (() => (0, modular_ts_1.FpSqrtEven)(Fp2, Fp2.neg(BigInt(486664))))();
      function map_to_curve_elligator2_edwards25519(u) {
        const { xMn, xMd, yMn, yMd } = map_to_curve_elligator2_curve25519(u);
        let xn = Fp2.mul(xMn, yMd);
        xn = Fp2.mul(xn, ELL2_C1_EDWARDS);
        let xd = Fp2.mul(xMd, yMn);
        let yn = Fp2.sub(xMn, xMd);
        let yd = Fp2.add(xMn, xMd);
        let tv1 = Fp2.mul(xd, yd);
        let e = Fp2.eql(tv1, Fp2.ZERO);
        xn = Fp2.cmov(xn, Fp2.ZERO, e);
        xd = Fp2.cmov(xd, Fp2.ONE, e);
        yn = Fp2.cmov(yn, Fp2.ONE, e);
        yd = Fp2.cmov(yd, Fp2.ONE, e);
        const inv = Fp2.invertBatch([xd, yd]);
        return { x: Fp2.mul(xn, inv[0]), y: Fp2.mul(yn, inv[1]) };
      }
      var htf = /* @__PURE__ */ (() => (0, hash_to_curve_ts_1.createHasher)(exports.ed25519.ExtendedPoint, (scalars) => map_to_curve_elligator2_edwards25519(scalars[0]), {
        DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
        encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
        p: Fp2.ORDER,
        m: 1,
        k: 128,
        expand: "xmd",
        hash: sha2_1.sha512
      }))();
      exports.hashToCurve = (() => htf.hashToCurve)();
      exports.encodeToCurve = (() => htf.encodeToCurve)();
      function aristp(other) {
        if (!(other instanceof RistPoint))
          throw new Error("RistrettoPoint expected");
      }
      var SQRT_M1 = ED25519_SQRT_M12;
      var SQRT_AD_MINUS_ONE = /* @__PURE__ */ BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
      var INVSQRT_A_MINUS_D = /* @__PURE__ */ BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
      var ONE_MINUS_D_SQ = /* @__PURE__ */ BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
      var D_MINUS_ONE_SQ = /* @__PURE__ */ BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
      var invertSqrt = (number) => uvRatio2(_1n9, number);
      var MAX_255B = /* @__PURE__ */ BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      var bytes255ToNumberLE = (bytes) => exports.ed25519.CURVE.Fp.create((0, utils_ts_1.bytesToNumberLE)(bytes) & MAX_255B);
      function calcElligatorRistrettoMap(r0) {
        const { d } = exports.ed25519.CURVE;
        const P = exports.ed25519.CURVE.Fp.ORDER;
        const mod2 = exports.ed25519.CURVE.Fp.create;
        const r = mod2(SQRT_M1 * r0 * r0);
        const Ns = mod2((r + _1n9) * ONE_MINUS_D_SQ);
        let c = BigInt(-1);
        const D = mod2((c - d * r) * mod2(r + d));
        let { isValid: Ns_D_is_sq, value: s } = uvRatio2(Ns, D);
        let s_ = mod2(s * r0);
        if (!(0, modular_ts_1.isNegativeLE)(s_, P))
          s_ = mod2(-s_);
        if (!Ns_D_is_sq)
          s = s_;
        if (!Ns_D_is_sq)
          c = r;
        const Nt = mod2(c * (r - _1n9) * D_MINUS_ONE_SQ - D);
        const s2 = s * s;
        const W0 = mod2((s + s) * D);
        const W1 = mod2(Nt * SQRT_AD_MINUS_ONE);
        const W2 = mod2(_1n9 - s2);
        const W3 = mod2(_1n9 + s2);
        return new exports.ed25519.ExtendedPoint(mod2(W0 * W3), mod2(W2 * W1), mod2(W1 * W3), mod2(W0 * W2));
      }
      var RistPoint = class _RistPoint {
        // Private property to discourage combining ExtendedPoint + RistrettoPoint
        // Always use Ristretto encoding/decoding instead.
        constructor(ep) {
          this.ep = ep;
        }
        static fromAffine(ap) {
          return new _RistPoint(exports.ed25519.ExtendedPoint.fromAffine(ap));
        }
        /**
         * Takes uniform output of 64-byte hash function like sha512 and converts it to `RistrettoPoint`.
         * The hash-to-group operation applies Elligator twice and adds the results.
         * **Note:** this is one-way map, there is no conversion from point to hash.
         * https://ristretto.group/formulas/elligator.html
         * @param hex 64-byte output of a hash function
         */
        static hashToCurve(hex) {
          hex = (0, utils_ts_1.ensureBytes)("ristrettoHash", hex, 64);
          const r1 = bytes255ToNumberLE(hex.slice(0, 32));
          const R1 = calcElligatorRistrettoMap(r1);
          const r2 = bytes255ToNumberLE(hex.slice(32, 64));
          const R2 = calcElligatorRistrettoMap(r2);
          return new _RistPoint(R1.add(R2));
        }
        /**
         * Converts ristretto-encoded string to ristretto point.
         * https://ristretto.group/formulas/decoding.html
         * @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
         */
        static fromHex(hex) {
          hex = (0, utils_ts_1.ensureBytes)("ristrettoHex", hex, 32);
          const { a, d } = exports.ed25519.CURVE;
          const P = exports.ed25519.CURVE.Fp.ORDER;
          const mod2 = exports.ed25519.CURVE.Fp.create;
          const emsg = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint";
          const s = bytes255ToNumberLE(hex);
          if (!(0, utils_ts_1.equalBytes)((0, utils_ts_1.numberToBytesLE)(s, 32), hex) || (0, modular_ts_1.isNegativeLE)(s, P))
            throw new Error(emsg);
          const s2 = mod2(s * s);
          const u1 = mod2(_1n9 + a * s2);
          const u2 = mod2(_1n9 - a * s2);
          const u1_2 = mod2(u1 * u1);
          const u2_2 = mod2(u2 * u2);
          const v = mod2(a * d * u1_2 - u2_2);
          const { isValid, value: I } = invertSqrt(mod2(v * u2_2));
          const Dx = mod2(I * u2);
          const Dy = mod2(I * Dx * v);
          let x = mod2((s + s) * Dx);
          if ((0, modular_ts_1.isNegativeLE)(x, P))
            x = mod2(-x);
          const y = mod2(u1 * Dy);
          const t = mod2(x * y);
          if (!isValid || (0, modular_ts_1.isNegativeLE)(t, P) || y === _0n9)
            throw new Error(emsg);
          return new _RistPoint(new exports.ed25519.ExtendedPoint(x, y, _1n9, t));
        }
        static msm(points, scalars) {
          const Fn = (0, modular_ts_1.Field)(exports.ed25519.CURVE.n, exports.ed25519.CURVE.nBitLength);
          return (0, curve_ts_1.pippenger)(_RistPoint, Fn, points, scalars);
        }
        /**
         * Encodes ristretto point to Uint8Array.
         * https://ristretto.group/formulas/encoding.html
         */
        toRawBytes() {
          let { ex: x, ey: y, ez: z, et: t } = this.ep;
          const P = exports.ed25519.CURVE.Fp.ORDER;
          const mod2 = exports.ed25519.CURVE.Fp.create;
          const u1 = mod2(mod2(z + y) * mod2(z - y));
          const u2 = mod2(x * y);
          const u2sq = mod2(u2 * u2);
          const { value: invsqrt } = invertSqrt(mod2(u1 * u2sq));
          const D1 = mod2(invsqrt * u1);
          const D2 = mod2(invsqrt * u2);
          const zInv = mod2(D1 * D2 * t);
          let D;
          if ((0, modular_ts_1.isNegativeLE)(t * zInv, P)) {
            let _x = mod2(y * SQRT_M1);
            let _y = mod2(x * SQRT_M1);
            x = _x;
            y = _y;
            D = mod2(D1 * INVSQRT_A_MINUS_D);
          } else {
            D = D2;
          }
          if ((0, modular_ts_1.isNegativeLE)(x * zInv, P))
            y = mod2(-y);
          let s = mod2((z - y) * D);
          if ((0, modular_ts_1.isNegativeLE)(s, P))
            s = mod2(-s);
          return (0, utils_ts_1.numberToBytesLE)(s, 32);
        }
        toHex() {
          return (0, utils_ts_1.bytesToHex)(this.toRawBytes());
        }
        toString() {
          return this.toHex();
        }
        // Compare one point to another.
        equals(other) {
          aristp(other);
          const { ex: X1, ey: Y1 } = this.ep;
          const { ex: X2, ey: Y2 } = other.ep;
          const mod2 = exports.ed25519.CURVE.Fp.create;
          const one = mod2(X1 * Y2) === mod2(Y1 * X2);
          const two = mod2(Y1 * Y2) === mod2(X1 * X2);
          return one || two;
        }
        add(other) {
          aristp(other);
          return new _RistPoint(this.ep.add(other.ep));
        }
        subtract(other) {
          aristp(other);
          return new _RistPoint(this.ep.subtract(other.ep));
        }
        multiply(scalar) {
          return new _RistPoint(this.ep.multiply(scalar));
        }
        multiplyUnsafe(scalar) {
          return new _RistPoint(this.ep.multiplyUnsafe(scalar));
        }
        double() {
          return new _RistPoint(this.ep.double());
        }
        negate() {
          return new _RistPoint(this.ep.negate());
        }
      };
      exports.RistrettoPoint = (() => {
        if (!RistPoint.BASE)
          RistPoint.BASE = new RistPoint(exports.ed25519.ExtendedPoint.BASE);
        if (!RistPoint.ZERO)
          RistPoint.ZERO = new RistPoint(exports.ed25519.ExtendedPoint.ZERO);
        return RistPoint;
      })();
      var hashToRistretto255 = (msg, options) => {
        const d = options.DST;
        const DST = typeof d === "string" ? (0, utils_1.utf8ToBytes)(d) : d;
        const uniform_bytes = (0, hash_to_curve_ts_1.expand_message_xmd)(msg, DST, 64, sha2_1.sha512);
        const P = RistPoint.hashToCurve(uniform_bytes);
        return P;
      };
      exports.hashToRistretto255 = hashToRistretto255;
      exports.hash_to_ristretto255 = exports.hashToRistretto255;
    }
  });

  // node_modules/@noble/curves/node_modules/@noble/hashes/hmac.js
  var require_hmac = __commonJS({
    "node_modules/@noble/curves/node_modules/@noble/hashes/hmac.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hmac = exports.HMAC = void 0;
      var _assert_ts_1 = require_assert2();
      var utils_ts_1 = require_utils2();
      var HMAC2 = class extends utils_ts_1.Hash {
        constructor(hash, _key) {
          super();
          this.finished = false;
          this.destroyed = false;
          (0, _assert_ts_1.ahash)(hash);
          const key = (0, utils_ts_1.toBytes)(_key);
          this.iHash = hash.create();
          if (typeof this.iHash.update !== "function")
            throw new Error("Expected instance of class which extends utils.Hash");
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad = new Uint8Array(blockLen);
          pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54;
          this.iHash.update(pad);
          this.oHash = hash.create();
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54 ^ 92;
          this.oHash.update(pad);
          pad.fill(0);
        }
        update(buf) {
          (0, _assert_ts_1.aexists)(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          (0, _assert_ts_1.aexists)(this);
          (0, _assert_ts_1.abytes)(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      };
      exports.HMAC = HMAC2;
      var hmac2 = (hash, key, message) => new HMAC2(hash, key).update(message).digest();
      exports.hmac = hmac2;
      exports.hmac.create = (hash, key) => new HMAC2(hash, key);
    }
  });

  // node_modules/@noble/curves/abstract/weierstrass.js
  var require_weierstrass = __commonJS({
    "node_modules/@noble/curves/abstract/weierstrass.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DER = exports.DERErr = void 0;
      exports.weierstrassPoints = weierstrassPoints2;
      exports.weierstrass = weierstrass2;
      exports.SWUFpSqrtRatio = SWUFpSqrtRatio;
      exports.mapToCurveSimpleSWU = mapToCurveSimpleSWU;
      var curve_ts_1 = require_curve();
      var modular_ts_1 = require_modular();
      var utils_ts_1 = require_utils3();
      function validateSigVerOpts2(opts) {
        if (opts.lowS !== void 0)
          (0, utils_ts_1.abool)("lowS", opts.lowS);
        if (opts.prehash !== void 0)
          (0, utils_ts_1.abool)("prehash", opts.prehash);
      }
      function validatePointOpts2(curve) {
        const opts = (0, curve_ts_1.validateBasic)(curve);
        (0, utils_ts_1.validateObject)(opts, {
          a: "field",
          b: "field"
        }, {
          allowedPrivateKeyLengths: "array",
          wrapPrivateKey: "boolean",
          isTorsionFree: "function",
          clearCofactor: "function",
          allowInfinityPoint: "boolean",
          fromBytes: "function",
          toBytes: "function"
        });
        const { endo, Fp: Fp2, a } = opts;
        if (endo) {
          if (!Fp2.eql(a, Fp2.ZERO)) {
            throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
          }
          if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
            throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
          }
        }
        return Object.freeze({ ...opts });
      }
      var DERErr2 = class extends Error {
        constructor(m = "") {
          super(m);
        }
      };
      exports.DERErr = DERErr2;
      exports.DER = {
        // asn.1 DER encoding utils
        Err: DERErr2,
        // Basic building block is TLV (Tag-Length-Value)
        _tlv: {
          encode: (tag, data) => {
            const { Err: E } = exports.DER;
            if (tag < 0 || tag > 256)
              throw new E("tlv.encode: wrong tag");
            if (data.length & 1)
              throw new E("tlv.encode: unpadded data");
            const dataLen = data.length / 2;
            const len = (0, utils_ts_1.numberToHexUnpadded)(dataLen);
            if (len.length / 2 & 128)
              throw new E("tlv.encode: long form length too big");
            const lenLen = dataLen > 127 ? (0, utils_ts_1.numberToHexUnpadded)(len.length / 2 | 128) : "";
            const t = (0, utils_ts_1.numberToHexUnpadded)(tag);
            return t + lenLen + len + data;
          },
          // v - value, l - left bytes (unparsed)
          decode(tag, data) {
            const { Err: E } = exports.DER;
            let pos = 0;
            if (tag < 0 || tag > 256)
              throw new E("tlv.encode: wrong tag");
            if (data.length < 2 || data[pos++] !== tag)
              throw new E("tlv.decode: wrong tlv");
            const first = data[pos++];
            const isLong = !!(first & 128);
            let length2 = 0;
            if (!isLong)
              length2 = first;
            else {
              const lenLen = first & 127;
              if (!lenLen)
                throw new E("tlv.decode(long): indefinite length not supported");
              if (lenLen > 4)
                throw new E("tlv.decode(long): byte length is too big");
              const lengthBytes = data.subarray(pos, pos + lenLen);
              if (lengthBytes.length !== lenLen)
                throw new E("tlv.decode: length bytes not complete");
              if (lengthBytes[0] === 0)
                throw new E("tlv.decode(long): zero leftmost byte");
              for (const b of lengthBytes)
                length2 = length2 << 8 | b;
              pos += lenLen;
              if (length2 < 128)
                throw new E("tlv.decode(long): not minimal encoding");
            }
            const v = data.subarray(pos, pos + length2);
            if (v.length !== length2)
              throw new E("tlv.decode: wrong value length");
            return { v, l: data.subarray(pos + length2) };
          }
        },
        // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
        // since we always use positive integers here. It must always be empty:
        // - add zero byte if exists
        // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
        _int: {
          encode(num) {
            const { Err: E } = exports.DER;
            if (num < _0n9)
              throw new E("integer: negative integers are not allowed");
            let hex = (0, utils_ts_1.numberToHexUnpadded)(num);
            if (Number.parseInt(hex[0], 16) & 8)
              hex = "00" + hex;
            if (hex.length & 1)
              throw new E("unexpected DER parsing assertion: unpadded hex");
            return hex;
          },
          decode(data) {
            const { Err: E } = exports.DER;
            if (data[0] & 128)
              throw new E("invalid signature integer: negative");
            if (data[0] === 0 && !(data[1] & 128))
              throw new E("invalid signature integer: unnecessary leading zero");
            return (0, utils_ts_1.bytesToNumberBE)(data);
          }
        },
        toSig(hex) {
          const { Err: E, _int: int, _tlv: tlv } = exports.DER;
          const data = (0, utils_ts_1.ensureBytes)("signature", hex);
          const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
          if (seqLeftBytes.length)
            throw new E("invalid signature: left bytes after parsing");
          const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
          const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
          if (sLeftBytes.length)
            throw new E("invalid signature: left bytes after parsing");
          return { r: int.decode(rBytes), s: int.decode(sBytes) };
        },
        hexFromSig(sig) {
          const { _tlv: tlv, _int: int } = exports.DER;
          const rs = tlv.encode(2, int.encode(sig.r));
          const ss = tlv.encode(2, int.encode(sig.s));
          const seq = rs + ss;
          return tlv.encode(48, seq);
        }
      };
      var _0n9 = BigInt(0);
      var _1n9 = BigInt(1);
      var _2n7 = BigInt(2);
      var _3n4 = BigInt(3);
      var _4n3 = BigInt(4);
      function weierstrassPoints2(opts) {
        const CURVE = validatePointOpts2(opts);
        const { Fp: Fp2 } = CURVE;
        const Fn = (0, modular_ts_1.Field)(CURVE.n, CURVE.nBitLength);
        const toBytes3 = CURVE.toBytes || ((_c, point, _isCompressed) => {
          const a = point.toAffine();
          return (0, utils_ts_1.concatBytes)(Uint8Array.from([4]), Fp2.toBytes(a.x), Fp2.toBytes(a.y));
        });
        const fromBytes = CURVE.fromBytes || ((bytes) => {
          const tail = bytes.subarray(1);
          const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
          const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
          return { x, y };
        });
        function weierstrassEquation(x) {
          const { a, b } = CURVE;
          const x2 = Fp2.sqr(x);
          const x3 = Fp2.mul(x2, x);
          return Fp2.add(Fp2.add(x3, Fp2.mul(x, a)), b);
        }
        if (!Fp2.eql(Fp2.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
          throw new Error("bad generator point: equation left != right");
        function isWithinCurveOrder(num) {
          return (0, utils_ts_1.inRange)(num, _1n9, CURVE.n);
        }
        function normPrivateKeyToScalar(key) {
          const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
          if (lengths && typeof key !== "bigint") {
            if ((0, utils_ts_1.isBytes)(key))
              key = (0, utils_ts_1.bytesToHex)(key);
            if (typeof key !== "string" || !lengths.includes(key.length))
              throw new Error("invalid private key");
            key = key.padStart(nByteLength * 2, "0");
          }
          let num;
          try {
            num = typeof key === "bigint" ? key : (0, utils_ts_1.bytesToNumberBE)((0, utils_ts_1.ensureBytes)("private key", key, nByteLength));
          } catch (error) {
            throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
          }
          if (wrapPrivateKey)
            num = (0, modular_ts_1.mod)(num, N);
          (0, utils_ts_1.aInRange)("private key", num, _1n9, N);
          return num;
        }
        function aprjpoint(other) {
          if (!(other instanceof Point2))
            throw new Error("ProjectivePoint expected");
        }
        const toAffineMemo = (0, utils_ts_1.memoized)((p, iz) => {
          const { px: x, py: y, pz: z } = p;
          if (Fp2.eql(z, Fp2.ONE))
            return { x, y };
          const is0 = p.is0();
          if (iz == null)
            iz = is0 ? Fp2.ONE : Fp2.inv(z);
          const ax = Fp2.mul(x, iz);
          const ay = Fp2.mul(y, iz);
          const zz = Fp2.mul(z, iz);
          if (is0)
            return { x: Fp2.ZERO, y: Fp2.ZERO };
          if (!Fp2.eql(zz, Fp2.ONE))
            throw new Error("invZ was invalid");
          return { x: ax, y: ay };
        });
        const assertValidMemo = (0, utils_ts_1.memoized)((p) => {
          if (p.is0()) {
            if (CURVE.allowInfinityPoint && !Fp2.is0(p.py))
              return;
            throw new Error("bad point: ZERO");
          }
          const { x, y } = p.toAffine();
          if (!Fp2.isValid(x) || !Fp2.isValid(y))
            throw new Error("bad point: x or y not FE");
          const left = Fp2.sqr(y);
          const right = weierstrassEquation(x);
          if (!Fp2.eql(left, right))
            throw new Error("bad point: equation left != right");
          if (!p.isTorsionFree())
            throw new Error("bad point: not in prime-order subgroup");
          return true;
        });
        class Point2 {
          constructor(px, py, pz) {
            if (px == null || !Fp2.isValid(px))
              throw new Error("x required");
            if (py == null || !Fp2.isValid(py))
              throw new Error("y required");
            if (pz == null || !Fp2.isValid(pz))
              throw new Error("z required");
            this.px = px;
            this.py = py;
            this.pz = pz;
            Object.freeze(this);
          }
          // Does not validate if the point is on-curve.
          // Use fromHex instead, or call assertValidity() later.
          static fromAffine(p) {
            const { x, y } = p || {};
            if (!p || !Fp2.isValid(x) || !Fp2.isValid(y))
              throw new Error("invalid affine point");
            if (p instanceof Point2)
              throw new Error("projective point not allowed");
            const is0 = (i) => Fp2.eql(i, Fp2.ZERO);
            if (is0(x) && is0(y))
              return Point2.ZERO;
            return new Point2(x, y, Fp2.ONE);
          }
          get x() {
            return this.toAffine().x;
          }
          get y() {
            return this.toAffine().y;
          }
          /**
           * Takes a bunch of Projective Points but executes only one
           * inversion on all of them. Inversion is very slow operation,
           * so this improves performance massively.
           * Optimization: converts a list of projective points to a list of identical points with Z=1.
           */
          static normalizeZ(points) {
            const toInv = Fp2.invertBatch(points.map((p) => p.pz));
            return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
          }
          /**
           * Converts hash string or Uint8Array to Point.
           * @param hex short/long ECDSA hex
           */
          static fromHex(hex) {
            const P = Point2.fromAffine(fromBytes((0, utils_ts_1.ensureBytes)("pointHex", hex)));
            P.assertValidity();
            return P;
          }
          // Multiplies generator point by privateKey.
          static fromPrivateKey(privateKey) {
            return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
          }
          // Multiscalar Multiplication
          static msm(points, scalars) {
            return (0, curve_ts_1.pippenger)(Point2, Fn, points, scalars);
          }
          // "Private method", don't use it directly
          _setWindowSize(windowSize) {
            wnaf.setWindowSize(this, windowSize);
          }
          // A point on curve is valid if it conforms to equation.
          assertValidity() {
            assertValidMemo(this);
          }
          hasEvenY() {
            const { y } = this.toAffine();
            if (Fp2.isOdd)
              return !Fp2.isOdd(y);
            throw new Error("Field doesn't support isOdd");
          }
          /**
           * Compare one point to another.
           */
          equals(other) {
            aprjpoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            const U1 = Fp2.eql(Fp2.mul(X1, Z2), Fp2.mul(X2, Z1));
            const U2 = Fp2.eql(Fp2.mul(Y1, Z2), Fp2.mul(Y2, Z1));
            return U1 && U2;
          }
          /**
           * Flips point to one corresponding to (x, -y) in Affine coordinates.
           */
          negate() {
            return new Point2(this.px, Fp2.neg(this.py), this.pz);
          }
          // Renes-Costello-Batina exception-free doubling formula.
          // There is 30% faster Jacobian formula, but it is not complete.
          // https://eprint.iacr.org/2015/1060, algorithm 3
          // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
          double() {
            const { a, b } = CURVE;
            const b3 = Fp2.mul(b, _3n4);
            const { px: X1, py: Y1, pz: Z1 } = this;
            let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
            let t0 = Fp2.mul(X1, X1);
            let t1 = Fp2.mul(Y1, Y1);
            let t2 = Fp2.mul(Z1, Z1);
            let t3 = Fp2.mul(X1, Y1);
            t3 = Fp2.add(t3, t3);
            Z3 = Fp2.mul(X1, Z1);
            Z3 = Fp2.add(Z3, Z3);
            X3 = Fp2.mul(a, Z3);
            Y3 = Fp2.mul(b3, t2);
            Y3 = Fp2.add(X3, Y3);
            X3 = Fp2.sub(t1, Y3);
            Y3 = Fp2.add(t1, Y3);
            Y3 = Fp2.mul(X3, Y3);
            X3 = Fp2.mul(t3, X3);
            Z3 = Fp2.mul(b3, Z3);
            t2 = Fp2.mul(a, t2);
            t3 = Fp2.sub(t0, t2);
            t3 = Fp2.mul(a, t3);
            t3 = Fp2.add(t3, Z3);
            Z3 = Fp2.add(t0, t0);
            t0 = Fp2.add(Z3, t0);
            t0 = Fp2.add(t0, t2);
            t0 = Fp2.mul(t0, t3);
            Y3 = Fp2.add(Y3, t0);
            t2 = Fp2.mul(Y1, Z1);
            t2 = Fp2.add(t2, t2);
            t0 = Fp2.mul(t2, t3);
            X3 = Fp2.sub(X3, t0);
            Z3 = Fp2.mul(t2, t1);
            Z3 = Fp2.add(Z3, Z3);
            Z3 = Fp2.add(Z3, Z3);
            return new Point2(X3, Y3, Z3);
          }
          // Renes-Costello-Batina exception-free addition formula.
          // There is 30% faster Jacobian formula, but it is not complete.
          // https://eprint.iacr.org/2015/1060, algorithm 1
          // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
          add(other) {
            aprjpoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
            const a = CURVE.a;
            const b3 = Fp2.mul(CURVE.b, _3n4);
            let t0 = Fp2.mul(X1, X2);
            let t1 = Fp2.mul(Y1, Y2);
            let t2 = Fp2.mul(Z1, Z2);
            let t3 = Fp2.add(X1, Y1);
            let t4 = Fp2.add(X2, Y2);
            t3 = Fp2.mul(t3, t4);
            t4 = Fp2.add(t0, t1);
            t3 = Fp2.sub(t3, t4);
            t4 = Fp2.add(X1, Z1);
            let t5 = Fp2.add(X2, Z2);
            t4 = Fp2.mul(t4, t5);
            t5 = Fp2.add(t0, t2);
            t4 = Fp2.sub(t4, t5);
            t5 = Fp2.add(Y1, Z1);
            X3 = Fp2.add(Y2, Z2);
            t5 = Fp2.mul(t5, X3);
            X3 = Fp2.add(t1, t2);
            t5 = Fp2.sub(t5, X3);
            Z3 = Fp2.mul(a, t4);
            X3 = Fp2.mul(b3, t2);
            Z3 = Fp2.add(X3, Z3);
            X3 = Fp2.sub(t1, Z3);
            Z3 = Fp2.add(t1, Z3);
            Y3 = Fp2.mul(X3, Z3);
            t1 = Fp2.add(t0, t0);
            t1 = Fp2.add(t1, t0);
            t2 = Fp2.mul(a, t2);
            t4 = Fp2.mul(b3, t4);
            t1 = Fp2.add(t1, t2);
            t2 = Fp2.sub(t0, t2);
            t2 = Fp2.mul(a, t2);
            t4 = Fp2.add(t4, t2);
            t0 = Fp2.mul(t1, t4);
            Y3 = Fp2.add(Y3, t0);
            t0 = Fp2.mul(t5, t4);
            X3 = Fp2.mul(t3, X3);
            X3 = Fp2.sub(X3, t0);
            t0 = Fp2.mul(t3, t1);
            Z3 = Fp2.mul(t5, Z3);
            Z3 = Fp2.add(Z3, t0);
            return new Point2(X3, Y3, Z3);
          }
          subtract(other) {
            return this.add(other.negate());
          }
          is0() {
            return this.equals(Point2.ZERO);
          }
          wNAF(n) {
            return wnaf.wNAFCached(this, n, Point2.normalizeZ);
          }
          /**
           * Non-constant-time multiplication. Uses double-and-add algorithm.
           * It's faster, but should only be used when you don't care about
           * an exposed private key e.g. sig verification, which works over *public* keys.
           */
          multiplyUnsafe(sc) {
            const { endo, n: N } = CURVE;
            (0, utils_ts_1.aInRange)("scalar", sc, _0n9, N);
            const I = Point2.ZERO;
            if (sc === _0n9)
              return I;
            if (this.is0() || sc === _1n9)
              return this;
            if (!endo || wnaf.hasPrecomputes(this))
              return wnaf.wNAFCachedUnsafe(this, sc, Point2.normalizeZ);
            let { k1neg, k1, k2neg, k2 } = endo.splitScalar(sc);
            let k1p = I;
            let k2p = I;
            let d = this;
            while (k1 > _0n9 || k2 > _0n9) {
              if (k1 & _1n9)
                k1p = k1p.add(d);
              if (k2 & _1n9)
                k2p = k2p.add(d);
              d = d.double();
              k1 >>= _1n9;
              k2 >>= _1n9;
            }
            if (k1neg)
              k1p = k1p.negate();
            if (k2neg)
              k2p = k2p.negate();
            k2p = new Point2(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
            return k1p.add(k2p);
          }
          /**
           * Constant time multiplication.
           * Uses wNAF method. Windowed method may be 10% faster,
           * but takes 2x longer to generate and consumes 2x memory.
           * Uses precomputes when available.
           * Uses endomorphism for Koblitz curves.
           * @param scalar by which the point would be multiplied
           * @returns New point
           */
          multiply(scalar) {
            const { endo, n: N } = CURVE;
            (0, utils_ts_1.aInRange)("scalar", scalar, _1n9, N);
            let point, fake;
            if (endo) {
              const { k1neg, k1, k2neg, k2 } = endo.splitScalar(scalar);
              let { p: k1p, f: f1p } = this.wNAF(k1);
              let { p: k2p, f: f2p } = this.wNAF(k2);
              k1p = wnaf.constTimeNegate(k1neg, k1p);
              k2p = wnaf.constTimeNegate(k2neg, k2p);
              k2p = new Point2(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
              point = k1p.add(k2p);
              fake = f1p.add(f2p);
            } else {
              const { p, f } = this.wNAF(scalar);
              point = p;
              fake = f;
            }
            return Point2.normalizeZ([point, fake])[0];
          }
          /**
           * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
           * Not using Strauss-Shamir trick: precomputation tables are faster.
           * The trick could be useful if both P and Q are not G (not in our case).
           * @returns non-zero affine point
           */
          multiplyAndAddUnsafe(Q, a, b) {
            const G = Point2.BASE;
            const mul = (P, a2) => a2 === _0n9 || a2 === _1n9 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
            const sum = mul(this, a).add(mul(Q, b));
            return sum.is0() ? void 0 : sum;
          }
          // Converts Projective point to affine (x, y) coordinates.
          // Can accept precomputed Z^-1 - for example, from invertBatch.
          // (x, y, z) ∋ (x=x/z, y=y/z)
          toAffine(iz) {
            return toAffineMemo(this, iz);
          }
          isTorsionFree() {
            const { h: cofactor, isTorsionFree } = CURVE;
            if (cofactor === _1n9)
              return true;
            if (isTorsionFree)
              return isTorsionFree(Point2, this);
            throw new Error("isTorsionFree() has not been declared for the elliptic curve");
          }
          clearCofactor() {
            const { h: cofactor, clearCofactor } = CURVE;
            if (cofactor === _1n9)
              return this;
            if (clearCofactor)
              return clearCofactor(Point2, this);
            return this.multiplyUnsafe(CURVE.h);
          }
          toRawBytes(isCompressed = true) {
            (0, utils_ts_1.abool)("isCompressed", isCompressed);
            this.assertValidity();
            return toBytes3(Point2, this, isCompressed);
          }
          toHex(isCompressed = true) {
            (0, utils_ts_1.abool)("isCompressed", isCompressed);
            return (0, utils_ts_1.bytesToHex)(this.toRawBytes(isCompressed));
          }
        }
        Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, Fp2.ONE);
        Point2.ZERO = new Point2(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
        const _bits = CURVE.nBitLength;
        const wnaf = (0, curve_ts_1.wNAF)(Point2, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
        return {
          CURVE,
          ProjectivePoint: Point2,
          normPrivateKeyToScalar,
          weierstrassEquation,
          isWithinCurveOrder
        };
      }
      function validateOpts3(curve) {
        const opts = (0, curve_ts_1.validateBasic)(curve);
        (0, utils_ts_1.validateObject)(opts, {
          hash: "hash",
          hmac: "function",
          randomBytes: "function"
        }, {
          bits2int: "function",
          bits2int_modN: "function",
          lowS: "boolean"
        });
        return Object.freeze({ lowS: true, ...opts });
      }
      function weierstrass2(curveDef) {
        const CURVE = validateOpts3(curveDef);
        const { Fp: Fp2, n: CURVE_ORDER } = CURVE;
        const compressedLen = Fp2.BYTES + 1;
        const uncompressedLen = 2 * Fp2.BYTES + 1;
        function modN(a) {
          return (0, modular_ts_1.mod)(a, CURVE_ORDER);
        }
        function invN(a) {
          return (0, modular_ts_1.invert)(a, CURVE_ORDER);
        }
        const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints2({
          ...CURVE,
          toBytes(_c, point, isCompressed) {
            const a = point.toAffine();
            const x = Fp2.toBytes(a.x);
            const cat = utils_ts_1.concatBytes;
            (0, utils_ts_1.abool)("isCompressed", isCompressed);
            if (isCompressed) {
              return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
            } else {
              return cat(Uint8Array.from([4]), x, Fp2.toBytes(a.y));
            }
          },
          fromBytes(bytes) {
            const len = bytes.length;
            const head = bytes[0];
            const tail = bytes.subarray(1);
            if (len === compressedLen && (head === 2 || head === 3)) {
              const x = (0, utils_ts_1.bytesToNumberBE)(tail);
              if (!(0, utils_ts_1.inRange)(x, _1n9, Fp2.ORDER))
                throw new Error("Point is not on curve");
              const y2 = weierstrassEquation(x);
              let y;
              try {
                y = Fp2.sqrt(y2);
              } catch (sqrtError) {
                const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
                throw new Error("Point is not on curve" + suffix);
              }
              const isYOdd = (y & _1n9) === _1n9;
              const isHeadOdd = (head & 1) === 1;
              if (isHeadOdd !== isYOdd)
                y = Fp2.neg(y);
              return { x, y };
            } else if (len === uncompressedLen && head === 4) {
              const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
              const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
              return { x, y };
            } else {
              const cl = compressedLen;
              const ul = uncompressedLen;
              throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
            }
          }
        });
        const numToNByteHex = (num) => (0, utils_ts_1.bytesToHex)((0, utils_ts_1.numberToBytesBE)(num, CURVE.nByteLength));
        function isBiggerThanHalfOrder(number) {
          const HALF = CURVE_ORDER >> _1n9;
          return number > HALF;
        }
        function normalizeS(s) {
          return isBiggerThanHalfOrder(s) ? modN(-s) : s;
        }
        const slcNum = (b, from3, to) => (0, utils_ts_1.bytesToNumberBE)(b.slice(from3, to));
        class Signature {
          constructor(r, s, recovery) {
            (0, utils_ts_1.aInRange)("r", r, _1n9, CURVE_ORDER);
            (0, utils_ts_1.aInRange)("s", s, _1n9, CURVE_ORDER);
            this.r = r;
            this.s = s;
            if (recovery != null)
              this.recovery = recovery;
            Object.freeze(this);
          }
          // pair (bytes of r, bytes of s)
          static fromCompact(hex) {
            const l = CURVE.nByteLength;
            hex = (0, utils_ts_1.ensureBytes)("compactSignature", hex, l * 2);
            return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
          }
          // DER encoded ECDSA signature
          // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
          static fromDER(hex) {
            const { r, s } = exports.DER.toSig((0, utils_ts_1.ensureBytes)("DER", hex));
            return new Signature(r, s);
          }
          /**
           * @todo remove
           * @deprecated
           */
          assertValidity() {
          }
          addRecoveryBit(recovery) {
            return new Signature(this.r, this.s, recovery);
          }
          recoverPublicKey(msgHash) {
            const { r, s, recovery: rec } = this;
            const h = bits2int_modN((0, utils_ts_1.ensureBytes)("msgHash", msgHash));
            if (rec == null || ![0, 1, 2, 3].includes(rec))
              throw new Error("recovery id invalid");
            const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
            if (radj >= Fp2.ORDER)
              throw new Error("recovery id 2 or 3 invalid");
            const prefix = (rec & 1) === 0 ? "02" : "03";
            const R = Point2.fromHex(prefix + numToNByteHex(radj));
            const ir = invN(radj);
            const u1 = modN(-h * ir);
            const u2 = modN(s * ir);
            const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u2);
            if (!Q)
              throw new Error("point at infinify");
            Q.assertValidity();
            return Q;
          }
          // Signatures should be low-s, to prevent malleability.
          hasHighS() {
            return isBiggerThanHalfOrder(this.s);
          }
          normalizeS() {
            return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
          }
          // DER-encoded
          toDERRawBytes() {
            return (0, utils_ts_1.hexToBytes)(this.toDERHex());
          }
          toDERHex() {
            return exports.DER.hexFromSig({ r: this.r, s: this.s });
          }
          // padded bytes of r, then padded bytes of s
          toCompactRawBytes() {
            return (0, utils_ts_1.hexToBytes)(this.toCompactHex());
          }
          toCompactHex() {
            return numToNByteHex(this.r) + numToNByteHex(this.s);
          }
        }
        const utils = {
          isValidPrivateKey(privateKey) {
            try {
              normPrivateKeyToScalar(privateKey);
              return true;
            } catch (error) {
              return false;
            }
          },
          normPrivateKeyToScalar,
          /**
           * Produces cryptographically secure private key from random of size
           * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
           */
          randomPrivateKey: () => {
            const length2 = (0, modular_ts_1.getMinHashLength)(CURVE.n);
            return (0, modular_ts_1.mapHashToField)(CURVE.randomBytes(length2), CURVE.n);
          },
          /**
           * Creates precompute table for an arbitrary EC point. Makes point "cached".
           * Allows to massively speed-up `point.multiply(scalar)`.
           * @returns cached point
           * @example
           * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
           * fast.multiply(privKey); // much faster ECDH now
           */
          precompute(windowSize = 8, point = Point2.BASE) {
            point._setWindowSize(windowSize);
            point.multiply(BigInt(3));
            return point;
          }
        };
        function getPublicKey(privateKey, isCompressed = true) {
          return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
        }
        function isProbPub(item) {
          const arr = (0, utils_ts_1.isBytes)(item);
          const str = typeof item === "string";
          const len = (arr || str) && item.length;
          if (arr)
            return len === compressedLen || len === uncompressedLen;
          if (str)
            return len === 2 * compressedLen || len === 2 * uncompressedLen;
          if (item instanceof Point2)
            return true;
          return false;
        }
        function getSharedSecret(privateA, publicB, isCompressed = true) {
          if (isProbPub(privateA))
            throw new Error("first arg must be private key");
          if (!isProbPub(publicB))
            throw new Error("second arg must be public key");
          const b = Point2.fromHex(publicB);
          return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
        }
        const bits2int = CURVE.bits2int || function(bytes) {
          if (bytes.length > 8192)
            throw new Error("input is too large");
          const num = (0, utils_ts_1.bytesToNumberBE)(bytes);
          const delta = bytes.length * 8 - CURVE.nBitLength;
          return delta > 0 ? num >> BigInt(delta) : num;
        };
        const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
          return modN(bits2int(bytes));
        };
        const ORDER_MASK = (0, utils_ts_1.bitMask)(CURVE.nBitLength);
        function int2octets(num) {
          (0, utils_ts_1.aInRange)("num < 2^" + CURVE.nBitLength, num, _0n9, ORDER_MASK);
          return (0, utils_ts_1.numberToBytesBE)(num, CURVE.nByteLength);
        }
        function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
          if (["recovered", "canonical"].some((k) => k in opts))
            throw new Error("sign() legacy options not supported");
          const { hash, randomBytes: randomBytes2 } = CURVE;
          let { lowS, prehash, extraEntropy: ent } = opts;
          if (lowS == null)
            lowS = true;
          msgHash = (0, utils_ts_1.ensureBytes)("msgHash", msgHash);
          validateSigVerOpts2(opts);
          if (prehash)
            msgHash = (0, utils_ts_1.ensureBytes)("prehashed msgHash", hash(msgHash));
          const h1int = bits2int_modN(msgHash);
          const d = normPrivateKeyToScalar(privateKey);
          const seedArgs = [int2octets(d), int2octets(h1int)];
          if (ent != null && ent !== false) {
            const e = ent === true ? randomBytes2(Fp2.BYTES) : ent;
            seedArgs.push((0, utils_ts_1.ensureBytes)("extraEntropy", e));
          }
          const seed = (0, utils_ts_1.concatBytes)(...seedArgs);
          const m = h1int;
          function k2sig(kBytes) {
            const k = bits2int(kBytes);
            if (!isWithinCurveOrder(k))
              return;
            const ik = invN(k);
            const q = Point2.BASE.multiply(k).toAffine();
            const r = modN(q.x);
            if (r === _0n9)
              return;
            const s = modN(ik * modN(m + r * d));
            if (s === _0n9)
              return;
            let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n9);
            let normS = s;
            if (lowS && isBiggerThanHalfOrder(s)) {
              normS = normalizeS(s);
              recovery ^= 1;
            }
            return new Signature(r, normS, recovery);
          }
          return { seed, k2sig };
        }
        const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
        const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
        function sign(msgHash, privKey, opts = defaultSigOpts) {
          const { seed, k2sig } = prepSig(msgHash, privKey, opts);
          const C = CURVE;
          const drbg = (0, utils_ts_1.createHmacDrbg)(C.hash.outputLen, C.nByteLength, C.hmac);
          return drbg(seed, k2sig);
        }
        Point2.BASE._setWindowSize(8);
        function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
          const sg = signature;
          msgHash = (0, utils_ts_1.ensureBytes)("msgHash", msgHash);
          publicKey = (0, utils_ts_1.ensureBytes)("publicKey", publicKey);
          const { lowS, prehash, format } = opts;
          validateSigVerOpts2(opts);
          if ("strict" in opts)
            throw new Error("options.strict was renamed to lowS");
          if (format !== void 0 && format !== "compact" && format !== "der")
            throw new Error("format must be compact or der");
          const isHex = typeof sg === "string" || (0, utils_ts_1.isBytes)(sg);
          const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
          if (!isHex && !isObj)
            throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
          let _sig = void 0;
          let P;
          try {
            if (isObj)
              _sig = new Signature(sg.r, sg.s);
            if (isHex) {
              try {
                if (format !== "compact")
                  _sig = Signature.fromDER(sg);
              } catch (derError) {
                if (!(derError instanceof exports.DER.Err))
                  throw derError;
              }
              if (!_sig && format !== "der")
                _sig = Signature.fromCompact(sg);
            }
            P = Point2.fromHex(publicKey);
          } catch (error) {
            return false;
          }
          if (!_sig)
            return false;
          if (lowS && _sig.hasHighS())
            return false;
          if (prehash)
            msgHash = CURVE.hash(msgHash);
          const { r, s } = _sig;
          const h = bits2int_modN(msgHash);
          const is = invN(s);
          const u1 = modN(h * is);
          const u2 = modN(r * is);
          const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
          if (!R)
            return false;
          const v = modN(R.x);
          return v === r;
        }
        return {
          CURVE,
          getPublicKey,
          getSharedSecret,
          sign,
          verify,
          ProjectivePoint: Point2,
          Signature,
          utils
        };
      }
      function SWUFpSqrtRatio(Fp2, Z) {
        const q = Fp2.ORDER;
        let l = _0n9;
        for (let o = q - _1n9; o % _2n7 === _0n9; o /= _2n7)
          l += _1n9;
        const c1 = l;
        const _2n_pow_c1_1 = _2n7 << c1 - _1n9 - _1n9;
        const _2n_pow_c1 = _2n_pow_c1_1 * _2n7;
        const c2 = (q - _1n9) / _2n_pow_c1;
        const c3 = (c2 - _1n9) / _2n7;
        const c4 = _2n_pow_c1 - _1n9;
        const c5 = _2n_pow_c1_1;
        const c6 = Fp2.pow(Z, c2);
        const c7 = Fp2.pow(Z, (c2 + _1n9) / _2n7);
        let sqrtRatio = (u, v) => {
          let tv1 = c6;
          let tv2 = Fp2.pow(v, c4);
          let tv3 = Fp2.sqr(tv2);
          tv3 = Fp2.mul(tv3, v);
          let tv5 = Fp2.mul(u, tv3);
          tv5 = Fp2.pow(tv5, c3);
          tv5 = Fp2.mul(tv5, tv2);
          tv2 = Fp2.mul(tv5, v);
          tv3 = Fp2.mul(tv5, u);
          let tv4 = Fp2.mul(tv3, tv2);
          tv5 = Fp2.pow(tv4, c5);
          let isQR = Fp2.eql(tv5, Fp2.ONE);
          tv2 = Fp2.mul(tv3, c7);
          tv5 = Fp2.mul(tv4, tv1);
          tv3 = Fp2.cmov(tv2, tv3, isQR);
          tv4 = Fp2.cmov(tv5, tv4, isQR);
          for (let i = c1; i > _1n9; i--) {
            let tv52 = i - _2n7;
            tv52 = _2n7 << tv52 - _1n9;
            let tvv5 = Fp2.pow(tv4, tv52);
            const e1 = Fp2.eql(tvv5, Fp2.ONE);
            tv2 = Fp2.mul(tv3, tv1);
            tv1 = Fp2.mul(tv1, tv1);
            tvv5 = Fp2.mul(tv4, tv1);
            tv3 = Fp2.cmov(tv2, tv3, e1);
            tv4 = Fp2.cmov(tvv5, tv4, e1);
          }
          return { isValid: isQR, value: tv3 };
        };
        if (Fp2.ORDER % _4n3 === _3n4) {
          const c12 = (Fp2.ORDER - _3n4) / _4n3;
          const c22 = Fp2.sqrt(Fp2.neg(Z));
          sqrtRatio = (u, v) => {
            let tv1 = Fp2.sqr(v);
            const tv2 = Fp2.mul(u, v);
            tv1 = Fp2.mul(tv1, tv2);
            let y1 = Fp2.pow(tv1, c12);
            y1 = Fp2.mul(y1, tv2);
            const y2 = Fp2.mul(y1, c22);
            const tv3 = Fp2.mul(Fp2.sqr(y1), v);
            const isQR = Fp2.eql(tv3, u);
            let y = Fp2.cmov(y2, y1, isQR);
            return { isValid: isQR, value: y };
          };
        }
        return sqrtRatio;
      }
      function mapToCurveSimpleSWU(Fp2, opts) {
        (0, modular_ts_1.validateField)(Fp2);
        if (!Fp2.isValid(opts.A) || !Fp2.isValid(opts.B) || !Fp2.isValid(opts.Z))
          throw new Error("mapToCurveSimpleSWU: invalid opts");
        const sqrtRatio = SWUFpSqrtRatio(Fp2, opts.Z);
        if (!Fp2.isOdd)
          throw new Error("Fp.isOdd is not implemented!");
        return (u) => {
          let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
          tv1 = Fp2.sqr(u);
          tv1 = Fp2.mul(tv1, opts.Z);
          tv2 = Fp2.sqr(tv1);
          tv2 = Fp2.add(tv2, tv1);
          tv3 = Fp2.add(tv2, Fp2.ONE);
          tv3 = Fp2.mul(tv3, opts.B);
          tv4 = Fp2.cmov(opts.Z, Fp2.neg(tv2), !Fp2.eql(tv2, Fp2.ZERO));
          tv4 = Fp2.mul(tv4, opts.A);
          tv2 = Fp2.sqr(tv3);
          tv6 = Fp2.sqr(tv4);
          tv5 = Fp2.mul(tv6, opts.A);
          tv2 = Fp2.add(tv2, tv5);
          tv2 = Fp2.mul(tv2, tv3);
          tv6 = Fp2.mul(tv6, tv4);
          tv5 = Fp2.mul(tv6, opts.B);
          tv2 = Fp2.add(tv2, tv5);
          x = Fp2.mul(tv1, tv3);
          const { isValid, value } = sqrtRatio(tv2, tv6);
          y = Fp2.mul(tv1, u);
          y = Fp2.mul(y, value);
          x = Fp2.cmov(x, tv3, isValid);
          y = Fp2.cmov(y, value, isValid);
          const e1 = Fp2.isOdd(u) === Fp2.isOdd(y);
          y = Fp2.cmov(Fp2.neg(y), y, e1);
          x = Fp2.div(x, tv4);
          return { x, y };
        };
      }
    }
  });

  // node_modules/@noble/curves/_shortw_utils.js
  var require_shortw_utils = __commonJS({
    "node_modules/@noble/curves/_shortw_utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getHash = getHash2;
      exports.createCurve = createCurve2;
      var hmac_1 = require_hmac();
      var utils_1 = require_utils2();
      var weierstrass_ts_1 = require_weierstrass();
      function getHash2(hash) {
        return {
          hash,
          hmac: (key, ...msgs) => (0, hmac_1.hmac)(hash, key, (0, utils_1.concatBytes)(...msgs)),
          randomBytes: utils_1.randomBytes
        };
      }
      function createCurve2(curveDef, defHash) {
        const create2 = (hash) => (0, weierstrass_ts_1.weierstrass)({ ...curveDef, ...getHash2(hash) });
        return { ...create2(defHash), create: create2 };
      }
    }
  });

  // node_modules/@noble/curves/secp256k1.js
  var require_secp256k1 = __commonJS({
    "node_modules/@noble/curves/secp256k1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.encodeToCurve = exports.hashToCurve = exports.schnorr = exports.secp256k1 = void 0;
      var sha2_1 = require_sha2();
      var utils_1 = require_utils2();
      var _shortw_utils_ts_1 = require_shortw_utils();
      var hash_to_curve_ts_1 = require_hash_to_curve();
      var modular_ts_1 = require_modular();
      var utils_ts_1 = require_utils3();
      var weierstrass_ts_1 = require_weierstrass();
      var secp256k1P2 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
      var secp256k1N2 = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
      var _1n9 = BigInt(1);
      var _2n7 = BigInt(2);
      var divNearest2 = (a, b) => (a + b / _2n7) / b;
      function sqrtMod2(y) {
        const P = secp256k1P2;
        const _3n4 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
        const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
        const b2 = y * y * y % P;
        const b3 = b2 * b2 * y % P;
        const b6 = (0, modular_ts_1.pow2)(b3, _3n4, P) * b3 % P;
        const b9 = (0, modular_ts_1.pow2)(b6, _3n4, P) * b3 % P;
        const b11 = (0, modular_ts_1.pow2)(b9, _2n7, P) * b2 % P;
        const b22 = (0, modular_ts_1.pow2)(b11, _11n, P) * b11 % P;
        const b44 = (0, modular_ts_1.pow2)(b22, _22n, P) * b22 % P;
        const b88 = (0, modular_ts_1.pow2)(b44, _44n, P) * b44 % P;
        const b176 = (0, modular_ts_1.pow2)(b88, _88n, P) * b88 % P;
        const b220 = (0, modular_ts_1.pow2)(b176, _44n, P) * b44 % P;
        const b223 = (0, modular_ts_1.pow2)(b220, _3n4, P) * b3 % P;
        const t1 = (0, modular_ts_1.pow2)(b223, _23n, P) * b22 % P;
        const t2 = (0, modular_ts_1.pow2)(t1, _6n, P) * b2 % P;
        const root = (0, modular_ts_1.pow2)(t2, _2n7, P);
        if (!Fpk12.eql(Fpk12.sqr(root), y))
          throw new Error("Cannot find square root");
        return root;
      }
      var Fpk12 = (0, modular_ts_1.Field)(secp256k1P2, void 0, void 0, { sqrt: sqrtMod2 });
      exports.secp256k1 = (0, _shortw_utils_ts_1.createCurve)({
        a: BigInt(0),
        b: BigInt(7),
        Fp: Fpk12,
        n: secp256k1N2,
        Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
        Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
        h: BigInt(1),
        // Cofactor
        lowS: true,
        // Allow only low-S signatures by default in sign() and verify()
        endo: {
          // Endomorphism, see above
          beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
          splitScalar: (k) => {
            const n = secp256k1N2;
            const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
            const b1 = -_1n9 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
            const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
            const b2 = a1;
            const POW_2_128 = BigInt("0x100000000000000000000000000000000");
            const c1 = divNearest2(b2 * k, n);
            const c2 = divNearest2(-b1 * k, n);
            let k1 = (0, modular_ts_1.mod)(k - c1 * a1 - c2 * a2, n);
            let k2 = (0, modular_ts_1.mod)(-c1 * b1 - c2 * b2, n);
            const k1neg = k1 > POW_2_128;
            const k2neg = k2 > POW_2_128;
            if (k1neg)
              k1 = n - k1;
            if (k2neg)
              k2 = n - k2;
            if (k1 > POW_2_128 || k2 > POW_2_128) {
              throw new Error("splitScalar: Endomorphism failed, k=" + k);
            }
            return { k1neg, k1, k2neg, k2 };
          }
        }
      }, sha2_1.sha256);
      var _0n9 = BigInt(0);
      var TAGGED_HASH_PREFIXES = {};
      function taggedHash(tag, ...messages) {
        let tagP = TAGGED_HASH_PREFIXES[tag];
        if (tagP === void 0) {
          const tagH = (0, sha2_1.sha256)(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
          tagP = (0, utils_ts_1.concatBytes)(tagH, tagH);
          TAGGED_HASH_PREFIXES[tag] = tagP;
        }
        return (0, sha2_1.sha256)((0, utils_ts_1.concatBytes)(tagP, ...messages));
      }
      var pointToBytes = (point) => point.toRawBytes(true).slice(1);
      var numTo32b = (n) => (0, utils_ts_1.numberToBytesBE)(n, 32);
      var modP = (x) => (0, modular_ts_1.mod)(x, secp256k1P2);
      var modN = (x) => (0, modular_ts_1.mod)(x, secp256k1N2);
      var Point2 = exports.secp256k1.ProjectivePoint;
      var GmulAdd = (Q, a, b) => Point2.BASE.multiplyAndAddUnsafe(Q, a, b);
      function schnorrGetExtPubKey(priv) {
        let d_ = exports.secp256k1.utils.normPrivateKeyToScalar(priv);
        let p = Point2.fromPrivateKey(d_);
        const scalar = p.hasEvenY() ? d_ : modN(-d_);
        return { scalar, bytes: pointToBytes(p) };
      }
      function lift_x(x) {
        (0, utils_ts_1.aInRange)("x", x, _1n9, secp256k1P2);
        const xx = modP(x * x);
        const c = modP(xx * x + BigInt(7));
        let y = sqrtMod2(c);
        if (y % _2n7 !== _0n9)
          y = modP(-y);
        const p = new Point2(x, y, _1n9);
        p.assertValidity();
        return p;
      }
      var num = utils_ts_1.bytesToNumberBE;
      function challenge(...args) {
        return modN(num(taggedHash("BIP0340/challenge", ...args)));
      }
      function schnorrGetPublicKey(privateKey) {
        return schnorrGetExtPubKey(privateKey).bytes;
      }
      function schnorrSign(message, privateKey, auxRand = (0, utils_1.randomBytes)(32)) {
        const m = (0, utils_ts_1.ensureBytes)("message", message);
        const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey);
        const a = (0, utils_ts_1.ensureBytes)("auxRand", auxRand, 32);
        const t = numTo32b(d ^ num(taggedHash("BIP0340/aux", a)));
        const rand = taggedHash("BIP0340/nonce", t, px, m);
        const k_ = modN(num(rand));
        if (k_ === _0n9)
          throw new Error("sign failed: k is zero");
        const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_);
        const e = challenge(rx, px, m);
        const sig = new Uint8Array(64);
        sig.set(rx, 0);
        sig.set(numTo32b(modN(k + e * d)), 32);
        if (!schnorrVerify(sig, m, px))
          throw new Error("sign: Invalid signature produced");
        return sig;
      }
      function schnorrVerify(signature, message, publicKey) {
        const sig = (0, utils_ts_1.ensureBytes)("signature", signature, 64);
        const m = (0, utils_ts_1.ensureBytes)("message", message);
        const pub = (0, utils_ts_1.ensureBytes)("publicKey", publicKey, 32);
        try {
          const P = lift_x(num(pub));
          const r = num(sig.subarray(0, 32));
          if (!(0, utils_ts_1.inRange)(r, _1n9, secp256k1P2))
            return false;
          const s = num(sig.subarray(32, 64));
          if (!(0, utils_ts_1.inRange)(s, _1n9, secp256k1N2))
            return false;
          const e = challenge(numTo32b(r), pointToBytes(P), m);
          const R = GmulAdd(P, s, modN(-e));
          if (!R || !R.hasEvenY() || R.toAffine().x !== r)
            return false;
          return true;
        } catch (error) {
          return false;
        }
      }
      exports.schnorr = (() => ({
        getPublicKey: schnorrGetPublicKey,
        sign: schnorrSign,
        verify: schnorrVerify,
        utils: {
          randomPrivateKey: exports.secp256k1.utils.randomPrivateKey,
          lift_x,
          pointToBytes,
          numberToBytesBE: utils_ts_1.numberToBytesBE,
          bytesToNumberBE: utils_ts_1.bytesToNumberBE,
          taggedHash,
          mod: modular_ts_1.mod
        }
      }))();
      var isoMap = /* @__PURE__ */ (() => (0, hash_to_curve_ts_1.isogenyMap)(Fpk12, [
        // xNum
        [
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
          "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
          "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
        ],
        // xDen
        [
          "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
          "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
          // LAST 1
        ],
        // yNum
        [
          "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
          "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
          "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
          "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
        ],
        // yDen
        [
          "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
          "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
          "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
          // LAST 1
        ]
      ].map((i) => i.map((j) => BigInt(j)))))();
      var mapSWU = /* @__PURE__ */ (() => (0, weierstrass_ts_1.mapToCurveSimpleSWU)(Fpk12, {
        A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
        B: BigInt("1771"),
        Z: Fpk12.create(BigInt("-11"))
      }))();
      var htf = /* @__PURE__ */ (() => (0, hash_to_curve_ts_1.createHasher)(exports.secp256k1.ProjectivePoint, (scalars) => {
        const { x, y } = mapSWU(Fpk12.create(scalars[0]));
        return isoMap(x, y);
      }, {
        DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
        encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
        p: Fpk12.ORDER,
        m: 1,
        k: 128,
        expand: "xmd",
        hash: sha2_1.sha256
      }))();
      exports.hashToCurve = (() => htf.hashToCurve)();
      exports.encodeToCurve = (() => htf.encodeToCurve)();
    }
  });

  // node_modules/eciesjs/dist/utils/hex.js
  var require_hex = __commonJS({
    "node_modules/eciesjs/dist/utils/hex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.decodeHex = exports.remove0x = void 0;
      var utils_1 = require_utils();
      var remove0x = function(hex) {
        return hex.startsWith("0x") || hex.startsWith("0X") ? hex.slice(2) : hex;
      };
      exports.remove0x = remove0x;
      var decodeHex = function(hex) {
        return (0, utils_1.hexToBytes)((0, exports.remove0x)(hex));
      };
      exports.decodeHex = decodeHex;
    }
  });

  // node_modules/eciesjs/dist/utils/elliptic.js
  var require_elliptic = __commonJS({
    "node_modules/eciesjs/dist/utils/elliptic.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hexToPublicKey = exports.convertPublicKeyFormat = exports.getSharedPoint = exports.getPublicKey = exports.isValidPrivateKey = exports.getValidSecret = void 0;
      var webcrypto_1 = require_webcrypto();
      var ed25519_1 = require_ed25519();
      var secp256k1_1 = require_secp256k1();
      var config_1 = require_config();
      var consts_1 = require_consts();
      var hex_1 = require_hex();
      var getValidSecret = function() {
        var key;
        do {
          key = (0, webcrypto_1.randomBytes)(consts_1.SECRET_KEY_LENGTH);
        } while (!(0, exports.isValidPrivateKey)(key));
        return key;
      };
      exports.getValidSecret = getValidSecret;
      var isValidPrivateKey = function(secret) {
        return _exec((0, config_1.ellipticCurve)(), function(curve) {
          return curve.utils.isValidPrivateKey(secret);
        }, function() {
          return true;
        }, function() {
          return true;
        });
      };
      exports.isValidPrivateKey = isValidPrivateKey;
      var getPublicKey = function(secret) {
        return _exec((0, config_1.ellipticCurve)(), function(curve) {
          return curve.getPublicKey(secret);
        }, function(curve) {
          return curve.getPublicKey(secret);
        }, function(curve) {
          return curve.getPublicKey(secret);
        });
      };
      exports.getPublicKey = getPublicKey;
      var getSharedPoint = function(sk, pk, compressed) {
        return _exec((0, config_1.ellipticCurve)(), function(curve) {
          return curve.getSharedSecret(sk, pk, compressed);
        }, function(curve) {
          return curve.getSharedSecret(sk, pk);
        }, function(curve) {
          return getSharedPointOnEd25519(curve, sk, pk);
        });
      };
      exports.getSharedPoint = getSharedPoint;
      var convertPublicKeyFormat = function(pk, compressed) {
        return _exec((0, config_1.ellipticCurve)(), function(curve) {
          return curve.getSharedSecret(BigInt(1), pk, compressed);
        }, function() {
          return pk;
        }, function() {
          return pk;
        });
      };
      exports.convertPublicKeyFormat = convertPublicKeyFormat;
      var hexToPublicKey = function(hex) {
        var decoded = (0, hex_1.decodeHex)(hex);
        return _exec((0, config_1.ellipticCurve)(), function() {
          return compatEthPublicKey(decoded);
        }, function() {
          return decoded;
        }, function() {
          return decoded;
        });
      };
      exports.hexToPublicKey = hexToPublicKey;
      function _exec(curve, secp256k1Callback, x25519Callback, ed25519Callback) {
        if (curve === "secp256k1") {
          return secp256k1Callback(secp256k1_1.secp256k1);
        } else if (curve === "x25519") {
          return x25519Callback(ed25519_1.x25519);
        } else if (curve === "ed25519") {
          return ed25519Callback(ed25519_1.ed25519);
        } else {
          throw new Error("Not implemented");
        }
      }
      var compatEthPublicKey = function(pk) {
        if (pk.length === consts_1.ETH_PUBLIC_KEY_SIZE) {
          var fixed = new Uint8Array(1 + pk.length);
          fixed.set([4]);
          fixed.set(pk, 1);
          return fixed;
        }
        return pk;
      };
      var getSharedPointOnEd25519 = function(curve, sk, pk) {
        var scalar = curve.utils.getExtendedPublicKey(sk).scalar;
        var point = curve.ExtendedPoint.fromHex(pk).multiply(scalar);
        return point.toRawBytes();
      };
    }
  });

  // node_modules/@noble/hashes/crypto.js
  var require_crypto3 = __commonJS({
    "node_modules/@noble/hashes/crypto.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.crypto = void 0;
      exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
    }
  });

  // node_modules/@noble/hashes/utils.js
  var require_utils4 = __commonJS({
    "node_modules/@noble/hashes/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
      exports.isBytes = isBytes5;
      exports.anumber = anumber4;
      exports.abytes = abytes4;
      exports.ahash = ahash2;
      exports.aexists = aexists3;
      exports.aoutput = aoutput3;
      exports.u8 = u8;
      exports.u32 = u322;
      exports.clean = clean2;
      exports.createView = createView3;
      exports.rotr = rotr3;
      exports.rotl = rotl2;
      exports.byteSwap = byteSwap2;
      exports.byteSwap32 = byteSwap322;
      exports.bytesToHex = bytesToHex3;
      exports.hexToBytes = hexToBytes3;
      exports.asyncLoop = asyncLoop;
      exports.utf8ToBytes = utf8ToBytes3;
      exports.bytesToUtf8 = bytesToUtf8;
      exports.toBytes = toBytes3;
      exports.kdfInputToBytes = kdfInputToBytes;
      exports.concatBytes = concatBytes3;
      exports.checkOpts = checkOpts;
      exports.createHasher = createHasher2;
      exports.createOptHasher = createOptHasher;
      exports.createXOFer = createXOFer2;
      exports.randomBytes = randomBytes2;
      var crypto_1 = require_crypto3();
      function isBytes5(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function anumber4(n) {
        if (!Number.isSafeInteger(n) || n < 0)
          throw new Error("positive integer expected, got " + n);
      }
      function abytes4(b, ...lengths) {
        if (!isBytes5(b))
          throw new Error("Uint8Array expected");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
      }
      function ahash2(h) {
        if (typeof h !== "function" || typeof h.create !== "function")
          throw new Error("Hash should be wrapped by utils.createHasher");
        anumber4(h.outputLen);
        anumber4(h.blockLen);
      }
      function aexists3(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function aoutput3(out, instance) {
        abytes4(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error("digestInto() expects output buffer of length at least " + min);
        }
      }
      function u8(arr) {
        return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function u322(arr) {
        return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      }
      function clean2(...arrays) {
        for (let i = 0; i < arrays.length; i++) {
          arrays[i].fill(0);
        }
      }
      function createView3(arr) {
        return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function rotr3(word, shift) {
        return word << 32 - shift | word >>> shift;
      }
      function rotl2(word, shift) {
        return word << shift | word >>> 32 - shift >>> 0;
      }
      exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
      function byteSwap2(word) {
        return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
      }
      exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap2(n);
      exports.byteSwapIfBE = exports.swap8IfBE;
      function byteSwap322(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = byteSwap2(arr[i]);
        }
        return arr;
      }
      exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap322;
      var hasHexBuiltin3 = /* @__PURE__ */ (() => (
        // @ts-ignore
        typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
      ))();
      var hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex3(bytes) {
        abytes4(bytes);
        if (hasHexBuiltin3)
          return bytes.toHex();
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes2[bytes[i]];
        }
        return hex;
      }
      var asciis2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function asciiToBase162(ch) {
        if (ch >= asciis2._0 && ch <= asciis2._9)
          return ch - asciis2._0;
        if (ch >= asciis2.A && ch <= asciis2.F)
          return ch - (asciis2.A - 10);
        if (ch >= asciis2.a && ch <= asciis2.f)
          return ch - (asciis2.a - 10);
        return;
      }
      function hexToBytes3(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        if (hasHexBuiltin3)
          return Uint8Array.fromHex(hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error("hex string expected, got unpadded hex of length " + hl);
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase162(hex.charCodeAt(hi));
          const n2 = asciiToBase162(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      var nextTick = async () => {
      };
      exports.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick)
            continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }
      function utf8ToBytes3(str) {
        if (typeof str !== "string")
          throw new Error("string expected");
        return new Uint8Array(new TextEncoder().encode(str));
      }
      function bytesToUtf8(bytes) {
        return new TextDecoder().decode(bytes);
      }
      function toBytes3(data) {
        if (typeof data === "string")
          data = utf8ToBytes3(data);
        abytes4(data);
        return data;
      }
      function kdfInputToBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes3(data);
        abytes4(data);
        return data;
      }
      function concatBytes3(...arrays) {
        let sum = 0;
        for (let i = 0; i < arrays.length; i++) {
          const a = arrays[i];
          abytes4(a);
          sum += a.length;
        }
        const res = new Uint8Array(sum);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const a = arrays[i];
          res.set(a, pad);
          pad += a.length;
        }
        return res;
      }
      function checkOpts(defaults, opts) {
        if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
          throw new Error("options should be object or undefined");
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      var Hash3 = class {
      };
      exports.Hash = Hash3;
      function createHasher2(hashCons) {
        const hashC = (msg) => hashCons().update(toBytes3(msg)).digest();
        const tmp = hashCons();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashCons();
        return hashC;
      }
      function createOptHasher(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes3(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      function createXOFer2(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes3(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      exports.wrapConstructor = createHasher2;
      exports.wrapConstructorWithOpts = createOptHasher;
      exports.wrapXOFConstructorWithOpts = createXOFer2;
      function randomBytes2(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
          return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
        }
        throw new Error("crypto.getRandomValues must be defined");
      }
    }
  });

  // node_modules/@noble/hashes/hmac.js
  var require_hmac2 = __commonJS({
    "node_modules/@noble/hashes/hmac.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hmac = exports.HMAC = void 0;
      var utils_ts_1 = require_utils4();
      var HMAC2 = class extends utils_ts_1.Hash {
        constructor(hash, _key) {
          super();
          this.finished = false;
          this.destroyed = false;
          (0, utils_ts_1.ahash)(hash);
          const key = (0, utils_ts_1.toBytes)(_key);
          this.iHash = hash.create();
          if (typeof this.iHash.update !== "function")
            throw new Error("Expected instance of class which extends utils.Hash");
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad = new Uint8Array(blockLen);
          pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54;
          this.iHash.update(pad);
          this.oHash = hash.create();
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54 ^ 92;
          this.oHash.update(pad);
          (0, utils_ts_1.clean)(pad);
        }
        update(buf) {
          (0, utils_ts_1.aexists)(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          (0, utils_ts_1.aexists)(this);
          (0, utils_ts_1.abytes)(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      };
      exports.HMAC = HMAC2;
      var hmac2 = (hash, key, message) => new HMAC2(hash, key).update(message).digest();
      exports.hmac = hmac2;
      exports.hmac.create = (hash, key) => new HMAC2(hash, key);
    }
  });

  // node_modules/@noble/hashes/hkdf.js
  var require_hkdf = __commonJS({
    "node_modules/@noble/hashes/hkdf.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hkdf = void 0;
      exports.extract = extract;
      exports.expand = expand;
      var hmac_ts_1 = require_hmac2();
      var utils_ts_1 = require_utils4();
      function extract(hash, ikm, salt) {
        (0, utils_ts_1.ahash)(hash);
        if (salt === void 0)
          salt = new Uint8Array(hash.outputLen);
        return (0, hmac_ts_1.hmac)(hash, (0, utils_ts_1.toBytes)(salt), (0, utils_ts_1.toBytes)(ikm));
      }
      var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.from([0]);
      var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
      function expand(hash, prk, info, length2 = 32) {
        (0, utils_ts_1.ahash)(hash);
        (0, utils_ts_1.anumber)(length2);
        const olen = hash.outputLen;
        if (length2 > 255 * olen)
          throw new Error("Length should be <= 255*HashLen");
        const blocks = Math.ceil(length2 / olen);
        if (info === void 0)
          info = EMPTY_BUFFER;
        const okm = new Uint8Array(blocks * olen);
        const HMAC2 = hmac_ts_1.hmac.create(hash, prk);
        const HMACTmp = HMAC2._cloneInto();
        const T = new Uint8Array(HMAC2.outputLen);
        for (let counter = 0; counter < blocks; counter++) {
          HKDF_COUNTER[0] = counter + 1;
          HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
          okm.set(T, olen * counter);
          HMAC2._cloneInto(HMACTmp);
        }
        HMAC2.destroy();
        HMACTmp.destroy();
        (0, utils_ts_1.clean)(T, HKDF_COUNTER);
        return okm.slice(0, length2);
      }
      var hkdf = (hash, ikm, salt, info, length2) => expand(hash, extract(hash, ikm, salt), info, length2);
      exports.hkdf = hkdf;
    }
  });

  // node_modules/@noble/hashes/_md.js
  var require_md2 = __commonJS({
    "node_modules/@noble/hashes/_md.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SHA512_IV = exports.SHA384_IV = exports.SHA224_IV = exports.SHA256_IV = exports.HashMD = void 0;
      exports.setBigUint64 = setBigUint643;
      exports.Chi = Chi3;
      exports.Maj = Maj3;
      var utils_ts_1 = require_utils4();
      function setBigUint643(view, byteOffset, value, isLE2) {
        if (typeof view.setBigUint64 === "function")
          return view.setBigUint64(byteOffset, value, isLE2);
        const _32n3 = BigInt(32);
        const _u32_max = BigInt(4294967295);
        const wh = Number(value >> _32n3 & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE2 ? 4 : 0;
        const l = isLE2 ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE2);
        view.setUint32(byteOffset + l, wl, isLE2);
      }
      function Chi3(a, b, c) {
        return a & b ^ ~a & c;
      }
      function Maj3(a, b, c) {
        return a & b ^ a & c ^ b & c;
      }
      var HashMD3 = class extends utils_ts_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE2) {
          super();
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE2;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_ts_1.createView)(this.buffer);
        }
        update(data) {
          (0, utils_ts_1.aexists)(this);
          data = (0, utils_ts_1.toBytes)(data);
          (0, utils_ts_1.abytes)(data);
          const { view, buffer, blockLen } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = (0, utils_ts_1.createView)(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          (0, utils_ts_1.aexists)(this);
          (0, utils_ts_1.aoutput)(out, this);
          this.finished = true;
          const { buffer, view, blockLen, isLE: isLE2 } = this;
          let { pos } = this;
          buffer[pos++] = 128;
          (0, utils_ts_1.clean)(this.buffer.subarray(pos));
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
          setBigUint643(view, blockLen - 8, BigInt(this.length * 8), isLE2);
          this.process(view, 0);
          const oview = (0, utils_ts_1.createView)(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE2);
        }
        digest() {
          const { buffer, outputLen } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer, length: length2, finished, destroyed, pos } = this;
          to.destroyed = destroyed;
          to.finished = finished;
          to.length = length2;
          to.pos = pos;
          if (length2 % blockLen)
            to.buffer.set(buffer);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
      };
      exports.HashMD = HashMD3;
      exports.SHA256_IV = Uint32Array.from([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      exports.SHA224_IV = Uint32Array.from([
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ]);
      exports.SHA384_IV = Uint32Array.from([
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ]);
      exports.SHA512_IV = Uint32Array.from([
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ]);
    }
  });

  // node_modules/@noble/hashes/_u64.js
  var require_u642 = __commonJS({
    "node_modules/@noble/hashes/_u64.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toBig = exports.shrSL = exports.shrSH = exports.rotrSL = exports.rotrSH = exports.rotrBL = exports.rotrBH = exports.rotr32L = exports.rotr32H = exports.rotlSL = exports.rotlSH = exports.rotlBL = exports.rotlBH = exports.add5L = exports.add5H = exports.add4L = exports.add4H = exports.add3L = exports.add3H = void 0;
      exports.add = add2;
      exports.fromBig = fromBig3;
      exports.split = split3;
      var U32_MASK643 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      var _32n3 = /* @__PURE__ */ BigInt(32);
      function fromBig3(n, le = false) {
        if (le)
          return { h: Number(n & U32_MASK643), l: Number(n >> _32n3 & U32_MASK643) };
        return { h: Number(n >> _32n3 & U32_MASK643) | 0, l: Number(n & U32_MASK643) | 0 };
      }
      function split3(lst, le = false) {
        const len = lst.length;
        let Ah = new Uint32Array(len);
        let Al = new Uint32Array(len);
        for (let i = 0; i < len; i++) {
          const { h, l } = fromBig3(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      var toBig2 = (h, l) => BigInt(h >>> 0) << _32n3 | BigInt(l >>> 0);
      exports.toBig = toBig2;
      var shrSH2 = (h, _l, s) => h >>> s;
      exports.shrSH = shrSH2;
      var shrSL2 = (h, l, s) => h << 32 - s | l >>> s;
      exports.shrSL = shrSL2;
      var rotrSH2 = (h, l, s) => h >>> s | l << 32 - s;
      exports.rotrSH = rotrSH2;
      var rotrSL2 = (h, l, s) => h << 32 - s | l >>> s;
      exports.rotrSL = rotrSL2;
      var rotrBH2 = (h, l, s) => h << 64 - s | l >>> s - 32;
      exports.rotrBH = rotrBH2;
      var rotrBL2 = (h, l, s) => h >>> s - 32 | l << 64 - s;
      exports.rotrBL = rotrBL2;
      var rotr32H2 = (_h, l) => l;
      exports.rotr32H = rotr32H2;
      var rotr32L2 = (h, _l) => h;
      exports.rotr32L = rotr32L2;
      var rotlSH3 = (h, l, s) => h << s | l >>> 32 - s;
      exports.rotlSH = rotlSH3;
      var rotlSL3 = (h, l, s) => l << s | h >>> 32 - s;
      exports.rotlSL = rotlSL3;
      var rotlBH3 = (h, l, s) => l << s - 32 | h >>> 64 - s;
      exports.rotlBH = rotlBH3;
      var rotlBL3 = (h, l, s) => h << s - 32 | l >>> 64 - s;
      exports.rotlBL = rotlBL3;
      function add2(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
      }
      var add3L2 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      exports.add3L = add3L2;
      var add3H2 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      exports.add3H = add3H2;
      var add4L2 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      exports.add4L = add4L2;
      var add4H2 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      exports.add4H = add4H2;
      var add5L2 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      exports.add5L = add5L2;
      var add5H2 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      exports.add5H = add5H2;
      var u642 = {
        fromBig: fromBig3,
        split: split3,
        toBig: toBig2,
        shrSH: shrSH2,
        shrSL: shrSL2,
        rotrSH: rotrSH2,
        rotrSL: rotrSL2,
        rotrBH: rotrBH2,
        rotrBL: rotrBL2,
        rotr32H: rotr32H2,
        rotr32L: rotr32L2,
        rotlSH: rotlSH3,
        rotlSL: rotlSL3,
        rotlBH: rotlBH3,
        rotlBL: rotlBL3,
        add: add2,
        add3L: add3L2,
        add3H: add3H2,
        add4L: add4L2,
        add4H: add4H2,
        add5H: add5H2,
        add5L: add5L2
      };
      exports.default = u642;
    }
  });

  // node_modules/@noble/hashes/sha2.js
  var require_sha22 = __commonJS({
    "node_modules/@noble/hashes/sha2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha512_224 = exports.sha512_256 = exports.sha384 = exports.sha512 = exports.sha224 = exports.sha256 = exports.SHA512_256 = exports.SHA512_224 = exports.SHA384 = exports.SHA512 = exports.SHA224 = exports.SHA256 = void 0;
      var _md_ts_1 = require_md2();
      var u642 = require_u642();
      var utils_ts_1 = require_utils4();
      var SHA256_K3 = /* @__PURE__ */ Uint32Array.from([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      var SHA256_W3 = /* @__PURE__ */ new Uint32Array(64);
      var SHA2563 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 32) {
          super(64, outputLen, 8, false);
          this.A = _md_ts_1.SHA256_IV[0] | 0;
          this.B = _md_ts_1.SHA256_IV[1] | 0;
          this.C = _md_ts_1.SHA256_IV[2] | 0;
          this.D = _md_ts_1.SHA256_IV[3] | 0;
          this.E = _md_ts_1.SHA256_IV[4] | 0;
          this.F = _md_ts_1.SHA256_IV[5] | 0;
          this.G = _md_ts_1.SHA256_IV[6] | 0;
          this.H = _md_ts_1.SHA256_IV[7] | 0;
        }
        get() {
          const { A, B, C, D, E, F, G, H } = this;
          return [A, B, C, D, E, F, G, H];
        }
        // prettier-ignore
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W3[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W3[i - 15];
            const W2 = SHA256_W3[i - 2];
            const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W3[i] = s1 + SHA256_W3[i - 7] + s0 + SHA256_W3[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
            const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K3[i] + SHA256_W3[i] | 0;
            const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
            const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA256_W3);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports.SHA256 = SHA2563;
      var SHA2242 = class extends SHA2563 {
        constructor() {
          super(28);
          this.A = _md_ts_1.SHA224_IV[0] | 0;
          this.B = _md_ts_1.SHA224_IV[1] | 0;
          this.C = _md_ts_1.SHA224_IV[2] | 0;
          this.D = _md_ts_1.SHA224_IV[3] | 0;
          this.E = _md_ts_1.SHA224_IV[4] | 0;
          this.F = _md_ts_1.SHA224_IV[5] | 0;
          this.G = _md_ts_1.SHA224_IV[6] | 0;
          this.H = _md_ts_1.SHA224_IV[7] | 0;
        }
      };
      exports.SHA224 = SHA2242;
      var K512 = /* @__PURE__ */ (() => u642.split([
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817"
      ].map((n) => BigInt(n))))();
      var SHA512_Kh2 = /* @__PURE__ */ (() => K512[0])();
      var SHA512_Kl2 = /* @__PURE__ */ (() => K512[1])();
      var SHA512_W_H2 = /* @__PURE__ */ new Uint32Array(80);
      var SHA512_W_L2 = /* @__PURE__ */ new Uint32Array(80);
      var SHA5122 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 64) {
          super(128, outputLen, 16, false);
          this.Ah = _md_ts_1.SHA512_IV[0] | 0;
          this.Al = _md_ts_1.SHA512_IV[1] | 0;
          this.Bh = _md_ts_1.SHA512_IV[2] | 0;
          this.Bl = _md_ts_1.SHA512_IV[3] | 0;
          this.Ch = _md_ts_1.SHA512_IV[4] | 0;
          this.Cl = _md_ts_1.SHA512_IV[5] | 0;
          this.Dh = _md_ts_1.SHA512_IV[6] | 0;
          this.Dl = _md_ts_1.SHA512_IV[7] | 0;
          this.Eh = _md_ts_1.SHA512_IV[8] | 0;
          this.El = _md_ts_1.SHA512_IV[9] | 0;
          this.Fh = _md_ts_1.SHA512_IV[10] | 0;
          this.Fl = _md_ts_1.SHA512_IV[11] | 0;
          this.Gh = _md_ts_1.SHA512_IV[12] | 0;
          this.Gl = _md_ts_1.SHA512_IV[13] | 0;
          this.Hh = _md_ts_1.SHA512_IV[14] | 0;
          this.Hl = _md_ts_1.SHA512_IV[15] | 0;
        }
        // prettier-ignore
        get() {
          const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }
        // prettier-ignore
        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H2[i] = view.getUint32(offset);
            SHA512_W_L2[i] = view.getUint32(offset += 4);
          }
          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H2[i - 15] | 0;
            const W15l = SHA512_W_L2[i - 15] | 0;
            const s0h = u642.rotrSH(W15h, W15l, 1) ^ u642.rotrSH(W15h, W15l, 8) ^ u642.shrSH(W15h, W15l, 7);
            const s0l = u642.rotrSL(W15h, W15l, 1) ^ u642.rotrSL(W15h, W15l, 8) ^ u642.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H2[i - 2] | 0;
            const W2l = SHA512_W_L2[i - 2] | 0;
            const s1h = u642.rotrSH(W2h, W2l, 19) ^ u642.rotrBH(W2h, W2l, 61) ^ u642.shrSH(W2h, W2l, 6);
            const s1l = u642.rotrSL(W2h, W2l, 19) ^ u642.rotrBL(W2h, W2l, 61) ^ u642.shrSL(W2h, W2l, 6);
            const SUMl = u642.add4L(s0l, s1l, SHA512_W_L2[i - 7], SHA512_W_L2[i - 16]);
            const SUMh = u642.add4H(SUMl, s0h, s1h, SHA512_W_H2[i - 7], SHA512_W_H2[i - 16]);
            SHA512_W_H2[i] = SUMh | 0;
            SHA512_W_L2[i] = SUMl | 0;
          }
          let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          for (let i = 0; i < 80; i++) {
            const sigma1h = u642.rotrSH(Eh, El, 14) ^ u642.rotrSH(Eh, El, 18) ^ u642.rotrBH(Eh, El, 41);
            const sigma1l = u642.rotrSL(Eh, El, 14) ^ u642.rotrSL(Eh, El, 18) ^ u642.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = u642.add5L(Hl, sigma1l, CHIl, SHA512_Kl2[i], SHA512_W_L2[i]);
            const T1h = u642.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh2[i], SHA512_W_H2[i]);
            const T1l = T1ll | 0;
            const sigma0h = u642.rotrSH(Ah, Al, 28) ^ u642.rotrBH(Ah, Al, 34) ^ u642.rotrBH(Ah, Al, 39);
            const sigma0l = u642.rotrSL(Ah, Al, 28) ^ u642.rotrBL(Ah, Al, 34) ^ u642.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = u642.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = u642.add3L(T1l, sigma0l, MAJl);
            Ah = u642.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }
          ({ h: Ah, l: Al } = u642.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({ h: Bh, l: Bl } = u642.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({ h: Ch, l: Cl } = u642.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({ h: Dh, l: Dl } = u642.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({ h: Eh, l: El } = u642.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({ h: Fh, l: Fl } = u642.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({ h: Gh, l: Gl } = u642.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({ h: Hh, l: Hl } = u642.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA512_W_H2, SHA512_W_L2);
        }
        destroy() {
          (0, utils_ts_1.clean)(this.buffer);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      };
      exports.SHA512 = SHA5122;
      var SHA384 = class extends SHA5122 {
        constructor() {
          super(48);
          this.Ah = _md_ts_1.SHA384_IV[0] | 0;
          this.Al = _md_ts_1.SHA384_IV[1] | 0;
          this.Bh = _md_ts_1.SHA384_IV[2] | 0;
          this.Bl = _md_ts_1.SHA384_IV[3] | 0;
          this.Ch = _md_ts_1.SHA384_IV[4] | 0;
          this.Cl = _md_ts_1.SHA384_IV[5] | 0;
          this.Dh = _md_ts_1.SHA384_IV[6] | 0;
          this.Dl = _md_ts_1.SHA384_IV[7] | 0;
          this.Eh = _md_ts_1.SHA384_IV[8] | 0;
          this.El = _md_ts_1.SHA384_IV[9] | 0;
          this.Fh = _md_ts_1.SHA384_IV[10] | 0;
          this.Fl = _md_ts_1.SHA384_IV[11] | 0;
          this.Gh = _md_ts_1.SHA384_IV[12] | 0;
          this.Gl = _md_ts_1.SHA384_IV[13] | 0;
          this.Hh = _md_ts_1.SHA384_IV[14] | 0;
          this.Hl = _md_ts_1.SHA384_IV[15] | 0;
        }
      };
      exports.SHA384 = SHA384;
      var T224_IV = /* @__PURE__ */ Uint32Array.from([
        2352822216,
        424955298,
        1944164710,
        2312950998,
        502970286,
        855612546,
        1738396948,
        1479516111,
        258812777,
        2077511080,
        2011393907,
        79989058,
        1067287976,
        1780299464,
        286451373,
        2446758561
      ]);
      var T256_IV = /* @__PURE__ */ Uint32Array.from([
        573645204,
        4230739756,
        2673172387,
        3360449730,
        596883563,
        1867755857,
        2520282905,
        1497426621,
        2519219938,
        2827943907,
        3193839141,
        1401305490,
        721525244,
        746961066,
        246885852,
        2177182882
      ]);
      var SHA512_224 = class extends SHA5122 {
        constructor() {
          super(28);
          this.Ah = T224_IV[0] | 0;
          this.Al = T224_IV[1] | 0;
          this.Bh = T224_IV[2] | 0;
          this.Bl = T224_IV[3] | 0;
          this.Ch = T224_IV[4] | 0;
          this.Cl = T224_IV[5] | 0;
          this.Dh = T224_IV[6] | 0;
          this.Dl = T224_IV[7] | 0;
          this.Eh = T224_IV[8] | 0;
          this.El = T224_IV[9] | 0;
          this.Fh = T224_IV[10] | 0;
          this.Fl = T224_IV[11] | 0;
          this.Gh = T224_IV[12] | 0;
          this.Gl = T224_IV[13] | 0;
          this.Hh = T224_IV[14] | 0;
          this.Hl = T224_IV[15] | 0;
        }
      };
      exports.SHA512_224 = SHA512_224;
      var SHA512_256 = class extends SHA5122 {
        constructor() {
          super(32);
          this.Ah = T256_IV[0] | 0;
          this.Al = T256_IV[1] | 0;
          this.Bh = T256_IV[2] | 0;
          this.Bl = T256_IV[3] | 0;
          this.Ch = T256_IV[4] | 0;
          this.Cl = T256_IV[5] | 0;
          this.Dh = T256_IV[6] | 0;
          this.Dl = T256_IV[7] | 0;
          this.Eh = T256_IV[8] | 0;
          this.El = T256_IV[9] | 0;
          this.Fh = T256_IV[10] | 0;
          this.Fl = T256_IV[11] | 0;
          this.Gh = T256_IV[12] | 0;
          this.Gl = T256_IV[13] | 0;
          this.Hh = T256_IV[14] | 0;
          this.Hl = T256_IV[15] | 0;
        }
      };
      exports.SHA512_256 = SHA512_256;
      exports.sha256 = (0, utils_ts_1.createHasher)(() => new SHA2563());
      exports.sha224 = (0, utils_ts_1.createHasher)(() => new SHA2242());
      exports.sha512 = (0, utils_ts_1.createHasher)(() => new SHA5122());
      exports.sha384 = (0, utils_ts_1.createHasher)(() => new SHA384());
      exports.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
      exports.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
    }
  });

  // node_modules/@noble/hashes/sha256.js
  var require_sha2562 = __commonJS({
    "node_modules/@noble/hashes/sha256.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha224 = exports.SHA224 = exports.sha256 = exports.SHA256 = void 0;
      var sha2_ts_1 = require_sha22();
      exports.SHA256 = sha2_ts_1.SHA256;
      exports.sha256 = sha2_ts_1.sha256;
      exports.SHA224 = sha2_ts_1.SHA224;
      exports.sha224 = sha2_ts_1.sha224;
    }
  });

  // node_modules/eciesjs/dist/utils/hash.js
  var require_hash = __commonJS({
    "node_modules/eciesjs/dist/utils/hash.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getSharedKey = exports.deriveKey = void 0;
      var utils_1 = require_utils();
      var hkdf_1 = require_hkdf();
      var sha256_1 = require_sha2562();
      var deriveKey = function(master, salt, info) {
        return (0, hkdf_1.hkdf)(sha256_1.sha256, master, salt, info, 32);
      };
      exports.deriveKey = deriveKey;
      var getSharedKey = function() {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          parts[_i] = arguments[_i];
        }
        return (0, exports.deriveKey)(utils_1.concatBytes.apply(void 0, parts));
      };
      exports.getSharedKey = getSharedKey;
    }
  });

  // node_modules/@noble/ciphers/_polyval.js
  var require_polyval = __commonJS({
    "node_modules/@noble/ciphers/_polyval.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.polyval = exports.ghash = void 0;
      exports._toGHASHKey = _toGHASHKey;
      var _assert_js_1 = require_assert();
      var utils_js_1 = require_utils();
      var BLOCK_SIZE = 16;
      var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
      var ZEROS32 = (0, utils_js_1.u32)(ZEROS16);
      var POLY = 225;
      var mul2 = (s0, s1, s2, s3) => {
        const hiBit = s3 & 1;
        return {
          s3: s2 << 31 | s3 >>> 1,
          s2: s1 << 31 | s2 >>> 1,
          s1: s0 << 31 | s1 >>> 1,
          s0: s0 >>> 1 ^ POLY << 24 & -(hiBit & 1)
          // reduce % poly
        };
      };
      var swapLE = (n) => (n >>> 0 & 255) << 24 | (n >>> 8 & 255) << 16 | (n >>> 16 & 255) << 8 | n >>> 24 & 255 | 0;
      function _toGHASHKey(k) {
        k.reverse();
        const hiBit = k[15] & 1;
        let carry = 0;
        for (let i = 0; i < k.length; i++) {
          const t = k[i];
          k[i] = t >>> 1 | carry;
          carry = (t & 1) << 7;
        }
        k[0] ^= -hiBit & 225;
        return k;
      }
      var estimateWindow = (bytes) => {
        if (bytes > 64 * 1024)
          return 8;
        if (bytes > 1024)
          return 4;
        return 2;
      };
      var GHASH = class {
        // We select bits per window adaptively based on expectedLength
        constructor(key, expectedLength) {
          this.blockLen = BLOCK_SIZE;
          this.outputLen = BLOCK_SIZE;
          this.s0 = 0;
          this.s1 = 0;
          this.s2 = 0;
          this.s3 = 0;
          this.finished = false;
          key = (0, utils_js_1.toBytes)(key);
          (0, _assert_js_1.abytes)(key, 16);
          const kView = (0, utils_js_1.createView)(key);
          let k0 = kView.getUint32(0, false);
          let k1 = kView.getUint32(4, false);
          let k2 = kView.getUint32(8, false);
          let k3 = kView.getUint32(12, false);
          const doubles = [];
          for (let i = 0; i < 128; i++) {
            doubles.push({ s0: swapLE(k0), s1: swapLE(k1), s2: swapLE(k2), s3: swapLE(k3) });
            ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul2(k0, k1, k2, k3));
          }
          const W = estimateWindow(expectedLength || 1024);
          if (![1, 2, 4, 8].includes(W))
            throw new Error("ghash: invalid window size, expected 2, 4 or 8");
          this.W = W;
          const bits = 128;
          const windows = bits / W;
          const windowSize = this.windowSize = 2 ** W;
          const items = [];
          for (let w = 0; w < windows; w++) {
            for (let byte = 0; byte < windowSize; byte++) {
              let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
              for (let j = 0; j < W; j++) {
                const bit = byte >>> W - j - 1 & 1;
                if (!bit)
                  continue;
                const { s0: d0, s1: d1, s2: d2, s3: d3 } = doubles[W * w + j];
                s0 ^= d0, s1 ^= d1, s2 ^= d2, s3 ^= d3;
              }
              items.push({ s0, s1, s2, s3 });
            }
          }
          this.t = items;
        }
        _updateBlock(s0, s1, s2, s3) {
          s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
          const { W, t, windowSize } = this;
          let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
          const mask = (1 << W) - 1;
          let w = 0;
          for (const num of [s0, s1, s2, s3]) {
            for (let bytePos = 0; bytePos < 4; bytePos++) {
              const byte = num >>> 8 * bytePos & 255;
              for (let bitPos = 8 / W - 1; bitPos >= 0; bitPos--) {
                const bit = byte >>> W * bitPos & mask;
                const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
                o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
                w += 1;
              }
            }
          }
          this.s0 = o0;
          this.s1 = o1;
          this.s2 = o2;
          this.s3 = o3;
        }
        update(data) {
          data = (0, utils_js_1.toBytes)(data);
          (0, _assert_js_1.aexists)(this);
          const b32 = (0, utils_js_1.u32)(data);
          const blocks = Math.floor(data.length / BLOCK_SIZE);
          const left = data.length % BLOCK_SIZE;
          for (let i = 0; i < blocks; i++) {
            this._updateBlock(b32[i * 4 + 0], b32[i * 4 + 1], b32[i * 4 + 2], b32[i * 4 + 3]);
          }
          if (left) {
            ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
            this._updateBlock(ZEROS32[0], ZEROS32[1], ZEROS32[2], ZEROS32[3]);
            (0, utils_js_1.clean)(ZEROS32);
          }
          return this;
        }
        destroy() {
          const { t } = this;
          for (const elm of t) {
            elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
          }
        }
        digestInto(out) {
          (0, _assert_js_1.aexists)(this);
          (0, _assert_js_1.aoutput)(out, this);
          this.finished = true;
          const { s0, s1, s2, s3 } = this;
          const o32 = (0, utils_js_1.u32)(out);
          o32[0] = s0;
          o32[1] = s1;
          o32[2] = s2;
          o32[3] = s3;
          return out;
        }
        digest() {
          const res = new Uint8Array(BLOCK_SIZE);
          this.digestInto(res);
          this.destroy();
          return res;
        }
      };
      var Polyval = class extends GHASH {
        constructor(key, expectedLength) {
          key = (0, utils_js_1.toBytes)(key);
          const ghKey = _toGHASHKey((0, utils_js_1.copyBytes)(key));
          super(ghKey, expectedLength);
          (0, utils_js_1.clean)(ghKey);
        }
        update(data) {
          data = (0, utils_js_1.toBytes)(data);
          (0, _assert_js_1.aexists)(this);
          const b32 = (0, utils_js_1.u32)(data);
          const left = data.length % BLOCK_SIZE;
          const blocks = Math.floor(data.length / BLOCK_SIZE);
          for (let i = 0; i < blocks; i++) {
            this._updateBlock(swapLE(b32[i * 4 + 3]), swapLE(b32[i * 4 + 2]), swapLE(b32[i * 4 + 1]), swapLE(b32[i * 4 + 0]));
          }
          if (left) {
            ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
            this._updateBlock(swapLE(ZEROS32[3]), swapLE(ZEROS32[2]), swapLE(ZEROS32[1]), swapLE(ZEROS32[0]));
            (0, utils_js_1.clean)(ZEROS32);
          }
          return this;
        }
        digestInto(out) {
          (0, _assert_js_1.aexists)(this);
          (0, _assert_js_1.aoutput)(out, this);
          this.finished = true;
          const { s0, s1, s2, s3 } = this;
          const o32 = (0, utils_js_1.u32)(out);
          o32[0] = s0;
          o32[1] = s1;
          o32[2] = s2;
          o32[3] = s3;
          return out.reverse();
        }
      };
      function wrapConstructorWithKey(hashCons) {
        const hashC = (msg, key) => hashCons(key, msg.length).update((0, utils_js_1.toBytes)(msg)).digest();
        const tmp = hashCons(new Uint8Array(16), 0);
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (key, expectedLength) => hashCons(key, expectedLength);
        return hashC;
      }
      exports.ghash = wrapConstructorWithKey((key, expectedLength) => new GHASH(key, expectedLength));
      exports.polyval = wrapConstructorWithKey((key, expectedLength) => new Polyval(key, expectedLength));
    }
  });

  // node_modules/@noble/ciphers/aes.js
  var require_aes = __commonJS({
    "node_modules/@noble/ciphers/aes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unsafe = exports.aeskwp = exports.aeskw = exports.siv = exports.gcm = exports.cfb = exports.cbc = exports.ecb = exports.ctr = void 0;
      var _assert_js_1 = require_assert();
      var _polyval_js_1 = require_polyval();
      var utils_js_1 = require_utils();
      var BLOCK_SIZE = 16;
      var BLOCK_SIZE32 = 4;
      var EMPTY_BLOCK = /* @__PURE__ */ new Uint8Array(BLOCK_SIZE);
      var POLY = 283;
      function mul2(n) {
        return n << 1 ^ POLY & -(n >> 7);
      }
      function mul(a, b) {
        let res = 0;
        for (; b > 0; b >>= 1) {
          res ^= a & -(b & 1);
          a = mul2(a);
        }
        return res;
      }
      var sbox = /* @__PURE__ */ (() => {
        const t = new Uint8Array(256);
        for (let i = 0, x = 1; i < 256; i++, x ^= mul2(x))
          t[i] = x;
        const box = new Uint8Array(256);
        box[0] = 99;
        for (let i = 0; i < 255; i++) {
          let x = t[255 - i];
          x |= x << 8;
          box[t[i]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 99) & 255;
        }
        (0, utils_js_1.clean)(t);
        return box;
      })();
      var invSbox = /* @__PURE__ */ sbox.map((_, j) => sbox.indexOf(j));
      var rotr32_8 = (n) => n << 24 | n >>> 8;
      var rotl32_8 = (n) => n << 8 | n >>> 24;
      var byteSwap2 = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
      function genTtable(sbox2, fn) {
        if (sbox2.length !== 256)
          throw new Error("Wrong sbox length");
        const T0 = new Uint32Array(256).map((_, j) => fn(sbox2[j]));
        const T1 = T0.map(rotl32_8);
        const T2 = T1.map(rotl32_8);
        const T3 = T2.map(rotl32_8);
        const T01 = new Uint32Array(256 * 256);
        const T23 = new Uint32Array(256 * 256);
        const sbox22 = new Uint16Array(256 * 256);
        for (let i = 0; i < 256; i++) {
          for (let j = 0; j < 256; j++) {
            const idx = i * 256 + j;
            T01[idx] = T0[i] ^ T1[j];
            T23[idx] = T2[i] ^ T3[j];
            sbox22[idx] = sbox2[i] << 8 | sbox2[j];
          }
        }
        return { sbox: sbox2, sbox2: sbox22, T0, T1, T2, T3, T01, T23 };
      }
      var tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul(s, 3) << 24 | s << 16 | s << 8 | mul(s, 2));
      var tableDecoding = /* @__PURE__ */ genTtable(invSbox, (s) => mul(s, 11) << 24 | mul(s, 13) << 16 | mul(s, 9) << 8 | mul(s, 14));
      var xPowers = /* @__PURE__ */ (() => {
        const p = new Uint8Array(16);
        for (let i = 0, x = 1; i < 16; i++, x = mul2(x))
          p[i] = x;
        return p;
      })();
      function expandKeyLE(key) {
        (0, _assert_js_1.abytes)(key);
        const len = key.length;
        if (![16, 24, 32].includes(len))
          throw new Error("aes: invalid key size, should be 16, 24 or 32, got " + len);
        const { sbox2 } = tableEncoding;
        const toClean = [];
        if (!(0, utils_js_1.isAligned32)(key))
          toClean.push(key = (0, utils_js_1.copyBytes)(key));
        const k32 = (0, utils_js_1.u32)(key);
        const Nk = k32.length;
        const subByte = (n) => applySbox(sbox2, n, n, n, n);
        const xk = new Uint32Array(len + 28);
        xk.set(k32);
        for (let i = Nk; i < xk.length; i++) {
          let t = xk[i - 1];
          if (i % Nk === 0)
            t = subByte(rotr32_8(t)) ^ xPowers[i / Nk - 1];
          else if (Nk > 6 && i % Nk === 4)
            t = subByte(t);
          xk[i] = xk[i - Nk] ^ t;
        }
        (0, utils_js_1.clean)(...toClean);
        return xk;
      }
      function expandKeyDecLE(key) {
        const encKey = expandKeyLE(key);
        const xk = encKey.slice();
        const Nk = encKey.length;
        const { sbox2 } = tableEncoding;
        const { T0, T1, T2, T3 } = tableDecoding;
        for (let i = 0; i < Nk; i += 4) {
          for (let j = 0; j < 4; j++)
            xk[i + j] = encKey[Nk - i - 4 + j];
        }
        (0, utils_js_1.clean)(encKey);
        for (let i = 4; i < Nk - 4; i++) {
          const x = xk[i];
          const w = applySbox(sbox2, x, x, x, x);
          xk[i] = T0[w & 255] ^ T1[w >>> 8 & 255] ^ T2[w >>> 16 & 255] ^ T3[w >>> 24];
        }
        return xk;
      }
      function apply0123(T01, T23, s0, s1, s2, s3) {
        return T01[s0 << 8 & 65280 | s1 >>> 8 & 255] ^ T23[s2 >>> 8 & 65280 | s3 >>> 24 & 255];
      }
      function applySbox(sbox2, s0, s1, s2, s3) {
        return sbox2[s0 & 255 | s1 & 65280] | sbox2[s2 >>> 16 & 255 | s3 >>> 16 & 65280] << 16;
      }
      function encrypt2(xk, s0, s1, s2, s3) {
        const { sbox2, T01, T23 } = tableEncoding;
        let k = 0;
        s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
        const rounds = xk.length / 4 - 2;
        for (let i = 0; i < rounds; i++) {
          const t02 = xk[k++] ^ apply0123(T01, T23, s0, s1, s2, s3);
          const t12 = xk[k++] ^ apply0123(T01, T23, s1, s2, s3, s0);
          const t22 = xk[k++] ^ apply0123(T01, T23, s2, s3, s0, s1);
          const t32 = xk[k++] ^ apply0123(T01, T23, s3, s0, s1, s2);
          s0 = t02, s1 = t12, s2 = t22, s3 = t32;
        }
        const t0 = xk[k++] ^ applySbox(sbox2, s0, s1, s2, s3);
        const t1 = xk[k++] ^ applySbox(sbox2, s1, s2, s3, s0);
        const t2 = xk[k++] ^ applySbox(sbox2, s2, s3, s0, s1);
        const t3 = xk[k++] ^ applySbox(sbox2, s3, s0, s1, s2);
        return { s0: t0, s1: t1, s2: t2, s3: t3 };
      }
      function decrypt2(xk, s0, s1, s2, s3) {
        const { sbox2, T01, T23 } = tableDecoding;
        let k = 0;
        s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
        const rounds = xk.length / 4 - 2;
        for (let i = 0; i < rounds; i++) {
          const t02 = xk[k++] ^ apply0123(T01, T23, s0, s3, s2, s1);
          const t12 = xk[k++] ^ apply0123(T01, T23, s1, s0, s3, s2);
          const t22 = xk[k++] ^ apply0123(T01, T23, s2, s1, s0, s3);
          const t32 = xk[k++] ^ apply0123(T01, T23, s3, s2, s1, s0);
          s0 = t02, s1 = t12, s2 = t22, s3 = t32;
        }
        const t0 = xk[k++] ^ applySbox(sbox2, s0, s3, s2, s1);
        const t1 = xk[k++] ^ applySbox(sbox2, s1, s0, s3, s2);
        const t2 = xk[k++] ^ applySbox(sbox2, s2, s1, s0, s3);
        const t3 = xk[k++] ^ applySbox(sbox2, s3, s2, s1, s0);
        return { s0: t0, s1: t1, s2: t2, s3: t3 };
      }
      function ctrCounter(xk, nonce, src2, dst) {
        (0, _assert_js_1.abytes)(nonce, BLOCK_SIZE);
        (0, _assert_js_1.abytes)(src2);
        const srcLen = src2.length;
        dst = (0, utils_js_1.getOutput)(srcLen, dst);
        (0, utils_js_1.complexOverlapBytes)(src2, dst);
        const ctr = nonce;
        const c32 = (0, utils_js_1.u32)(ctr);
        let { s0, s1, s2, s3 } = encrypt2(xk, c32[0], c32[1], c32[2], c32[3]);
        const src32 = (0, utils_js_1.u32)(src2);
        const dst32 = (0, utils_js_1.u32)(dst);
        for (let i = 0; i + 4 <= src32.length; i += 4) {
          dst32[i + 0] = src32[i + 0] ^ s0;
          dst32[i + 1] = src32[i + 1] ^ s1;
          dst32[i + 2] = src32[i + 2] ^ s2;
          dst32[i + 3] = src32[i + 3] ^ s3;
          let carry = 1;
          for (let i2 = ctr.length - 1; i2 >= 0; i2--) {
            carry = carry + (ctr[i2] & 255) | 0;
            ctr[i2] = carry & 255;
            carry >>>= 8;
          }
          ({ s0, s1, s2, s3 } = encrypt2(xk, c32[0], c32[1], c32[2], c32[3]));
        }
        const start = BLOCK_SIZE * Math.floor(src32.length / BLOCK_SIZE32);
        if (start < srcLen) {
          const b32 = new Uint32Array([s0, s1, s2, s3]);
          const buf = (0, utils_js_1.u8)(b32);
          for (let i = start, pos = 0; i < srcLen; i++, pos++)
            dst[i] = src2[i] ^ buf[pos];
          (0, utils_js_1.clean)(b32);
        }
        return dst;
      }
      function ctr32(xk, isLE2, nonce, src2, dst) {
        (0, _assert_js_1.abytes)(nonce, BLOCK_SIZE);
        (0, _assert_js_1.abytes)(src2);
        dst = (0, utils_js_1.getOutput)(src2.length, dst);
        const ctr = nonce;
        const c32 = (0, utils_js_1.u32)(ctr);
        const view = (0, utils_js_1.createView)(ctr);
        const src32 = (0, utils_js_1.u32)(src2);
        const dst32 = (0, utils_js_1.u32)(dst);
        const ctrPos = isLE2 ? 0 : 12;
        const srcLen = src2.length;
        let ctrNum = view.getUint32(ctrPos, isLE2);
        let { s0, s1, s2, s3 } = encrypt2(xk, c32[0], c32[1], c32[2], c32[3]);
        for (let i = 0; i + 4 <= src32.length; i += 4) {
          dst32[i + 0] = src32[i + 0] ^ s0;
          dst32[i + 1] = src32[i + 1] ^ s1;
          dst32[i + 2] = src32[i + 2] ^ s2;
          dst32[i + 3] = src32[i + 3] ^ s3;
          ctrNum = ctrNum + 1 >>> 0;
          view.setUint32(ctrPos, ctrNum, isLE2);
          ({ s0, s1, s2, s3 } = encrypt2(xk, c32[0], c32[1], c32[2], c32[3]));
        }
        const start = BLOCK_SIZE * Math.floor(src32.length / BLOCK_SIZE32);
        if (start < srcLen) {
          const b32 = new Uint32Array([s0, s1, s2, s3]);
          const buf = (0, utils_js_1.u8)(b32);
          for (let i = start, pos = 0; i < srcLen; i++, pos++)
            dst[i] = src2[i] ^ buf[pos];
          (0, utils_js_1.clean)(b32);
        }
        return dst;
      }
      exports.ctr = (0, utils_js_1.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function aesctr(key, nonce) {
        function processCtr(buf, dst) {
          (0, _assert_js_1.abytes)(buf);
          if (dst !== void 0) {
            (0, _assert_js_1.abytes)(dst);
            if (!(0, utils_js_1.isAligned32)(dst))
              throw new Error("unaligned destination");
          }
          const xk = expandKeyLE(key);
          const n = (0, utils_js_1.copyBytes)(nonce);
          const toClean = [xk, n];
          if (!(0, utils_js_1.isAligned32)(buf))
            toClean.push(buf = (0, utils_js_1.copyBytes)(buf));
          const out = ctrCounter(xk, n, buf, dst);
          (0, utils_js_1.clean)(...toClean);
          return out;
        }
        return {
          encrypt: (plaintext, dst) => processCtr(plaintext, dst),
          decrypt: (ciphertext, dst) => processCtr(ciphertext, dst)
        };
      });
      function validateBlockDecrypt(data) {
        (0, _assert_js_1.abytes)(data);
        if (data.length % BLOCK_SIZE !== 0) {
          throw new Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size " + BLOCK_SIZE);
        }
      }
      function validateBlockEncrypt(plaintext, pcks5, dst) {
        (0, _assert_js_1.abytes)(plaintext);
        let outLen = plaintext.length;
        const remaining = outLen % BLOCK_SIZE;
        if (!pcks5 && remaining !== 0)
          throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
        if (!(0, utils_js_1.isAligned32)(plaintext))
          plaintext = (0, utils_js_1.copyBytes)(plaintext);
        const b = (0, utils_js_1.u32)(plaintext);
        if (pcks5) {
          let left = BLOCK_SIZE - remaining;
          if (!left)
            left = BLOCK_SIZE;
          outLen = outLen + left;
        }
        dst = (0, utils_js_1.getOutput)(outLen, dst);
        (0, utils_js_1.complexOverlapBytes)(plaintext, dst);
        const o = (0, utils_js_1.u32)(dst);
        return { b, o, out: dst };
      }
      function validatePCKS(data, pcks5) {
        if (!pcks5)
          return data;
        const len = data.length;
        if (!len)
          throw new Error("aes/pcks5: empty ciphertext not allowed");
        const lastByte = data[len - 1];
        if (lastByte <= 0 || lastByte > 16)
          throw new Error("aes/pcks5: wrong padding");
        const out = data.subarray(0, -lastByte);
        for (let i = 0; i < lastByte; i++)
          if (data[len - i - 1] !== lastByte)
            throw new Error("aes/pcks5: wrong padding");
        return out;
      }
      function padPCKS(left) {
        const tmp = new Uint8Array(16);
        const tmp32 = (0, utils_js_1.u32)(tmp);
        tmp.set(left);
        const paddingByte = BLOCK_SIZE - left.length;
        for (let i = BLOCK_SIZE - paddingByte; i < BLOCK_SIZE; i++)
          tmp[i] = paddingByte;
        return tmp32;
      }
      exports.ecb = (0, utils_js_1.wrapCipher)({ blockSize: 16 }, function aesecb(key, opts = {}) {
        const pcks5 = !opts.disablePadding;
        return {
          encrypt(plaintext, dst) {
            const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
            const xk = expandKeyLE(key);
            let i = 0;
            for (; i + 4 <= b.length; ) {
              const { s0, s1, s2, s3 } = encrypt2(xk, b[i + 0], b[i + 1], b[i + 2], b[i + 3]);
              o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            if (pcks5) {
              const tmp32 = padPCKS(plaintext.subarray(i * 4));
              const { s0, s1, s2, s3 } = encrypt2(xk, tmp32[0], tmp32[1], tmp32[2], tmp32[3]);
              o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            (0, utils_js_1.clean)(xk);
            return _out;
          },
          decrypt(ciphertext, dst) {
            validateBlockDecrypt(ciphertext);
            const xk = expandKeyDecLE(key);
            dst = (0, utils_js_1.getOutput)(ciphertext.length, dst);
            const toClean = [xk];
            if (!(0, utils_js_1.isAligned32)(ciphertext))
              toClean.push(ciphertext = (0, utils_js_1.copyBytes)(ciphertext));
            (0, utils_js_1.complexOverlapBytes)(ciphertext, dst);
            const b = (0, utils_js_1.u32)(ciphertext);
            const o = (0, utils_js_1.u32)(dst);
            for (let i = 0; i + 4 <= b.length; ) {
              const { s0, s1, s2, s3 } = decrypt2(xk, b[i + 0], b[i + 1], b[i + 2], b[i + 3]);
              o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            (0, utils_js_1.clean)(...toClean);
            return validatePCKS(dst, pcks5);
          }
        };
      });
      exports.cbc = (0, utils_js_1.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function aescbc(key, iv, opts = {}) {
        const pcks5 = !opts.disablePadding;
        return {
          encrypt(plaintext, dst) {
            const xk = expandKeyLE(key);
            const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
            let _iv = iv;
            const toClean = [xk];
            if (!(0, utils_js_1.isAligned32)(_iv))
              toClean.push(_iv = (0, utils_js_1.copyBytes)(_iv));
            const n32 = (0, utils_js_1.u32)(_iv);
            let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
            let i = 0;
            for (; i + 4 <= b.length; ) {
              s0 ^= b[i + 0], s1 ^= b[i + 1], s2 ^= b[i + 2], s3 ^= b[i + 3];
              ({ s0, s1, s2, s3 } = encrypt2(xk, s0, s1, s2, s3));
              o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            if (pcks5) {
              const tmp32 = padPCKS(plaintext.subarray(i * 4));
              s0 ^= tmp32[0], s1 ^= tmp32[1], s2 ^= tmp32[2], s3 ^= tmp32[3];
              ({ s0, s1, s2, s3 } = encrypt2(xk, s0, s1, s2, s3));
              o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
            }
            (0, utils_js_1.clean)(...toClean);
            return _out;
          },
          decrypt(ciphertext, dst) {
            validateBlockDecrypt(ciphertext);
            const xk = expandKeyDecLE(key);
            let _iv = iv;
            const toClean = [xk];
            if (!(0, utils_js_1.isAligned32)(_iv))
              toClean.push(_iv = (0, utils_js_1.copyBytes)(_iv));
            const n32 = (0, utils_js_1.u32)(_iv);
            dst = (0, utils_js_1.getOutput)(ciphertext.length, dst);
            if (!(0, utils_js_1.isAligned32)(ciphertext))
              toClean.push(ciphertext = (0, utils_js_1.copyBytes)(ciphertext));
            (0, utils_js_1.complexOverlapBytes)(ciphertext, dst);
            const b = (0, utils_js_1.u32)(ciphertext);
            const o = (0, utils_js_1.u32)(dst);
            let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
            for (let i = 0; i + 4 <= b.length; ) {
              const ps0 = s0, ps1 = s1, ps2 = s2, ps3 = s3;
              s0 = b[i + 0], s1 = b[i + 1], s2 = b[i + 2], s3 = b[i + 3];
              const { s0: o0, s1: o1, s2: o2, s3: o3 } = decrypt2(xk, s0, s1, s2, s3);
              o[i++] = o0 ^ ps0, o[i++] = o1 ^ ps1, o[i++] = o2 ^ ps2, o[i++] = o3 ^ ps3;
            }
            (0, utils_js_1.clean)(...toClean);
            return validatePCKS(dst, pcks5);
          }
        };
      });
      exports.cfb = (0, utils_js_1.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function aescfb(key, iv) {
        function processCfb(src2, isEncrypt, dst) {
          (0, _assert_js_1.abytes)(src2);
          const srcLen = src2.length;
          dst = (0, utils_js_1.getOutput)(srcLen, dst);
          if ((0, utils_js_1.overlapBytes)(src2, dst))
            throw new Error("overlapping src and dst not supported.");
          const xk = expandKeyLE(key);
          let _iv = iv;
          const toClean = [xk];
          if (!(0, utils_js_1.isAligned32)(_iv))
            toClean.push(_iv = (0, utils_js_1.copyBytes)(_iv));
          if (!(0, utils_js_1.isAligned32)(src2))
            toClean.push(src2 = (0, utils_js_1.copyBytes)(src2));
          const src32 = (0, utils_js_1.u32)(src2);
          const dst32 = (0, utils_js_1.u32)(dst);
          const next32 = isEncrypt ? dst32 : src32;
          const n32 = (0, utils_js_1.u32)(_iv);
          let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
          for (let i = 0; i + 4 <= src32.length; ) {
            const { s0: e0, s1: e1, s2: e2, s3: e3 } = encrypt2(xk, s0, s1, s2, s3);
            dst32[i + 0] = src32[i + 0] ^ e0;
            dst32[i + 1] = src32[i + 1] ^ e1;
            dst32[i + 2] = src32[i + 2] ^ e2;
            dst32[i + 3] = src32[i + 3] ^ e3;
            s0 = next32[i++], s1 = next32[i++], s2 = next32[i++], s3 = next32[i++];
          }
          const start = BLOCK_SIZE * Math.floor(src32.length / BLOCK_SIZE32);
          if (start < srcLen) {
            ({ s0, s1, s2, s3 } = encrypt2(xk, s0, s1, s2, s3));
            const buf = (0, utils_js_1.u8)(new Uint32Array([s0, s1, s2, s3]));
            for (let i = start, pos = 0; i < srcLen; i++, pos++)
              dst[i] = src2[i] ^ buf[pos];
            (0, utils_js_1.clean)(buf);
          }
          (0, utils_js_1.clean)(...toClean);
          return dst;
        }
        return {
          encrypt: (plaintext, dst) => processCfb(plaintext, true, dst),
          decrypt: (ciphertext, dst) => processCfb(ciphertext, false, dst)
        };
      });
      function computeTag(fn, isLE2, key, data, AAD) {
        const aadLength = AAD == null ? 0 : AAD.length;
        const h = fn.create(key, data.length + aadLength);
        if (AAD)
          h.update(AAD);
        h.update(data);
        const num = new Uint8Array(16);
        const view = (0, utils_js_1.createView)(num);
        if (AAD)
          (0, utils_js_1.setBigUint64)(view, 0, BigInt(aadLength * 8), isLE2);
        (0, utils_js_1.setBigUint64)(view, 8, BigInt(data.length * 8), isLE2);
        h.update(num);
        const res = h.digest();
        (0, utils_js_1.clean)(num);
        return res;
      }
      exports.gcm = (0, utils_js_1.wrapCipher)({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, function aesgcm(key, nonce, AAD) {
        if (nonce.length < 8)
          throw new Error("aes/gcm: invalid nonce length");
        const tagLength = 16;
        function _computeTag(authKey, tagMask, data) {
          const tag = computeTag(_polyval_js_1.ghash, false, authKey, data, AAD);
          for (let i = 0; i < tagMask.length; i++)
            tag[i] ^= tagMask[i];
          return tag;
        }
        function deriveKeys() {
          const xk = expandKeyLE(key);
          const authKey = EMPTY_BLOCK.slice();
          const counter = EMPTY_BLOCK.slice();
          ctr32(xk, false, counter, counter, authKey);
          if (nonce.length === 12) {
            counter.set(nonce);
          } else {
            const nonceLen = EMPTY_BLOCK.slice();
            const view = (0, utils_js_1.createView)(nonceLen);
            (0, utils_js_1.setBigUint64)(view, 8, BigInt(nonce.length * 8), false);
            const g = _polyval_js_1.ghash.create(authKey).update(nonce).update(nonceLen);
            g.digestInto(counter);
            g.destroy();
          }
          const tagMask = ctr32(xk, false, counter, EMPTY_BLOCK);
          return { xk, authKey, counter, tagMask };
        }
        return {
          encrypt(plaintext) {
            const { xk, authKey, counter, tagMask } = deriveKeys();
            const out = new Uint8Array(plaintext.length + tagLength);
            const toClean = [xk, authKey, counter, tagMask];
            if (!(0, utils_js_1.isAligned32)(plaintext))
              toClean.push(plaintext = (0, utils_js_1.copyBytes)(plaintext));
            ctr32(xk, false, counter, plaintext, out.subarray(0, plaintext.length));
            const tag = _computeTag(authKey, tagMask, out.subarray(0, out.length - tagLength));
            toClean.push(tag);
            out.set(tag, plaintext.length);
            (0, utils_js_1.clean)(...toClean);
            return out;
          },
          decrypt(ciphertext) {
            const { xk, authKey, counter, tagMask } = deriveKeys();
            const toClean = [xk, authKey, tagMask, counter];
            if (!(0, utils_js_1.isAligned32)(ciphertext))
              toClean.push(ciphertext = (0, utils_js_1.copyBytes)(ciphertext));
            const data = ciphertext.subarray(0, -tagLength);
            const passedTag = ciphertext.subarray(-tagLength);
            const tag = _computeTag(authKey, tagMask, data);
            toClean.push(tag);
            if (!(0, utils_js_1.equalBytes)(tag, passedTag))
              throw new Error("aes/gcm: invalid ghash tag");
            const out = ctr32(xk, false, counter, data);
            (0, utils_js_1.clean)(...toClean);
            return out;
          }
        };
      });
      var limit = (name2, min, max) => (value) => {
        if (!Number.isSafeInteger(value) || min > value || value > max) {
          const minmax = "[" + min + ".." + max + "]";
          throw new Error("" + name2 + ": expected value in range " + minmax + ", got " + value);
        }
      };
      exports.siv = (0, utils_js_1.wrapCipher)({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, function aessiv(key, nonce, AAD) {
        const tagLength = 16;
        const AAD_LIMIT = limit("AAD", 0, 2 ** 36);
        const PLAIN_LIMIT = limit("plaintext", 0, 2 ** 36);
        const NONCE_LIMIT = limit("nonce", 12, 12);
        const CIPHER_LIMIT = limit("ciphertext", 16, 2 ** 36 + 16);
        (0, _assert_js_1.abytes)(key, 16, 24, 32);
        NONCE_LIMIT(nonce.length);
        if (AAD !== void 0)
          AAD_LIMIT(AAD.length);
        function deriveKeys() {
          const xk = expandKeyLE(key);
          const encKey = new Uint8Array(key.length);
          const authKey = new Uint8Array(16);
          const toClean = [xk, encKey];
          let _nonce = nonce;
          if (!(0, utils_js_1.isAligned32)(_nonce))
            toClean.push(_nonce = (0, utils_js_1.copyBytes)(_nonce));
          const n32 = (0, utils_js_1.u32)(_nonce);
          let s0 = 0, s1 = n32[0], s2 = n32[1], s3 = n32[2];
          let counter = 0;
          for (const derivedKey of [authKey, encKey].map(utils_js_1.u32)) {
            const d32 = (0, utils_js_1.u32)(derivedKey);
            for (let i = 0; i < d32.length; i += 2) {
              const { s0: o0, s1: o1 } = encrypt2(xk, s0, s1, s2, s3);
              d32[i + 0] = o0;
              d32[i + 1] = o1;
              s0 = ++counter;
            }
          }
          const res = { authKey, encKey: expandKeyLE(encKey) };
          (0, utils_js_1.clean)(...toClean);
          return res;
        }
        function _computeTag(encKey, authKey, data) {
          const tag = computeTag(_polyval_js_1.polyval, true, authKey, data, AAD);
          for (let i = 0; i < 12; i++)
            tag[i] ^= nonce[i];
          tag[15] &= 127;
          const t32 = (0, utils_js_1.u32)(tag);
          let s0 = t32[0], s1 = t32[1], s2 = t32[2], s3 = t32[3];
          ({ s0, s1, s2, s3 } = encrypt2(encKey, s0, s1, s2, s3));
          t32[0] = s0, t32[1] = s1, t32[2] = s2, t32[3] = s3;
          return tag;
        }
        function processSiv(encKey, tag, input) {
          let block = (0, utils_js_1.copyBytes)(tag);
          block[15] |= 128;
          const res = ctr32(encKey, true, block, input);
          (0, utils_js_1.clean)(block);
          return res;
        }
        return {
          encrypt(plaintext) {
            PLAIN_LIMIT(plaintext.length);
            const { encKey, authKey } = deriveKeys();
            const tag = _computeTag(encKey, authKey, plaintext);
            const toClean = [encKey, authKey, tag];
            if (!(0, utils_js_1.isAligned32)(plaintext))
              toClean.push(plaintext = (0, utils_js_1.copyBytes)(plaintext));
            const out = new Uint8Array(plaintext.length + tagLength);
            out.set(tag, plaintext.length);
            out.set(processSiv(encKey, tag, plaintext));
            (0, utils_js_1.clean)(...toClean);
            return out;
          },
          decrypt(ciphertext) {
            CIPHER_LIMIT(ciphertext.length);
            const tag = ciphertext.subarray(-tagLength);
            const { encKey, authKey } = deriveKeys();
            const toClean = [encKey, authKey];
            if (!(0, utils_js_1.isAligned32)(ciphertext))
              toClean.push(ciphertext = (0, utils_js_1.copyBytes)(ciphertext));
            const plaintext = processSiv(encKey, tag, ciphertext.subarray(0, -tagLength));
            const expectedTag = _computeTag(encKey, authKey, plaintext);
            toClean.push(expectedTag);
            if (!(0, utils_js_1.equalBytes)(tag, expectedTag)) {
              (0, utils_js_1.clean)(...toClean);
              throw new Error("invalid polyval tag");
            }
            (0, utils_js_1.clean)(...toClean);
            return plaintext;
          }
        };
      });
      function isBytes32(a) {
        return a instanceof Uint32Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint32Array";
      }
      function encryptBlock(xk, block) {
        (0, _assert_js_1.abytes)(block, 16);
        if (!isBytes32(xk))
          throw new Error("_encryptBlock accepts result of expandKeyLE");
        const b32 = (0, utils_js_1.u32)(block);
        let { s0, s1, s2, s3 } = encrypt2(xk, b32[0], b32[1], b32[2], b32[3]);
        b32[0] = s0, b32[1] = s1, b32[2] = s2, b32[3] = s3;
        return block;
      }
      function decryptBlock(xk, block) {
        (0, _assert_js_1.abytes)(block, 16);
        if (!isBytes32(xk))
          throw new Error("_decryptBlock accepts result of expandKeyLE");
        const b32 = (0, utils_js_1.u32)(block);
        let { s0, s1, s2, s3 } = decrypt2(xk, b32[0], b32[1], b32[2], b32[3]);
        b32[0] = s0, b32[1] = s1, b32[2] = s2, b32[3] = s3;
        return block;
      }
      var AESW = {
        /*
        High-level pseudocode:
        ```
        A: u64 = IV
        out = []
        for (let i=0, ctr = 0; i<6; i++) {
          for (const chunk of chunks(plaintext, 8)) {
            A ^= swapEndianess(ctr++)
            [A, res] = chunks(encrypt(A || chunk), 8);
            out ||= res
          }
        }
        out = A || out
        ```
        Decrypt is the same, but reversed.
        */
        encrypt(kek, out) {
          if (out.length >= 2 ** 32)
            throw new Error("plaintext should be less than 4gb");
          const xk = expandKeyLE(kek);
          if (out.length === 16)
            encryptBlock(xk, out);
          else {
            const o32 = (0, utils_js_1.u32)(out);
            let a0 = o32[0], a1 = o32[1];
            for (let j = 0, ctr = 1; j < 6; j++) {
              for (let pos = 2; pos < o32.length; pos += 2, ctr++) {
                const { s0, s1, s2, s3 } = encrypt2(xk, a0, a1, o32[pos], o32[pos + 1]);
                a0 = s0, a1 = s1 ^ byteSwap2(ctr), o32[pos] = s2, o32[pos + 1] = s3;
              }
            }
            o32[0] = a0, o32[1] = a1;
          }
          xk.fill(0);
        },
        decrypt(kek, out) {
          if (out.length - 8 >= 2 ** 32)
            throw new Error("ciphertext should be less than 4gb");
          const xk = expandKeyDecLE(kek);
          const chunks = out.length / 8 - 1;
          if (chunks === 1)
            decryptBlock(xk, out);
          else {
            const o32 = (0, utils_js_1.u32)(out);
            let a0 = o32[0], a1 = o32[1];
            for (let j = 0, ctr = chunks * 6; j < 6; j++) {
              for (let pos = chunks * 2; pos >= 1; pos -= 2, ctr--) {
                a1 ^= byteSwap2(ctr);
                const { s0, s1, s2, s3 } = decrypt2(xk, a0, a1, o32[pos], o32[pos + 1]);
                a0 = s0, a1 = s1, o32[pos] = s2, o32[pos + 1] = s3;
              }
            }
            o32[0] = a0, o32[1] = a1;
          }
          xk.fill(0);
        }
      };
      var AESKW_IV = /* @__PURE__ */ new Uint8Array(8).fill(166);
      exports.aeskw = (0, utils_js_1.wrapCipher)({ blockSize: 8 }, (kek) => ({
        encrypt(plaintext) {
          if (!plaintext.length || plaintext.length % 8 !== 0)
            throw new Error("invalid plaintext length");
          if (plaintext.length === 8)
            throw new Error("8-byte keys not allowed in AESKW, use AESKWP instead");
          const out = (0, utils_js_1.concatBytes)(AESKW_IV, plaintext);
          AESW.encrypt(kek, out);
          return out;
        },
        decrypt(ciphertext) {
          if (ciphertext.length % 8 !== 0 || ciphertext.length < 3 * 8)
            throw new Error("invalid ciphertext length");
          const out = (0, utils_js_1.copyBytes)(ciphertext);
          AESW.decrypt(kek, out);
          if (!(0, utils_js_1.equalBytes)(out.subarray(0, 8), AESKW_IV))
            throw new Error("integrity check failed");
          out.subarray(0, 8).fill(0);
          return out.subarray(8);
        }
      }));
      var AESKWP_IV = 2790873510;
      exports.aeskwp = (0, utils_js_1.wrapCipher)({ blockSize: 8 }, (kek) => ({
        encrypt(plaintext) {
          if (!plaintext.length)
            throw new Error("invalid plaintext length");
          const padded = Math.ceil(plaintext.length / 8) * 8;
          const out = new Uint8Array(8 + padded);
          out.set(plaintext, 8);
          const out32 = (0, utils_js_1.u32)(out);
          out32[0] = AESKWP_IV;
          out32[1] = byteSwap2(plaintext.length);
          AESW.encrypt(kek, out);
          return out;
        },
        decrypt(ciphertext) {
          if (ciphertext.length < 16)
            throw new Error("invalid ciphertext length");
          const out = (0, utils_js_1.copyBytes)(ciphertext);
          const o32 = (0, utils_js_1.u32)(out);
          AESW.decrypt(kek, out);
          const len = byteSwap2(o32[1]) >>> 0;
          const padded = Math.ceil(len / 8) * 8;
          if (o32[0] !== AESKWP_IV || out.length - 8 !== padded)
            throw new Error("integrity check failed");
          for (let i = len; i < padded; i++)
            if (out[8 + i] !== 0)
              throw new Error("integrity check failed");
          out.subarray(0, 8).fill(0);
          return out.subarray(8, 8 + len);
        }
      }));
      exports.unsafe = {
        expandKeyLE,
        expandKeyDecLE,
        encrypt: encrypt2,
        decrypt: decrypt2,
        encryptBlock,
        decryptBlock,
        ctrCounter,
        ctr32
      };
    }
  });

  // node_modules/@ecies/ciphers/dist/aes/noble.js
  var require_noble = __commonJS({
    "node_modules/@ecies/ciphers/dist/aes/noble.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.aes256cbc = exports.aes256gcm = void 0;
      var aes_1 = require_aes();
      var aes256gcm = function(key, nonce, AAD) {
        return (0, aes_1.gcm)(key, nonce, AAD);
      };
      exports.aes256gcm = aes256gcm;
      var aes256cbc = function(key, nonce, AAD) {
        return (0, aes_1.cbc)(key, nonce);
      };
      exports.aes256cbc = aes256cbc;
    }
  });

  // node_modules/@noble/ciphers/_arx.js
  var require_arx = __commonJS({
    "node_modules/@noble/ciphers/_arx.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rotl = rotl2;
      exports.createCipher = createCipher;
      var _assert_js_1 = require_assert();
      var utils_js_1 = require_utils();
      var _utf8ToBytes = (str) => Uint8Array.from(str.split("").map((c) => c.charCodeAt(0)));
      var sigma16 = _utf8ToBytes("expand 16-byte k");
      var sigma32 = _utf8ToBytes("expand 32-byte k");
      var sigma16_32 = (0, utils_js_1.u32)(sigma16);
      var sigma32_32 = (0, utils_js_1.u32)(sigma32);
      function rotl2(a, b) {
        return a << b | a >>> 32 - b;
      }
      function isAligned32(b) {
        return b.byteOffset % 4 === 0;
      }
      var BLOCK_LEN = 64;
      var BLOCK_LEN32 = 16;
      var MAX_COUNTER = 2 ** 32 - 1;
      var U32_EMPTY = new Uint32Array();
      function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
        const len = data.length;
        const block = new Uint8Array(BLOCK_LEN);
        const b32 = (0, utils_js_1.u32)(block);
        const isAligned = isAligned32(data) && isAligned32(output);
        const d32 = isAligned ? (0, utils_js_1.u32)(data) : U32_EMPTY;
        const o32 = isAligned ? (0, utils_js_1.u32)(output) : U32_EMPTY;
        for (let pos = 0; pos < len; counter++) {
          core(sigma, key, nonce, b32, counter, rounds);
          if (counter >= MAX_COUNTER)
            throw new Error("arx: counter overflow");
          const take = Math.min(BLOCK_LEN, len - pos);
          if (isAligned && take === BLOCK_LEN) {
            const pos32 = pos / 4;
            if (pos % 4 !== 0)
              throw new Error("arx: invalid block position");
            for (let j = 0, posj; j < BLOCK_LEN32; j++) {
              posj = pos32 + j;
              o32[posj] = d32[posj] ^ b32[j];
            }
            pos += BLOCK_LEN;
            continue;
          }
          for (let j = 0, posj; j < take; j++) {
            posj = pos + j;
            output[posj] = data[posj] ^ block[j];
          }
          pos += take;
        }
      }
      function createCipher(core, opts) {
        const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = (0, utils_js_1.checkOpts)({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
        if (typeof core !== "function")
          throw new Error("core must be a function");
        (0, _assert_js_1.anumber)(counterLength);
        (0, _assert_js_1.anumber)(rounds);
        (0, _assert_js_1.abool)(counterRight);
        (0, _assert_js_1.abool)(allowShortKeys);
        return (key, nonce, data, output, counter = 0) => {
          (0, _assert_js_1.abytes)(key);
          (0, _assert_js_1.abytes)(nonce);
          (0, _assert_js_1.abytes)(data);
          const len = data.length;
          if (output === void 0)
            output = new Uint8Array(len);
          (0, _assert_js_1.abytes)(output);
          (0, _assert_js_1.anumber)(counter);
          if (counter < 0 || counter >= MAX_COUNTER)
            throw new Error("arx: counter overflow");
          if (output.length < len)
            throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
          const toClean = [];
          let l = key.length;
          let k;
          let sigma;
          if (l === 32) {
            toClean.push(k = (0, utils_js_1.copyBytes)(key));
            sigma = sigma32_32;
          } else if (l === 16 && allowShortKeys) {
            k = new Uint8Array(32);
            k.set(key);
            k.set(key, 16);
            sigma = sigma16_32;
            toClean.push(k);
          } else {
            throw new Error(`arx: invalid 32-byte key, got length=${l}`);
          }
          if (!isAligned32(nonce))
            toClean.push(nonce = (0, utils_js_1.copyBytes)(nonce));
          const k32 = (0, utils_js_1.u32)(k);
          if (extendNonceFn) {
            if (nonce.length !== 24)
              throw new Error(`arx: extended nonce must be 24 bytes`);
            extendNonceFn(sigma, k32, (0, utils_js_1.u32)(nonce.subarray(0, 16)), k32);
            nonce = nonce.subarray(16);
          }
          const nonceNcLen = 16 - counterLength;
          if (nonceNcLen !== nonce.length)
            throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
          if (nonceNcLen !== 12) {
            const nc = new Uint8Array(12);
            nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
            nonce = nc;
            toClean.push(nonce);
          }
          const n32 = (0, utils_js_1.u32)(nonce);
          runCipher(core, sigma, k32, n32, data, output, counter, rounds);
          (0, utils_js_1.clean)(...toClean);
          return output;
        };
      }
    }
  });

  // node_modules/@noble/ciphers/_poly1305.js
  var require_poly1305 = __commonJS({
    "node_modules/@noble/ciphers/_poly1305.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.poly1305 = void 0;
      exports.wrapConstructorWithKey = wrapConstructorWithKey;
      var _assert_js_1 = require_assert();
      var utils_js_1 = require_utils();
      var u8to16 = (a, i) => a[i++] & 255 | (a[i++] & 255) << 8;
      var Poly1305 = class {
        constructor(key) {
          this.blockLen = 16;
          this.outputLen = 16;
          this.buffer = new Uint8Array(16);
          this.r = new Uint16Array(10);
          this.h = new Uint16Array(10);
          this.pad = new Uint16Array(8);
          this.pos = 0;
          this.finished = false;
          key = (0, utils_js_1.toBytes)(key);
          (0, _assert_js_1.abytes)(key, 32);
          const t0 = u8to16(key, 0);
          const t1 = u8to16(key, 2);
          const t2 = u8to16(key, 4);
          const t3 = u8to16(key, 6);
          const t4 = u8to16(key, 8);
          const t5 = u8to16(key, 10);
          const t6 = u8to16(key, 12);
          const t7 = u8to16(key, 14);
          this.r[0] = t0 & 8191;
          this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
          this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
          this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
          this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
          this.r[5] = t4 >>> 1 & 8190;
          this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
          this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
          this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
          this.r[9] = t7 >>> 5 & 127;
          for (let i = 0; i < 8; i++)
            this.pad[i] = u8to16(key, 16 + 2 * i);
        }
        process(data, offset, isLast = false) {
          const hibit = isLast ? 0 : 1 << 11;
          const { h, r } = this;
          const r0 = r[0];
          const r1 = r[1];
          const r2 = r[2];
          const r3 = r[3];
          const r4 = r[4];
          const r5 = r[5];
          const r6 = r[6];
          const r7 = r[7];
          const r8 = r[8];
          const r9 = r[9];
          const t0 = u8to16(data, offset + 0);
          const t1 = u8to16(data, offset + 2);
          const t2 = u8to16(data, offset + 4);
          const t3 = u8to16(data, offset + 6);
          const t4 = u8to16(data, offset + 8);
          const t5 = u8to16(data, offset + 10);
          const t6 = u8to16(data, offset + 12);
          const t7 = u8to16(data, offset + 14);
          let h0 = h[0] + (t0 & 8191);
          let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
          let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
          let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
          let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
          let h5 = h[5] + (t4 >>> 1 & 8191);
          let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
          let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
          let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
          let h9 = h[9] + (t7 >>> 5 | hibit);
          let c = 0;
          let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
          c = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
          c += d0 >>> 13;
          d0 &= 8191;
          let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
          c = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
          c += d1 >>> 13;
          d1 &= 8191;
          let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
          c = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
          c += d2 >>> 13;
          d2 &= 8191;
          let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
          c = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
          c += d3 >>> 13;
          d3 &= 8191;
          let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
          c = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
          c += d4 >>> 13;
          d4 &= 8191;
          let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
          c = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
          c += d5 >>> 13;
          d5 &= 8191;
          let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
          c = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
          c += d6 >>> 13;
          d6 &= 8191;
          let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
          c = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
          c += d7 >>> 13;
          d7 &= 8191;
          let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
          c = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
          c += d8 >>> 13;
          d8 &= 8191;
          let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
          c = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
          c += d9 >>> 13;
          d9 &= 8191;
          c = (c << 2) + c | 0;
          c = c + d0 | 0;
          d0 = c & 8191;
          c = c >>> 13;
          d1 += c;
          h[0] = d0;
          h[1] = d1;
          h[2] = d2;
          h[3] = d3;
          h[4] = d4;
          h[5] = d5;
          h[6] = d6;
          h[7] = d7;
          h[8] = d8;
          h[9] = d9;
        }
        finalize() {
          const { h, pad } = this;
          const g = new Uint16Array(10);
          let c = h[1] >>> 13;
          h[1] &= 8191;
          for (let i = 2; i < 10; i++) {
            h[i] += c;
            c = h[i] >>> 13;
            h[i] &= 8191;
          }
          h[0] += c * 5;
          c = h[0] >>> 13;
          h[0] &= 8191;
          h[1] += c;
          c = h[1] >>> 13;
          h[1] &= 8191;
          h[2] += c;
          g[0] = h[0] + 5;
          c = g[0] >>> 13;
          g[0] &= 8191;
          for (let i = 1; i < 10; i++) {
            g[i] = h[i] + c;
            c = g[i] >>> 13;
            g[i] &= 8191;
          }
          g[9] -= 1 << 13;
          let mask = (c ^ 1) - 1;
          for (let i = 0; i < 10; i++)
            g[i] &= mask;
          mask = ~mask;
          for (let i = 0; i < 10; i++)
            h[i] = h[i] & mask | g[i];
          h[0] = (h[0] | h[1] << 13) & 65535;
          h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
          h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
          h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
          h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
          h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
          h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
          h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
          let f = h[0] + pad[0];
          h[0] = f & 65535;
          for (let i = 1; i < 8; i++) {
            f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
            h[i] = f & 65535;
          }
          (0, utils_js_1.clean)(g);
        }
        update(data) {
          (0, _assert_js_1.aexists)(this);
          const { buffer, blockLen } = this;
          data = (0, utils_js_1.toBytes)(data);
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(data, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(buffer, 0, false);
              this.pos = 0;
            }
          }
          return this;
        }
        destroy() {
          (0, utils_js_1.clean)(this.h, this.r, this.buffer, this.pad);
        }
        digestInto(out) {
          (0, _assert_js_1.aexists)(this);
          (0, _assert_js_1.aoutput)(out, this);
          this.finished = true;
          const { buffer, h } = this;
          let { pos } = this;
          if (pos) {
            buffer[pos++] = 1;
            for (; pos < 16; pos++)
              buffer[pos] = 0;
            this.process(buffer, 0, true);
          }
          this.finalize();
          let opos = 0;
          for (let i = 0; i < 8; i++) {
            out[opos++] = h[i] >>> 0;
            out[opos++] = h[i] >>> 8;
          }
          return out;
        }
        digest() {
          const { buffer, outputLen } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
      };
      function wrapConstructorWithKey(hashCons) {
        const hashC = (msg, key) => hashCons(key).update((0, utils_js_1.toBytes)(msg)).digest();
        const tmp = hashCons(new Uint8Array(32));
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (key) => hashCons(key);
        return hashC;
      }
      exports.poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));
    }
  });

  // node_modules/@noble/ciphers/chacha.js
  var require_chacha = __commonJS({
    "node_modules/@noble/ciphers/chacha.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.xchacha20poly1305 = exports.chacha20poly1305 = exports._poly1305_aead = exports.chacha12 = exports.chacha8 = exports.xchacha20 = exports.chacha20 = exports.chacha20orig = void 0;
      exports.hchacha = hchacha;
      var _arx_js_1 = require_arx();
      var _poly1305_js_1 = require_poly1305();
      var utils_js_1 = require_utils();
      function chachaCore(s, k, n, out, cnt, rounds = 20) {
        let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
        let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
        for (let r = 0; r < rounds; r += 2) {
          x00 = x00 + x04 | 0;
          x12 = (0, _arx_js_1.rotl)(x12 ^ x00, 16);
          x08 = x08 + x12 | 0;
          x04 = (0, _arx_js_1.rotl)(x04 ^ x08, 12);
          x00 = x00 + x04 | 0;
          x12 = (0, _arx_js_1.rotl)(x12 ^ x00, 8);
          x08 = x08 + x12 | 0;
          x04 = (0, _arx_js_1.rotl)(x04 ^ x08, 7);
          x01 = x01 + x05 | 0;
          x13 = (0, _arx_js_1.rotl)(x13 ^ x01, 16);
          x09 = x09 + x13 | 0;
          x05 = (0, _arx_js_1.rotl)(x05 ^ x09, 12);
          x01 = x01 + x05 | 0;
          x13 = (0, _arx_js_1.rotl)(x13 ^ x01, 8);
          x09 = x09 + x13 | 0;
          x05 = (0, _arx_js_1.rotl)(x05 ^ x09, 7);
          x02 = x02 + x06 | 0;
          x14 = (0, _arx_js_1.rotl)(x14 ^ x02, 16);
          x10 = x10 + x14 | 0;
          x06 = (0, _arx_js_1.rotl)(x06 ^ x10, 12);
          x02 = x02 + x06 | 0;
          x14 = (0, _arx_js_1.rotl)(x14 ^ x02, 8);
          x10 = x10 + x14 | 0;
          x06 = (0, _arx_js_1.rotl)(x06 ^ x10, 7);
          x03 = x03 + x07 | 0;
          x15 = (0, _arx_js_1.rotl)(x15 ^ x03, 16);
          x11 = x11 + x15 | 0;
          x07 = (0, _arx_js_1.rotl)(x07 ^ x11, 12);
          x03 = x03 + x07 | 0;
          x15 = (0, _arx_js_1.rotl)(x15 ^ x03, 8);
          x11 = x11 + x15 | 0;
          x07 = (0, _arx_js_1.rotl)(x07 ^ x11, 7);
          x00 = x00 + x05 | 0;
          x15 = (0, _arx_js_1.rotl)(x15 ^ x00, 16);
          x10 = x10 + x15 | 0;
          x05 = (0, _arx_js_1.rotl)(x05 ^ x10, 12);
          x00 = x00 + x05 | 0;
          x15 = (0, _arx_js_1.rotl)(x15 ^ x00, 8);
          x10 = x10 + x15 | 0;
          x05 = (0, _arx_js_1.rotl)(x05 ^ x10, 7);
          x01 = x01 + x06 | 0;
          x12 = (0, _arx_js_1.rotl)(x12 ^ x01, 16);
          x11 = x11 + x12 | 0;
          x06 = (0, _arx_js_1.rotl)(x06 ^ x11, 12);
          x01 = x01 + x06 | 0;
          x12 = (0, _arx_js_1.rotl)(x12 ^ x01, 8);
          x11 = x11 + x12 | 0;
          x06 = (0, _arx_js_1.rotl)(x06 ^ x11, 7);
          x02 = x02 + x07 | 0;
          x13 = (0, _arx_js_1.rotl)(x13 ^ x02, 16);
          x08 = x08 + x13 | 0;
          x07 = (0, _arx_js_1.rotl)(x07 ^ x08, 12);
          x02 = x02 + x07 | 0;
          x13 = (0, _arx_js_1.rotl)(x13 ^ x02, 8);
          x08 = x08 + x13 | 0;
          x07 = (0, _arx_js_1.rotl)(x07 ^ x08, 7);
          x03 = x03 + x04 | 0;
          x14 = (0, _arx_js_1.rotl)(x14 ^ x03, 16);
          x09 = x09 + x14 | 0;
          x04 = (0, _arx_js_1.rotl)(x04 ^ x09, 12);
          x03 = x03 + x04 | 0;
          x14 = (0, _arx_js_1.rotl)(x14 ^ x03, 8);
          x09 = x09 + x14 | 0;
          x04 = (0, _arx_js_1.rotl)(x04 ^ x09, 7);
        }
        let oi = 0;
        out[oi++] = y00 + x00 | 0;
        out[oi++] = y01 + x01 | 0;
        out[oi++] = y02 + x02 | 0;
        out[oi++] = y03 + x03 | 0;
        out[oi++] = y04 + x04 | 0;
        out[oi++] = y05 + x05 | 0;
        out[oi++] = y06 + x06 | 0;
        out[oi++] = y07 + x07 | 0;
        out[oi++] = y08 + x08 | 0;
        out[oi++] = y09 + x09 | 0;
        out[oi++] = y10 + x10 | 0;
        out[oi++] = y11 + x11 | 0;
        out[oi++] = y12 + x12 | 0;
        out[oi++] = y13 + x13 | 0;
        out[oi++] = y14 + x14 | 0;
        out[oi++] = y15 + x15 | 0;
      }
      function hchacha(s, k, i, o32) {
        let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
        for (let r = 0; r < 20; r += 2) {
          x00 = x00 + x04 | 0;
          x12 = (0, _arx_js_1.rotl)(x12 ^ x00, 16);
          x08 = x08 + x12 | 0;
          x04 = (0, _arx_js_1.rotl)(x04 ^ x08, 12);
          x00 = x00 + x04 | 0;
          x12 = (0, _arx_js_1.rotl)(x12 ^ x00, 8);
          x08 = x08 + x12 | 0;
          x04 = (0, _arx_js_1.rotl)(x04 ^ x08, 7);
          x01 = x01 + x05 | 0;
          x13 = (0, _arx_js_1.rotl)(x13 ^ x01, 16);
          x09 = x09 + x13 | 0;
          x05 = (0, _arx_js_1.rotl)(x05 ^ x09, 12);
          x01 = x01 + x05 | 0;
          x13 = (0, _arx_js_1.rotl)(x13 ^ x01, 8);
          x09 = x09 + x13 | 0;
          x05 = (0, _arx_js_1.rotl)(x05 ^ x09, 7);
          x02 = x02 + x06 | 0;
          x14 = (0, _arx_js_1.rotl)(x14 ^ x02, 16);
          x10 = x10 + x14 | 0;
          x06 = (0, _arx_js_1.rotl)(x06 ^ x10, 12);
          x02 = x02 + x06 | 0;
          x14 = (0, _arx_js_1.rotl)(x14 ^ x02, 8);
          x10 = x10 + x14 | 0;
          x06 = (0, _arx_js_1.rotl)(x06 ^ x10, 7);
          x03 = x03 + x07 | 0;
          x15 = (0, _arx_js_1.rotl)(x15 ^ x03, 16);
          x11 = x11 + x15 | 0;
          x07 = (0, _arx_js_1.rotl)(x07 ^ x11, 12);
          x03 = x03 + x07 | 0;
          x15 = (0, _arx_js_1.rotl)(x15 ^ x03, 8);
          x11 = x11 + x15 | 0;
          x07 = (0, _arx_js_1.rotl)(x07 ^ x11, 7);
          x00 = x00 + x05 | 0;
          x15 = (0, _arx_js_1.rotl)(x15 ^ x00, 16);
          x10 = x10 + x15 | 0;
          x05 = (0, _arx_js_1.rotl)(x05 ^ x10, 12);
          x00 = x00 + x05 | 0;
          x15 = (0, _arx_js_1.rotl)(x15 ^ x00, 8);
          x10 = x10 + x15 | 0;
          x05 = (0, _arx_js_1.rotl)(x05 ^ x10, 7);
          x01 = x01 + x06 | 0;
          x12 = (0, _arx_js_1.rotl)(x12 ^ x01, 16);
          x11 = x11 + x12 | 0;
          x06 = (0, _arx_js_1.rotl)(x06 ^ x11, 12);
          x01 = x01 + x06 | 0;
          x12 = (0, _arx_js_1.rotl)(x12 ^ x01, 8);
          x11 = x11 + x12 | 0;
          x06 = (0, _arx_js_1.rotl)(x06 ^ x11, 7);
          x02 = x02 + x07 | 0;
          x13 = (0, _arx_js_1.rotl)(x13 ^ x02, 16);
          x08 = x08 + x13 | 0;
          x07 = (0, _arx_js_1.rotl)(x07 ^ x08, 12);
          x02 = x02 + x07 | 0;
          x13 = (0, _arx_js_1.rotl)(x13 ^ x02, 8);
          x08 = x08 + x13 | 0;
          x07 = (0, _arx_js_1.rotl)(x07 ^ x08, 7);
          x03 = x03 + x04 | 0;
          x14 = (0, _arx_js_1.rotl)(x14 ^ x03, 16);
          x09 = x09 + x14 | 0;
          x04 = (0, _arx_js_1.rotl)(x04 ^ x09, 12);
          x03 = x03 + x04 | 0;
          x14 = (0, _arx_js_1.rotl)(x14 ^ x03, 8);
          x09 = x09 + x14 | 0;
          x04 = (0, _arx_js_1.rotl)(x04 ^ x09, 7);
        }
        let oi = 0;
        o32[oi++] = x00;
        o32[oi++] = x01;
        o32[oi++] = x02;
        o32[oi++] = x03;
        o32[oi++] = x12;
        o32[oi++] = x13;
        o32[oi++] = x14;
        o32[oi++] = x15;
      }
      exports.chacha20orig = (0, _arx_js_1.createCipher)(chachaCore, {
        counterRight: false,
        counterLength: 8,
        allowShortKeys: true
      });
      exports.chacha20 = (0, _arx_js_1.createCipher)(chachaCore, {
        counterRight: false,
        counterLength: 4,
        allowShortKeys: false
      });
      exports.xchacha20 = (0, _arx_js_1.createCipher)(chachaCore, {
        counterRight: false,
        counterLength: 8,
        extendNonceFn: hchacha,
        allowShortKeys: false
      });
      exports.chacha8 = (0, _arx_js_1.createCipher)(chachaCore, {
        counterRight: false,
        counterLength: 4,
        rounds: 8
      });
      exports.chacha12 = (0, _arx_js_1.createCipher)(chachaCore, {
        counterRight: false,
        counterLength: 4,
        rounds: 12
      });
      var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
      var updatePadded = (h, msg) => {
        h.update(msg);
        const left = msg.length % 16;
        if (left)
          h.update(ZEROS16.subarray(left));
      };
      var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
      function computeTag(fn, key, nonce, data, AAD) {
        const authKey = fn(key, nonce, ZEROS32);
        const h = _poly1305_js_1.poly1305.create(authKey);
        if (AAD)
          updatePadded(h, AAD);
        updatePadded(h, data);
        const num = new Uint8Array(16);
        const view = (0, utils_js_1.createView)(num);
        (0, utils_js_1.setBigUint64)(view, 0, BigInt(AAD ? AAD.length : 0), true);
        (0, utils_js_1.setBigUint64)(view, 8, BigInt(data.length), true);
        h.update(num);
        const res = h.digest();
        (0, utils_js_1.clean)(authKey, num);
        return res;
      }
      var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
        const tagLength = 16;
        return {
          encrypt(plaintext, output) {
            const plength = plaintext.length;
            output = (0, utils_js_1.getOutput)(plength + tagLength, output, false);
            output.set(plaintext);
            const oPlain = output.subarray(0, -tagLength);
            xorStream(key, nonce, oPlain, oPlain, 1);
            const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
            output.set(tag, plength);
            (0, utils_js_1.clean)(tag);
            return output;
          },
          decrypt(ciphertext, output) {
            output = (0, utils_js_1.getOutput)(ciphertext.length - tagLength, output, false);
            const data = ciphertext.subarray(0, -tagLength);
            const passedTag = ciphertext.subarray(-tagLength);
            const tag = computeTag(xorStream, key, nonce, data, AAD);
            if (!(0, utils_js_1.equalBytes)(passedTag, tag))
              throw new Error("invalid tag");
            output.set(ciphertext.subarray(0, -tagLength));
            xorStream(key, nonce, output, output, 1);
            (0, utils_js_1.clean)(tag);
            return output;
          }
        };
      };
      exports._poly1305_aead = _poly1305_aead;
      exports.chacha20poly1305 = (0, utils_js_1.wrapCipher)({ blockSize: 64, nonceLength: 12, tagLength: 16 }, (0, exports._poly1305_aead)(exports.chacha20));
      exports.xchacha20poly1305 = (0, utils_js_1.wrapCipher)({ blockSize: 64, nonceLength: 24, tagLength: 16 }, (0, exports._poly1305_aead)(exports.xchacha20));
    }
  });

  // node_modules/@ecies/ciphers/dist/chacha/noble.js
  var require_noble2 = __commonJS({
    "node_modules/@ecies/ciphers/dist/chacha/noble.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.chacha20 = exports.xchacha20 = void 0;
      var chacha_1 = require_chacha();
      var xchacha20 = function(key, nonce, AAD) {
        return (0, chacha_1.xchacha20poly1305)(key, nonce, AAD);
      };
      exports.xchacha20 = xchacha20;
      var chacha20 = function(key, nonce, AAD) {
        return (0, chacha_1.chacha20poly1305)(key, nonce, AAD);
      };
      exports.chacha20 = chacha20;
    }
  });

  // node_modules/eciesjs/dist/utils/symmetric.js
  var require_symmetric = __commonJS({
    "node_modules/eciesjs/dist/utils/symmetric.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.aesDecrypt = exports.aesEncrypt = exports.symDecrypt = exports.symEncrypt = void 0;
      var utils_1 = require_utils();
      var webcrypto_1 = require_webcrypto();
      var aes_1 = require_noble();
      var chacha_1 = require_noble2();
      var config_1 = require_config();
      var consts_1 = require_consts();
      var symEncrypt = function(key, plainText, AAD) {
        return _exec(_encrypt, key, plainText, AAD);
      };
      exports.symEncrypt = symEncrypt;
      var symDecrypt = function(key, cipherText, AAD) {
        return _exec(_decrypt, key, cipherText, AAD);
      };
      exports.symDecrypt = symDecrypt;
      exports.aesEncrypt = exports.symEncrypt;
      exports.aesDecrypt = exports.symDecrypt;
      function _exec(callback, key, data, AAD) {
        var algorithm = (0, config_1.symmetricAlgorithm)();
        if (algorithm === "aes-256-gcm") {
          return callback(aes_1.aes256gcm, key, data, (0, config_1.symmetricNonceLength)(), consts_1.AEAD_TAG_LENGTH, AAD);
        } else if (algorithm === "xchacha20") {
          return callback(chacha_1.xchacha20, key, data, consts_1.XCHACHA20_NONCE_LENGTH, consts_1.AEAD_TAG_LENGTH, AAD);
        } else if (algorithm === "aes-256-cbc") {
          return callback(aes_1.aes256cbc, key, data, 16, 0);
        } else {
          throw new Error("Not implemented");
        }
      }
      function _encrypt(func, key, data, nonceLength, tagLength, AAD) {
        var nonce = (0, webcrypto_1.randomBytes)(nonceLength);
        var cipher = func(key, nonce, AAD);
        var encrypted = cipher.encrypt(data);
        if (tagLength === 0) {
          return (0, utils_1.concatBytes)(nonce, encrypted);
        }
        var cipherTextLength = encrypted.length - tagLength;
        var cipherText = encrypted.subarray(0, cipherTextLength);
        var tag = encrypted.subarray(cipherTextLength);
        return (0, utils_1.concatBytes)(nonce, tag, cipherText);
      }
      function _decrypt(func, key, data, nonceLength, tagLength, AAD) {
        var nonce = data.subarray(0, nonceLength);
        var cipher = func(key, Uint8Array.from(nonce), AAD);
        var encrypted = data.subarray(nonceLength);
        if (tagLength === 0) {
          return cipher.decrypt(encrypted);
        }
        var tag = encrypted.subarray(0, tagLength);
        var cipherText = encrypted.subarray(tagLength);
        return cipher.decrypt((0, utils_1.concatBytes)(cipherText, tag));
      }
    }
  });

  // node_modules/eciesjs/dist/utils/index.js
  var require_utils5 = __commonJS({
    "node_modules/eciesjs/dist/utils/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_elliptic(), exports);
      __exportStar(require_hash(), exports);
      __exportStar(require_hex(), exports);
      __exportStar(require_symmetric(), exports);
    }
  });

  // node_modules/eciesjs/dist/keys/PublicKey.js
  var require_PublicKey = __commonJS({
    "node_modules/eciesjs/dist/keys/PublicKey.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PublicKey = void 0;
      var utils_1 = require_utils();
      var utils_2 = require_utils5();
      var PublicKey = (
        /** @class */
        function() {
          function PublicKey2(data) {
            var compressed = (0, utils_2.convertPublicKeyFormat)(data, true);
            var uncompressed = (0, utils_2.convertPublicKeyFormat)(data, false);
            this.data = compressed;
            this.dataUncompressed = compressed.length !== uncompressed.length ? uncompressed : null;
          }
          PublicKey2.fromHex = function(hex) {
            return new PublicKey2((0, utils_2.hexToPublicKey)(hex));
          };
          Object.defineProperty(PublicKey2.prototype, "_uncompressed", {
            get: function() {
              return this.dataUncompressed !== null ? this.dataUncompressed : this.data;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(PublicKey2.prototype, "uncompressed", {
            /** @deprecated - use `PublicKey.toBytes(false)` instead. You may also need `Buffer.from`. */
            get: function() {
              return Buffer.from(this._uncompressed);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(PublicKey2.prototype, "compressed", {
            /** @deprecated - use `PublicKey.toBytes()` instead. You may also need `Buffer.from`. */
            get: function() {
              return Buffer.from(this.data);
            },
            enumerable: false,
            configurable: true
          });
          PublicKey2.prototype.toBytes = function(compressed) {
            if (compressed === void 0) {
              compressed = true;
            }
            return compressed ? this.data : this._uncompressed;
          };
          PublicKey2.prototype.toHex = function(compressed) {
            if (compressed === void 0) {
              compressed = true;
            }
            return (0, utils_1.bytesToHex)(this.toBytes(compressed));
          };
          PublicKey2.prototype.decapsulate = function(sk, compressed) {
            if (compressed === void 0) {
              compressed = false;
            }
            var senderPoint = this.toBytes(compressed);
            var sharedPoint = sk.multiply(this, compressed);
            return (0, utils_2.getSharedKey)(senderPoint, sharedPoint);
          };
          PublicKey2.prototype.equals = function(other) {
            return (0, utils_1.equalBytes)(this.data, other.data);
          };
          return PublicKey2;
        }()
      );
      exports.PublicKey = PublicKey;
    }
  });

  // node_modules/eciesjs/dist/keys/PrivateKey.js
  var require_PrivateKey = __commonJS({
    "node_modules/eciesjs/dist/keys/PrivateKey.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PrivateKey = void 0;
      var utils_1 = require_utils();
      var utils_2 = require_utils5();
      var PublicKey_1 = require_PublicKey();
      var PrivateKey2 = (
        /** @class */
        function() {
          function PrivateKey3(secret) {
            if (secret === void 0) {
              this.data = (0, utils_2.getValidSecret)();
            } else if ((0, utils_2.isValidPrivateKey)(secret)) {
              this.data = secret;
            } else {
              throw new Error("Invalid private key");
            }
            this.publicKey = new PublicKey_1.PublicKey((0, utils_2.getPublicKey)(this.data));
          }
          PrivateKey3.fromHex = function(hex) {
            return new PrivateKey3((0, utils_2.decodeHex)(hex));
          };
          Object.defineProperty(PrivateKey3.prototype, "secret", {
            /** @description From version 0.5.0, `Uint8Array` will be returned instead of `Buffer`. */
            get: function() {
              return Buffer.from(this.data);
            },
            enumerable: false,
            configurable: true
          });
          PrivateKey3.prototype.toHex = function() {
            return (0, utils_1.bytesToHex)(this.data);
          };
          PrivateKey3.prototype.encapsulate = function(pk, compressed) {
            if (compressed === void 0) {
              compressed = false;
            }
            var senderPoint = this.publicKey.toBytes(compressed);
            var sharedPoint = this.multiply(pk, compressed);
            return (0, utils_2.getSharedKey)(senderPoint, sharedPoint);
          };
          PrivateKey3.prototype.multiply = function(pk, compressed) {
            if (compressed === void 0) {
              compressed = false;
            }
            return (0, utils_2.getSharedPoint)(this.data, pk.toBytes(true), compressed);
          };
          PrivateKey3.prototype.equals = function(other) {
            return (0, utils_1.equalBytes)(this.data, other.data);
          };
          return PrivateKey3;
        }()
      );
      exports.PrivateKey = PrivateKey2;
    }
  });

  // node_modules/eciesjs/dist/keys/index.js
  var require_keys = __commonJS({
    "node_modules/eciesjs/dist/keys/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PublicKey = exports.PrivateKey = void 0;
      var PrivateKey_1 = require_PrivateKey();
      Object.defineProperty(exports, "PrivateKey", { enumerable: true, get: function() {
        return PrivateKey_1.PrivateKey;
      } });
      var PublicKey_1 = require_PublicKey();
      Object.defineProperty(exports, "PublicKey", { enumerable: true, get: function() {
        return PublicKey_1.PublicKey;
      } });
    }
  });

  // node_modules/eciesjs/dist/index.js
  var require_dist = __commonJS({
    "node_modules/eciesjs/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.utils = exports.PublicKey = exports.PrivateKey = exports.ECIES_CONFIG = void 0;
      exports.encrypt = encrypt2;
      exports.decrypt = decrypt2;
      var utils_1 = require_utils();
      var config_1 = require_config();
      var keys_1 = require_keys();
      var utils_2 = require_utils5();
      function encrypt2(receiverRawPK, data) {
        return Buffer.from(_encrypt(receiverRawPK, data));
      }
      function _encrypt(receiverRawPK, data) {
        var ephemeralSK = new keys_1.PrivateKey();
        var receiverPK = receiverRawPK instanceof Uint8Array ? new keys_1.PublicKey(receiverRawPK) : keys_1.PublicKey.fromHex(receiverRawPK);
        var sharedKey = ephemeralSK.encapsulate(receiverPK, (0, config_1.isHkdfKeyCompressed)());
        var ephemeralPK = ephemeralSK.publicKey.toBytes((0, config_1.isEphemeralKeyCompressed)());
        var encrypted = (0, utils_2.symEncrypt)(sharedKey, data);
        return (0, utils_1.concatBytes)(ephemeralPK, encrypted);
      }
      function decrypt2(receiverRawSK, data) {
        return Buffer.from(_decrypt(receiverRawSK, data));
      }
      function _decrypt(receiverRawSK, data) {
        var receiverSK = receiverRawSK instanceof Uint8Array ? new keys_1.PrivateKey(receiverRawSK) : keys_1.PrivateKey.fromHex(receiverRawSK);
        var keySize = (0, config_1.ephemeralKeySize)();
        var ephemeralPK = new keys_1.PublicKey(data.subarray(0, keySize));
        var encrypted = data.subarray(keySize);
        var sharedKey = ephemeralPK.decapsulate(receiverSK, (0, config_1.isHkdfKeyCompressed)());
        return (0, utils_2.symDecrypt)(sharedKey, encrypted);
      }
      var config_2 = require_config();
      Object.defineProperty(exports, "ECIES_CONFIG", { enumerable: true, get: function() {
        return config_2.ECIES_CONFIG;
      } });
      var keys_2 = require_keys();
      Object.defineProperty(exports, "PrivateKey", { enumerable: true, get: function() {
        return keys_2.PrivateKey;
      } });
      Object.defineProperty(exports, "PublicKey", { enumerable: true, get: function() {
        return keys_2.PublicKey;
      } });
      exports.utils = {
        // TODO: remove these after 0.5.0
        aesEncrypt: utils_2.aesEncrypt,
        aesDecrypt: utils_2.aesDecrypt,
        symEncrypt: utils_2.symEncrypt,
        symDecrypt: utils_2.symDecrypt,
        decodeHex: utils_2.decodeHex,
        getValidSecret: utils_2.getValidSecret,
        remove0x: utils_2.remove0x
      };
    }
  });

  // node_modules/@multiformats/base-x/src/index.js
  var require_src = __commonJS({
    "node_modules/@multiformats/base-x/src/index.js"(exports, module) {
      "use strict";
      function base3(ALPHABET) {
        if (ALPHABET.length >= 255) {
          throw new TypeError("Alphabet too long");
        }
        var BASE_MAP = new Uint8Array(256);
        for (var j = 0; j < BASE_MAP.length; j++) {
          BASE_MAP[j] = 255;
        }
        for (var i = 0; i < ALPHABET.length; i++) {
          var x = ALPHABET.charAt(i);
          var xc = x.charCodeAt(0);
          if (BASE_MAP[xc] !== 255) {
            throw new TypeError(x + " is ambiguous");
          }
          BASE_MAP[xc] = i;
        }
        var BASE = ALPHABET.length;
        var LEADER = ALPHABET.charAt(0);
        var FACTOR = Math.log(BASE) / Math.log(256);
        var iFACTOR = Math.log(256) / Math.log(BASE);
        function encode6(source) {
          if (source instanceof Uint8Array) {
          } else if (ArrayBuffer.isView(source)) {
            source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
          } else if (Array.isArray(source)) {
            source = Uint8Array.from(source);
          }
          if (!(source instanceof Uint8Array)) {
            throw new TypeError("Expected Uint8Array");
          }
          if (source.length === 0) {
            return "";
          }
          var zeroes = 0;
          var length2 = 0;
          var pbegin = 0;
          var pend = source.length;
          while (pbegin !== pend && source[pbegin] === 0) {
            pbegin++;
            zeroes++;
          }
          var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
          var b58 = new Uint8Array(size);
          while (pbegin !== pend) {
            var carry = source[pbegin];
            var i2 = 0;
            for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
              carry += 256 * b58[it1] >>> 0;
              b58[it1] = carry % BASE >>> 0;
              carry = carry / BASE >>> 0;
            }
            if (carry !== 0) {
              throw new Error("Non-zero carry");
            }
            length2 = i2;
            pbegin++;
          }
          var it2 = size - length2;
          while (it2 !== size && b58[it2] === 0) {
            it2++;
          }
          var str = LEADER.repeat(zeroes);
          for (; it2 < size; ++it2) {
            str += ALPHABET.charAt(b58[it2]);
          }
          return str;
        }
        function decodeUnsafe(source) {
          if (typeof source !== "string") {
            throw new TypeError("Expected String");
          }
          if (source.length === 0) {
            return new Uint8Array();
          }
          var psz = 0;
          if (source[psz] === " ") {
            return;
          }
          var zeroes = 0;
          var length2 = 0;
          while (source[psz] === LEADER) {
            zeroes++;
            psz++;
          }
          var size = (source.length - psz) * FACTOR + 1 >>> 0;
          var b256 = new Uint8Array(size);
          while (source[psz]) {
            var carry = BASE_MAP[source.charCodeAt(psz)];
            if (carry === 255) {
              return;
            }
            var i2 = 0;
            for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
              carry += BASE * b256[it3] >>> 0;
              b256[it3] = carry % 256 >>> 0;
              carry = carry / 256 >>> 0;
            }
            if (carry !== 0) {
              throw new Error("Non-zero carry");
            }
            length2 = i2;
            psz++;
          }
          if (source[psz] === " ") {
            return;
          }
          var it4 = size - length2;
          while (it4 !== size && b256[it4] === 0) {
            it4++;
          }
          var vch = new Uint8Array(zeroes + (size - it4));
          var j2 = zeroes;
          while (it4 !== size) {
            vch[j2++] = b256[it4++];
          }
          return vch;
        }
        function decode7(string2) {
          var buffer = decodeUnsafe(string2);
          if (buffer) {
            return buffer;
          }
          throw new Error("Non-base" + BASE + " character");
        }
        return {
          encode: encode6,
          decodeUnsafe,
          decode: decode7
        };
      }
      module.exports = base3;
    }
  });

  // node_modules/multibase/src/util.js
  var require_util = __commonJS({
    "node_modules/multibase/src/util.js"(exports, module) {
      "use strict";
      var textDecoder2 = new TextDecoder();
      var decodeText = (bytes) => textDecoder2.decode(bytes);
      var textEncoder2 = new TextEncoder();
      var encodeText = (text) => textEncoder2.encode(text);
      function concat2(arrs, length2) {
        const output = new Uint8Array(length2);
        let offset = 0;
        for (const arr of arrs) {
          output.set(arr, offset);
          offset += arr.length;
        }
        return output;
      }
      module.exports = { decodeText, encodeText, concat: concat2 };
    }
  });

  // node_modules/multibase/src/base.js
  var require_base = __commonJS({
    "node_modules/multibase/src/base.js"(exports, module) {
      "use strict";
      var { encodeText } = require_util();
      var Base = class {
        /**
         * @param {BaseName} name
         * @param {BaseCode} code
         * @param {CodecFactory} factory
         * @param {string} alphabet
         */
        constructor(name2, code2, factory, alphabet3) {
          this.name = name2;
          this.code = code2;
          this.codeBuf = encodeText(this.code);
          this.alphabet = alphabet3;
          this.codec = factory(alphabet3);
        }
        /**
         * @param {Uint8Array} buf
         * @returns {string}
         */
        encode(buf) {
          return this.codec.encode(buf);
        }
        /**
         * @param {string} string
         * @returns {Uint8Array}
         */
        decode(string2) {
          for (const char of string2) {
            if (this.alphabet && this.alphabet.indexOf(char) < 0) {
              throw new Error(`invalid character '${char}' in '${string2}'`);
            }
          }
          return this.codec.decode(string2);
        }
      };
      module.exports = Base;
    }
  });

  // node_modules/multibase/src/rfc4648.js
  var require_rfc4648 = __commonJS({
    "node_modules/multibase/src/rfc4648.js"(exports, module) {
      "use strict";
      var decode7 = (string2, alphabet3, bitsPerChar) => {
        const codes = {};
        for (let i = 0; i < alphabet3.length; ++i) {
          codes[alphabet3[i]] = i;
        }
        let end = string2.length;
        while (string2[end - 1] === "=") {
          --end;
        }
        const out = new Uint8Array(end * bitsPerChar / 8 | 0);
        let bits = 0;
        let buffer = 0;
        let written = 0;
        for (let i = 0; i < end; ++i) {
          const value = codes[string2[i]];
          if (value === void 0) {
            throw new SyntaxError("Invalid character " + string2[i]);
          }
          buffer = buffer << bitsPerChar | value;
          bits += bitsPerChar;
          if (bits >= 8) {
            bits -= 8;
            out[written++] = 255 & buffer >> bits;
          }
        }
        if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
          throw new SyntaxError("Unexpected end of data");
        }
        return out;
      };
      var encode6 = (data, alphabet3, bitsPerChar) => {
        const pad = alphabet3[alphabet3.length - 1] === "=";
        const mask = (1 << bitsPerChar) - 1;
        let out = "";
        let bits = 0;
        let buffer = 0;
        for (let i = 0; i < data.length; ++i) {
          buffer = buffer << 8 | data[i];
          bits += 8;
          while (bits > bitsPerChar) {
            bits -= bitsPerChar;
            out += alphabet3[mask & buffer >> bits];
          }
        }
        if (bits) {
          out += alphabet3[mask & buffer << bitsPerChar - bits];
        }
        if (pad) {
          while (out.length * bitsPerChar & 7) {
            out += "=";
          }
        }
        return out;
      };
      var rfc46482 = (bitsPerChar) => (alphabet3) => {
        return {
          /**
           * @param {Uint8Array} input
           * @returns {string}
           */
          encode(input) {
            return encode6(input, alphabet3, bitsPerChar);
          },
          /**
           * @param {string} input
           * @returns {Uint8Array}
           */
          decode(input) {
            return decode7(input, alphabet3, bitsPerChar);
          }
        };
      };
      module.exports = { rfc4648: rfc46482 };
    }
  });

  // node_modules/multibase/src/constants.js
  var require_constants = __commonJS({
    "node_modules/multibase/src/constants.js"(exports, module) {
      "use strict";
      var baseX2 = require_src();
      var Base = require_base();
      var { rfc4648: rfc46482 } = require_rfc4648();
      var { decodeText, encodeText } = require_util();
      var identity3 = () => {
        return {
          encode: decodeText,
          decode: encodeText
        };
      };
      var constants = [
        ["identity", "\0", identity3, ""],
        ["base2", "0", rfc46482(1), "01"],
        ["base8", "7", rfc46482(3), "01234567"],
        ["base10", "9", baseX2, "0123456789"],
        ["base16", "f", rfc46482(4), "0123456789abcdef"],
        ["base16upper", "F", rfc46482(4), "0123456789ABCDEF"],
        ["base32hex", "v", rfc46482(5), "0123456789abcdefghijklmnopqrstuv"],
        ["base32hexupper", "V", rfc46482(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"],
        ["base32hexpad", "t", rfc46482(5), "0123456789abcdefghijklmnopqrstuv="],
        ["base32hexpadupper", "T", rfc46482(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="],
        ["base32", "b", rfc46482(5), "abcdefghijklmnopqrstuvwxyz234567"],
        ["base32upper", "B", rfc46482(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"],
        ["base32pad", "c", rfc46482(5), "abcdefghijklmnopqrstuvwxyz234567="],
        ["base32padupper", "C", rfc46482(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="],
        ["base32z", "h", rfc46482(5), "ybndrfg8ejkmcpqxot1uwisza345h769"],
        ["base36", "k", baseX2, "0123456789abcdefghijklmnopqrstuvwxyz"],
        ["base36upper", "K", baseX2, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
        ["base58btc", "z", baseX2, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"],
        ["base58flickr", "Z", baseX2, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"],
        ["base64", "m", rfc46482(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"],
        ["base64pad", "M", rfc46482(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="],
        ["base64url", "u", rfc46482(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"],
        ["base64urlpad", "U", rfc46482(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]
      ];
      var names = constants.reduce(
        (prev, tupple) => {
          prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3]);
          return prev;
        },
        /** @type {Record<BaseName,Base>} */
        {}
      );
      var codes = constants.reduce(
        (prev, tupple) => {
          prev[tupple[1]] = names[tupple[0]];
          return prev;
        },
        /** @type {Record<BaseCode,Base>} */
        {}
      );
      module.exports = {
        names,
        codes
      };
    }
  });

  // node_modules/multibase/src/index.js
  var require_src2 = __commonJS({
    "node_modules/multibase/src/index.js"(exports, module) {
      "use strict";
      var constants = require_constants();
      var { encodeText, decodeText, concat: concat2 } = require_util();
      function multibase(nameOrCode, buf) {
        if (!buf) {
          throw new Error("requires an encoded Uint8Array");
        }
        const { name: name2, codeBuf } = encoding(nameOrCode);
        validEncode(name2, buf);
        return concat2([codeBuf, buf], codeBuf.length + buf.length);
      }
      function encode6(nameOrCode, buf) {
        const enc = encoding(nameOrCode);
        const data = encodeText(enc.encode(buf));
        return concat2([enc.codeBuf, data], enc.codeBuf.length + data.length);
      }
      function decode7(data) {
        if (data instanceof Uint8Array) {
          data = decodeText(data);
        }
        const prefix = data[0];
        if (["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(prefix)) {
          data = data.toLowerCase();
        }
        const enc = encoding(
          /** @type {BaseCode} */
          data[0]
        );
        return enc.decode(data.substring(1));
      }
      function isEncoded(data) {
        if (data instanceof Uint8Array) {
          data = decodeText(data);
        }
        if (Object.prototype.toString.call(data) !== "[object String]") {
          return false;
        }
        try {
          const enc = encoding(
            /** @type {BaseCode} */
            data[0]
          );
          return enc.name;
        } catch (err) {
          return false;
        }
      }
      function validEncode(name2, buf) {
        const enc = encoding(name2);
        enc.decode(decodeText(buf));
      }
      function encoding(nameOrCode) {
        if (Object.prototype.hasOwnProperty.call(
          constants.names,
          /** @type {BaseName} */
          nameOrCode
        )) {
          return constants.names[
            /** @type {BaseName} */
            nameOrCode
          ];
        } else if (Object.prototype.hasOwnProperty.call(
          constants.codes,
          /** @type {BaseCode} */
          nameOrCode
        )) {
          return constants.codes[
            /** @type {BaseCode} */
            nameOrCode
          ];
        } else {
          throw new Error(`Unsupported encoding: ${nameOrCode}`);
        }
      }
      function encodingFromData(data) {
        if (data instanceof Uint8Array) {
          data = decodeText(data);
        }
        return encoding(
          /** @type {BaseCode} */
          data[0]
        );
      }
      exports = module.exports = multibase;
      exports.encode = encode6;
      exports.decode = decode7;
      exports.isEncoded = isEncoded;
      exports.encoding = encoding;
      exports.encodingFromData = encodingFromData;
      var names = Object.freeze(constants.names);
      var codes = Object.freeze(constants.codes);
      exports.names = names;
      exports.codes = codes;
    }
  });

  // node_modules/canonicalize/lib/canonicalize.js
  var require_canonicalize = __commonJS({
    "node_modules/canonicalize/lib/canonicalize.js"(exports, module) {
      "use strict";
      module.exports = function serialize(object) {
        if (typeof object === "number" && isNaN(object)) {
          throw new Error("NaN is not allowed");
        }
        if (typeof object === "number" && !isFinite(object)) {
          throw new Error("Infinity is not allowed");
        }
        if (object === null || typeof object !== "object") {
          return JSON.stringify(object);
        }
        if (object.toJSON instanceof Function) {
          return serialize(object.toJSON());
        }
        if (Array.isArray(object)) {
          const values2 = object.reduce((t, cv, ci) => {
            const comma = ci === 0 ? "" : ",";
            const value = cv === void 0 || typeof cv === "symbol" ? null : cv;
            return `${t}${comma}${serialize(value)}`;
          }, "");
          return `[${values2}]`;
        }
        const values = Object.keys(object).sort().reduce((t, cv) => {
          if (object[cv] === void 0 || typeof object[cv] === "symbol") {
            return t;
          }
          const comma = t.length === 0 ? "" : ",";
          return `${t}${comma}${serialize(cv)}:${serialize(object[cv])}`;
        }, "");
        return `{${values}}`;
      };
    }
  });

  // index.js
  var import_buffer = __toESM(require_buffer());

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      if (typeof crypto === "undefined" || !crypto.getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
      getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = { randomUUID };

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? rng();
    if (rnds.length < 16) {
      throw new Error("Random bytes length must be >= 16");
    }
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      if (offset < 0 || offset + 16 > buf.length) {
        throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
      }
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // index.js
  var import_eciesjs = __toESM(require_dist());

  // node_modules/@noble/hashes/esm/utils.js
  function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error("positive integer expected, got " + n);
  }
  function abytes(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }
  function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  }
  function clean(...arrays) {
    for (let i = 0; i < arrays.length; i++) {
      arrays[i].fill(0);
    }
  }
  function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
  }
  function rotl(word, shift) {
    return word << shift | word >>> 32 - shift >>> 0;
  }
  var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
  function byteSwap(word) {
    return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
  }
  function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = byteSwap(arr[i]);
    }
    return arr;
  }
  var swap32IfBE = isLE ? (u) => u : byteSwap32;
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    abytes(data);
    return data;
  }
  var Hash = class {
  };
  function createHasher(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }

  // node_modules/@noble/hashes/esm/_md.js
  function setBigUint64(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n3 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n3 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  function Chi(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  var HashMD = class extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE2) {
      super();
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE2;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView(this.buffer);
    }
    update(data) {
      aexists(this);
      data = toBytes(data);
      abytes(data);
      const { view, buffer, blockLen } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      aexists(this);
      aoutput(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE2 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      clean(this.buffer.subarray(pos));
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
      this.process(view, 0);
      const oview = createView(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE2);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length: length2, finished, destroyed, pos } = this;
      to.destroyed = destroyed;
      to.finished = finished;
      to.length = length2;
      to.pos = pos;
      if (length2 % blockLen)
        to.buffer.set(buffer);
      return to;
    }
    clone() {
      return this._cloneInto();
    }
  };
  var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);

  // node_modules/@noble/hashes/esm/_u64.js
  var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  var _32n = /* @__PURE__ */ BigInt(32);
  function fromBig(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
    return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
  }
  function split(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for (let i = 0; i < len; i++) {
      const { h, l } = fromBig(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
  var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
  var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
  var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;

  // node_modules/@noble/hashes/esm/sha2.js
  var SHA256_K = /* @__PURE__ */ Uint32Array.from([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
  var SHA256 = class extends HashMD {
    constructor(outputLen = 32) {
      super(64, outputLen, 8, false);
      this.A = SHA256_IV[0] | 0;
      this.B = SHA256_IV[1] | 0;
      this.C = SHA256_IV[2] | 0;
      this.D = SHA256_IV[3] | 0;
      this.E = SHA256_IV[4] | 0;
      this.F = SHA256_IV[5] | 0;
      this.G = SHA256_IV[6] | 0;
      this.H = SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W[i - 15];
        const W2 = SHA256_W[i - 2];
        const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
        const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
        SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
        const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
        const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
        const T2 = sigma0 + Maj(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      clean(SHA256_W);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      clean(this.buffer);
    }
  };
  var sha256 = /* @__PURE__ */ createHasher(() => new SHA256());

  // node_modules/@noble/hashes/esm/sha256.js
  var sha2562 = sha256;

  // node_modules/uint8arrays/esm/src/util/as-uint8array.js
  function asUint8Array(buf) {
    if (globalThis.Buffer != null) {
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    return buf;
  }

  // node_modules/uint8arrays/esm/src/alloc.js
  function allocUnsafe(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
      return asUint8Array(globalThis.Buffer.allocUnsafe(size));
    }
    return new Uint8Array(size);
  }

  // node_modules/uint8arrays/esm/src/concat.js
  function concat(arrays, length2) {
    if (!length2) {
      length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
    }
    const output = allocUnsafe(length2);
    let offset = 0;
    for (const arr of arrays) {
      output.set(arr, offset);
      offset += arr.length;
    }
    return asUint8Array(output);
  }

  // node_modules/multiformats/esm/src/bases/identity.js
  var identity_exports = {};
  __export(identity_exports, {
    identity: () => identity
  });

  // node_modules/multiformats/esm/vendor/base-x.js
  function base(ALPHABET, name2) {
    if (ALPHABET.length >= 255) {
      throw new TypeError("Alphabet too long");
    }
    var BASE_MAP = new Uint8Array(256);
    for (var j = 0; j < BASE_MAP.length; j++) {
      BASE_MAP[j] = 255;
    }
    for (var i = 0; i < ALPHABET.length; i++) {
      var x = ALPHABET.charAt(i);
      var xc = x.charCodeAt(0);
      if (BASE_MAP[xc] !== 255) {
        throw new TypeError(x + " is ambiguous");
      }
      BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode6(source) {
      if (source instanceof Uint8Array) ;
      else if (ArrayBuffer.isView(source)) {
        source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
      } else if (Array.isArray(source)) {
        source = Uint8Array.from(source);
      }
      if (!(source instanceof Uint8Array)) {
        throw new TypeError("Expected Uint8Array");
      }
      if (source.length === 0) {
        return "";
      }
      var zeroes = 0;
      var length2 = 0;
      var pbegin = 0;
      var pend = source.length;
      while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++;
        zeroes++;
      }
      var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
      var b58 = new Uint8Array(size);
      while (pbegin !== pend) {
        var carry = source[pbegin];
        var i2 = 0;
        for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
          carry += 256 * b58[it1] >>> 0;
          b58[it1] = carry % BASE >>> 0;
          carry = carry / BASE >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length2 = i2;
        pbegin++;
      }
      var it2 = size - length2;
      while (it2 !== size && b58[it2] === 0) {
        it2++;
      }
      var str = LEADER.repeat(zeroes);
      for (; it2 < size; ++it2) {
        str += ALPHABET.charAt(b58[it2]);
      }
      return str;
    }
    function decodeUnsafe(source) {
      if (typeof source !== "string") {
        throw new TypeError("Expected String");
      }
      if (source.length === 0) {
        return new Uint8Array();
      }
      var psz = 0;
      if (source[psz] === " ") {
        return;
      }
      var zeroes = 0;
      var length2 = 0;
      while (source[psz] === LEADER) {
        zeroes++;
        psz++;
      }
      var size = (source.length - psz) * FACTOR + 1 >>> 0;
      var b256 = new Uint8Array(size);
      while (source[psz]) {
        var carry = BASE_MAP[source.charCodeAt(psz)];
        if (carry === 255) {
          return;
        }
        var i2 = 0;
        for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
          carry += BASE * b256[it3] >>> 0;
          b256[it3] = carry % 256 >>> 0;
          carry = carry / 256 >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length2 = i2;
        psz++;
      }
      if (source[psz] === " ") {
        return;
      }
      var it4 = size - length2;
      while (it4 !== size && b256[it4] === 0) {
        it4++;
      }
      var vch = new Uint8Array(zeroes + (size - it4));
      var j2 = zeroes;
      while (it4 !== size) {
        vch[j2++] = b256[it4++];
      }
      return vch;
    }
    function decode7(string2) {
      var buffer = decodeUnsafe(string2);
      if (buffer) {
        return buffer;
      }
      throw new Error(`Non-${name2} character`);
    }
    return {
      encode: encode6,
      decodeUnsafe,
      decode: decode7
    };
  }
  var src = base;
  var _brrp__multiformats_scope_baseX = src;
  var base_x_default = _brrp__multiformats_scope_baseX;

  // node_modules/multiformats/esm/src/bytes.js
  var empty = new Uint8Array(0);
  var equals = (aa, bb) => {
    if (aa === bb)
      return true;
    if (aa.byteLength !== bb.byteLength) {
      return false;
    }
    for (let ii = 0; ii < aa.byteLength; ii++) {
      if (aa[ii] !== bb[ii]) {
        return false;
      }
    }
    return true;
  };
  var coerce = (o) => {
    if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
      return o;
    if (o instanceof ArrayBuffer)
      return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) {
      return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    throw new Error("Unknown type, must be binary type");
  };
  var fromString = (str) => new TextEncoder().encode(str);
  var toString = (b) => new TextDecoder().decode(b);

  // node_modules/multiformats/esm/src/bases/base.js
  var Encoder = class {
    constructor(name2, prefix, baseEncode) {
      this.name = name2;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
    }
    encode(bytes) {
      if (bytes instanceof Uint8Array) {
        return `${this.prefix}${this.baseEncode(bytes)}`;
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  };
  var Decoder = class {
    constructor(name2, prefix, baseDecode) {
      this.name = name2;
      this.prefix = prefix;
      if (prefix.codePointAt(0) === void 0) {
        throw new Error("Invalid prefix character");
      }
      this.prefixCodePoint = prefix.codePointAt(0);
      this.baseDecode = baseDecode;
    }
    decode(text) {
      if (typeof text === "string") {
        if (text.codePointAt(0) !== this.prefixCodePoint) {
          throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        }
        return this.baseDecode(text.slice(this.prefix.length));
      } else {
        throw Error("Can only multibase decode strings");
      }
    }
    or(decoder) {
      return or(this, decoder);
    }
  };
  var ComposedDecoder = class {
    constructor(decoders) {
      this.decoders = decoders;
    }
    or(decoder) {
      return or(this, decoder);
    }
    decode(input) {
      const prefix = input[0];
      const decoder = this.decoders[prefix];
      if (decoder) {
        return decoder.decode(input);
      } else {
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
      }
    }
  };
  var or = (left, right) => new ComposedDecoder({
    ...left.decoders || { [left.prefix]: left },
    ...right.decoders || { [right.prefix]: right }
  });
  var Codec = class {
    constructor(name2, prefix, baseEncode, baseDecode) {
      this.name = name2;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
      this.baseDecode = baseDecode;
      this.encoder = new Encoder(name2, prefix, baseEncode);
      this.decoder = new Decoder(name2, prefix, baseDecode);
    }
    encode(input) {
      return this.encoder.encode(input);
    }
    decode(input) {
      return this.decoder.decode(input);
    }
  };
  var from = ({ name: name2, prefix, encode: encode6, decode: decode7 }) => new Codec(name2, prefix, encode6, decode7);
  var baseX = ({ prefix, name: name2, alphabet: alphabet3 }) => {
    const { encode: encode6, decode: decode7 } = base_x_default(alphabet3, name2);
    return from({
      prefix,
      name: name2,
      encode: encode6,
      decode: (text) => coerce(decode7(text))
    });
  };
  var decode = (string2, alphabet3, bitsPerChar, name2) => {
    const codes = {};
    for (let i = 0; i < alphabet3.length; ++i) {
      codes[alphabet3[i]] = i;
    }
    let end = string2.length;
    while (string2[end - 1] === "=") {
      --end;
    }
    const out = new Uint8Array(end * bitsPerChar / 8 | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for (let i = 0; i < end; ++i) {
      const value = codes[string2[i]];
      if (value === void 0) {
        throw new SyntaxError(`Non-${name2} character`);
      }
      buffer = buffer << bitsPerChar | value;
      bits += bitsPerChar;
      if (bits >= 8) {
        bits -= 8;
        out[written++] = 255 & buffer >> bits;
      }
    }
    if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
      throw new SyntaxError("Unexpected end of data");
    }
    return out;
  };
  var encode = (data, alphabet3, bitsPerChar) => {
    const pad = alphabet3[alphabet3.length - 1] === "=";
    const mask = (1 << bitsPerChar) - 1;
    let out = "";
    let bits = 0;
    let buffer = 0;
    for (let i = 0; i < data.length; ++i) {
      buffer = buffer << 8 | data[i];
      bits += 8;
      while (bits > bitsPerChar) {
        bits -= bitsPerChar;
        out += alphabet3[mask & buffer >> bits];
      }
    }
    if (bits) {
      out += alphabet3[mask & buffer << bitsPerChar - bits];
    }
    if (pad) {
      while (out.length * bitsPerChar & 7) {
        out += "=";
      }
    }
    return out;
  };
  var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet3 }) => {
    return from({
      prefix,
      name: name2,
      encode(input) {
        return encode(input, alphabet3, bitsPerChar);
      },
      decode(input) {
        return decode(input, alphabet3, bitsPerChar, name2);
      }
    });
  };

  // node_modules/multiformats/esm/src/bases/identity.js
  var identity = from({
    prefix: "\0",
    name: "identity",
    encode: (buf) => toString(buf),
    decode: (str) => fromString(str)
  });

  // node_modules/multiformats/esm/src/bases/base2.js
  var base2_exports = {};
  __export(base2_exports, {
    base2: () => base2
  });
  var base2 = rfc4648({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
  });

  // node_modules/multiformats/esm/src/bases/base8.js
  var base8_exports = {};
  __export(base8_exports, {
    base8: () => base8
  });
  var base8 = rfc4648({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
  });

  // node_modules/multiformats/esm/src/bases/base10.js
  var base10_exports = {};
  __export(base10_exports, {
    base10: () => base10
  });
  var base10 = baseX({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
  });

  // node_modules/multiformats/esm/src/bases/base16.js
  var base16_exports = {};
  __export(base16_exports, {
    base16: () => base16,
    base16upper: () => base16upper
  });
  var base16 = rfc4648({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
  });
  var base16upper = rfc4648({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
  });

  // node_modules/multiformats/esm/src/bases/base32.js
  var base32_exports = {};
  __export(base32_exports, {
    base32: () => base32,
    base32hex: () => base32hex,
    base32hexpad: () => base32hexpad,
    base32hexpadupper: () => base32hexpadupper,
    base32hexupper: () => base32hexupper,
    base32pad: () => base32pad,
    base32padupper: () => base32padupper,
    base32upper: () => base32upper,
    base32z: () => base32z
  });
  var base32 = rfc4648({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
  });
  var base32upper = rfc4648({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
  });
  var base32pad = rfc4648({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
  });
  var base32padupper = rfc4648({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
  });
  var base32hex = rfc4648({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
  });
  var base32hexupper = rfc4648({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
  });
  var base32hexpad = rfc4648({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
  });
  var base32hexpadupper = rfc4648({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
  });
  var base32z = rfc4648({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
  });

  // node_modules/multiformats/esm/src/bases/base36.js
  var base36_exports = {};
  __export(base36_exports, {
    base36: () => base36,
    base36upper: () => base36upper
  });
  var base36 = baseX({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
  });
  var base36upper = baseX({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  });

  // node_modules/multiformats/esm/src/bases/base58.js
  var base58_exports = {};
  __export(base58_exports, {
    base58btc: () => base58btc,
    base58flickr: () => base58flickr
  });
  var base58btc = baseX({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  });
  var base58flickr = baseX({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  });

  // node_modules/multiformats/esm/src/bases/base64.js
  var base64_exports = {};
  __export(base64_exports, {
    base64: () => base64,
    base64pad: () => base64pad,
    base64url: () => base64url,
    base64urlpad: () => base64urlpad
  });
  var base64 = rfc4648({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
  });
  var base64pad = rfc4648({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
  });
  var base64url = rfc4648({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
  });
  var base64urlpad = rfc4648({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
  });

  // node_modules/multiformats/esm/src/bases/base256emoji.js
  var base256emoji_exports = {};
  __export(base256emoji_exports, {
    base256emoji: () => base256emoji
  });
  var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
  var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
    p[i] = c;
    return p;
  }, []);
  var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
    p[c.codePointAt(0)] = i;
    return p;
  }, []);
  function encode2(data) {
    return data.reduce((p, c) => {
      p += alphabetBytesToChars[c];
      return p;
    }, "");
  }
  function decode2(str) {
    const byts = [];
    for (const char of str) {
      const byt = alphabetCharsToBytes[char.codePointAt(0)];
      if (byt === void 0) {
        throw new Error(`Non-base256emoji character: ${char}`);
      }
      byts.push(byt);
    }
    return new Uint8Array(byts);
  }
  var base256emoji = from({
    prefix: "\u{1F680}",
    name: "base256emoji",
    encode: encode2,
    decode: decode2
  });

  // node_modules/multiformats/esm/src/hashes/sha2-browser.js
  var sha2_browser_exports = {};
  __export(sha2_browser_exports, {
    sha256: () => sha2563,
    sha512: () => sha512
  });

  // node_modules/multiformats/esm/src/varint.js
  var varint_exports = {};
  __export(varint_exports, {
    decode: () => decode4,
    encodeTo: () => encodeTo,
    encodingLength: () => encodingLength
  });

  // node_modules/multiformats/esm/vendor/varint.js
  var encode_1 = encode3;
  var MSB = 128;
  var REST = 127;
  var MSBALL = ~REST;
  var INT = Math.pow(2, 31);
  function encode3(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT) {
      out[offset++] = num & 255 | MSB;
      num /= 128;
    }
    while (num & MSBALL) {
      out[offset++] = num & 255 | MSB;
      num >>>= 7;
    }
    out[offset] = num | 0;
    encode3.bytes = offset - oldOffset + 1;
    return out;
  }
  var decode3 = read;
  var MSB$1 = 128;
  var REST$1 = 127;
  function read(buf, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
    do {
      if (counter >= l) {
        read.bytes = 0;
        throw new RangeError("Could not decode varint");
      }
      b = buf[counter++];
      res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
      shift += 7;
    } while (b >= MSB$1);
    read.bytes = counter - offset;
    return res;
  }
  var N1 = Math.pow(2, 7);
  var N2 = Math.pow(2, 14);
  var N3 = Math.pow(2, 21);
  var N4 = Math.pow(2, 28);
  var N5 = Math.pow(2, 35);
  var N6 = Math.pow(2, 42);
  var N7 = Math.pow(2, 49);
  var N8 = Math.pow(2, 56);
  var N9 = Math.pow(2, 63);
  var length = function(value) {
    return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
  };
  var varint = {
    encode: encode_1,
    decode: decode3,
    encodingLength: length
  };
  var _brrp_varint = varint;
  var varint_default = _brrp_varint;

  // node_modules/multiformats/esm/src/varint.js
  var decode4 = (data, offset = 0) => {
    const code2 = varint_default.decode(data, offset);
    return [
      code2,
      varint_default.decode.bytes
    ];
  };
  var encodeTo = (int, target, offset = 0) => {
    varint_default.encode(int, target, offset);
    return target;
  };
  var encodingLength = (int) => {
    return varint_default.encodingLength(int);
  };

  // node_modules/multiformats/esm/src/hashes/digest.js
  var create = (code2, digest2) => {
    const size = digest2.byteLength;
    const sizeOffset = encodingLength(code2);
    const digestOffset = sizeOffset + encodingLength(size);
    const bytes = new Uint8Array(digestOffset + size);
    encodeTo(code2, bytes, 0);
    encodeTo(size, bytes, sizeOffset);
    bytes.set(digest2, digestOffset);
    return new Digest(code2, size, digest2, bytes);
  };
  var decode5 = (multihash) => {
    const bytes = coerce(multihash);
    const [code2, sizeOffset] = decode4(bytes);
    const [size, digestOffset] = decode4(bytes.subarray(sizeOffset));
    const digest2 = bytes.subarray(sizeOffset + digestOffset);
    if (digest2.byteLength !== size) {
      throw new Error("Incorrect length");
    }
    return new Digest(code2, size, digest2, bytes);
  };
  var equals2 = (a, b) => {
    if (a === b) {
      return true;
    } else {
      return a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes);
    }
  };
  var Digest = class {
    constructor(code2, size, digest2, bytes) {
      this.code = code2;
      this.size = size;
      this.digest = digest2;
      this.bytes = bytes;
    }
  };

  // node_modules/multiformats/esm/src/hashes/hasher.js
  var from2 = ({ name: name2, code: code2, encode: encode6 }) => new Hasher(name2, code2, encode6);
  var Hasher = class {
    constructor(name2, code2, encode6) {
      this.name = name2;
      this.code = code2;
      this.encode = encode6;
    }
    digest(input) {
      if (input instanceof Uint8Array) {
        const result = this.encode(input);
        return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  };

  // node_modules/multiformats/esm/src/hashes/sha2-browser.js
  var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
  var sha2563 = from2({
    name: "sha2-256",
    code: 18,
    encode: sha("SHA-256")
  });
  var sha512 = from2({
    name: "sha2-512",
    code: 19,
    encode: sha("SHA-512")
  });

  // node_modules/multiformats/esm/src/hashes/identity.js
  var identity_exports2 = {};
  __export(identity_exports2, {
    identity: () => identity2
  });
  var code = 0;
  var name = "identity";
  var encode4 = coerce;
  var digest = (input) => create(code, encode4(input));
  var identity2 = {
    code,
    name,
    encode: encode4,
    digest
  };

  // node_modules/multiformats/esm/src/codecs/json.js
  var textEncoder = new TextEncoder();
  var textDecoder = new TextDecoder();

  // node_modules/multiformats/esm/src/cid.js
  var CID = class _CID {
    constructor(version2, code2, multihash, bytes) {
      this.code = code2;
      this.version = version2;
      this.multihash = multihash;
      this.bytes = bytes;
      this.byteOffset = bytes.byteOffset;
      this.byteLength = bytes.byteLength;
      this.asCID = this;
      this._baseCache = /* @__PURE__ */ new Map();
      Object.defineProperties(this, {
        byteOffset: hidden,
        byteLength: hidden,
        code: readonly,
        version: readonly,
        multihash: readonly,
        bytes: readonly,
        _baseCache: hidden,
        asCID: hidden
      });
    }
    toV0() {
      switch (this.version) {
        case 0: {
          return this;
        }
        default: {
          const { code: code2, multihash } = this;
          if (code2 !== DAG_PB_CODE) {
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          }
          if (multihash.code !== SHA_256_CODE) {
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          }
          return _CID.createV0(multihash);
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          const { code: code2, digest: digest2 } = this.multihash;
          const multihash = create(code2, digest2);
          return _CID.createV1(this.code, multihash);
        }
        case 1: {
          return this;
        }
        default: {
          throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
        }
      }
    }
    equals(other) {
      return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
    }
    toString(base3) {
      const { bytes, version: version2, _baseCache } = this;
      switch (version2) {
        case 0:
          return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
        default:
          return toStringV1(bytes, _baseCache, base3 || base32.encoder);
      }
    }
    toJSON() {
      return {
        code: this.code,
        version: this.version,
        hash: this.multihash.bytes
      };
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")";
    }
    static isCID(value) {
      deprecate(/^0\.0/, IS_CID_DEPRECATION);
      return !!(value && (value[cidSymbol] || value.asCID === value));
    }
    get toBaseEncodedString() {
      throw new Error("Deprecated, use .toString()");
    }
    get codec() {
      throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
      throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
    }
    get multibaseName() {
      throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
      throw new Error('"prefix" property is deprecated');
    }
    static asCID(value) {
      if (value instanceof _CID) {
        return value;
      } else if (value != null && value.asCID === value) {
        const { version: version2, code: code2, multihash, bytes } = value;
        return new _CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
      } else if (value != null && value[cidSymbol] === true) {
        const { version: version2, multihash, code: code2 } = value;
        const digest2 = decode5(multihash);
        return _CID.create(version2, code2, digest2);
      } else {
        return null;
      }
    }
    static create(version2, code2, digest2) {
      if (typeof code2 !== "number") {
        throw new Error("String codecs are no longer supported");
      }
      switch (version2) {
        case 0: {
          if (code2 !== DAG_PB_CODE) {
            throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
          } else {
            return new _CID(version2, code2, digest2, digest2.bytes);
          }
        }
        case 1: {
          const bytes = encodeCID(version2, code2, digest2.bytes);
          return new _CID(version2, code2, digest2, bytes);
        }
        default: {
          throw new Error("Invalid version");
        }
      }
    }
    static createV0(digest2) {
      return _CID.create(0, DAG_PB_CODE, digest2);
    }
    static createV1(code2, digest2) {
      return _CID.create(1, code2, digest2);
    }
    static decode(bytes) {
      const [cid, remainder] = _CID.decodeFirst(bytes);
      if (remainder.length) {
        throw new Error("Incorrect length");
      }
      return cid;
    }
    static decodeFirst(bytes) {
      const specs = _CID.inspectBytes(bytes);
      const prefixSize = specs.size - specs.multihashSize;
      const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
      if (multihashBytes.byteLength !== specs.multihashSize) {
        throw new Error("Incorrect length");
      }
      const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
      const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
      const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
      return [
        cid,
        bytes.subarray(specs.size)
      ];
    }
    static inspectBytes(initialBytes) {
      let offset = 0;
      const next = () => {
        const [i, length2] = decode4(initialBytes.subarray(offset));
        offset += length2;
        return i;
      };
      let version2 = next();
      let codec = DAG_PB_CODE;
      if (version2 === 18) {
        version2 = 0;
        offset = 0;
      } else if (version2 === 1) {
        codec = next();
      }
      if (version2 !== 0 && version2 !== 1) {
        throw new RangeError(`Invalid CID version ${version2}`);
      }
      const prefixSize = offset;
      const multihashCode = next();
      const digestSize = next();
      const size = offset + digestSize;
      const multihashSize = size - prefixSize;
      return {
        version: version2,
        codec,
        multihashCode,
        digestSize,
        multihashSize,
        size
      };
    }
    static parse(source, base3) {
      const [prefix, bytes] = parseCIDtoBytes(source, base3);
      const cid = _CID.decode(bytes);
      cid._baseCache.set(prefix, source);
      return cid;
    }
  };
  var parseCIDtoBytes = (source, base3) => {
    switch (source[0]) {
      case "Q": {
        const decoder = base3 || base58btc;
        return [
          base58btc.prefix,
          decoder.decode(`${base58btc.prefix}${source}`)
        ];
      }
      case base58btc.prefix: {
        const decoder = base3 || base58btc;
        return [
          base58btc.prefix,
          decoder.decode(source)
        ];
      }
      case base32.prefix: {
        const decoder = base3 || base32;
        return [
          base32.prefix,
          decoder.decode(source)
        ];
      }
      default: {
        if (base3 == null) {
          throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
        }
        return [
          source[0],
          base3.decode(source)
        ];
      }
    }
  };
  var toStringV0 = (bytes, cache, base3) => {
    const { prefix } = base3;
    if (prefix !== base58btc.prefix) {
      throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
    }
    const cid = cache.get(prefix);
    if (cid == null) {
      const cid2 = base3.encode(bytes).slice(1);
      cache.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  };
  var toStringV1 = (bytes, cache, base3) => {
    const { prefix } = base3;
    const cid = cache.get(prefix);
    if (cid == null) {
      const cid2 = base3.encode(bytes);
      cache.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  };
  var DAG_PB_CODE = 112;
  var SHA_256_CODE = 18;
  var encodeCID = (version2, code2, multihash) => {
    const codeOffset = encodingLength(version2);
    const hashOffset = codeOffset + encodingLength(code2);
    const bytes = new Uint8Array(hashOffset + multihash.byteLength);
    encodeTo(version2, bytes, 0);
    encodeTo(code2, bytes, codeOffset);
    bytes.set(multihash, hashOffset);
    return bytes;
  };
  var cidSymbol = Symbol.for("@ipld/js-cid/CID");
  var readonly = {
    writable: false,
    configurable: false,
    enumerable: true
  };
  var hidden = {
    writable: false,
    enumerable: false,
    configurable: false
  };
  var version = "0.0.0-dev";
  var deprecate = (range, message) => {
    if (range.test(version)) {
      console.warn(message);
    } else {
      throw new Error(message);
    }
  };
  var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

  // node_modules/multiformats/esm/src/basics.js
  var bases = {
    ...identity_exports,
    ...base2_exports,
    ...base8_exports,
    ...base10_exports,
    ...base16_exports,
    ...base32_exports,
    ...base36_exports,
    ...base58_exports,
    ...base64_exports,
    ...base256emoji_exports
  };
  var hashes = {
    ...sha2_browser_exports,
    ...identity_exports2
  };

  // node_modules/uint8arrays/esm/src/util/bases.js
  function createCodec(name2, prefix, encode6, decode7) {
    return {
      name: name2,
      prefix,
      encoder: {
        name: name2,
        prefix,
        encode: encode6
      },
      decoder: { decode: decode7 }
    };
  }
  var string = createCodec("utf8", "u", (buf) => {
    const decoder = new TextDecoder("utf8");
    return "u" + decoder.decode(buf);
  }, (str) => {
    const encoder = new TextEncoder();
    return encoder.encode(str.substring(1));
  });
  var ascii = createCodec("ascii", "a", (buf) => {
    let string2 = "a";
    for (let i = 0; i < buf.length; i++) {
      string2 += String.fromCharCode(buf[i]);
    }
    return string2;
  }, (str) => {
    str = str.substring(1);
    const buf = allocUnsafe(str.length);
    for (let i = 0; i < str.length; i++) {
      buf[i] = str.charCodeAt(i);
    }
    return buf;
  });
  var BASES = {
    utf8: string,
    "utf-8": string,
    hex: bases.base16,
    latin1: ascii,
    ascii,
    binary: ascii,
    ...bases
  };
  var bases_default = BASES;

  // node_modules/uint8arrays/esm/src/from-string.js
  function fromString2(string2, encoding = "utf8") {
    const base3 = bases_default[encoding];
    if (!base3) {
      throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
      return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
    }
    return base3.decoder.decode(`${base3.prefix}${string2}`);
  }

  // node_modules/uint8arrays/esm/src/to-string.js
  function toString2(array, encoding = "utf8") {
    const base3 = bases_default[encoding];
    if (!base3) {
      throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
      return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
    }
    return base3.encoder.encode(array).substring(1);
  }

  // node_modules/@noble/curves/node_modules/@noble/hashes/esm/_assert.js
  function anumber2(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error("positive integer expected, got " + n);
  }
  function isBytes2(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes2(b, ...lengths) {
    if (!isBytes2(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function ahash(h) {
    if (typeof h !== "function" || typeof h.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    anumber2(h.outputLen);
    anumber2(h.blockLen);
  }
  function aexists2(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput2(out, instance) {
    abytes2(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }

  // node_modules/@noble/curves/node_modules/@noble/hashes/esm/crypto.js
  var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

  // node_modules/@noble/curves/node_modules/@noble/hashes/esm/utils.js
  function createView2(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  function rotr2(word, shift) {
    return word << 32 - shift | word >>> shift;
  }
  var hasHexBuiltin = (
    // @ts-ignore
    typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
  );
  function utf8ToBytes2(str) {
    if (typeof str !== "string")
      throw new Error("utf8ToBytes expected string, got " + typeof str);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes2(data) {
    if (typeof data === "string")
      data = utf8ToBytes2(data);
    abytes2(data);
    return data;
  }
  function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
      const a = arrays[i];
      abytes2(a);
      sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
      const a = arrays[i];
      res.set(a, pad);
      pad += a.length;
    }
    return res;
  }
  var Hash2 = class {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  };
  function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function randomBytes(bytesLength = 32) {
    if (crypto2 && typeof crypto2.getRandomValues === "function") {
      return crypto2.getRandomValues(new Uint8Array(bytesLength));
    }
    if (crypto2 && typeof crypto2.randomBytes === "function") {
      return Uint8Array.from(crypto2.randomBytes(bytesLength));
    }
    throw new Error("crypto.getRandomValues must be defined");
  }

  // node_modules/@noble/curves/node_modules/@noble/hashes/esm/_md.js
  function setBigUint642(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n3 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n3 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  function Chi2(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj2(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  var HashMD2 = class extends Hash2 {
    constructor(blockLen, outputLen, padOffset, isLE2) {
      super();
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE2;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView2(this.buffer);
    }
    update(data) {
      aexists2(this);
      const { view, buffer, blockLen } = this;
      data = toBytes2(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView2(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      aexists2(this);
      aoutput2(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE2 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      this.buffer.subarray(pos).fill(0);
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint642(view, blockLen - 8, BigInt(this.length * 8), isLE2);
      this.process(view, 0);
      const oview = createView2(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE2);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length: length2, finished, destroyed, pos } = this;
      to.length = length2;
      to.pos = pos;
      to.finished = finished;
      to.destroyed = destroyed;
      if (length2 % blockLen)
        to.buffer.set(buffer);
      return to;
    }
  };

  // node_modules/@noble/curves/node_modules/@noble/hashes/esm/sha256.js
  var SHA256_K2 = /* @__PURE__ */ new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var SHA256_IV2 = /* @__PURE__ */ new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  var SHA256_W2 = /* @__PURE__ */ new Uint32Array(64);
  var SHA2562 = class extends HashMD2 {
    constructor(outputLen = 32) {
      super(64, outputLen, 8, false);
      this.A = SHA256_IV2[0] | 0;
      this.B = SHA256_IV2[1] | 0;
      this.C = SHA256_IV2[2] | 0;
      this.D = SHA256_IV2[3] | 0;
      this.E = SHA256_IV2[4] | 0;
      this.F = SHA256_IV2[5] | 0;
      this.G = SHA256_IV2[6] | 0;
      this.H = SHA256_IV2[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W2[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W2[i - 15];
        const W2 = SHA256_W2[i - 2];
        const s0 = rotr2(W15, 7) ^ rotr2(W15, 18) ^ W15 >>> 3;
        const s1 = rotr2(W2, 17) ^ rotr2(W2, 19) ^ W2 >>> 10;
        SHA256_W2[i] = s1 + SHA256_W2[i - 7] + s0 + SHA256_W2[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = rotr2(E, 6) ^ rotr2(E, 11) ^ rotr2(E, 25);
        const T1 = H + sigma1 + Chi2(E, F, G) + SHA256_K2[i] + SHA256_W2[i] | 0;
        const sigma0 = rotr2(A, 2) ^ rotr2(A, 13) ^ rotr2(A, 22);
        const T2 = sigma0 + Maj2(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      SHA256_W2.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      this.buffer.fill(0);
    }
  };
  var sha2564 = /* @__PURE__ */ wrapConstructor(() => new SHA2562());

  // node_modules/@noble/curves/node_modules/@noble/hashes/esm/_u64.js
  var U32_MASK642 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  var _32n2 = /* @__PURE__ */ BigInt(32);
  function fromBig2(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK642), l: Number(n >> _32n2 & U32_MASK642) };
    return { h: Number(n >> _32n2 & U32_MASK642) | 0, l: Number(n & U32_MASK642) | 0 };
  }
  function split2(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
      const { h, l } = fromBig2(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  var toBig = (h, l) => BigInt(h >>> 0) << _32n2 | BigInt(l >>> 0);
  var shrSH = (h, _l, s) => h >>> s;
  var shrSL = (h, l, s) => h << 32 - s | l >>> s;
  var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
  var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
  var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
  var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
  var rotr32H = (_h, l) => l;
  var rotr32L = (h, _l) => h;
  var rotlSH2 = (h, l, s) => h << s | l >>> 32 - s;
  var rotlSL2 = (h, l, s) => l << s | h >>> 32 - s;
  var rotlBH2 = (h, l, s) => l << s - 32 | h >>> 64 - s;
  var rotlBL2 = (h, l, s) => h << s - 32 | l >>> 64 - s;
  function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
  }
  var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
  var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
  var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
  var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
  var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
  var u64 = {
    fromBig: fromBig2,
    split: split2,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH: rotlSH2,
    rotlSL: rotlSL2,
    rotlBH: rotlBH2,
    rotlBL: rotlBL2,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
  };
  var u64_default = u64;

  // node_modules/@noble/curves/node_modules/@noble/hashes/esm/sha512.js
  var [SHA512_Kh, SHA512_Kl] = /* @__PURE__ */ (() => u64_default.split([
    "0x428a2f98d728ae22",
    "0x7137449123ef65cd",
    "0xb5c0fbcfec4d3b2f",
    "0xe9b5dba58189dbbc",
    "0x3956c25bf348b538",
    "0x59f111f1b605d019",
    "0x923f82a4af194f9b",
    "0xab1c5ed5da6d8118",
    "0xd807aa98a3030242",
    "0x12835b0145706fbe",
    "0x243185be4ee4b28c",
    "0x550c7dc3d5ffb4e2",
    "0x72be5d74f27b896f",
    "0x80deb1fe3b1696b1",
    "0x9bdc06a725c71235",
    "0xc19bf174cf692694",
    "0xe49b69c19ef14ad2",
    "0xefbe4786384f25e3",
    "0x0fc19dc68b8cd5b5",
    "0x240ca1cc77ac9c65",
    "0x2de92c6f592b0275",
    "0x4a7484aa6ea6e483",
    "0x5cb0a9dcbd41fbd4",
    "0x76f988da831153b5",
    "0x983e5152ee66dfab",
    "0xa831c66d2db43210",
    "0xb00327c898fb213f",
    "0xbf597fc7beef0ee4",
    "0xc6e00bf33da88fc2",
    "0xd5a79147930aa725",
    "0x06ca6351e003826f",
    "0x142929670a0e6e70",
    "0x27b70a8546d22ffc",
    "0x2e1b21385c26c926",
    "0x4d2c6dfc5ac42aed",
    "0x53380d139d95b3df",
    "0x650a73548baf63de",
    "0x766a0abb3c77b2a8",
    "0x81c2c92e47edaee6",
    "0x92722c851482353b",
    "0xa2bfe8a14cf10364",
    "0xa81a664bbc423001",
    "0xc24b8b70d0f89791",
    "0xc76c51a30654be30",
    "0xd192e819d6ef5218",
    "0xd69906245565a910",
    "0xf40e35855771202a",
    "0x106aa07032bbd1b8",
    "0x19a4c116b8d2d0c8",
    "0x1e376c085141ab53",
    "0x2748774cdf8eeb99",
    "0x34b0bcb5e19b48a8",
    "0x391c0cb3c5c95a63",
    "0x4ed8aa4ae3418acb",
    "0x5b9cca4f7763e373",
    "0x682e6ff3d6b2b8a3",
    "0x748f82ee5defb2fc",
    "0x78a5636f43172f60",
    "0x84c87814a1f0ab72",
    "0x8cc702081a6439ec",
    "0x90befffa23631e28",
    "0xa4506cebde82bde9",
    "0xbef9a3f7b2c67915",
    "0xc67178f2e372532b",
    "0xca273eceea26619c",
    "0xd186b8c721c0c207",
    "0xeada7dd6cde0eb1e",
    "0xf57d4f7fee6ed178",
    "0x06f067aa72176fba",
    "0x0a637dc5a2c898a6",
    "0x113f9804bef90dae",
    "0x1b710b35131c471b",
    "0x28db77f523047d84",
    "0x32caab7b40c72493",
    "0x3c9ebe0a15c9bebc",
    "0x431d67c49c100d4c",
    "0x4cc5d4becb3e42b6",
    "0x597f299cfc657e2a",
    "0x5fcb6fab3ad6faec",
    "0x6c44198c4a475817"
  ].map((n) => BigInt(n))))();
  var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
  var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
  var SHA512 = class extends HashMD2 {
    constructor(outputLen = 64) {
      super(128, outputLen, 16, false);
      this.Ah = 1779033703 | 0;
      this.Al = 4089235720 | 0;
      this.Bh = 3144134277 | 0;
      this.Bl = 2227873595 | 0;
      this.Ch = 1013904242 | 0;
      this.Cl = 4271175723 | 0;
      this.Dh = 2773480762 | 0;
      this.Dl = 1595750129 | 0;
      this.Eh = 1359893119 | 0;
      this.El = 2917565137 | 0;
      this.Fh = 2600822924 | 0;
      this.Fl = 725511199 | 0;
      this.Gh = 528734635 | 0;
      this.Gl = 4215389547 | 0;
      this.Hh = 1541459225 | 0;
      this.Hl = 327033209 | 0;
    }
    // prettier-ignore
    get() {
      const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
      this.Ah = Ah | 0;
      this.Al = Al | 0;
      this.Bh = Bh | 0;
      this.Bl = Bl | 0;
      this.Ch = Ch | 0;
      this.Cl = Cl | 0;
      this.Dh = Dh | 0;
      this.Dl = Dl | 0;
      this.Eh = Eh | 0;
      this.El = El | 0;
      this.Fh = Fh | 0;
      this.Fl = Fl | 0;
      this.Gh = Gh | 0;
      this.Gl = Gl | 0;
      this.Hh = Hh | 0;
      this.Hl = Hl | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4) {
        SHA512_W_H[i] = view.getUint32(offset);
        SHA512_W_L[i] = view.getUint32(offset += 4);
      }
      for (let i = 16; i < 80; i++) {
        const W15h = SHA512_W_H[i - 15] | 0;
        const W15l = SHA512_W_L[i - 15] | 0;
        const s0h = u64_default.rotrSH(W15h, W15l, 1) ^ u64_default.rotrSH(W15h, W15l, 8) ^ u64_default.shrSH(W15h, W15l, 7);
        const s0l = u64_default.rotrSL(W15h, W15l, 1) ^ u64_default.rotrSL(W15h, W15l, 8) ^ u64_default.shrSL(W15h, W15l, 7);
        const W2h = SHA512_W_H[i - 2] | 0;
        const W2l = SHA512_W_L[i - 2] | 0;
        const s1h = u64_default.rotrSH(W2h, W2l, 19) ^ u64_default.rotrBH(W2h, W2l, 61) ^ u64_default.shrSH(W2h, W2l, 6);
        const s1l = u64_default.rotrSL(W2h, W2l, 19) ^ u64_default.rotrBL(W2h, W2l, 61) ^ u64_default.shrSL(W2h, W2l, 6);
        const SUMl = u64_default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
        const SUMh = u64_default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
        SHA512_W_H[i] = SUMh | 0;
        SHA512_W_L[i] = SUMl | 0;
      }
      let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      for (let i = 0; i < 80; i++) {
        const sigma1h = u64_default.rotrSH(Eh, El, 14) ^ u64_default.rotrSH(Eh, El, 18) ^ u64_default.rotrBH(Eh, El, 41);
        const sigma1l = u64_default.rotrSL(Eh, El, 14) ^ u64_default.rotrSL(Eh, El, 18) ^ u64_default.rotrBL(Eh, El, 41);
        const CHIh = Eh & Fh ^ ~Eh & Gh;
        const CHIl = El & Fl ^ ~El & Gl;
        const T1ll = u64_default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
        const T1h = u64_default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
        const T1l = T1ll | 0;
        const sigma0h = u64_default.rotrSH(Ah, Al, 28) ^ u64_default.rotrBH(Ah, Al, 34) ^ u64_default.rotrBH(Ah, Al, 39);
        const sigma0l = u64_default.rotrSL(Ah, Al, 28) ^ u64_default.rotrBL(Ah, Al, 34) ^ u64_default.rotrBL(Ah, Al, 39);
        const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
        const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
        Hh = Gh | 0;
        Hl = Gl | 0;
        Gh = Fh | 0;
        Gl = Fl | 0;
        Fh = Eh | 0;
        Fl = El | 0;
        ({ h: Eh, l: El } = u64_default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
        Dh = Ch | 0;
        Dl = Cl | 0;
        Ch = Bh | 0;
        Cl = Bl | 0;
        Bh = Ah | 0;
        Bl = Al | 0;
        const All = u64_default.add3L(T1l, sigma0l, MAJl);
        Ah = u64_default.add3H(All, T1h, sigma0h, MAJh);
        Al = All | 0;
      }
      ({ h: Ah, l: Al } = u64_default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
      ({ h: Bh, l: Bl } = u64_default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
      ({ h: Ch, l: Cl } = u64_default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
      ({ h: Dh, l: Dl } = u64_default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
      ({ h: Eh, l: El } = u64_default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
      ({ h: Fh, l: Fl } = u64_default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
      ({ h: Gh, l: Gl } = u64_default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
      ({ h: Hh, l: Hl } = u64_default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
      this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
      SHA512_W_H.fill(0);
      SHA512_W_L.fill(0);
    }
    destroy() {
      this.buffer.fill(0);
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  };
  var sha5122 = /* @__PURE__ */ wrapConstructor(() => new SHA512());

  // node_modules/@noble/curves/esm/abstract/utils.js
  var _0n = /* @__PURE__ */ BigInt(0);
  var _1n = /* @__PURE__ */ BigInt(1);
  function isBytes3(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes3(item) {
    if (!isBytes3(item))
      throw new Error("Uint8Array expected");
  }
  function abool(title, value) {
    if (typeof value !== "boolean")
      throw new Error(title + " boolean expected, got " + value);
  }
  function numberToHexUnpadded(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? "0" + hex : hex;
  }
  function hexToNumber(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    return hex === "" ? _0n : BigInt("0x" + hex);
  }
  var hasHexBuiltin2 = (
    // @ts-ignore
    typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
  );
  var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex(bytes) {
    abytes3(bytes);
    if (hasHexBuiltin2)
      return bytes.toHex();
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += hexes[bytes[i]];
    }
    return hex;
  }
  var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9)
      return ch - asciis._0;
    if (ch >= asciis.A && ch <= asciis.F)
      return ch - (asciis.A - 10);
    if (ch >= asciis.a && ch <= asciis.f)
      return ch - (asciis.a - 10);
    return;
  }
  function hexToBytes(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    if (hasHexBuiltin2)
      return Uint8Array.fromHex(hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
      throw new Error("hex string expected, got unpadded hex of length " + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
      const n1 = asciiToBase16(hex.charCodeAt(hi));
      const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
      if (n1 === void 0 || n2 === void 0) {
        const char = hex[hi] + hex[hi + 1];
        throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
      }
      array[ai] = n1 * 16 + n2;
    }
    return array;
  }
  function bytesToNumberBE(bytes) {
    return hexToNumber(bytesToHex(bytes));
  }
  function bytesToNumberLE(bytes) {
    abytes3(bytes);
    return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
  }
  function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
  }
  function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === "string") {
      try {
        res = hexToBytes(hex);
      } catch (e) {
        throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
      }
    } else if (isBytes3(hex)) {
      res = Uint8Array.from(hex);
    } else {
      throw new Error(title + " must be hex string or Uint8Array");
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(title + " of length " + expectedLength + " expected, got " + len);
    return res;
  }
  function concatBytes2(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
      const a = arrays[i];
      abytes3(a);
      sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
      const a = arrays[i];
      res.set(a, pad);
      pad += a.length;
    }
    return res;
  }
  var isPosBig = (n) => typeof n === "bigint" && _0n <= n;
  function inRange(n, min, max) {
    return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
  }
  function aInRange(title, n, min, max) {
    if (!inRange(n, min, max))
      throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
  }
  function bitLen(n) {
    let len;
    for (len = 0; n > _0n; n >>= _1n, len += 1)
      ;
    return len;
  }
  var bitMask = (n) => (_1n << BigInt(n)) - _1n;
  var u8n = (len) => new Uint8Array(len);
  var u8fr = (arr) => Uint8Array.from(arr);
  function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n(hashLen);
    let k = u8n(hashLen);
    let i = 0;
    const reset = () => {
      v.fill(1);
      k.fill(0);
      i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b);
    const reseed = (seed = u8n(0)) => {
      k = h(u8fr([0]), seed);
      v = h();
      if (seed.length === 0)
        return;
      k = h(u8fr([1]), seed);
      v = h();
    };
    const gen2 = () => {
      if (i++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes2(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen2())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  var validatorFns = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || isBytes3(val),
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
  function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns[type];
      if (typeof checkVal !== "function")
        throw new Error("invalid validator function");
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }
  function memoized(fn) {
    const map = /* @__PURE__ */ new WeakMap();
    return (arg, ...args) => {
      const val = map.get(arg);
      if (val !== void 0)
        return val;
      const computed = fn(arg, ...args);
      map.set(arg, computed);
      return computed;
    };
  }

  // node_modules/@noble/curves/esm/abstract/modular.js
  var _0n2 = BigInt(0);
  var _1n2 = BigInt(1);
  var _2n = /* @__PURE__ */ BigInt(2);
  var _3n = /* @__PURE__ */ BigInt(3);
  var _4n = /* @__PURE__ */ BigInt(4);
  var _5n = /* @__PURE__ */ BigInt(5);
  var _8n = /* @__PURE__ */ BigInt(8);
  var _9n = /* @__PURE__ */ BigInt(9);
  var _16n = /* @__PURE__ */ BigInt(16);
  function mod(a, b) {
    const result = a % b;
    return result >= _0n2 ? result : b + result;
  }
  function pow(num, power, modulo) {
    if (power < _0n2)
      throw new Error("invalid exponent, negatives unsupported");
    if (modulo <= _0n2)
      throw new Error("invalid modulus");
    if (modulo === _1n2)
      return _0n2;
    let res = _1n2;
    while (power > _0n2) {
      if (power & _1n2)
        res = res * num % modulo;
      num = num * num % modulo;
      power >>= _1n2;
    }
    return res;
  }
  function pow2(x, power, modulo) {
    let res = x;
    while (power-- > _0n2) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert(number, modulo) {
    if (number === _0n2)
      throw new Error("invert: expected non-zero number");
    if (modulo <= _0n2)
      throw new Error("invert: expected positive modulus, got " + modulo);
    let a = mod(number, modulo);
    let b = modulo;
    let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
    while (a !== _0n2) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      const n = y - v * q;
      b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd2 = b;
    if (gcd2 !== _1n2)
      throw new Error("invert: does not exist");
    return mod(x, modulo);
  }
  function tonelliShanks(P) {
    const legendreC = (P - _1n2) / _2n;
    let Q, S, Z;
    for (Q = P - _1n2, S = 0; Q % _2n === _0n2; Q /= _2n, S++)
      ;
    for (Z = _2n; Z < P && pow(Z, legendreC, P) !== P - _1n2; Z++) {
      if (Z > 1e3)
        throw new Error("Cannot find square root: likely non-prime P");
    }
    if (S === 1) {
      const p1div4 = (P + _1n2) / _4n;
      return function tonelliFast(Fp2, n) {
        const root = Fp2.pow(n, p1div4);
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    const Q1div2 = (Q + _1n2) / _2n;
    return function tonelliSlow(Fp2, n) {
      if (Fp2.pow(n, legendreC) === Fp2.neg(Fp2.ONE))
        throw new Error("Cannot find square root");
      let r = S;
      let g = Fp2.pow(Fp2.mul(Fp2.ONE, Z), Q);
      let x = Fp2.pow(n, Q1div2);
      let b = Fp2.pow(n, Q);
      while (!Fp2.eql(b, Fp2.ONE)) {
        if (Fp2.eql(b, Fp2.ZERO))
          return Fp2.ZERO;
        let m = 1;
        for (let t2 = Fp2.sqr(b); m < r; m++) {
          if (Fp2.eql(t2, Fp2.ONE))
            break;
          t2 = Fp2.sqr(t2);
        }
        const ge = Fp2.pow(g, _1n2 << BigInt(r - m - 1));
        g = Fp2.sqr(ge);
        x = Fp2.mul(x, ge);
        b = Fp2.mul(b, g);
        r = m;
      }
      return x;
    };
  }
  function FpSqrt(P) {
    if (P % _4n === _3n) {
      const p1div4 = (P + _1n2) / _4n;
      return function sqrt3mod4(Fp2, n) {
        const root = Fp2.pow(n, p1div4);
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _8n === _5n) {
      const c1 = (P - _5n) / _8n;
      return function sqrt5mod8(Fp2, n) {
        const n2 = Fp2.mul(n, _2n);
        const v = Fp2.pow(n2, c1);
        const nv = Fp2.mul(n, v);
        const i = Fp2.mul(Fp2.mul(nv, _2n), v);
        const root = Fp2.mul(nv, Fp2.sub(i, Fp2.ONE));
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _16n === _9n) {
    }
    return tonelliShanks(P);
  }
  var isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n2) === _1n2;
  var FIELD_FIELDS = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function validateField(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return validateObject(field, opts);
  }
  function FpPow(f, num, power) {
    if (power < _0n2)
      throw new Error("invalid exponent, negatives unsupported");
    if (power === _0n2)
      return f.ONE;
    if (power === _1n2)
      return num;
    let p = f.ONE;
    let d = num;
    while (power > _0n2) {
      if (power & _1n2)
        p = f.mul(p, d);
      d = f.sqr(d);
      power >>= _1n2;
    }
    return p;
  }
  function FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    const lastMultiplied = nums.reduce((acc, num, i) => {
      if (f.is0(num))
        return acc;
      tmp[i] = acc;
      return f.mul(acc, num);
    }, f.ONE);
    const inverted = f.inv(lastMultiplied);
    nums.reduceRight((acc, num, i) => {
      if (f.is0(num))
        return acc;
      tmp[i] = f.mul(acc, tmp[i]);
      return f.mul(acc, num);
    }, inverted);
    return tmp;
  }
  function nLength(n, nBitLength) {
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
    if (ORDER <= _0n2)
      throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
    if (BYTES > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let sqrtP;
    const f = Object.freeze({
      ORDER,
      isLE: isLE2,
      BITS,
      BYTES,
      MASK: bitMask(BITS),
      ZERO: _0n2,
      ONE: _1n2,
      create: (num) => mod(num, ORDER),
      isValid: (num) => {
        if (typeof num !== "bigint")
          throw new Error("invalid field element: expected bigint, got " + typeof num);
        return _0n2 <= num && num < ORDER;
      },
      is0: (num) => num === _0n2,
      isOdd: (num) => (num & _1n2) === _1n2,
      neg: (num) => mod(-num, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num) => mod(num * num, ORDER),
      add: (lhs, rhs) => mod(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
      pow: (num, power) => FpPow(f, num, power),
      div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num) => num * num,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num) => invert(num, ORDER),
      sqrt: redef.sqrt || ((n) => {
        if (!sqrtP)
          sqrtP = FpSqrt(ORDER);
        return sqrtP(f, n);
      }),
      invertBatch: (lst) => FpInvertBatch(f, lst),
      // TODO: do we really need constant cmov?
      // We don't have const-time bigints anyway, so probably will be not very useful
      cmov: (a, b, c) => c ? b : a,
      toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
      fromBytes: (bytes) => {
        if (bytes.length !== BYTES)
          throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
        return isLE2 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
      }
    });
    return Object.freeze(f);
  }
  function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength(fieldOrder) {
    const length2 = getFieldBytesLength(fieldOrder);
    return length2 + Math.ceil(length2 / 2);
  }
  function mapHashToField(key, fieldOrder, isLE2 = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
    const num = isLE2 ? bytesToNumberLE(key) : bytesToNumberBE(key);
    const reduced = mod(num, fieldOrder - _1n2) + _1n2;
    return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
  }

  // node_modules/@noble/curves/esm/abstract/curve.js
  var _0n3 = BigInt(0);
  var _1n3 = BigInt(1);
  function constTimeNegate(condition, item) {
    const neg = item.negate();
    return condition ? neg : item;
  }
  function validateW(W, bits) {
    if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
      throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
  }
  function calcWOpts(W, scalarBits) {
    validateW(W, scalarBits);
    const windows = Math.ceil(scalarBits / W) + 1;
    const windowSize = 2 ** (W - 1);
    const maxNumber = 2 ** W;
    const mask = bitMask(W);
    const shiftBy = BigInt(W);
    return { windows, windowSize, mask, maxNumber, shiftBy };
  }
  function calcOffsets(n, window2, wOpts) {
    const { windowSize, mask, maxNumber, shiftBy } = wOpts;
    let wbits = Number(n & mask);
    let nextN = n >> shiftBy;
    if (wbits > windowSize) {
      wbits -= maxNumber;
      nextN += _1n3;
    }
    const offsetStart = window2 * windowSize;
    const offset = offsetStart + Math.abs(wbits) - 1;
    const isZero = wbits === 0;
    const isNeg = wbits < 0;
    const isNegF = window2 % 2 !== 0;
    const offsetF = offsetStart;
    return { nextN, offset, isZero, isNeg, isNegF, offsetF };
  }
  function validateMSMPoints(points, c) {
    if (!Array.isArray(points))
      throw new Error("array expected");
    points.forEach((p, i) => {
      if (!(p instanceof c))
        throw new Error("invalid point at index " + i);
    });
  }
  function validateMSMScalars(scalars, field) {
    if (!Array.isArray(scalars))
      throw new Error("array of scalars expected");
    scalars.forEach((s, i) => {
      if (!field.isValid(s))
        throw new Error("invalid scalar at index " + i);
    });
  }
  var pointPrecomputes = /* @__PURE__ */ new WeakMap();
  var pointWindowSizes = /* @__PURE__ */ new WeakMap();
  function getW(P) {
    return pointWindowSizes.get(P) || 1;
  }
  function wNAF(c, bits) {
    return {
      constTimeNegate,
      hasPrecomputes(elm) {
        return getW(elm) !== 1;
      },
      // non-const time multiplication ladder
      unsafeLadder(elm, n, p = c.ZERO) {
        let d = elm;
        while (n > _0n3) {
          if (n & _1n3)
            p = p.add(d);
          d = d.double();
          n >>= _1n3;
        }
        return p;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @param elm Point instance
       * @param W window size
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = calcWOpts(W, bits);
        const points = [];
        let p = elm;
        let base3 = p;
        for (let window2 = 0; window2 < windows; window2++) {
          base3 = p;
          points.push(base3);
          for (let i = 1; i < windowSize; i++) {
            base3 = base3.add(p);
            points.push(base3);
          }
          p = base3.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n) {
        let p = c.ZERO;
        let f = c.BASE;
        const wo = calcWOpts(W, bits);
        for (let window2 = 0; window2 < wo.windows; window2++) {
          const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window2, wo);
          n = nextN;
          if (isZero) {
            f = f.add(constTimeNegate(isNegF, precomputes[offsetF]));
          } else {
            p = p.add(constTimeNegate(isNeg, precomputes[offset]));
          }
        }
        return { p, f };
      },
      /**
       * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @param acc accumulator point to add result of multiplication
       * @returns point
       */
      wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
        const wo = calcWOpts(W, bits);
        for (let window2 = 0; window2 < wo.windows; window2++) {
          if (n === _0n3)
            break;
          const { nextN, offset, isZero, isNeg } = calcOffsets(n, window2, wo);
          n = nextN;
          if (isZero) {
            continue;
          } else {
            const item = precomputes[offset];
            acc = acc.add(isNeg ? item.negate() : item);
          }
        }
        return acc;
      },
      getPrecomputes(W, P, transform) {
        let comp = pointPrecomputes.get(P);
        if (!comp) {
          comp = this.precomputeWindow(P, W);
          if (W !== 1)
            pointPrecomputes.set(P, transform(comp));
        }
        return comp;
      },
      wNAFCached(P, n, transform) {
        const W = getW(P);
        return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
      },
      wNAFCachedUnsafe(P, n, transform, prev) {
        const W = getW(P);
        if (W === 1)
          return this.unsafeLadder(P, n, prev);
        return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
      },
      // We calculate precomputes for elliptic curve point multiplication
      // using windowed method. This specifies window size and
      // stores precomputed values. Usually only base point would be precomputed.
      setWindowSize(P, W) {
        validateW(W, bits);
        pointWindowSizes.set(P, W);
        pointPrecomputes.delete(P);
      }
    };
  }
  function pippenger(c, fieldN, points, scalars) {
    validateMSMPoints(points, c);
    validateMSMScalars(scalars, fieldN);
    if (points.length !== scalars.length)
      throw new Error("arrays of points and scalars must have equal length");
    const zero = c.ZERO;
    const wbits = bitLen(BigInt(points.length));
    const windowSize = wbits > 12 ? wbits - 3 : wbits > 4 ? wbits - 2 : wbits ? 2 : 1;
    const MASK = bitMask(windowSize);
    const buckets = new Array(Number(MASK) + 1).fill(zero);
    const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
    let sum = zero;
    for (let i = lastBits; i >= 0; i -= windowSize) {
      buckets.fill(zero);
      for (let j = 0; j < scalars.length; j++) {
        const scalar = scalars[j];
        const wbits2 = Number(scalar >> BigInt(i) & MASK);
        buckets[wbits2] = buckets[wbits2].add(points[j]);
      }
      let resI = zero;
      for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
        sumI = sumI.add(buckets[j]);
        resI = resI.add(sumI);
      }
      sum = sum.add(resI);
      if (i !== 0)
        for (let j = 0; j < windowSize; j++)
          sum = sum.double();
    }
    return sum;
  }
  function validateBasic(curve) {
    validateField(curve.Fp);
    validateObject(curve, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...nLength(curve.n, curve.nBitLength),
      ...curve,
      ...{ p: curve.Fp.ORDER }
    });
  }

  // node_modules/@noble/curves/esm/abstract/edwards.js
  var _0n4 = BigInt(0);
  var _1n4 = BigInt(1);
  var _2n2 = BigInt(2);
  var _8n2 = BigInt(8);
  var VERIFY_DEFAULT = { zip215: true };
  function validateOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(curve, {
      hash: "function",
      a: "bigint",
      d: "bigint",
      randomBytes: "function"
    }, {
      adjustScalarBytes: "function",
      domain: "function",
      uvRatio: "function",
      mapToCurve: "function"
    });
    return Object.freeze({ ...opts });
  }
  function twistedEdwards(curveDef) {
    const CURVE = validateOpts(curveDef);
    const { Fp: Fp2, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes2, nByteLength, h: cofactor } = CURVE;
    const MASK = _2n2 << BigInt(nByteLength * 8) - _1n4;
    const modP = Fp2.create;
    const Fn = Field(CURVE.n, CURVE.nBitLength);
    const uvRatio2 = CURVE.uvRatio || ((u, v) => {
      try {
        return { isValid: true, value: Fp2.sqrt(u * Fp2.inv(v)) };
      } catch (e) {
        return { isValid: false, value: _0n4 };
      }
    });
    const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes) => bytes);
    const domain = CURVE.domain || ((data, ctx, phflag) => {
      abool("phflag", phflag);
      if (ctx.length || phflag)
        throw new Error("Contexts/pre-hash are not supported");
      return data;
    });
    function aCoordinate(title, n, banZero = false) {
      const min = banZero ? _1n4 : _0n4;
      aInRange("coordinate " + title, n, min, MASK);
    }
    function aextpoint(other) {
      if (!(other instanceof Point2))
        throw new Error("ExtendedPoint expected");
    }
    const toAffineMemo = memoized((p, iz) => {
      const { ex: x, ey: y, ez: z } = p;
      const is0 = p.is0();
      if (iz == null)
        iz = is0 ? _8n2 : Fp2.inv(z);
      const ax = modP(x * iz);
      const ay = modP(y * iz);
      const zz = modP(z * iz);
      if (is0)
        return { x: _0n4, y: _1n4 };
      if (zz !== _1n4)
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    });
    const assertValidMemo = memoized((p) => {
      const { a, d } = CURVE;
      if (p.is0())
        throw new Error("bad point: ZERO");
      const { ex: X, ey: Y, ez: Z, et: T } = p;
      const X2 = modP(X * X);
      const Y2 = modP(Y * Y);
      const Z2 = modP(Z * Z);
      const Z4 = modP(Z2 * Z2);
      const aX2 = modP(X2 * a);
      const left = modP(Z2 * modP(aX2 + Y2));
      const right = modP(Z4 + modP(d * modP(X2 * Y2)));
      if (left !== right)
        throw new Error("bad point: equation left != right (1)");
      const XY = modP(X * Y);
      const ZT = modP(Z * T);
      if (XY !== ZT)
        throw new Error("bad point: equation left != right (2)");
      return true;
    });
    class Point2 {
      constructor(ex, ey, ez, et) {
        aCoordinate("x", ex);
        aCoordinate("y", ey);
        aCoordinate("z", ez, true);
        aCoordinate("t", et);
        this.ex = ex;
        this.ey = ey;
        this.ez = ez;
        this.et = et;
        Object.freeze(this);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      static fromAffine(p) {
        if (p instanceof Point2)
          throw new Error("extended point not allowed");
        const { x, y } = p || {};
        aCoordinate("x", x);
        aCoordinate("y", y);
        return new Point2(x, y, _1n4, modP(x * y));
      }
      static normalizeZ(points) {
        const toInv = Fp2.invertBatch(points.map((p) => p.ez));
        return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
      }
      // Multiscalar Multiplication
      static msm(points, scalars) {
        return pippenger(Point2, Fn, points, scalars);
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        wnaf.setWindowSize(this, windowSize);
      }
      // Not required for fromHex(), which always creates valid points.
      // Could be useful for fromAffine().
      assertValidity() {
        assertValidMemo(this);
      }
      // Compare one point to another.
      equals(other) {
        aextpoint(other);
        const { ex: X1, ey: Y1, ez: Z1 } = this;
        const { ex: X2, ey: Y2, ez: Z2 } = other;
        const X1Z2 = modP(X1 * Z2);
        const X2Z1 = modP(X2 * Z1);
        const Y1Z2 = modP(Y1 * Z2);
        const Y2Z1 = modP(Y2 * Z1);
        return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
      }
      is0() {
        return this.equals(Point2.ZERO);
      }
      negate() {
        return new Point2(modP(-this.ex), this.ey, this.ez, modP(-this.et));
      }
      // Fast algo for doubling Extended Point.
      // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
      // Cost: 4M + 4S + 1*a + 6add + 1*2.
      double() {
        const { a } = CURVE;
        const { ex: X1, ey: Y1, ez: Z1 } = this;
        const A = modP(X1 * X1);
        const B = modP(Y1 * Y1);
        const C = modP(_2n2 * modP(Z1 * Z1));
        const D = modP(a * A);
        const x1y1 = X1 + Y1;
        const E = modP(modP(x1y1 * x1y1) - A - B);
        const G2 = D + B;
        const F = G2 - C;
        const H = D - B;
        const X3 = modP(E * F);
        const Y3 = modP(G2 * H);
        const T3 = modP(E * H);
        const Z3 = modP(F * G2);
        return new Point2(X3, Y3, Z3, T3);
      }
      // Fast algo for adding 2 Extended Points.
      // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
      // Cost: 9M + 1*a + 1*d + 7add.
      add(other) {
        aextpoint(other);
        const { a, d } = CURVE;
        const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
        const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
        const A = modP(X1 * X2);
        const B = modP(Y1 * Y2);
        const C = modP(T1 * d * T2);
        const D = modP(Z1 * Z2);
        const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
        const F = D - C;
        const G2 = D + C;
        const H = modP(B - a * A);
        const X3 = modP(E * F);
        const Y3 = modP(G2 * H);
        const T3 = modP(E * H);
        const Z3 = modP(F * G2);
        return new Point2(X3, Y3, Z3, T3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, n, Point2.normalizeZ);
      }
      // Constant-time multiplication.
      multiply(scalar) {
        const n = scalar;
        aInRange("scalar", n, _1n4, CURVE_ORDER);
        const { p, f } = this.wNAF(n);
        return Point2.normalizeZ([p, f])[0];
      }
      // Non-constant-time multiplication. Uses double-and-add algorithm.
      // It's faster, but should only be used when you don't care about
      // an exposed private key e.g. sig verification.
      // Does NOT allow scalars higher than CURVE.n.
      // Accepts optional accumulator to merge with multiply (important for sparse scalars)
      multiplyUnsafe(scalar, acc = Point2.ZERO) {
        const n = scalar;
        aInRange("scalar", n, _0n4, CURVE_ORDER);
        if (n === _0n4)
          return I;
        if (this.is0() || n === _1n4)
          return this;
        return wnaf.wNAFCachedUnsafe(this, n, Point2.normalizeZ, acc);
      }
      // Checks if point is of small order.
      // If you add something to small order point, you will have "dirty"
      // point with torsion component.
      // Multiplies point by cofactor and checks if the result is 0.
      isSmallOrder() {
        return this.multiplyUnsafe(cofactor).is0();
      }
      // Multiplies point by curve order and checks if the result is 0.
      // Returns `false` is the point is dirty.
      isTorsionFree() {
        return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
      }
      // Converts Extended point to default (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      toAffine(iz) {
        return toAffineMemo(this, iz);
      }
      clearCofactor() {
        const { h: cofactor2 } = CURVE;
        if (cofactor2 === _1n4)
          return this;
        return this.multiplyUnsafe(cofactor2);
      }
      // Converts hash string or Uint8Array to Point.
      // Uses algo from RFC8032 5.1.3.
      static fromHex(hex, zip215 = false) {
        const { d, a } = CURVE;
        const len = Fp2.BYTES;
        hex = ensureBytes("pointHex", hex, len);
        abool("zip215", zip215);
        const normed = hex.slice();
        const lastByte = hex[len - 1];
        normed[len - 1] = lastByte & ~128;
        const y = bytesToNumberLE(normed);
        const max = zip215 ? MASK : Fp2.ORDER;
        aInRange("pointHex.y", y, _0n4, max);
        const y2 = modP(y * y);
        const u = modP(y2 - _1n4);
        const v = modP(d * y2 - a);
        let { isValid, value: x } = uvRatio2(u, v);
        if (!isValid)
          throw new Error("Point.fromHex: invalid y coordinate");
        const isXOdd = (x & _1n4) === _1n4;
        const isLastByteOdd = (lastByte & 128) !== 0;
        if (!zip215 && x === _0n4 && isLastByteOdd)
          throw new Error("Point.fromHex: x=0 and x_0=1");
        if (isLastByteOdd !== isXOdd)
          x = modP(-x);
        return Point2.fromAffine({ x, y });
      }
      static fromPrivateKey(privKey) {
        const { scalar } = getPrivateScalar(privKey);
        return G.multiply(scalar);
      }
      toRawBytes() {
        const { x, y } = this.toAffine();
        const bytes = numberToBytesLE(y, Fp2.BYTES);
        bytes[bytes.length - 1] |= x & _1n4 ? 128 : 0;
        return bytes;
      }
      toHex() {
        return bytesToHex(this.toRawBytes());
      }
    }
    Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, _1n4, modP(CURVE.Gx * CURVE.Gy));
    Point2.ZERO = new Point2(_0n4, _1n4, _1n4, _0n4);
    const { BASE: G, ZERO: I } = Point2;
    const wnaf = wNAF(Point2, nByteLength * 8);
    function modN(a) {
      return mod(a, CURVE_ORDER);
    }
    function modN_LE(hash) {
      return modN(bytesToNumberLE(hash));
    }
    function getPrivateScalar(key) {
      const len = Fp2.BYTES;
      key = ensureBytes("private key", key, len);
      const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
      const head = adjustScalarBytes2(hashed.slice(0, len));
      const prefix = hashed.slice(len, 2 * len);
      const scalar = modN_LE(head);
      return { head, prefix, scalar };
    }
    function getExtendedPublicKey(key) {
      const { head, prefix, scalar } = getPrivateScalar(key);
      const point = G.multiply(scalar);
      const pointBytes = point.toRawBytes();
      return { head, prefix, scalar, point, pointBytes };
    }
    function getPublicKey(privKey) {
      return getExtendedPublicKey(privKey).pointBytes;
    }
    function hashDomainToScalar(context = new Uint8Array(), ...msgs) {
      const msg = concatBytes2(...msgs);
      return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
    }
    function sign(msg, privKey, options = {}) {
      msg = ensureBytes("message", msg);
      if (prehash)
        msg = prehash(msg);
      const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
      const r = hashDomainToScalar(options.context, prefix, msg);
      const R = G.multiply(r).toRawBytes();
      const k = hashDomainToScalar(options.context, R, pointBytes, msg);
      const s = modN(r + k * scalar);
      aInRange("signature.s", s, _0n4, CURVE_ORDER);
      const res = concatBytes2(R, numberToBytesLE(s, Fp2.BYTES));
      return ensureBytes("result", res, Fp2.BYTES * 2);
    }
    const verifyOpts = VERIFY_DEFAULT;
    function verify(sig, msg, publicKey, options = verifyOpts) {
      const { context, zip215 } = options;
      const len = Fp2.BYTES;
      sig = ensureBytes("signature", sig, 2 * len);
      msg = ensureBytes("message", msg);
      publicKey = ensureBytes("publicKey", publicKey, len);
      if (zip215 !== void 0)
        abool("zip215", zip215);
      if (prehash)
        msg = prehash(msg);
      const s = bytesToNumberLE(sig.slice(len, 2 * len));
      let A, R, SB;
      try {
        A = Point2.fromHex(publicKey, zip215);
        R = Point2.fromHex(sig.slice(0, len), zip215);
        SB = G.multiplyUnsafe(s);
      } catch (error) {
        return false;
      }
      if (!zip215 && A.isSmallOrder())
        return false;
      const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
      const RkA = R.add(A.multiplyUnsafe(k));
      return RkA.subtract(SB).clearCofactor().equals(Point2.ZERO);
    }
    G._setWindowSize(8);
    const utils = {
      getExtendedPublicKey,
      /** ed25519 priv keys are uniform 32b. No need to check for modulo bias, like in secp256k1. */
      randomPrivateKey: () => randomBytes2(Fp2.BYTES),
      /**
       * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
       * values. This slows down first getPublicKey() by milliseconds (see Speed section),
       * but allows to speed-up subsequent getPublicKey() calls up to 20x.
       * @param windowSize 2, 4, 8, 16
       */
      precompute(windowSize = 8, point = Point2.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    return {
      CURVE,
      getPublicKey,
      sign,
      verify,
      ExtendedPoint: Point2,
      utils
    };
  }

  // node_modules/@noble/curves/esm/ed25519.js
  var ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
  var ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
  var _0n5 = BigInt(0);
  var _1n5 = BigInt(1);
  var _2n3 = BigInt(2);
  var _3n2 = BigInt(3);
  var _5n2 = BigInt(5);
  var _8n3 = BigInt(8);
  function ed25519_pow_2_252_3(x) {
    const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
    const P = ED25519_P;
    const x2 = x * x % P;
    const b2 = x2 * x % P;
    const b4 = pow2(b2, _2n3, P) * b2 % P;
    const b5 = pow2(b4, _1n5, P) * x % P;
    const b10 = pow2(b5, _5n2, P) * b5 % P;
    const b20 = pow2(b10, _10n, P) * b10 % P;
    const b40 = pow2(b20, _20n, P) * b20 % P;
    const b80 = pow2(b40, _40n, P) * b40 % P;
    const b160 = pow2(b80, _80n, P) * b80 % P;
    const b240 = pow2(b160, _80n, P) * b80 % P;
    const b250 = pow2(b240, _10n, P) * b10 % P;
    const pow_p_5_8 = pow2(b250, _2n3, P) * x % P;
    return { pow_p_5_8, b2 };
  }
  function adjustScalarBytes(bytes) {
    bytes[0] &= 248;
    bytes[31] &= 127;
    bytes[31] |= 64;
    return bytes;
  }
  function uvRatio(u, v) {
    const P = ED25519_P;
    const v3 = mod(v * v * v, P);
    const v7 = mod(v3 * v3 * v, P);
    const pow3 = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
    let x = mod(u * v3 * pow3, P);
    const vx2 = mod(v * x * x, P);
    const root1 = x;
    const root2 = mod(x * ED25519_SQRT_M1, P);
    const useRoot1 = vx2 === u;
    const useRoot2 = vx2 === mod(-u, P);
    const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P);
    if (useRoot1)
      x = root1;
    if (useRoot2 || noRoot)
      x = root2;
    if (isNegativeLE(x, P))
      x = mod(-x, P);
    return { isValid: useRoot1 || useRoot2, value: x };
  }
  var Fp = /* @__PURE__ */ (() => Field(ED25519_P, void 0, true))();
  var ed25519Defaults = /* @__PURE__ */ (() => ({
    // Removing Fp.create() will still work, and is 10% faster on sign
    a: Fp.create(BigInt(-1)),
    // d is -121665/121666 a.k.a. Fp.neg(121665 * Fp.inv(121666))
    d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
    // Finite field 2n**255n - 19n
    Fp,
    // Subgroup order 2n**252n + 27742317777372353535851937790883648493n;
    n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
    h: _8n3,
    Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
    Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
    hash: sha5122,
    randomBytes,
    adjustScalarBytes,
    // dom2
    // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
    // Constant-time, u/√v
    uvRatio
  }))();
  var ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();

  // node_modules/did-jwt/lib/index.module.js
  var import_multibase = __toESM(require_src2(), 1);

  // node_modules/@noble/curves/node_modules/@noble/hashes/esm/hmac.js
  var HMAC = class extends Hash2 {
    constructor(hash, _key) {
      super();
      this.finished = false;
      this.destroyed = false;
      ahash(hash);
      const key = toBytes2(_key);
      this.iHash = hash.create();
      if (typeof this.iHash.update !== "function")
        throw new Error("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen;
      this.outputLen = this.iHash.outputLen;
      const blockLen = this.blockLen;
      const pad = new Uint8Array(blockLen);
      pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
      for (let i = 0; i < pad.length; i++)
        pad[i] ^= 54;
      this.iHash.update(pad);
      this.oHash = hash.create();
      for (let i = 0; i < pad.length; i++)
        pad[i] ^= 54 ^ 92;
      this.oHash.update(pad);
      pad.fill(0);
    }
    update(buf) {
      aexists2(this);
      this.iHash.update(buf);
      return this;
    }
    digestInto(out) {
      aexists2(this);
      abytes2(out, this.outputLen);
      this.finished = true;
      this.iHash.digestInto(out);
      this.oHash.update(out);
      this.oHash.digestInto(out);
      this.destroy();
    }
    digest() {
      const out = new Uint8Array(this.oHash.outputLen);
      this.digestInto(out);
      return out;
    }
    _cloneInto(to) {
      to || (to = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
      to = to;
      to.finished = finished;
      to.destroyed = destroyed;
      to.blockLen = blockLen;
      to.outputLen = outputLen;
      to.oHash = oHash._cloneInto(to.oHash);
      to.iHash = iHash._cloneInto(to.iHash);
      return to;
    }
    destroy() {
      this.destroyed = true;
      this.oHash.destroy();
      this.iHash.destroy();
    }
  };
  var hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
  hmac.create = (hash, key) => new HMAC(hash, key);

  // node_modules/@noble/curves/esm/abstract/weierstrass.js
  function validateSigVerOpts(opts) {
    if (opts.lowS !== void 0)
      abool("lowS", opts.lowS);
    if (opts.prehash !== void 0)
      abool("prehash", opts.prehash);
  }
  function validatePointOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      a: "field",
      b: "field"
    }, {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function"
    });
    const { endo, Fp: Fp2, a } = opts;
    if (endo) {
      if (!Fp2.eql(a, Fp2.ZERO)) {
        throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
      }
      if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
        throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
      }
    }
    return Object.freeze({ ...opts });
  }
  var DERErr = class extends Error {
    constructor(m = "") {
      super(m);
    }
  };
  var DER = {
    // asn.1 DER encoding utils
    Err: DERErr,
    // Basic building block is TLV (Tag-Length-Value)
    _tlv: {
      encode: (tag, data) => {
        const { Err: E } = DER;
        if (tag < 0 || tag > 256)
          throw new E("tlv.encode: wrong tag");
        if (data.length & 1)
          throw new E("tlv.encode: unpadded data");
        const dataLen = data.length / 2;
        const len = numberToHexUnpadded(dataLen);
        if (len.length / 2 & 128)
          throw new E("tlv.encode: long form length too big");
        const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
        const t = numberToHexUnpadded(tag);
        return t + lenLen + len + data;
      },
      // v - value, l - left bytes (unparsed)
      decode(tag, data) {
        const { Err: E } = DER;
        let pos = 0;
        if (tag < 0 || tag > 256)
          throw new E("tlv.encode: wrong tag");
        if (data.length < 2 || data[pos++] !== tag)
          throw new E("tlv.decode: wrong tlv");
        const first = data[pos++];
        const isLong = !!(first & 128);
        let length2 = 0;
        if (!isLong)
          length2 = first;
        else {
          const lenLen = first & 127;
          if (!lenLen)
            throw new E("tlv.decode(long): indefinite length not supported");
          if (lenLen > 4)
            throw new E("tlv.decode(long): byte length is too big");
          const lengthBytes = data.subarray(pos, pos + lenLen);
          if (lengthBytes.length !== lenLen)
            throw new E("tlv.decode: length bytes not complete");
          if (lengthBytes[0] === 0)
            throw new E("tlv.decode(long): zero leftmost byte");
          for (const b of lengthBytes)
            length2 = length2 << 8 | b;
          pos += lenLen;
          if (length2 < 128)
            throw new E("tlv.decode(long): not minimal encoding");
        }
        const v = data.subarray(pos, pos + length2);
        if (v.length !== length2)
          throw new E("tlv.decode: wrong value length");
        return { v, l: data.subarray(pos + length2) };
      }
    },
    // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
    // since we always use positive integers here. It must always be empty:
    // - add zero byte if exists
    // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
    _int: {
      encode(num) {
        const { Err: E } = DER;
        if (num < _0n6)
          throw new E("integer: negative integers are not allowed");
        let hex = numberToHexUnpadded(num);
        if (Number.parseInt(hex[0], 16) & 8)
          hex = "00" + hex;
        if (hex.length & 1)
          throw new E("unexpected DER parsing assertion: unpadded hex");
        return hex;
      },
      decode(data) {
        const { Err: E } = DER;
        if (data[0] & 128)
          throw new E("invalid signature integer: negative");
        if (data[0] === 0 && !(data[1] & 128))
          throw new E("invalid signature integer: unnecessary leading zero");
        return bytesToNumberBE(data);
      }
    },
    toSig(hex) {
      const { Err: E, _int: int, _tlv: tlv } = DER;
      const data = ensureBytes("signature", hex);
      const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
      if (seqLeftBytes.length)
        throw new E("invalid signature: left bytes after parsing");
      const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
      const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
      if (sLeftBytes.length)
        throw new E("invalid signature: left bytes after parsing");
      return { r: int.decode(rBytes), s: int.decode(sBytes) };
    },
    hexFromSig(sig) {
      const { _tlv: tlv, _int: int } = DER;
      const rs = tlv.encode(2, int.encode(sig.r));
      const ss = tlv.encode(2, int.encode(sig.s));
      const seq = rs + ss;
      return tlv.encode(48, seq);
    }
  };
  var _0n6 = BigInt(0);
  var _1n6 = BigInt(1);
  var _2n4 = BigInt(2);
  var _3n3 = BigInt(3);
  var _4n2 = BigInt(4);
  function weierstrassPoints(opts) {
    const CURVE = validatePointOpts(opts);
    const { Fp: Fp2 } = CURVE;
    const Fn = Field(CURVE.n, CURVE.nBitLength);
    const toBytes3 = CURVE.toBytes || ((_c, point, _isCompressed) => {
      const a = point.toAffine();
      return concatBytes2(Uint8Array.from([4]), Fp2.toBytes(a.x), Fp2.toBytes(a.y));
    });
    const fromBytes = CURVE.fromBytes || ((bytes) => {
      const tail = bytes.subarray(1);
      const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
      const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
      return { x, y };
    });
    function weierstrassEquation(x) {
      const { a, b } = CURVE;
      const x2 = Fp2.sqr(x);
      const x3 = Fp2.mul(x2, x);
      return Fp2.add(Fp2.add(x3, Fp2.mul(x, a)), b);
    }
    if (!Fp2.eql(Fp2.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
      throw new Error("bad generator point: equation left != right");
    function isWithinCurveOrder(num) {
      return inRange(num, _1n6, CURVE.n);
    }
    function normPrivateKeyToScalar(key) {
      const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
      if (lengths && typeof key !== "bigint") {
        if (isBytes3(key))
          key = bytesToHex(key);
        if (typeof key !== "string" || !lengths.includes(key.length))
          throw new Error("invalid private key");
        key = key.padStart(nByteLength * 2, "0");
      }
      let num;
      try {
        num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
      } catch (error) {
        throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
      }
      if (wrapPrivateKey)
        num = mod(num, N);
      aInRange("private key", num, _1n6, N);
      return num;
    }
    function aprjpoint(other) {
      if (!(other instanceof Point2))
        throw new Error("ProjectivePoint expected");
    }
    const toAffineMemo = memoized((p, iz) => {
      const { px: x, py: y, pz: z } = p;
      if (Fp2.eql(z, Fp2.ONE))
        return { x, y };
      const is0 = p.is0();
      if (iz == null)
        iz = is0 ? Fp2.ONE : Fp2.inv(z);
      const ax = Fp2.mul(x, iz);
      const ay = Fp2.mul(y, iz);
      const zz = Fp2.mul(z, iz);
      if (is0)
        return { x: Fp2.ZERO, y: Fp2.ZERO };
      if (!Fp2.eql(zz, Fp2.ONE))
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    });
    const assertValidMemo = memoized((p) => {
      if (p.is0()) {
        if (CURVE.allowInfinityPoint && !Fp2.is0(p.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y } = p.toAffine();
      if (!Fp2.isValid(x) || !Fp2.isValid(y))
        throw new Error("bad point: x or y not FE");
      const left = Fp2.sqr(y);
      const right = weierstrassEquation(x);
      if (!Fp2.eql(left, right))
        throw new Error("bad point: equation left != right");
      if (!p.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
      return true;
    });
    class Point2 {
      constructor(px, py, pz) {
        if (px == null || !Fp2.isValid(px))
          throw new Error("x required");
        if (py == null || !Fp2.isValid(py))
          throw new Error("y required");
        if (pz == null || !Fp2.isValid(pz))
          throw new Error("z required");
        this.px = px;
        this.py = py;
        this.pz = pz;
        Object.freeze(this);
      }
      // Does not validate if the point is on-curve.
      // Use fromHex instead, or call assertValidity() later.
      static fromAffine(p) {
        const { x, y } = p || {};
        if (!p || !Fp2.isValid(x) || !Fp2.isValid(y))
          throw new Error("invalid affine point");
        if (p instanceof Point2)
          throw new Error("projective point not allowed");
        const is0 = (i) => Fp2.eql(i, Fp2.ZERO);
        if (is0(x) && is0(y))
          return Point2.ZERO;
        return new Point2(x, y, Fp2.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      /**
       * Takes a bunch of Projective Points but executes only one
       * inversion on all of them. Inversion is very slow operation,
       * so this improves performance massively.
       * Optimization: converts a list of projective points to a list of identical points with Z=1.
       */
      static normalizeZ(points) {
        const toInv = Fp2.invertBatch(points.map((p) => p.pz));
        return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
      }
      /**
       * Converts hash string or Uint8Array to Point.
       * @param hex short/long ECDSA hex
       */
      static fromHex(hex) {
        const P = Point2.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
        P.assertValidity();
        return P;
      }
      // Multiplies generator point by privateKey.
      static fromPrivateKey(privateKey) {
        return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
      }
      // Multiscalar Multiplication
      static msm(points, scalars) {
        return pippenger(Point2, Fn, points, scalars);
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        wnaf.setWindowSize(this, windowSize);
      }
      // A point on curve is valid if it conforms to equation.
      assertValidity() {
        assertValidMemo(this);
      }
      hasEvenY() {
        const { y } = this.toAffine();
        if (Fp2.isOdd)
          return !Fp2.isOdd(y);
        throw new Error("Field doesn't support isOdd");
      }
      /**
       * Compare one point to another.
       */
      equals(other) {
        aprjpoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        const U1 = Fp2.eql(Fp2.mul(X1, Z2), Fp2.mul(X2, Z1));
        const U2 = Fp2.eql(Fp2.mul(Y1, Z2), Fp2.mul(Y2, Z1));
        return U1 && U2;
      }
      /**
       * Flips point to one corresponding to (x, -y) in Affine coordinates.
       */
      negate() {
        return new Point2(this.px, Fp2.neg(this.py), this.pz);
      }
      // Renes-Costello-Batina exception-free doubling formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 3
      // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
      double() {
        const { a, b } = CURVE;
        const b3 = Fp2.mul(b, _3n3);
        const { px: X1, py: Y1, pz: Z1 } = this;
        let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
        let t0 = Fp2.mul(X1, X1);
        let t1 = Fp2.mul(Y1, Y1);
        let t2 = Fp2.mul(Z1, Z1);
        let t3 = Fp2.mul(X1, Y1);
        t3 = Fp2.add(t3, t3);
        Z3 = Fp2.mul(X1, Z1);
        Z3 = Fp2.add(Z3, Z3);
        X3 = Fp2.mul(a, Z3);
        Y3 = Fp2.mul(b3, t2);
        Y3 = Fp2.add(X3, Y3);
        X3 = Fp2.sub(t1, Y3);
        Y3 = Fp2.add(t1, Y3);
        Y3 = Fp2.mul(X3, Y3);
        X3 = Fp2.mul(t3, X3);
        Z3 = Fp2.mul(b3, Z3);
        t2 = Fp2.mul(a, t2);
        t3 = Fp2.sub(t0, t2);
        t3 = Fp2.mul(a, t3);
        t3 = Fp2.add(t3, Z3);
        Z3 = Fp2.add(t0, t0);
        t0 = Fp2.add(Z3, t0);
        t0 = Fp2.add(t0, t2);
        t0 = Fp2.mul(t0, t3);
        Y3 = Fp2.add(Y3, t0);
        t2 = Fp2.mul(Y1, Z1);
        t2 = Fp2.add(t2, t2);
        t0 = Fp2.mul(t2, t3);
        X3 = Fp2.sub(X3, t0);
        Z3 = Fp2.mul(t2, t1);
        Z3 = Fp2.add(Z3, Z3);
        Z3 = Fp2.add(Z3, Z3);
        return new Point2(X3, Y3, Z3);
      }
      // Renes-Costello-Batina exception-free addition formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 1
      // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
      add(other) {
        aprjpoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
        const a = CURVE.a;
        const b3 = Fp2.mul(CURVE.b, _3n3);
        let t0 = Fp2.mul(X1, X2);
        let t1 = Fp2.mul(Y1, Y2);
        let t2 = Fp2.mul(Z1, Z2);
        let t3 = Fp2.add(X1, Y1);
        let t4 = Fp2.add(X2, Y2);
        t3 = Fp2.mul(t3, t4);
        t4 = Fp2.add(t0, t1);
        t3 = Fp2.sub(t3, t4);
        t4 = Fp2.add(X1, Z1);
        let t5 = Fp2.add(X2, Z2);
        t4 = Fp2.mul(t4, t5);
        t5 = Fp2.add(t0, t2);
        t4 = Fp2.sub(t4, t5);
        t5 = Fp2.add(Y1, Z1);
        X3 = Fp2.add(Y2, Z2);
        t5 = Fp2.mul(t5, X3);
        X3 = Fp2.add(t1, t2);
        t5 = Fp2.sub(t5, X3);
        Z3 = Fp2.mul(a, t4);
        X3 = Fp2.mul(b3, t2);
        Z3 = Fp2.add(X3, Z3);
        X3 = Fp2.sub(t1, Z3);
        Z3 = Fp2.add(t1, Z3);
        Y3 = Fp2.mul(X3, Z3);
        t1 = Fp2.add(t0, t0);
        t1 = Fp2.add(t1, t0);
        t2 = Fp2.mul(a, t2);
        t4 = Fp2.mul(b3, t4);
        t1 = Fp2.add(t1, t2);
        t2 = Fp2.sub(t0, t2);
        t2 = Fp2.mul(a, t2);
        t4 = Fp2.add(t4, t2);
        t0 = Fp2.mul(t1, t4);
        Y3 = Fp2.add(Y3, t0);
        t0 = Fp2.mul(t5, t4);
        X3 = Fp2.mul(t3, X3);
        X3 = Fp2.sub(X3, t0);
        t0 = Fp2.mul(t3, t1);
        Z3 = Fp2.mul(t5, Z3);
        Z3 = Fp2.add(Z3, t0);
        return new Point2(X3, Y3, Z3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      is0() {
        return this.equals(Point2.ZERO);
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, n, Point2.normalizeZ);
      }
      /**
       * Non-constant-time multiplication. Uses double-and-add algorithm.
       * It's faster, but should only be used when you don't care about
       * an exposed private key e.g. sig verification, which works over *public* keys.
       */
      multiplyUnsafe(sc) {
        const { endo, n: N } = CURVE;
        aInRange("scalar", sc, _0n6, N);
        const I = Point2.ZERO;
        if (sc === _0n6)
          return I;
        if (this.is0() || sc === _1n6)
          return this;
        if (!endo || wnaf.hasPrecomputes(this))
          return wnaf.wNAFCachedUnsafe(this, sc, Point2.normalizeZ);
        let { k1neg, k1, k2neg, k2 } = endo.splitScalar(sc);
        let k1p = I;
        let k2p = I;
        let d = this;
        while (k1 > _0n6 || k2 > _0n6) {
          if (k1 & _1n6)
            k1p = k1p.add(d);
          if (k2 & _1n6)
            k2p = k2p.add(d);
          d = d.double();
          k1 >>= _1n6;
          k2 >>= _1n6;
        }
        if (k1neg)
          k1p = k1p.negate();
        if (k2neg)
          k2p = k2p.negate();
        k2p = new Point2(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        return k1p.add(k2p);
      }
      /**
       * Constant time multiplication.
       * Uses wNAF method. Windowed method may be 10% faster,
       * but takes 2x longer to generate and consumes 2x memory.
       * Uses precomputes when available.
       * Uses endomorphism for Koblitz curves.
       * @param scalar by which the point would be multiplied
       * @returns New point
       */
      multiply(scalar) {
        const { endo, n: N } = CURVE;
        aInRange("scalar", scalar, _1n6, N);
        let point, fake;
        if (endo) {
          const { k1neg, k1, k2neg, k2 } = endo.splitScalar(scalar);
          let { p: k1p, f: f1p } = this.wNAF(k1);
          let { p: k2p, f: f2p } = this.wNAF(k2);
          k1p = wnaf.constTimeNegate(k1neg, k1p);
          k2p = wnaf.constTimeNegate(k2neg, k2p);
          k2p = new Point2(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
          point = k1p.add(k2p);
          fake = f1p.add(f2p);
        } else {
          const { p, f } = this.wNAF(scalar);
          point = p;
          fake = f;
        }
        return Point2.normalizeZ([point, fake])[0];
      }
      /**
       * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
       * Not using Strauss-Shamir trick: precomputation tables are faster.
       * The trick could be useful if both P and Q are not G (not in our case).
       * @returns non-zero affine point
       */
      multiplyAndAddUnsafe(Q, a, b) {
        const G = Point2.BASE;
        const mul = (P, a2) => a2 === _0n6 || a2 === _1n6 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
        const sum = mul(this, a).add(mul(Q, b));
        return sum.is0() ? void 0 : sum;
      }
      // Converts Projective point to affine (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      // (x, y, z) ∋ (x=x/z, y=y/z)
      toAffine(iz) {
        return toAffineMemo(this, iz);
      }
      isTorsionFree() {
        const { h: cofactor, isTorsionFree } = CURVE;
        if (cofactor === _1n6)
          return true;
        if (isTorsionFree)
          return isTorsionFree(Point2, this);
        throw new Error("isTorsionFree() has not been declared for the elliptic curve");
      }
      clearCofactor() {
        const { h: cofactor, clearCofactor } = CURVE;
        if (cofactor === _1n6)
          return this;
        if (clearCofactor)
          return clearCofactor(Point2, this);
        return this.multiplyUnsafe(CURVE.h);
      }
      toRawBytes(isCompressed = true) {
        abool("isCompressed", isCompressed);
        this.assertValidity();
        return toBytes3(Point2, this, isCompressed);
      }
      toHex(isCompressed = true) {
        abool("isCompressed", isCompressed);
        return bytesToHex(this.toRawBytes(isCompressed));
      }
    }
    Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, Fp2.ONE);
    Point2.ZERO = new Point2(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
    const _bits = CURVE.nBitLength;
    const wnaf = wNAF(Point2, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
    return {
      CURVE,
      ProjectivePoint: Point2,
      normPrivateKeyToScalar,
      weierstrassEquation,
      isWithinCurveOrder
    };
  }
  function validateOpts2(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      hash: "hash",
      hmac: "function",
      randomBytes: "function"
    }, {
      bits2int: "function",
      bits2int_modN: "function",
      lowS: "boolean"
    });
    return Object.freeze({ lowS: true, ...opts });
  }
  function weierstrass(curveDef) {
    const CURVE = validateOpts2(curveDef);
    const { Fp: Fp2, n: CURVE_ORDER } = CURVE;
    const compressedLen = Fp2.BYTES + 1;
    const uncompressedLen = 2 * Fp2.BYTES + 1;
    function modN(a) {
      return mod(a, CURVE_ORDER);
    }
    function invN(a) {
      return invert(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
      ...CURVE,
      toBytes(_c, point, isCompressed) {
        const a = point.toAffine();
        const x = Fp2.toBytes(a.x);
        const cat = concatBytes2;
        abool("isCompressed", isCompressed);
        if (isCompressed) {
          return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
        } else {
          return cat(Uint8Array.from([4]), x, Fp2.toBytes(a.y));
        }
      },
      fromBytes(bytes) {
        const len = bytes.length;
        const head = bytes[0];
        const tail = bytes.subarray(1);
        if (len === compressedLen && (head === 2 || head === 3)) {
          const x = bytesToNumberBE(tail);
          if (!inRange(x, _1n6, Fp2.ORDER))
            throw new Error("Point is not on curve");
          const y2 = weierstrassEquation(x);
          let y;
          try {
            y = Fp2.sqrt(y2);
          } catch (sqrtError) {
            const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
            throw new Error("Point is not on curve" + suffix);
          }
          const isYOdd = (y & _1n6) === _1n6;
          const isHeadOdd = (head & 1) === 1;
          if (isHeadOdd !== isYOdd)
            y = Fp2.neg(y);
          return { x, y };
        } else if (len === uncompressedLen && head === 4) {
          const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
          const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
          return { x, y };
        } else {
          const cl = compressedLen;
          const ul = uncompressedLen;
          throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
        }
      }
    });
    const numToNByteHex = (num) => bytesToHex(numberToBytesBE(num, CURVE.nByteLength));
    function isBiggerThanHalfOrder(number) {
      const HALF = CURVE_ORDER >> _1n6;
      return number > HALF;
    }
    function normalizeS(s) {
      return isBiggerThanHalfOrder(s) ? modN(-s) : s;
    }
    const slcNum = (b, from3, to) => bytesToNumberBE(b.slice(from3, to));
    class Signature {
      constructor(r, s, recovery) {
        aInRange("r", r, _1n6, CURVE_ORDER);
        aInRange("s", s, _1n6, CURVE_ORDER);
        this.r = r;
        this.s = s;
        if (recovery != null)
          this.recovery = recovery;
        Object.freeze(this);
      }
      // pair (bytes of r, bytes of s)
      static fromCompact(hex) {
        const l = CURVE.nByteLength;
        hex = ensureBytes("compactSignature", hex, l * 2);
        return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
      }
      // DER encoded ECDSA signature
      // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
      static fromDER(hex) {
        const { r, s } = DER.toSig(ensureBytes("DER", hex));
        return new Signature(r, s);
      }
      /**
       * @todo remove
       * @deprecated
       */
      assertValidity() {
      }
      addRecoveryBit(recovery) {
        return new Signature(this.r, this.s, recovery);
      }
      recoverPublicKey(msgHash) {
        const { r, s, recovery: rec } = this;
        const h = bits2int_modN(ensureBytes("msgHash", msgHash));
        if (rec == null || ![0, 1, 2, 3].includes(rec))
          throw new Error("recovery id invalid");
        const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
        if (radj >= Fp2.ORDER)
          throw new Error("recovery id 2 or 3 invalid");
        const prefix = (rec & 1) === 0 ? "02" : "03";
        const R = Point2.fromHex(prefix + numToNByteHex(radj));
        const ir = invN(radj);
        const u1 = modN(-h * ir);
        const u2 = modN(s * ir);
        const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u2);
        if (!Q)
          throw new Error("point at infinify");
        Q.assertValidity();
        return Q;
      }
      // Signatures should be low-s, to prevent malleability.
      hasHighS() {
        return isBiggerThanHalfOrder(this.s);
      }
      normalizeS() {
        return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
      }
      // DER-encoded
      toDERRawBytes() {
        return hexToBytes(this.toDERHex());
      }
      toDERHex() {
        return DER.hexFromSig({ r: this.r, s: this.s });
      }
      // padded bytes of r, then padded bytes of s
      toCompactRawBytes() {
        return hexToBytes(this.toCompactHex());
      }
      toCompactHex() {
        return numToNByteHex(this.r) + numToNByteHex(this.s);
      }
    }
    const utils = {
      isValidPrivateKey(privateKey) {
        try {
          normPrivateKeyToScalar(privateKey);
          return true;
        } catch (error) {
          return false;
        }
      },
      normPrivateKeyToScalar,
      /**
       * Produces cryptographically secure private key from random of size
       * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
       */
      randomPrivateKey: () => {
        const length2 = getMinHashLength(CURVE.n);
        return mapHashToField(CURVE.randomBytes(length2), CURVE.n);
      },
      /**
       * Creates precompute table for an arbitrary EC point. Makes point "cached".
       * Allows to massively speed-up `point.multiply(scalar)`.
       * @returns cached point
       * @example
       * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
       * fast.multiply(privKey); // much faster ECDH now
       */
      precompute(windowSize = 8, point = Point2.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    function getPublicKey(privateKey, isCompressed = true) {
      return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    function isProbPub(item) {
      const arr = isBytes3(item);
      const str = typeof item === "string";
      const len = (arr || str) && item.length;
      if (arr)
        return len === compressedLen || len === uncompressedLen;
      if (str)
        return len === 2 * compressedLen || len === 2 * uncompressedLen;
      if (item instanceof Point2)
        return true;
      return false;
    }
    function getSharedSecret(privateA, publicB, isCompressed = true) {
      if (isProbPub(privateA))
        throw new Error("first arg must be private key");
      if (!isProbPub(publicB))
        throw new Error("second arg must be public key");
      const b = Point2.fromHex(publicB);
      return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    const bits2int = CURVE.bits2int || function(bytes) {
      if (bytes.length > 8192)
        throw new Error("input is too large");
      const num = bytesToNumberBE(bytes);
      const delta = bytes.length * 8 - CURVE.nBitLength;
      return delta > 0 ? num >> BigInt(delta) : num;
    };
    const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
      return modN(bits2int(bytes));
    };
    const ORDER_MASK = bitMask(CURVE.nBitLength);
    function int2octets(num) {
      aInRange("num < 2^" + CURVE.nBitLength, num, _0n6, ORDER_MASK);
      return numberToBytesBE(num, CURVE.nByteLength);
    }
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
      if (["recovered", "canonical"].some((k) => k in opts))
        throw new Error("sign() legacy options not supported");
      const { hash, randomBytes: randomBytes2 } = CURVE;
      let { lowS, prehash, extraEntropy: ent } = opts;
      if (lowS == null)
        lowS = true;
      msgHash = ensureBytes("msgHash", msgHash);
      validateSigVerOpts(opts);
      if (prehash)
        msgHash = ensureBytes("prehashed msgHash", hash(msgHash));
      const h1int = bits2int_modN(msgHash);
      const d = normPrivateKeyToScalar(privateKey);
      const seedArgs = [int2octets(d), int2octets(h1int)];
      if (ent != null && ent !== false) {
        const e = ent === true ? randomBytes2(Fp2.BYTES) : ent;
        seedArgs.push(ensureBytes("extraEntropy", e));
      }
      const seed = concatBytes2(...seedArgs);
      const m = h1int;
      function k2sig(kBytes) {
        const k = bits2int(kBytes);
        if (!isWithinCurveOrder(k))
          return;
        const ik = invN(k);
        const q = Point2.BASE.multiply(k).toAffine();
        const r = modN(q.x);
        if (r === _0n6)
          return;
        const s = modN(ik * modN(m + r * d));
        if (s === _0n6)
          return;
        let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n6);
        let normS = s;
        if (lowS && isBiggerThanHalfOrder(s)) {
          normS = normalizeS(s);
          recovery ^= 1;
        }
        return new Signature(r, normS, recovery);
      }
      return { seed, k2sig };
    }
    const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
    const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
    function sign(msgHash, privKey, opts = defaultSigOpts) {
      const { seed, k2sig } = prepSig(msgHash, privKey, opts);
      const C = CURVE;
      const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
      return drbg(seed, k2sig);
    }
    Point2.BASE._setWindowSize(8);
    function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
      const sg = signature;
      msgHash = ensureBytes("msgHash", msgHash);
      publicKey = ensureBytes("publicKey", publicKey);
      const { lowS, prehash, format } = opts;
      validateSigVerOpts(opts);
      if ("strict" in opts)
        throw new Error("options.strict was renamed to lowS");
      if (format !== void 0 && format !== "compact" && format !== "der")
        throw new Error("format must be compact or der");
      const isHex = typeof sg === "string" || isBytes3(sg);
      const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
      if (!isHex && !isObj)
        throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
      let _sig = void 0;
      let P;
      try {
        if (isObj)
          _sig = new Signature(sg.r, sg.s);
        if (isHex) {
          try {
            if (format !== "compact")
              _sig = Signature.fromDER(sg);
          } catch (derError) {
            if (!(derError instanceof DER.Err))
              throw derError;
          }
          if (!_sig && format !== "der")
            _sig = Signature.fromCompact(sg);
        }
        P = Point2.fromHex(publicKey);
      } catch (error) {
        return false;
      }
      if (!_sig)
        return false;
      if (lowS && _sig.hasHighS())
        return false;
      if (prehash)
        msgHash = CURVE.hash(msgHash);
      const { r, s } = _sig;
      const h = bits2int_modN(msgHash);
      const is = invN(s);
      const u1 = modN(h * is);
      const u2 = modN(r * is);
      const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
      if (!R)
        return false;
      const v = modN(R.x);
      return v === r;
    }
    return {
      CURVE,
      getPublicKey,
      getSharedSecret,
      sign,
      verify,
      ProjectivePoint: Point2,
      Signature,
      utils
    };
  }

  // node_modules/@noble/curves/esm/_shortw_utils.js
  function getHash(hash) {
    return {
      hash,
      hmac: (key, ...msgs) => hmac(hash, key, concatBytes(...msgs)),
      randomBytes
    };
  }
  function createCurve(curveDef, defHash) {
    const create2 = (hash) => weierstrass({ ...curveDef, ...getHash(hash) });
    return { ...create2(defHash), create: create2 };
  }

  // node_modules/@noble/curves/esm/secp256k1.js
  var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
  var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
  var _1n7 = BigInt(1);
  var _2n5 = BigInt(2);
  var divNearest = (a, b) => (a + b / _2n5) / b;
  function sqrtMod(y) {
    const P = secp256k1P;
    const _3n4 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = y * y * y % P;
    const b3 = b2 * b2 * y % P;
    const b6 = pow2(b3, _3n4, P) * b3 % P;
    const b9 = pow2(b6, _3n4, P) * b3 % P;
    const b11 = pow2(b9, _2n5, P) * b2 % P;
    const b22 = pow2(b11, _11n, P) * b11 % P;
    const b44 = pow2(b22, _22n, P) * b22 % P;
    const b88 = pow2(b44, _44n, P) * b44 % P;
    const b176 = pow2(b88, _88n, P) * b88 % P;
    const b220 = pow2(b176, _44n, P) * b44 % P;
    const b223 = pow2(b220, _3n4, P) * b3 % P;
    const t1 = pow2(b223, _23n, P) * b22 % P;
    const t2 = pow2(t1, _6n, P) * b2 % P;
    const root = pow2(t2, _2n5, P);
    if (!Fpk1.eql(Fpk1.sqr(root), y))
      throw new Error("Cannot find square root");
    return root;
  }
  var Fpk1 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
  var secp256k1 = createCurve({
    a: BigInt(0),
    b: BigInt(7),
    Fp: Fpk1,
    n: secp256k1N,
    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
    h: BigInt(1),
    // Cofactor
    lowS: true,
    // Allow only low-S signatures by default in sign() and verify()
    endo: {
      // Endomorphism, see above
      beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
      splitScalar: (k) => {
        const n = secp256k1N;
        const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
        const b1 = -_1n7 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
        const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
        const b2 = a1;
        const POW_2_128 = BigInt("0x100000000000000000000000000000000");
        const c1 = divNearest(b2 * k, n);
        const c2 = divNearest(-b1 * k, n);
        let k1 = mod(k - c1 * a1 - c2 * a2, n);
        let k2 = mod(-c1 * b1 - c2 * b2, n);
        const k1neg = k1 > POW_2_128;
        const k2neg = k2 > POW_2_128;
        if (k1neg)
          k1 = n - k1;
        if (k2neg)
          k2 = n - k2;
        if (k1 > POW_2_128 || k2 > POW_2_128) {
          throw new Error("splitScalar: Endomorphism failed, k=" + k);
        }
        return { k1neg, k1, k2neg, k2 };
      }
    }
  }, sha2564);
  var _0n7 = BigInt(0);
  var Point = secp256k1.ProjectivePoint;

  // node_modules/@noble/curves/esm/p256.js
  var Fp256 = Field(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"));
  var CURVE_A = Fp256.create(BigInt("-3"));
  var CURVE_B = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b");
  var p256 = createCurve({
    a: CURVE_A,
    b: CURVE_B,
    Fp: Fp256,
    n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
    Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
    Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
    h: BigInt(1),
    lowS: false
  }, sha2564);

  // node_modules/@noble/hashes/esm/legacy.js
  var Rho160 = /* @__PURE__ */ Uint8Array.from([
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8
  ]);
  var Id160 = /* @__PURE__ */ (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
  var Pi160 = /* @__PURE__ */ (() => Id160.map((i) => (9 * i + 5) % 16))();
  var idxLR = /* @__PURE__ */ (() => {
    const L = [Id160];
    const R = [Pi160];
    const res = [L, R];
    for (let i = 0; i < 4; i++)
      for (let j of res)
        j.push(j[i].map((k) => Rho160[k]));
    return res;
  })();
  var idxL = /* @__PURE__ */ (() => idxLR[0])();
  var idxR = /* @__PURE__ */ (() => idxLR[1])();
  var shifts160 = /* @__PURE__ */ [
    [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
    [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
    [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
    [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
    [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
  ].map((i) => Uint8Array.from(i));
  var shiftsL160 = /* @__PURE__ */ idxL.map((idx, i) => idx.map((j) => shifts160[i][j]));
  var shiftsR160 = /* @__PURE__ */ idxR.map((idx, i) => idx.map((j) => shifts160[i][j]));
  var Kl160 = /* @__PURE__ */ Uint32Array.from([
    0,
    1518500249,
    1859775393,
    2400959708,
    2840853838
  ]);
  var Kr160 = /* @__PURE__ */ Uint32Array.from([
    1352829926,
    1548603684,
    1836072691,
    2053994217,
    0
  ]);
  function ripemd_f(group, x, y, z) {
    if (group === 0)
      return x ^ y ^ z;
    if (group === 1)
      return x & y | ~x & z;
    if (group === 2)
      return (x | ~y) ^ z;
    if (group === 3)
      return x & z | y & ~z;
    return x ^ (y | ~z);
  }
  var BUF_160 = /* @__PURE__ */ new Uint32Array(16);
  var RIPEMD160 = class extends HashMD {
    constructor() {
      super(64, 20, 8, true);
      this.h0 = 1732584193 | 0;
      this.h1 = 4023233417 | 0;
      this.h2 = 2562383102 | 0;
      this.h3 = 271733878 | 0;
      this.h4 = 3285377520 | 0;
    }
    get() {
      const { h0, h1, h2, h3, h4 } = this;
      return [h0, h1, h2, h3, h4];
    }
    set(h0, h1, h2, h3, h4) {
      this.h0 = h0 | 0;
      this.h1 = h1 | 0;
      this.h2 = h2 | 0;
      this.h3 = h3 | 0;
      this.h4 = h4 | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        BUF_160[i] = view.getUint32(offset, true);
      let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
      for (let group = 0; group < 5; group++) {
        const rGroup = 4 - group;
        const hbl = Kl160[group], hbr = Kr160[group];
        const rl = idxL[group], rr = idxR[group];
        const sl = shiftsL160[group], sr = shiftsR160[group];
        for (let i = 0; i < 16; i++) {
          const tl = rotl(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
          al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
        }
        for (let i = 0; i < 16; i++) {
          const tr = rotl(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
          ar = er, er = dr, dr = rotl(cr, 10) | 0, cr = br, br = tr;
        }
      }
      this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
    }
    roundClean() {
      clean(BUF_160);
    }
    destroy() {
      this.destroyed = true;
      clean(this.buffer);
      this.set(0, 0, 0, 0, 0);
    }
  };
  var ripemd160 = /* @__PURE__ */ createHasher(() => new RIPEMD160());

  // node_modules/@noble/hashes/esm/ripemd160.js
  var ripemd1602 = ripemd160;

  // node_modules/@noble/hashes/esm/sha3.js
  var _0n8 = BigInt(0);
  var _1n8 = BigInt(1);
  var _2n6 = BigInt(2);
  var _7n = BigInt(7);
  var _256n = BigInt(256);
  var _0x71n = BigInt(113);
  var SHA3_PI = [];
  var SHA3_ROTL = [];
  var _SHA3_IOTA = [];
  for (let round = 0, R = _1n8, x = 1, y = 0; round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n8;
    for (let j = 0; j < 7; j++) {
      R = (R << _1n8 ^ (R >> _7n) * _0x71n) % _256n;
      if (R & _2n6)
        t ^= _1n8 << (_1n8 << /* @__PURE__ */ BigInt(j)) - _1n8;
    }
    _SHA3_IOTA.push(t);
  }
  var IOTAS = split(_SHA3_IOTA, true);
  var SHA3_IOTA_H = IOTAS[0];
  var SHA3_IOTA_L = IOTAS[1];
  var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
  var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
  function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL[t];
        const Th = rotlH(curH, curL, shift);
        const Tl = rotlL(curH, curL, shift);
        const PI = SHA3_PI[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H[round];
      s[1] ^= SHA3_IOTA_L[round];
    }
    clean(B);
  }
  var Keccak = class _Keccak extends Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
      super();
      this.pos = 0;
      this.posOut = 0;
      this.finished = false;
      this.destroyed = false;
      this.enableXOF = false;
      this.blockLen = blockLen;
      this.suffix = suffix;
      this.outputLen = outputLen;
      this.enableXOF = enableXOF;
      this.rounds = rounds;
      anumber(outputLen);
      if (!(0 < blockLen && blockLen < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200);
      this.state32 = u32(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      swap32IfBE(this.state32);
      keccakP(this.state32, this.rounds);
      swap32IfBE(this.state32);
      this.posOut = 0;
      this.pos = 0;
    }
    update(data) {
      aexists(this);
      data = toBytes(data);
      abytes(data);
      const { blockLen, state } = this;
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        for (let i = 0; i < take; i++)
          state[this.pos++] ^= data[pos++];
        if (this.pos === blockLen)
          this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = true;
      const { state, suffix, pos, blockLen } = this;
      state[pos] ^= suffix;
      if ((suffix & 128) !== 0 && pos === blockLen - 1)
        this.keccak();
      state[blockLen - 1] ^= 128;
      this.keccak();
    }
    writeInto(out) {
      aexists(this, false);
      abytes(out);
      this.finish();
      const bufferOut = this.state;
      const { blockLen } = this;
      for (let pos = 0, len = out.length; pos < len; ) {
        if (this.posOut >= blockLen)
          this.keccak();
        const take = Math.min(blockLen - this.posOut, len - pos);
        out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
        this.posOut += take;
        pos += take;
      }
      return out;
    }
    xofInto(out) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(out);
    }
    xof(bytes) {
      anumber(bytes);
      return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
      aoutput(out, this);
      if (this.finished)
        throw new Error("digest() was already called");
      this.writeInto(out);
      this.destroy();
      return out;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true;
      clean(this.state);
    }
    _cloneInto(to) {
      const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
      to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
      to.state32.set(this.state32);
      to.pos = this.pos;
      to.posOut = this.posOut;
      to.finished = this.finished;
      to.rounds = rounds;
      to.suffix = suffix;
      to.outputLen = outputLen;
      to.enableXOF = enableXOF;
      to.destroyed = this.destroyed;
      return to;
    }
  };
  var gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
  var keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();

  // node_modules/did-jwt/lib/index.module.js
  var import_canonicalize = __toESM(require_canonicalize(), 1);

  // node_modules/@scure/base/lib/esm/index.js
  function isBytes4(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function isArrayOf(isString, arr) {
    if (!Array.isArray(arr))
      return false;
    if (arr.length === 0)
      return true;
    if (isString) {
      return arr.every((item) => typeof item === "string");
    } else {
      return arr.every((item) => Number.isSafeInteger(item));
    }
  }
  function afn(input) {
    if (typeof input !== "function")
      throw new Error("function expected");
    return true;
  }
  function astr(label, input) {
    if (typeof input !== "string")
      throw new Error(`${label}: string expected`);
    return true;
  }
  function anumber3(n) {
    if (!Number.isSafeInteger(n))
      throw new Error(`invalid integer: ${n}`);
  }
  function aArr(input) {
    if (!Array.isArray(input))
      throw new Error("array expected");
  }
  function astrArr(label, input) {
    if (!isArrayOf(true, input))
      throw new Error(`${label}: array of strings expected`);
  }
  function anumArr(label, input) {
    if (!isArrayOf(false, input))
      throw new Error(`${label}: array of numbers expected`);
  }
  // @__NO_SIDE_EFFECTS__
  function chain(...args) {
    const id = (a) => a;
    const wrap = (a, b) => (c) => a(b(c));
    const encode6 = args.map((x) => x.encode).reduceRight(wrap, id);
    const decode7 = args.map((x) => x.decode).reduce(wrap, id);
    return { encode: encode6, decode: decode7 };
  }
  // @__NO_SIDE_EFFECTS__
  function alphabet2(letters) {
    const lettersA = typeof letters === "string" ? letters.split("") : letters;
    const len = lettersA.length;
    astrArr("alphabet", lettersA);
    const indexes = new Map(lettersA.map((l, i) => [l, i]));
    return {
      encode: (digits) => {
        aArr(digits);
        return digits.map((i) => {
          if (!Number.isSafeInteger(i) || i < 0 || i >= len)
            throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
          return lettersA[i];
        });
      },
      decode: (input) => {
        aArr(input);
        return input.map((letter) => {
          astr("alphabet.decode", letter);
          const i = indexes.get(letter);
          if (i === void 0)
            throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
          return i;
        });
      }
    };
  }
  // @__NO_SIDE_EFFECTS__
  function join(separator = "") {
    astr("join", separator);
    return {
      encode: (from3) => {
        astrArr("join.decode", from3);
        return from3.join(separator);
      },
      decode: (to) => {
        astr("join.decode", to);
        return to.split(separator);
      }
    };
  }
  var gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  var radix2carry = /* @__NO_SIDE_EFFECTS__ */ (from3, to) => from3 + (to - gcd(from3, to));
  var powers = /* @__PURE__ */ (() => {
    let res = [];
    for (let i = 0; i < 40; i++)
      res.push(2 ** i);
    return res;
  })();
  function convertRadix2(data, from3, to, padding) {
    aArr(data);
    if (from3 <= 0 || from3 > 32)
      throw new Error(`convertRadix2: wrong from=${from3}`);
    if (to <= 0 || to > 32)
      throw new Error(`convertRadix2: wrong to=${to}`);
    if (/* @__PURE__ */ radix2carry(from3, to) > 32) {
      throw new Error(`convertRadix2: carry overflow from=${from3} to=${to} carryBits=${/* @__PURE__ */ radix2carry(from3, to)}`);
    }
    let carry = 0;
    let pos = 0;
    const max = powers[from3];
    const mask = powers[to] - 1;
    const res = [];
    for (const n of data) {
      anumber3(n);
      if (n >= max)
        throw new Error(`convertRadix2: invalid data word=${n} from=${from3}`);
      carry = carry << from3 | n;
      if (pos + from3 > 32)
        throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from3}`);
      pos += from3;
      for (; pos >= to; pos -= to)
        res.push((carry >> pos - to & mask) >>> 0);
      const pow3 = powers[pos];
      if (pow3 === void 0)
        throw new Error("invalid carry");
      carry &= pow3 - 1;
    }
    carry = carry << to - pos & mask;
    if (!padding && pos >= from3)
      throw new Error("Excess padding");
    if (!padding && carry > 0)
      throw new Error(`Non-zero padding: ${carry}`);
    if (padding && pos > 0)
      res.push(carry >>> 0);
    return res;
  }
  // @__NO_SIDE_EFFECTS__
  function radix2(bits, revPadding = false) {
    anumber3(bits);
    if (bits <= 0 || bits > 32)
      throw new Error("radix2: bits should be in (0..32]");
    if (/* @__PURE__ */ radix2carry(8, bits) > 32 || /* @__PURE__ */ radix2carry(bits, 8) > 32)
      throw new Error("radix2: carry overflow");
    return {
      encode: (bytes) => {
        if (!isBytes4(bytes))
          throw new Error("radix2.encode input should be Uint8Array");
        return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
      },
      decode: (digits) => {
        anumArr("radix2.decode", digits);
        return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
      }
    };
  }
  function unsafeWrapper(fn) {
    afn(fn);
    return function(...args) {
      try {
        return fn.apply(null, args);
      } catch (e) {
      }
    };
  }
  var BECH_ALPHABET = /* @__PURE__ */ chain(/* @__PURE__ */ alphabet2("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), /* @__PURE__ */ join(""));
  var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
  function bech32Polymod(pre) {
    const b = pre >> 25;
    let chk = (pre & 33554431) << 5;
    for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
      if ((b >> i & 1) === 1)
        chk ^= POLYMOD_GENERATORS[i];
    }
    return chk;
  }
  function bechChecksum(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for (let i = 0; i < len; i++) {
      const c = prefix.charCodeAt(i);
      if (c < 33 || c > 126)
        throw new Error(`Invalid prefix (${prefix})`);
      chk = bech32Polymod(chk) ^ c >> 5;
    }
    chk = bech32Polymod(chk);
    for (let i = 0; i < len; i++)
      chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
    for (let v of words)
      chk = bech32Polymod(chk) ^ v;
    for (let i = 0; i < 6; i++)
      chk = bech32Polymod(chk);
    chk ^= encodingConst;
    return BECH_ALPHABET.encode(convertRadix2([chk % powers[30]], 30, 5, false));
  }
  // @__NO_SIDE_EFFECTS__
  function genBech32(encoding) {
    const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
    const _words = /* @__PURE__ */ radix2(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = unsafeWrapper(fromWords);
    function encode6(prefix, words, limit = 90) {
      astr("bech32.encode prefix", prefix);
      if (isBytes4(words))
        words = Array.from(words);
      anumArr("bech32.encode", words);
      const plen = prefix.length;
      if (plen === 0)
        throw new TypeError(`Invalid prefix length ${plen}`);
      const actualLength = plen + 7 + words.length;
      if (limit !== false && actualLength > limit)
        throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
      const lowered = prefix.toLowerCase();
      const sum = bechChecksum(lowered, words, ENCODING_CONST);
      return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
    }
    function decode7(str, limit = 90) {
      astr("bech32.decode input", str);
      const slen = str.length;
      if (slen < 8 || limit !== false && slen > limit)
        throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
      const lowered = str.toLowerCase();
      if (str !== lowered && str !== str.toUpperCase())
        throw new Error(`String must be lowercase or uppercase`);
      const sepIndex = lowered.lastIndexOf("1");
      if (sepIndex === 0 || sepIndex === -1)
        throw new Error(`Letter "1" must be present between prefix and data only`);
      const prefix = lowered.slice(0, sepIndex);
      const data = lowered.slice(sepIndex + 1);
      if (data.length < 6)
        throw new Error("Data must be at least 6 characters long");
      const words = BECH_ALPHABET.decode(data).slice(0, -6);
      const sum = bechChecksum(prefix, words, ENCODING_CONST);
      if (!data.endsWith(sum))
        throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
      return { prefix, words };
    }
    const decodeUnsafe = unsafeWrapper(decode7);
    function decodeToBytes(str) {
      const { prefix, words } = decode7(str, false);
      return { prefix, words, bytes: fromWords(words) };
    }
    function encodeFromBytes(prefix, bytes) {
      return encode6(prefix, toWords(bytes));
    }
    return {
      encode: encode6,
      decode: decode7,
      encodeFromBytes,
      decodeToBytes,
      decodeUnsafe,
      fromWords,
      fromWordsUnsafe,
      toWords
    };
  }
  var bech32 = /* @__PURE__ */ genBech32("bech32");

  // node_modules/did-jwt/lib/index.module.js
  var u8a = {
    toString: toString2,
    fromString: fromString2,
    concat
  };
  function bytesToBase64url(b) {
    return u8a.toString(b, "base64url");
  }
  function base64ToBytes(s) {
    const inputBase64Url = s.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    return u8a.fromString(inputBase64Url, "base64url");
  }
  function base58ToBytes(s) {
    return u8a.fromString(s, "base58btc");
  }
  function bytesToBase58(b) {
    return u8a.toString(b, "base58btc");
  }
  var VM_TO_KEY_TYPE = {
    Secp256k1SignatureVerificationKey2018: "Secp256k1",
    Secp256k1VerificationKey2018: "Secp256k1",
    EcdsaSecp256k1VerificationKey2019: "Secp256k1",
    EcdsaPublicKeySecp256k1: "Secp256k1",
    EcdsaSecp256k1RecoveryMethod2020: "Secp256k1",
    EcdsaSecp256r1VerificationKey2019: "P-256",
    Ed25519VerificationKey2018: "Ed25519",
    Ed25519VerificationKey2020: "Ed25519",
    ED25519SignatureVerification: "Ed25519",
    X25519KeyAgreementKey2019: "X25519",
    X25519KeyAgreementKey2020: "X25519",
    ConditionalProof2022: void 0,
    JsonWebKey2020: void 0,
    // key type must be specified in the JWK
    Multikey: void 0
    // key type must be extracted from the multicodec
  };
  var supportedCodecs = {
    "ed25519-pub": 237,
    "x25519-pub": 236,
    "secp256k1-pub": 231,
    "bls12_381-g1-pub": 234,
    "bls12_381-g2-pub": 235,
    "p256-pub": 4608
  };
  var CODEC_TO_KEY_TYPE = {
    "bls12_381-g1-pub": "Bls12381G1",
    "bls12_381-g2-pub": "Bls12381G2",
    "ed25519-pub": "Ed25519",
    "p256-pub": "P-256",
    "secp256k1-pub": "Secp256k1",
    "x25519-pub": "X25519"
  };
  function extractPublicKeyBytes(pk) {
    if (pk.publicKeyBase58) {
      return {
        keyBytes: base58ToBytes(pk.publicKeyBase58),
        keyType: VM_TO_KEY_TYPE[pk.type]
      };
    } else if (pk.publicKeyBase64) {
      return {
        keyBytes: base64ToBytes(pk.publicKeyBase64),
        keyType: VM_TO_KEY_TYPE[pk.type]
      };
    } else if (pk.publicKeyHex) {
      return {
        keyBytes: hexToBytes2(pk.publicKeyHex),
        keyType: VM_TO_KEY_TYPE[pk.type]
      };
    } else if (pk.publicKeyJwk && pk.publicKeyJwk.crv === "secp256k1" && pk.publicKeyJwk.x && pk.publicKeyJwk.y) {
      return {
        keyBytes: secp256k1.ProjectivePoint.fromAffine({
          x: bytesToBigInt(base64ToBytes(pk.publicKeyJwk.x)),
          y: bytesToBigInt(base64ToBytes(pk.publicKeyJwk.y))
        }).toRawBytes(false),
        keyType: "Secp256k1"
      };
    } else if (pk.publicKeyJwk && pk.publicKeyJwk.crv === "P-256" && pk.publicKeyJwk.x && pk.publicKeyJwk.y) {
      return {
        keyBytes: p256.ProjectivePoint.fromAffine({
          x: bytesToBigInt(base64ToBytes(pk.publicKeyJwk.x)),
          y: bytesToBigInt(base64ToBytes(pk.publicKeyJwk.y))
        }).toRawBytes(false),
        keyType: "P-256"
      };
    } else if (pk.publicKeyJwk && pk.publicKeyJwk.kty === "OKP" && ["Ed25519", "X25519"].includes(pk.publicKeyJwk.crv ?? "") && pk.publicKeyJwk.x) {
      return {
        keyBytes: base64ToBytes(pk.publicKeyJwk.x),
        keyType: pk.publicKeyJwk.crv
      };
    } else if (pk.publicKeyMultibase) {
      const {
        keyBytes,
        keyType
      } = multibaseToBytes(pk.publicKeyMultibase);
      return {
        keyBytes,
        keyType: keyType ?? VM_TO_KEY_TYPE[pk.type]
      };
    }
    return {
      keyBytes: new Uint8Array()
    };
  }
  function multibaseToBytes(s) {
    const bytes = (0, import_multibase.decode)(s);
    if ([32, 33, 48, 64, 65, 96].includes(bytes.length)) {
      return {
        keyBytes: bytes
      };
    }
    try {
      const [codec, length2] = varint_exports.decode(bytes);
      const possibleCodec = Object.entries(supportedCodecs).filter(([, code2]) => code2 === codec)?.[0][0] ?? "";
      return {
        keyBytes: bytes.slice(length2),
        keyType: CODEC_TO_KEY_TYPE[possibleCodec]
      };
    } catch (e) {
      return {
        keyBytes: bytes
      };
    }
  }
  function hexToBytes2(s, minLength) {
    let input = s.startsWith("0x") ? s.substring(2) : s;
    if (input.length % 2 !== 0) {
      input = `0${input}`;
    }
    if (minLength) {
      const paddedLength = Math.max(input.length, minLength * 2);
      input = input.padStart(paddedLength, "00");
    }
    return u8a.fromString(input.toLowerCase(), "base16");
  }
  function encodeBase64url(s) {
    return bytesToBase64url(u8a.fromString(s));
  }
  function bytesToHex2(b) {
    return u8a.toString(b, "base16");
  }
  function bytesToBigInt(b) {
    return BigInt(`0x` + u8a.toString(b, "base16"));
  }
  function stringToBytes(s) {
    return u8a.fromString(s, "utf-8");
  }
  function toJose({
    r,
    s,
    recoveryParam
  }, recoverable) {
    const jose = new Uint8Array(recoverable ? 65 : 64);
    jose.set(u8a.fromString(r, "base16"), 0);
    jose.set(u8a.fromString(s, "base16"), 32);
    if (recoverable) {
      if (typeof recoveryParam === "undefined") {
        throw new Error("Signer did not return a recoveryParam");
      }
      jose[64] = recoveryParam;
    }
    return bytesToBase64url(jose);
  }
  function fromJose(signature) {
    const signatureBytes = base64ToBytes(signature);
    if (signatureBytes.length < 64 || signatureBytes.length > 65) {
      throw new TypeError(`Wrong size for signature. Expected 64 or 65 bytes, but got ${signatureBytes.length}`);
    }
    const r = bytesToHex2(signatureBytes.slice(0, 32));
    const s = bytesToHex2(signatureBytes.slice(32, 64));
    const recoveryParam = signatureBytes.length === 65 ? signatureBytes[64] : void 0;
    return {
      r,
      s,
      recoveryParam
    };
  }
  function leftpad(data, size = 64) {
    if (data.length === size) return data;
    return "0".repeat(size - data.length) + data;
  }
  function sha2565(payload) {
    const data = typeof payload === "string" ? fromString2(payload) : payload;
    return sha2562(data);
  }
  var keccak = keccak_256;
  function toEthereumAddress(hexPublicKey) {
    const hashInput = fromString2(hexPublicKey.slice(2), "base16");
    return `0x${toString2(keccak(hashInput).slice(-20), "base16")}`;
  }
  function ES256KSigner(privateKey, recoverable = false) {
    const privateKeyBytes = privateKey;
    if (privateKeyBytes.length !== 32) {
      throw new Error(`bad_key: Invalid private key format. Expecting 32 bytes, but got ${privateKeyBytes.length}`);
    }
    return function(data) {
      try {
        const signature = secp256k1.sign(sha2565(data), privateKeyBytes);
        return Promise.resolve(toJose({
          r: leftpad(signature.r.toString(16)),
          s: leftpad(signature.s.toString(16)),
          recoveryParam: signature.recovery
        }, recoverable));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  function instanceOfEcdsaSignature(object) {
    return typeof object === "object" && "r" in object && "s" in object;
  }
  function ES256SignerAlg() {
    return function sign(payload, signer) {
      try {
        return Promise.resolve(signer(payload)).then(function(signature) {
          if (instanceOfEcdsaSignature(signature)) {
            return toJose(signature);
          } else {
            return signature;
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  function ES256KSignerAlg(recoverable) {
    return function sign(payload, signer) {
      try {
        return Promise.resolve(signer(payload)).then(function(signature) {
          if (instanceOfEcdsaSignature(signature)) {
            return toJose(signature, recoverable);
          } else {
            if (recoverable && typeof fromJose(signature).recoveryParam === "undefined") {
              throw new Error(`not_supported: ES256K-R not supported when signer doesn't provide a recovery param`);
            }
            return signature;
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  function Ed25519SignerAlg() {
    return function sign(payload, signer) {
      try {
        return Promise.resolve(signer(payload)).then(function(signature) {
          if (!instanceOfEcdsaSignature(signature)) {
            return signature;
          } else {
            throw new Error("invalid_config: expected a signer function that returns a string instead of signature object");
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  var algorithms$1 = {
    ES256: ES256SignerAlg(),
    ES256K: ES256KSignerAlg(),
    // This is a non-standard algorithm but retained for backwards compatibility
    // see https://github.com/decentralized-identity/did-jwt/issues/146
    "ES256K-R": ES256KSignerAlg(true),
    // This is actually incorrect but retained for backwards compatibility
    // see https://github.com/decentralized-identity/did-jwt/issues/130
    Ed25519: Ed25519SignerAlg(),
    EdDSA: Ed25519SignerAlg()
  };
  function SignerAlg(alg) {
    const impl = algorithms$1[alg];
    if (!impl) throw new Error(`not_supported: Unsupported algorithm ${alg}`);
    return impl;
  }
  function publicKeyToAddress$1(publicKey, otherAddress) {
    const version2 = bytesToHex2(base58ToBytes(otherAddress).slice(0, 1));
    const publicKeyBuffer = hexToBytes2(publicKey);
    const publicKeyHash = ripemd1602(sha2565(publicKeyBuffer));
    const step1 = version2 + bytesToHex2(publicKeyHash);
    const step2 = sha2565(hexToBytes2(step1));
    const step3 = sha2565(step2);
    const checksum = bytesToHex2(step3).substring(0, 8);
    const step4 = step1 + checksum;
    return bytesToBase58(hexToBytes2(step4));
  }
  function publicKeyToAddress(publicKey, prefix) {
    const publicKeyBuffer = secp256k1.ProjectivePoint.fromHex(publicKey).toRawBytes();
    const hash = ripemd1602(sha2565(publicKeyBuffer));
    const words = bech32.toWords(hash);
    return bech32.encode(prefix, words).replace(prefix, "");
  }
  function verifyBlockchainAccountId(publicKey, blockchainAccountId) {
    if (blockchainAccountId) {
      const chain2 = blockchainAccountId.split(":");
      switch (chain2[0]) {
        case "bip122":
          chain2[chain2.length - 1] = publicKeyToAddress$1(publicKey, chain2[chain2.length - 1]);
          break;
        case "cosmos":
          chain2[chain2.length - 1] = publicKeyToAddress(publicKey, chain2[1]);
          break;
        case "eip155":
          chain2[chain2.length - 1] = toEthereumAddress(publicKey);
          break;
        default:
          return false;
      }
      return chain2.join(":").toLowerCase() === blockchainAccountId.toLowerCase();
    }
    return false;
  }
  function toSignatureObject(signature, recoverable = false) {
    const rawSig = base64ToBytes(signature);
    if (rawSig.length !== (recoverable ? 65 : 64)) {
      throw new Error("wrong signature length");
    }
    const r = bytesToHex2(rawSig.slice(0, 32));
    const s = bytesToHex2(rawSig.slice(32, 64));
    const sigObj = {
      r,
      s
    };
    if (recoverable) {
      sigObj.recoveryParam = rawSig[64];
    }
    return sigObj;
  }
  function toSignatureObject2(signature, recoverable = false) {
    const bytes = base64ToBytes(signature);
    if (bytes.length !== (recoverable ? 65 : 64)) {
      throw new Error("wrong signature length");
    }
    return {
      compact: bytes.slice(0, 64),
      recovery: bytes[64]
    };
  }
  function verifyES256(data, signature, authenticators) {
    const hash = sha2565(data);
    const sig = p256.Signature.fromCompact(toSignatureObject2(signature).compact);
    const fullPublicKeys = authenticators.filter((a) => !a.ethereumAddress && !a.blockchainAccountId);
    const signer = fullPublicKeys.find((pk) => {
      try {
        const {
          keyBytes
        } = extractPublicKeyBytes(pk);
        return p256.verify(sig, hash, keyBytes);
      } catch (err) {
        return false;
      }
    });
    if (!signer) throw new Error("invalid_signature: Signature invalid for JWT");
    return signer;
  }
  function verifyES256K(data, signature, authenticators) {
    const hash = sha2565(data);
    const signatureNormalized = secp256k1.Signature.fromCompact(base64ToBytes(signature)).normalizeS();
    const fullPublicKeys = authenticators.filter((a) => {
      return !a.ethereumAddress && !a.blockchainAccountId;
    });
    const blockchainAddressKeys = authenticators.filter((a) => {
      return a.ethereumAddress || a.blockchainAccountId;
    });
    let signer = fullPublicKeys.find((pk) => {
      try {
        const {
          keyBytes
        } = extractPublicKeyBytes(pk);
        return secp256k1.verify(signatureNormalized, hash, keyBytes);
      } catch (err) {
        return false;
      }
    });
    if (!signer && blockchainAddressKeys.length > 0) {
      signer = verifyRecoverableES256K(data, signature, blockchainAddressKeys);
    }
    if (!signer) throw new Error("invalid_signature: Signature invalid for JWT");
    return signer;
  }
  function verifyRecoverableES256K(data, signature, authenticators) {
    const signatures = [];
    if (signature.length > 86) {
      signatures.push(toSignatureObject2(signature, true));
    } else {
      const so = toSignatureObject2(signature, false);
      signatures.push({
        ...so,
        recovery: 0
      });
      signatures.push({
        ...so,
        recovery: 1
      });
    }
    const hash = sha2565(data);
    const checkSignatureAgainstSigner = (sigObj) => {
      const signature2 = secp256k1.Signature.fromCompact(sigObj.compact).addRecoveryBit(sigObj.recovery || 0);
      const recoveredPublicKey = signature2.recoverPublicKey(hash);
      const recoveredAddress = toEthereumAddress(recoveredPublicKey.toHex(false)).toLowerCase();
      const recoveredPublicKeyHex = recoveredPublicKey.toHex(false);
      const recoveredCompressedPublicKeyHex = recoveredPublicKey.toHex(true);
      return authenticators.find((a) => {
        const {
          keyBytes
        } = extractPublicKeyBytes(a);
        const keyHex = bytesToHex2(keyBytes);
        return keyHex === recoveredPublicKeyHex || keyHex === recoveredCompressedPublicKeyHex || a.ethereumAddress?.toLowerCase() === recoveredAddress || a.blockchainAccountId?.split("@eip155")?.[0].toLowerCase() === recoveredAddress || // CAIP-2
        verifyBlockchainAccountId(recoveredPublicKeyHex, a.blockchainAccountId);
      });
    };
    for (const signature2 of signatures) {
      const verificationMethod = checkSignatureAgainstSigner(signature2);
      if (verificationMethod) return verificationMethod;
    }
    throw new Error("invalid_signature: Signature invalid for JWT");
  }
  function verifyEd25519(data, signature, authenticators) {
    const clear = stringToBytes(data);
    const signatureBytes = base64ToBytes(signature);
    const signer = authenticators.find((a) => {
      const {
        keyBytes,
        keyType
      } = extractPublicKeyBytes(a);
      if (keyType === "Ed25519") {
        return ed25519.verify(signatureBytes, clear, keyBytes);
      } else {
        return false;
      }
    });
    if (!signer) throw new Error("invalid_signature: Signature invalid for JWT");
    return signer;
  }
  var algorithms = {
    ES256: verifyES256,
    ES256K: verifyES256K,
    // This is a non-standard algorithm but retained for backwards compatibility
    // see https://github.com/decentralized-identity/did-jwt/issues/146
    "ES256K-R": verifyRecoverableES256K,
    // This is actually incorrect but retained for backwards compatibility
    // see https://github.com/decentralized-identity/did-jwt/issues/130
    Ed25519: verifyEd25519,
    EdDSA: verifyEd25519
  };
  function VerifierAlgorithm(alg) {
    const impl = algorithms[alg];
    if (!impl) throw new Error(`not_supported: Unsupported algorithm ${alg}`);
    return impl;
  }
  VerifierAlgorithm.toSignatureObject = toSignatureObject;
  var _iteratorSymbol$1 = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
  var createJWT = function(payload, {
    issuer,
    signer,
    alg,
    expiresIn,
    canonicalize
  }, header = {}) {
    try {
      if (!signer) throw new Error("missing_signer: No Signer functionality has been configured");
      if (!issuer) throw new Error("missing_issuer: No issuing DID has been configured");
      if (!header.typ) header.typ = "JWT";
      if (!header.alg) header.alg = alg;
      const timestamps = {
        iat: Math.floor(Date.now() / 1e3),
        exp: void 0
      };
      if (expiresIn) {
        if (typeof expiresIn === "number") {
          timestamps.exp = (payload.nbf || timestamps.iat) + Math.floor(expiresIn);
        } else {
          throw new Error("invalid_argument: JWT expiresIn is not a number");
        }
      }
      const fullPayload = {
        ...timestamps,
        ...payload,
        iss: issuer
      };
      return createJWS(fullPayload, signer, header, {
        canonicalize
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var createJWS = function(payload, signer, header = {}, options = {}) {
    try {
      if (!header.alg) header.alg = defaultAlg;
      const encodedPayload = typeof payload === "string" ? payload : encodeSection(payload, options.canonicalize);
      const signingInput = [encodeSection(header, options.canonicalize), encodedPayload].join(".");
      const jwtSigner = SignerAlg(header.alg);
      return Promise.resolve(jwtSigner(signingInput, signer)).then(function(signature) {
        return [signingInput, signature].join(".");
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var defaultAlg = "ES256K";
  function encodeSection(data, shouldCanonicalize = false) {
    if (shouldCanonicalize) {
      return encodeBase64url((0, import_canonicalize.default)(data));
    } else {
      return encodeBase64url(JSON.stringify(data));
    }
  }
  var _iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";

  // index.js
  window.Buffer = import_buffer.Buffer;
  var NILDB = {
    orgCredentials: {
      secretKey: "0ac97ffdd83769c6c5032cb202d0957800e0ef151f015b0aaec52e2d864d4fc6",
      orgDid: "did:nil:testnet:nillion1v596szek38l22jm9et4r4j7txu3v7eff3uffue"
    },
    nodes: [
      {
        url: "https://nildb-nx8v.nillion.network",
        did: "did:nil:testnet:nillion1qfrl8nje3nvwh6cryj63mz2y6gsdptvn07nx8v"
      },
      {
        url: "https://nildb-p3mx.nillion.network",
        did: "did:nil:testnet:nillion1uak7fgsp69kzfhdd6lfqv69fnzh3lprg2mp3mx"
      },
      {
        url: "https://nildb-rugk.nillion.network",
        did: "did:nil:testnet:nillion1kfremrp2mryxrynx66etjl8s7wazxc3rssrugk"
      }
    ]
  };
  var SCHEMA = "5df27a74-9478-4fe2-b80d-594781f0a5fc";
  var SecretVaultWrapper = class {
    constructor(nodes, credentials, schemaId = null, operation = "store", tokenExpirySeconds = 3600) {
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
          jwt: await this.generateNodeToken(node.did)
        }))
      );
      this.nodesJwt = nodeConfigs;
    }
    setSchemaId(schemaId, operation = this.operation) {
      this.schemaId = schemaId;
      this.operation = operation;
    }
    async generateNodeToken(nodeDid) {
      const signer = ES256KSigner(import_buffer.Buffer.from(this.credentials.secretKey, "hex"));
      const payload = {
        iss: this.credentials.orgDid,
        aud: nodeDid,
        exp: Math.floor(Date.now() / 1e3) + this.tokenExpirySeconds
      };
      return await createJWT(payload, {
        issuer: this.credentials.orgDid,
        signer
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
    async makeRequest(nodeUrl, endpoint, token, payload, method = "POST") {
      try {
        const response = await fetch(`${nodeUrl}/api/v1/${endpoint}`, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: method === "GET" ? null : JSON.stringify(payload)
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${text}`
          );
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          return {
            status: response.status,
            ...data
          };
        }
        return {
          status: response.status
        };
      } catch (error) {
        console.error(
          `\u274C Failed to ${method} ${endpoint} from ${nodeUrl}:`,
          error.message
        );
        const statusMatch = error.message.match(/status: (\d+)/);
        const bodyMatch = error.message.match(/body: ({.*})/);
        const errorJson = {
          status: statusMatch ? parseInt(statusMatch[1]) : null,
          error: bodyMatch ? JSON.parse(bodyMatch[1]) : { errors: [error] }
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
          "data/flush",
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
            "schemas",
            jwt,
            {},
            "GET"
          );
          results.push({ ...result, node });
        } catch (error) {
          console.error(
            `\u274C Failed to get schemas from ${node.url}:`,
            error.message
          );
          results.push({ error, node });
        }
      }
      return results;
    }
    async createSchema(schema, schemaName, schemaId = null) {
      if (!schemaId) {
        schemaId = v4_default();
      }
      const schemaPayload = {
        _id: schemaId,
        name: schemaName,
        schema
      };
      const results = [];
      for (const node of this.nodes) {
        const jwt = await this.generateNodeToken(node.did);
        try {
          const result = await this.makeRequest(
            node.url,
            "schemas",
            jwt,
            schemaPayload
          );
          results.push({
            ...result,
            node,
            schemaId,
            name: schemaName
          });
        } catch (error) {
          console.error(
            `\u274C Error while creating schema on ${node.url}:`,
            error.message
          );
          results.push({ error, node });
        }
      }
      return results;
    }
    async writeToNodes(data) {
      const idData = data.map((record) => {
        if (!record._id) {
          return { ...record, _id: v4_default() };
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
            data: idData
          };
          const result = await this.makeRequest(
            node.url,
            "data/create",
            jwt,
            payload
          );
          results.push({
            ...result,
            node,
            schemaId: this.schemaId
          });
        } catch (error) {
          console.error(`\u274C Failed to write to ${node.url}:`, error.message);
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
            "data/read",
            jwt,
            payload
          );
          results.push({ ...result, node });
        } catch (error) {
          console.error(`\u274C Failed to read from ${node.url}:`, error.message);
          results.push({ error, node });
        }
      }
      const recordGroups = results.reduce((acc, nodeResult) => {
        nodeResult.data.forEach((record) => {
          const existingGroup = acc.find(
            (group) => group.shares.some((share) => share._id === record._id)
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
            "data/delete",
            jwt,
            payload
          );
          results.push({ ...result, node });
        } catch (error) {
          console.error(`\u274C Failed to delete from ${node.url}:`, error.message);
          results.push({ error, node });
        }
      }
      return results;
    }
  };
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
    document.putRandom = putRandom;
    document.getRandom = getRandom;
  }
  main();
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/ciphers/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/montgomery.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/p256.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
