import atob from "./atob";

function b64DecodeUnicode(str) {
    var accumulator = '';
    var bytes = atob(str);
    for (var i = 0; i < bytes.length; i++) {
        var hex = bytes.charCodeAt(i).toString(16);
        accumulator += (hex.length < 2 ? '%0' : '%') + hex;
    }
   return decodeURIComponent(accumulator.toUpperCase());
 }

export default function(str) {
    var output = str.replace(/-/g, "+").replace(/_/g, "/");
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
    } catch (err) {
        return atob(output);
    }
}