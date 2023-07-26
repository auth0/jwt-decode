(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jwt_decode = factory());
})(this, (function () { 'use strict';

    const global = (typeof globalThis !== "undefined" && globalThis) || window;
    var atob = global.atob.bind(global);

    function b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
            let code = p.charCodeAt(0).toString(16).toUpperCase();
            if (code.length < 2) {
                code = "0" + code;
            }
            return "%" + code;
        }));
    }
    function base64_url_decode (str) {
        let output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += "==";
                break;
            case 3:
                output += "=";
                break;
            default:
                throw new Error("base64 string is not of the correct length");
        }
        try {
            return b64DecodeUnicode(output);
        }
        catch (err) {
            return atob(output);
        }
    }

    class InvalidTokenError extends Error {
        constructor(message) {
            super(message);
        }
    }
    InvalidTokenError.prototype.name = "InvalidTokenError";
    function jwtDecode(token, options = { header: false }) {
        if (typeof token !== "string") {
            throw new InvalidTokenError("Invalid token specified: must be a string");
        }
        options = options || {};
        const pos = options.header === true ? 0 : 1;
        const part = token.split(".")[pos];
        if (typeof part !== "string") {
            throw new InvalidTokenError("Invalid token specified: missing part #" + (pos + 1));
        }
        let decoded;
        try {
            decoded = base64_url_decode(part);
        }
        catch (e) {
            throw new InvalidTokenError("Invalid token specified: invalid base64 for part #" +
                (pos + 1) +
                " (" +
                e.message +
                ")");
        }
        try {
            return JSON.parse(decoded);
        }
        catch (e) {
            throw new InvalidTokenError("Invalid token specified: invalid json for part #" +
                (pos + 1) +
                " (" +
                e.message +
                ")");
        }
    }

    return jwtDecode;

}));
//# sourceMappingURL=jwt-decode.js.map
