;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

},{}],2:[function(require,module,exports){
var atob = require('./atob');

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
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
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};

},{"./atob":1}],3:[function(require,module,exports){
'use strict';

var base64_url_decode = require('./base64_url_decode');

module.exports = function (token) {
  if (typeof token !== 'string') {
    throw new Error('Invalid token specified');
  }
  
  return JSON.parse(base64_url_decode(token.split('.')[1]));
};

},{"./base64_url_decode":2}],4:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/*
 *
 * This is used to build the bundle with browserify.
 *
 * The bundle is used by people who doesn't use browserify.
 * Those who use browserify will install with npm and require the module,
 * the package.json file points to index.js.
 */
var jwt_decode = require('./lib/index');

//use amd or just throught to window object.
if (typeof global.window.define == 'function' && global.window.define.amd) {
  global.window.define('jwt_decode', function () { return jwt_decode; });
} else if (global.window) {
  global.window.jwt_decode = jwt_decode;
}
},{"./lib/index":3}]},{},[4])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb3NlL1Byb2plY3RzL29zcy9qd3QtZGVjb2RlL2xpYi9hdG9iLmpzIiwiL1VzZXJzL2pvc2UvUHJvamVjdHMvb3NzL2p3dC1kZWNvZGUvbGliL2Jhc2U2NF91cmxfZGVjb2RlLmpzIiwiL1VzZXJzL2pvc2UvUHJvamVjdHMvb3NzL2p3dC1kZWNvZGUvbGliL2luZGV4LmpzIiwiL1VzZXJzL2pvc2UvUHJvamVjdHMvb3NzL2p3dC1kZWNvZGUvc3RhbmRhbG9uZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBjb2RlIHdhcyBleHRyYWN0ZWQgZnJvbTpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuICovXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcbkludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBwb2x5ZmlsbCAoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCkucmVwbGFjZSgvPSskLywgJycpO1xuICBpZiAoc3RyLmxlbmd0aCAlIDQgPT0gMSkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IoXCInYXRvYicgZmFpbGVkOiBUaGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLlwiKTtcbiAgfVxuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyc1xuICAgIHZhciBiYyA9IDAsIGJzLCBidWZmZXIsIGlkeCA9IDAsIG91dHB1dCA9ICcnO1xuICAgIC8vIGdldCBuZXh0IGNoYXJhY3RlclxuICAgIGJ1ZmZlciA9IHN0ci5jaGFyQXQoaWR4KyspO1xuICAgIC8vIGNoYXJhY3RlciBmb3VuZCBpbiB0YWJsZT8gaW5pdGlhbGl6ZSBiaXQgc3RvcmFnZSBhbmQgYWRkIGl0cyBhc2NpaSB2YWx1ZTtcbiAgICB+YnVmZmVyICYmIChicyA9IGJjICUgNCA/IGJzICogNjQgKyBidWZmZXIgOiBidWZmZXIsXG4gICAgICAvLyBhbmQgaWYgbm90IGZpcnN0IG9mIGVhY2ggNCBjaGFyYWN0ZXJzLFxuICAgICAgLy8gY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIG9uZSBhc2NpaSBjaGFyYWN0ZXJcbiAgICAgIGJjKysgJSA0KSA/IG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSAmIGJzID4+ICgtMiAqIGJjICYgNikpIDogMFxuICApIHtcbiAgICAvLyB0cnkgdG8gZmluZCBjaGFyYWN0ZXIgaW4gdGFibGUgKDAtNjMsIG5vdCBmb3VuZCA9PiAtMSlcbiAgICBidWZmZXIgPSBjaGFycy5pbmRleE9mKGJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5hdG9iICYmIHdpbmRvdy5hdG9iLmJpbmQod2luZG93KSB8fCBwb2x5ZmlsbDtcbiIsInZhciBhdG9iID0gcmVxdWlyZSgnLi9hdG9iJyk7XG5cbmZ1bmN0aW9uIGI2NERlY29kZVVuaWNvZGUoc3RyKSB7XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoYXRvYihzdHIpLnJlcGxhY2UoLyguKS9nLCBmdW5jdGlvbiAobSwgcCkge1xuICAgIHZhciBjb2RlID0gcC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChjb2RlLmxlbmd0aCA8IDIpIHtcbiAgICAgIGNvZGUgPSAnMCcgKyBjb2RlO1xuICAgIH1cbiAgICByZXR1cm4gJyUnICsgY29kZTtcbiAgfSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cikge1xuICB2YXIgb3V0cHV0ID0gc3RyLnJlcGxhY2UoLy0vZywgXCIrXCIpLnJlcGxhY2UoL18vZywgXCIvXCIpO1xuICBzd2l0Y2ggKG91dHB1dC5sZW5ndGggJSA0KSB7XG4gICAgY2FzZSAwOlxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgb3V0cHV0ICs9IFwiPT1cIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIG91dHB1dCArPSBcIj1cIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBcIklsbGVnYWwgYmFzZTY0dXJsIHN0cmluZyFcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICByZXR1cm4gYjY0RGVjb2RlVW5pY29kZShvdXRwdXQpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gYXRvYihvdXRwdXQpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmFzZTY0X3VybF9kZWNvZGUgPSByZXF1aXJlKCcuL2Jhc2U2NF91cmxfZGVjb2RlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIGlmICh0eXBlb2YgdG9rZW4gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRva2VuIHNwZWNpZmllZCcpO1xuICB9XG4gIFxuICByZXR1cm4gSlNPTi5wYXJzZShiYXNlNjRfdXJsX2RlY29kZSh0b2tlbi5zcGxpdCgnLicpWzFdKSk7XG59O1xuIiwidmFyIGdsb2JhbD10eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge307LypcbiAqXG4gKiBUaGlzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIGJ1bmRsZSB3aXRoIGJyb3dzZXJpZnkuXG4gKlxuICogVGhlIGJ1bmRsZSBpcyB1c2VkIGJ5IHBlb3BsZSB3aG8gZG9lc24ndCB1c2UgYnJvd3NlcmlmeS5cbiAqIFRob3NlIHdobyB1c2UgYnJvd3NlcmlmeSB3aWxsIGluc3RhbGwgd2l0aCBucG0gYW5kIHJlcXVpcmUgdGhlIG1vZHVsZSxcbiAqIHRoZSBwYWNrYWdlLmpzb24gZmlsZSBwb2ludHMgdG8gaW5kZXguanMuXG4gKi9cbnZhciBqd3RfZGVjb2RlID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcblxuLy91c2UgYW1kIG9yIGp1c3QgdGhyb3VnaHQgdG8gd2luZG93IG9iamVjdC5cbmlmICh0eXBlb2YgZ2xvYmFsLndpbmRvdy5kZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBnbG9iYWwud2luZG93LmRlZmluZS5hbWQpIHtcbiAgZ2xvYmFsLndpbmRvdy5kZWZpbmUoJ2p3dF9kZWNvZGUnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBqd3RfZGVjb2RlOyB9KTtcbn0gZWxzZSBpZiAoZ2xvYmFsLndpbmRvdykge1xuICBnbG9iYWwud2luZG93Lmp3dF9kZWNvZGUgPSBqd3RfZGVjb2RlO1xufSJdfQ==
;