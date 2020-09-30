"use strict";

import base64_url_decode from "./base64_url_decode";

export function InvalidTokenError(message) {
    this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = "InvalidTokenError";

export default function(token, options) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified");
    }

    options = options || {};
    var pos = options.header === true ? 0 : 1;
    try {
        return JSON.parse(base64_url_decode(token.split(".")[pos]));
    } catch (e) {
        throw new InvalidTokenError("Invalid token specified: " + e.message);
    }
}