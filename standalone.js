/*
 *
 * This is used to build the bundle with browserify.
 *
 * The bundle is used by people who doesn't use browserify.
 * Those who use browserify will install with npm and require the module,
 * the package.json file points to index.js.
 */
var jwt_decode = require('./lib/index');

//use amd or just throught to window object.
if (typeof define === 'function' && define.amd) {
  define('jwt_decode', function () { return jwt_decode; });
} else if (global.window) {
  global.window.jwt_decode = jwt_decode;
}
