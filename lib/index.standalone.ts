/*
 * Expose the function on the window object
 */
import jwtDecode from "./index";

//use amd or just through the window object.
const global = window as any;
if (global) {
    if (typeof global.define == "function" && global.define.amd) {
        global.define("jwt_decode", function() {
            return jwtDecode;
        });
    } else if (global) {
        global.jwt_decode = jwtDecode;
    }
}
