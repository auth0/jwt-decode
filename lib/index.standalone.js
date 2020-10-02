/*
 * Expose the function on the window object
 */
import jwtDecode from "./index";

//use amd or just through to window object.
if (window) {
    if (typeof window.define == "function" && window.define.amd) {
        window.define("jwt_decode", function() {
            return jwtDecode;
        });
    } else if (window) {
        window.jwt_decode = jwtDecode;
    }
}
