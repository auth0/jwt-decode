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

    var part = token.split(".")[pos];
    if (typeof part !== "string") {
        throw new InvalidTokenError("Invalid token specified: missing part #" + (pos + 1));
    }

    try {
        var decoded = base64_url_decode(part);
    } catch (e) {
        throw new InvalidTokenError("Invalid token specified: invalid base64 for part #" + (pos + 1) + ' (' + e.message + ')');
    }

    try {
        var parsed = JSON.parse(decoded);
    } catch (e) {
        throw new InvalidTokenError("Invalid token specified: invalid json for part #" + (pos + 1) + ' (' + e.message + ')');
    }

    
    if(options.validate && options.header){
        var validationError = validateHeader(parsed);
    } else if(options.validate && !options.header){
        var validationError = validatePayload(parsed);
    } else {
        var validationError = undefined;
    }

    if(validationError){
        throw new InvalidTokenError("Invalid token specified: failed to validate, error:" + validationError);
    }

    return parsed;
}

function validateHeader(obj){
    if(typeof obj !== "object"){
        return "header expected to be an object"
    }

    // select all fields that are not valid
    var invalidFields = ["typ", "alg", "kid"].filter(function(name){
        return !isNullOrString(obj, name);
    });
    if(invalidFields.length){
        return "fields " + invalidFields.join(", ") + " expected to be string or undefined"
    }
}

function validatePayload(obj){
    if(typeof obj !== "object"){
        throw new InvalidTokenError("payload expected to be an object");
    }

    // select all fields that are not valid
    var invalidStringFields = ["iss", "sub", "jti"].filter(function(name){
        return !isNullOrString(obj, name);
    });
    var invalidNumberFields = ["exp", "nbf", "iat"].filter(function(name){
        return !isNullOrNumber(obj, name);
    });
    var invalidArrayOfStringFields = ["aud"].filter(function(name){
        return !isNullOrString(obj, name) && !isNullOrArrayOfString(obj, name);
    });

    var invalidFields = [...invalidStringFields, ...invalidNumberFields,...invalidArrayOfStringFields ]
    if(invalidFields.length){
        throw new InvalidTokenError("fields " + invalidFields.join(", ") + " expected to be string or undefined");
    }
}

function isNullOrString(obj, name){
    var value = obj[name];
    return typeof value === "undefined" ||  typeof value === "string"
}

function isNullOrArrayOfString(obj, name){
    var value = obj[name];
    return Array.isArray(value) && value.every(function(item){ return typeof item === "string" })
}

function isNullOrNumber(obj, name){
    var value = obj[name];
    return typeof value === "undefined" ||  typeof value === "number"
}

