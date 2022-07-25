"use strict";

import base64_url_decode from "./base64_url_decode";

export function InvalidTokenError(message) {
    this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = "InvalidTokenError";

export default function(token, options) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified: must be a string");
    }

    options = options || {};
    var pos = options.header === true ? 0 : 1;

    var part = token.split(".")[pos]
    if (typeof part !== "string") {
        throw new InvalidTokenError("Invalid token specified: missing part #" + (pos + 1));
    }

    try {
        var decoded = base64_url_decode(part)
    } catch (e) {
        throw new InvalidTokenError("Invalid token specified: invalid base64 for part #" + (pos + 1) + ' (' + e.message + ')');
    }

    try {
        return JSON.parse(decoded);
    } catch (e) {
        throw new InvalidTokenError("Invalid token specified: invalid json for part #" + (pos + 1) + ' (' + e.message + ')');
    }
}