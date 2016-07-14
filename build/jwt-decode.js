;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var atob = require('abab').atob;

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

},{"abab":3}],2:[function(require,module,exports){
'use strict';

var base64_url_decode = require('./base64_url_decode');

module.exports = function (token) {
  if (typeof token !== 'string') {
    throw new Error('Invalid token specified');
  }
  
  return JSON.parse(base64_url_decode(token.split('.')[1]));
};

},{"./base64_url_decode":1}],3:[function(require,module,exports){
'use strict';

var atob = require('./lib/atob');
var btoa = require('./lib/btoa');

module.exports = {
  atob: atob,
  btoa: btoa
};

},{"./lib/atob":4,"./lib/btoa":5}],4:[function(require,module,exports){
'use strict';

/**
 * Implementation of atob() according to the HTML spec, except that instead of
 * throwing INVALID_CHARACTER_ERR we return null.
 */
function atob(input) {
  // WebIDL requires DOMStrings to just be converted using ECMAScript
  // ToString, which in our case amounts to calling String().
  input = String(input);
  // "Remove all space characters from input."
  input = input.replace(/[ \t\n\f\r]/g, '');
  // "If the length of input divides by 4 leaving no remainder, then: if
  // input ends with one or two U+003D EQUALS SIGN (=) characters, remove
  // them from input."
  if (input.length % 4 == 0 && /==?$/.test(input)) {
    input = input.replace(/==?$/, '');
  }
  // "If the length of input divides by 4 leaving a remainder of 1, throw an
  // INVALID_CHARACTER_ERR exception and abort these steps."
  //
  // "If input contains a character that is not in the following list of
  // characters and character ranges, throw an INVALID_CHARACTER_ERR
  // exception and abort these steps:
  //
  // U+002B PLUS SIGN (+)
  // U+002F SOLIDUS (/)
  // U+0030 DIGIT ZERO (0) to U+0039 DIGIT NINE (9)
  // U+0041 LATIN CAPITAL LETTER A to U+005A LATIN CAPITAL LETTER Z
  // U+0061 LATIN SMALL LETTER A to U+007A LATIN SMALL LETTER Z"
  if (input.length % 4 == 1 || !/^[+/0-9A-Za-z]*$/.test(input)) {
    return null;
  }
  // "Let output be a string, initially empty."
  var output = '';
  // "Let buffer be a buffer that can have bits appended to it, initially
  // empty."
  //
  // We append bits via left-shift and or.  accumulatedBits is used to track
  // when we've gotten to 24 bits.
  var buffer = 0;
  var accumulatedBits = 0;
  // "While position does not point past the end of input, run these
  // substeps:"
  for (var i = 0; i < input.length; i++) {
    // "Find the character pointed to by position in the first column of
    // the following table. Let n be the number given in the second cell of
    // the same row."
    //
    // "Append to buffer the six bits corresponding to number, most
    // significant bit first."
    //
    // atobLookup() implements the table from the spec.
    buffer <<= 6;
    buffer |= atobLookup(input[i]);
    // "If buffer has accumulated 24 bits, interpret them as three 8-bit
    // big-endian numbers. Append the three characters with code points
    // equal to those numbers to output, in the same order, and then empty
    // buffer."
    accumulatedBits += 6;
    if (accumulatedBits == 24) {
      output += String.fromCharCode((buffer & 0xff0000) >> 16);
      output += String.fromCharCode((buffer & 0xff00) >> 8);
      output += String.fromCharCode(buffer & 0xff);
      buffer = accumulatedBits = 0;
    }
    // "Advance position by one character."
  }
  // "If buffer is not empty, it contains either 12 or 18 bits. If it
  // contains 12 bits, discard the last four and interpret the remaining
  // eight as an 8-bit big-endian number. If it contains 18 bits, discard the
  // last two and interpret the remaining 16 as two 8-bit big-endian numbers.
  // Append the one or two characters with code points equal to those one or
  // two numbers to output, in the same order."
  if (accumulatedBits == 12) {
    buffer >>= 4;
    output += String.fromCharCode(buffer);
  } else if (accumulatedBits == 18) {
    buffer >>= 2;
    output += String.fromCharCode((buffer & 0xff00) >> 8);
    output += String.fromCharCode(buffer & 0xff);
  }
  // "Return output."
  return output;
}
/**
 * A lookup table for atob(), which converts an ASCII character to the
 * corresponding six-bit number.
 */
function atobLookup(chr) {
  if (/[A-Z]/.test(chr)) {
    return chr.charCodeAt(0) - 'A'.charCodeAt(0);
  }
  if (/[a-z]/.test(chr)) {
    return chr.charCodeAt(0) - 'a'.charCodeAt(0) + 26;
  }
  if (/[0-9]/.test(chr)) {
    return chr.charCodeAt(0) - '0'.charCodeAt(0) + 52;
  }
  if (chr == '+') {
    return 62;
  }
  if (chr == '/') {
    return 63;
  }
  // Throw exception; should not be hit in tests
}

module.exports = atob;

},{}],5:[function(require,module,exports){
'use strict';

/**
 * btoa() as defined by the HTML5 spec, which mostly just references RFC4648.
 */
function btoa(s) {
  var i;
  // String conversion as required by WebIDL.
  s = String(s);
  // "The btoa() method must throw an INVALID_CHARACTER_ERR exception if the
  // method's first argument contains any character whose code point is
  // greater than U+00FF."
  for (i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 255) {
      return null;
    }
  }
  var out = '';
  for (i = 0; i < s.length; i += 3) {
    var groupsOfSix = [undefined, undefined, undefined, undefined];
    groupsOfSix[0] = s.charCodeAt(i) >> 2;
    groupsOfSix[1] = (s.charCodeAt(i) & 0x03) << 4;
    if (s.length > i + 1) {
      groupsOfSix[1] |= s.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (s.charCodeAt(i + 1) & 0x0f) << 2;
    }
    if (s.length > i + 2) {
      groupsOfSix[2] |= s.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = s.charCodeAt(i + 2) & 0x3f;
    }
    for (var j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] == 'undefined') {
        out += '=';
      } else {
        out += btoaLookup(groupsOfSix[j]);
      }
    }
  }
  return out;
}

/**
 * Lookup table for btoa(), which converts a six-bit number into the
 * corresponding ASCII character.
 */
function btoaLookup(idx) {
  if (idx < 26) {
    return String.fromCharCode(idx + 'A'.charCodeAt(0));
  }
  if (idx < 52) {
    return String.fromCharCode(idx - 26 + 'a'.charCodeAt(0));
  }
  if (idx < 62) {
    return String.fromCharCode(idx - 52 + '0'.charCodeAt(0));
  }
  if (idx == 62) {
    return '+';
  }
  if (idx == 63) {
    return '/';
  }
  // Throw INVALID_CHARACTER_ERR exception here -- won't be hit in the tests.
}

module.exports = btoa;

},{}],6:[function(require,module,exports){
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
},{"./lib/index":2}]},{},[6])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrL3NyYy9wa2xpbmdlbS9qd3QtZGVjb2RlL2xpYi9iYXNlNjRfdXJsX2RlY29kZS5qcyIsIi9Vc2Vycy9wYXRyaWNrL3NyYy9wa2xpbmdlbS9qd3QtZGVjb2RlL2xpYi9pbmRleC5qcyIsIi9Vc2Vycy9wYXRyaWNrL3NyYy9wa2xpbmdlbS9qd3QtZGVjb2RlL25vZGVfbW9kdWxlcy9hYmFiL2luZGV4LmpzIiwiL1VzZXJzL3BhdHJpY2svc3JjL3BrbGluZ2VtL2p3dC1kZWNvZGUvbm9kZV9tb2R1bGVzL2FiYWIvbGliL2F0b2IuanMiLCIvVXNlcnMvcGF0cmljay9zcmMvcGtsaW5nZW0vand0LWRlY29kZS9ub2RlX21vZHVsZXMvYWJhYi9saWIvYnRvYS5qcyIsIi9Vc2Vycy9wYXRyaWNrL3NyYy9wa2xpbmdlbS9qd3QtZGVjb2RlL3N0YW5kYWxvbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGF0b2IgPSByZXF1aXJlKCdhYmFiJykuYXRvYjtcblxuZnVuY3Rpb24gYjY0RGVjb2RlVW5pY29kZShzdHIpIHtcbiAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChhdG9iKHN0cikucmVwbGFjZSgvKC4pL2csIGZ1bmN0aW9uIChtLCBwKSB7XG4gICAgdmFyIGNvZGUgPSBwLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKGNvZGUubGVuZ3RoIDwgMikge1xuICAgICAgY29kZSA9ICcwJyArIGNvZGU7XG4gICAgfVxuICAgIHJldHVybiAnJScgKyBjb2RlO1xuICB9KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyKSB7XG4gIHZhciBvdXRwdXQgPSBzdHIucmVwbGFjZSgvLS9nLCBcIitcIikucmVwbGFjZSgvXy9nLCBcIi9cIik7XG4gIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBvdXRwdXQgKz0gXCI9PVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgb3V0cHV0ICs9IFwiPVwiO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IFwiSWxsZWdhbCBiYXNlNjR1cmwgc3RyaW5nIVwiO1xuICB9XG5cbiAgdHJ5e1xuICAgIHJldHVybiBiNjREZWNvZGVVbmljb2RlKG91dHB1dCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBhdG9iKG91dHB1dCk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiYXNlNjRfdXJsX2RlY29kZSA9IHJlcXVpcmUoJy4vYmFzZTY0X3VybF9kZWNvZGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdG9rZW4gc3BlY2lmaWVkJyk7XG4gIH1cbiAgXG4gIHJldHVybiBKU09OLnBhcnNlKGJhc2U2NF91cmxfZGVjb2RlKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhdG9iID0gcmVxdWlyZSgnLi9saWIvYXRvYicpO1xudmFyIGJ0b2EgPSByZXF1aXJlKCcuL2xpYi9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdG9iOiBhdG9iLFxuICBidG9hOiBidG9hXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIGF0b2IoKSBhY2NvcmRpbmcgdG8gdGhlIEhUTUwgc3BlYywgZXhjZXB0IHRoYXQgaW5zdGVhZCBvZlxuICogdGhyb3dpbmcgSU5WQUxJRF9DSEFSQUNURVJfRVJSIHdlIHJldHVybiBudWxsLlxuICovXG5mdW5jdGlvbiBhdG9iKGlucHV0KSB7XG4gIC8vIFdlYklETCByZXF1aXJlcyBET01TdHJpbmdzIHRvIGp1c3QgYmUgY29udmVydGVkIHVzaW5nIEVDTUFTY3JpcHRcbiAgLy8gVG9TdHJpbmcsIHdoaWNoIGluIG91ciBjYXNlIGFtb3VudHMgdG8gY2FsbGluZyBTdHJpbmcoKS5cbiAgaW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuICAvLyBcIlJlbW92ZSBhbGwgc3BhY2UgY2hhcmFjdGVycyBmcm9tIGlucHV0LlwiXG4gIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvWyBcXHRcXG5cXGZcXHJdL2csICcnKTtcbiAgLy8gXCJJZiB0aGUgbGVuZ3RoIG9mIGlucHV0IGRpdmlkZXMgYnkgNCBsZWF2aW5nIG5vIHJlbWFpbmRlciwgdGhlbjogaWZcbiAgLy8gaW5wdXQgZW5kcyB3aXRoIG9uZSBvciB0d28gVSswMDNEIEVRVUFMUyBTSUdOICg9KSBjaGFyYWN0ZXJzLCByZW1vdmVcbiAgLy8gdGhlbSBmcm9tIGlucHV0LlwiXG4gIGlmIChpbnB1dC5sZW5ndGggJSA0ID09IDAgJiYgLz09PyQvLnRlc3QoaW5wdXQpKSB7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuICB9XG4gIC8vIFwiSWYgdGhlIGxlbmd0aCBvZiBpbnB1dCBkaXZpZGVzIGJ5IDQgbGVhdmluZyBhIHJlbWFpbmRlciBvZiAxLCB0aHJvdyBhblxuICAvLyBJTlZBTElEX0NIQVJBQ1RFUl9FUlIgZXhjZXB0aW9uIGFuZCBhYm9ydCB0aGVzZSBzdGVwcy5cIlxuICAvL1xuICAvLyBcIklmIGlucHV0IGNvbnRhaW5zIGEgY2hhcmFjdGVyIHRoYXQgaXMgbm90IGluIHRoZSBmb2xsb3dpbmcgbGlzdCBvZlxuICAvLyBjaGFyYWN0ZXJzIGFuZCBjaGFyYWN0ZXIgcmFuZ2VzLCB0aHJvdyBhbiBJTlZBTElEX0NIQVJBQ1RFUl9FUlJcbiAgLy8gZXhjZXB0aW9uIGFuZCBhYm9ydCB0aGVzZSBzdGVwczpcbiAgLy9cbiAgLy8gVSswMDJCIFBMVVMgU0lHTiAoKylcbiAgLy8gVSswMDJGIFNPTElEVVMgKC8pXG4gIC8vIFUrMDAzMCBESUdJVCBaRVJPICgwKSB0byBVKzAwMzkgRElHSVQgTklORSAoOSlcbiAgLy8gVSswMDQxIExBVElOIENBUElUQUwgTEVUVEVSIEEgdG8gVSswMDVBIExBVElOIENBUElUQUwgTEVUVEVSIFpcbiAgLy8gVSswMDYxIExBVElOIFNNQUxMIExFVFRFUiBBIHRvIFUrMDA3QSBMQVRJTiBTTUFMTCBMRVRURVIgWlwiXG4gIGlmIChpbnB1dC5sZW5ndGggJSA0ID09IDEgfHwgIS9eWysvMC05QS1aYS16XSokLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIFwiTGV0IG91dHB1dCBiZSBhIHN0cmluZywgaW5pdGlhbGx5IGVtcHR5LlwiXG4gIHZhciBvdXRwdXQgPSAnJztcbiAgLy8gXCJMZXQgYnVmZmVyIGJlIGEgYnVmZmVyIHRoYXQgY2FuIGhhdmUgYml0cyBhcHBlbmRlZCB0byBpdCwgaW5pdGlhbGx5XG4gIC8vIGVtcHR5LlwiXG4gIC8vXG4gIC8vIFdlIGFwcGVuZCBiaXRzIHZpYSBsZWZ0LXNoaWZ0IGFuZCBvci4gIGFjY3VtdWxhdGVkQml0cyBpcyB1c2VkIHRvIHRyYWNrXG4gIC8vIHdoZW4gd2UndmUgZ290dGVuIHRvIDI0IGJpdHMuXG4gIHZhciBidWZmZXIgPSAwO1xuICB2YXIgYWNjdW11bGF0ZWRCaXRzID0gMDtcbiAgLy8gXCJXaGlsZSBwb3NpdGlvbiBkb2VzIG5vdCBwb2ludCBwYXN0IHRoZSBlbmQgb2YgaW5wdXQsIHJ1biB0aGVzZVxuICAvLyBzdWJzdGVwczpcIlxuICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gXCJGaW5kIHRoZSBjaGFyYWN0ZXIgcG9pbnRlZCB0byBieSBwb3NpdGlvbiBpbiB0aGUgZmlyc3QgY29sdW1uIG9mXG4gICAgLy8gdGhlIGZvbGxvd2luZyB0YWJsZS4gTGV0IG4gYmUgdGhlIG51bWJlciBnaXZlbiBpbiB0aGUgc2Vjb25kIGNlbGwgb2ZcbiAgICAvLyB0aGUgc2FtZSByb3cuXCJcbiAgICAvL1xuICAgIC8vIFwiQXBwZW5kIHRvIGJ1ZmZlciB0aGUgc2l4IGJpdHMgY29ycmVzcG9uZGluZyB0byBudW1iZXIsIG1vc3RcbiAgICAvLyBzaWduaWZpY2FudCBiaXQgZmlyc3QuXCJcbiAgICAvL1xuICAgIC8vIGF0b2JMb29rdXAoKSBpbXBsZW1lbnRzIHRoZSB0YWJsZSBmcm9tIHRoZSBzcGVjLlxuICAgIGJ1ZmZlciA8PD0gNjtcbiAgICBidWZmZXIgfD0gYXRvYkxvb2t1cChpbnB1dFtpXSk7XG4gICAgLy8gXCJJZiBidWZmZXIgaGFzIGFjY3VtdWxhdGVkIDI0IGJpdHMsIGludGVycHJldCB0aGVtIGFzIHRocmVlIDgtYml0XG4gICAgLy8gYmlnLWVuZGlhbiBudW1iZXJzLiBBcHBlbmQgdGhlIHRocmVlIGNoYXJhY3RlcnMgd2l0aCBjb2RlIHBvaW50c1xuICAgIC8vIGVxdWFsIHRvIHRob3NlIG51bWJlcnMgdG8gb3V0cHV0LCBpbiB0aGUgc2FtZSBvcmRlciwgYW5kIHRoZW4gZW1wdHlcbiAgICAvLyBidWZmZXIuXCJcbiAgICBhY2N1bXVsYXRlZEJpdHMgKz0gNjtcbiAgICBpZiAoYWNjdW11bGF0ZWRCaXRzID09IDI0KSB7XG4gICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYnVmZmVyICYgMHhmZjAwMDApID4+IDE2KTtcbiAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChidWZmZXIgJiAweGZmMDApID4+IDgpO1xuICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmZmVyICYgMHhmZik7XG4gICAgICBidWZmZXIgPSBhY2N1bXVsYXRlZEJpdHMgPSAwO1xuICAgIH1cbiAgICAvLyBcIkFkdmFuY2UgcG9zaXRpb24gYnkgb25lIGNoYXJhY3Rlci5cIlxuICB9XG4gIC8vIFwiSWYgYnVmZmVyIGlzIG5vdCBlbXB0eSwgaXQgY29udGFpbnMgZWl0aGVyIDEyIG9yIDE4IGJpdHMuIElmIGl0XG4gIC8vIGNvbnRhaW5zIDEyIGJpdHMsIGRpc2NhcmQgdGhlIGxhc3QgZm91ciBhbmQgaW50ZXJwcmV0IHRoZSByZW1haW5pbmdcbiAgLy8gZWlnaHQgYXMgYW4gOC1iaXQgYmlnLWVuZGlhbiBudW1iZXIuIElmIGl0IGNvbnRhaW5zIDE4IGJpdHMsIGRpc2NhcmQgdGhlXG4gIC8vIGxhc3QgdHdvIGFuZCBpbnRlcnByZXQgdGhlIHJlbWFpbmluZyAxNiBhcyB0d28gOC1iaXQgYmlnLWVuZGlhbiBudW1iZXJzLlxuICAvLyBBcHBlbmQgdGhlIG9uZSBvciB0d28gY2hhcmFjdGVycyB3aXRoIGNvZGUgcG9pbnRzIGVxdWFsIHRvIHRob3NlIG9uZSBvclxuICAvLyB0d28gbnVtYmVycyB0byBvdXRwdXQsIGluIHRoZSBzYW1lIG9yZGVyLlwiXG4gIGlmIChhY2N1bXVsYXRlZEJpdHMgPT0gMTIpIHtcbiAgICBidWZmZXIgPj49IDQ7XG4gICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmZmVyKTtcbiAgfSBlbHNlIGlmIChhY2N1bXVsYXRlZEJpdHMgPT0gMTgpIHtcbiAgICBidWZmZXIgPj49IDI7XG4gICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGJ1ZmZlciAmIDB4ZmYwMCkgPj4gOCk7XG4gICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmZmVyICYgMHhmZik7XG4gIH1cbiAgLy8gXCJSZXR1cm4gb3V0cHV0LlwiXG4gIHJldHVybiBvdXRwdXQ7XG59XG4vKipcbiAqIEEgbG9va3VwIHRhYmxlIGZvciBhdG9iKCksIHdoaWNoIGNvbnZlcnRzIGFuIEFTQ0lJIGNoYXJhY3RlciB0byB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgc2l4LWJpdCBudW1iZXIuXG4gKi9cbmZ1bmN0aW9uIGF0b2JMb29rdXAoY2hyKSB7XG4gIGlmICgvW0EtWl0vLnRlc3QoY2hyKSkge1xuICAgIHJldHVybiBjaHIuY2hhckNvZGVBdCgwKSAtICdBJy5jaGFyQ29kZUF0KDApO1xuICB9XG4gIGlmICgvW2Etel0vLnRlc3QoY2hyKSkge1xuICAgIHJldHVybiBjaHIuY2hhckNvZGVBdCgwKSAtICdhJy5jaGFyQ29kZUF0KDApICsgMjY7XG4gIH1cbiAgaWYgKC9bMC05XS8udGVzdChjaHIpKSB7XG4gICAgcmV0dXJuIGNoci5jaGFyQ29kZUF0KDApIC0gJzAnLmNoYXJDb2RlQXQoMCkgKyA1MjtcbiAgfVxuICBpZiAoY2hyID09ICcrJykge1xuICAgIHJldHVybiA2MjtcbiAgfVxuICBpZiAoY2hyID09ICcvJykge1xuICAgIHJldHVybiA2MztcbiAgfVxuICAvLyBUaHJvdyBleGNlcHRpb247IHNob3VsZCBub3QgYmUgaGl0IGluIHRlc3RzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXRvYjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBidG9hKCkgYXMgZGVmaW5lZCBieSB0aGUgSFRNTDUgc3BlYywgd2hpY2ggbW9zdGx5IGp1c3QgcmVmZXJlbmNlcyBSRkM0NjQ4LlxuICovXG5mdW5jdGlvbiBidG9hKHMpIHtcbiAgdmFyIGk7XG4gIC8vIFN0cmluZyBjb252ZXJzaW9uIGFzIHJlcXVpcmVkIGJ5IFdlYklETC5cbiAgcyA9IFN0cmluZyhzKTtcbiAgLy8gXCJUaGUgYnRvYSgpIG1ldGhvZCBtdXN0IHRocm93IGFuIElOVkFMSURfQ0hBUkFDVEVSX0VSUiBleGNlcHRpb24gaWYgdGhlXG4gIC8vIG1ldGhvZCdzIGZpcnN0IGFyZ3VtZW50IGNvbnRhaW5zIGFueSBjaGFyYWN0ZXIgd2hvc2UgY29kZSBwb2ludCBpc1xuICAvLyBncmVhdGVyIHRoYW4gVSswMEZGLlwiXG4gIGZvciAoaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHMuY2hhckNvZGVBdChpKSA+IDI1NSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIHZhciBvdXQgPSAnJztcbiAgZm9yIChpID0gMDsgaSA8IHMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICB2YXIgZ3JvdXBzT2ZTaXggPSBbdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXTtcbiAgICBncm91cHNPZlNpeFswXSA9IHMuY2hhckNvZGVBdChpKSA+PiAyO1xuICAgIGdyb3Vwc09mU2l4WzFdID0gKHMuY2hhckNvZGVBdChpKSAmIDB4MDMpIDw8IDQ7XG4gICAgaWYgKHMubGVuZ3RoID4gaSArIDEpIHtcbiAgICAgIGdyb3Vwc09mU2l4WzFdIHw9IHMuY2hhckNvZGVBdChpICsgMSkgPj4gNDtcbiAgICAgIGdyb3Vwc09mU2l4WzJdID0gKHMuY2hhckNvZGVBdChpICsgMSkgJiAweDBmKSA8PCAyO1xuICAgIH1cbiAgICBpZiAocy5sZW5ndGggPiBpICsgMikge1xuICAgICAgZ3JvdXBzT2ZTaXhbMl0gfD0gcy5jaGFyQ29kZUF0KGkgKyAyKSA+PiA2O1xuICAgICAgZ3JvdXBzT2ZTaXhbM10gPSBzLmNoYXJDb2RlQXQoaSArIDIpICYgMHgzZjtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBncm91cHNPZlNpeC5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKHR5cGVvZiBncm91cHNPZlNpeFtqXSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvdXQgKz0gJz0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0ICs9IGJ0b2FMb29rdXAoZ3JvdXBzT2ZTaXhbal0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIExvb2t1cCB0YWJsZSBmb3IgYnRvYSgpLCB3aGljaCBjb252ZXJ0cyBhIHNpeC1iaXQgbnVtYmVyIGludG8gdGhlXG4gKiBjb3JyZXNwb25kaW5nIEFTQ0lJIGNoYXJhY3Rlci5cbiAqL1xuZnVuY3Rpb24gYnRvYUxvb2t1cChpZHgpIHtcbiAgaWYgKGlkeCA8IDI2KSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoaWR4ICsgJ0EnLmNoYXJDb2RlQXQoMCkpO1xuICB9XG4gIGlmIChpZHggPCA1Mikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGlkeCAtIDI2ICsgJ2EnLmNoYXJDb2RlQXQoMCkpO1xuICB9XG4gIGlmIChpZHggPCA2Mikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGlkeCAtIDUyICsgJzAnLmNoYXJDb2RlQXQoMCkpO1xuICB9XG4gIGlmIChpZHggPT0gNjIpIHtcbiAgICByZXR1cm4gJysnO1xuICB9XG4gIGlmIChpZHggPT0gNjMpIHtcbiAgICByZXR1cm4gJy8nO1xuICB9XG4gIC8vIFRocm93IElOVkFMSURfQ0hBUkFDVEVSX0VSUiBleGNlcHRpb24gaGVyZSAtLSB3b24ndCBiZSBoaXQgaW4gdGhlIHRlc3RzLlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCJ2YXIgZ2xvYmFsPXR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fTsvKlxuICpcbiAqIFRoaXMgaXMgdXNlZCB0byBidWlsZCB0aGUgYnVuZGxlIHdpdGggYnJvd3NlcmlmeS5cbiAqXG4gKiBUaGUgYnVuZGxlIGlzIHVzZWQgYnkgcGVvcGxlIHdobyBkb2Vzbid0IHVzZSBicm93c2VyaWZ5LlxuICogVGhvc2Ugd2hvIHVzZSBicm93c2VyaWZ5IHdpbGwgaW5zdGFsbCB3aXRoIG5wbSBhbmQgcmVxdWlyZSB0aGUgbW9kdWxlLFxuICogdGhlIHBhY2thZ2UuanNvbiBmaWxlIHBvaW50cyB0byBpbmRleC5qcy5cbiAqL1xudmFyIGp3dF9kZWNvZGUgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuXG4vL3VzZSBhbWQgb3IganVzdCB0aHJvdWdodCB0byB3aW5kb3cgb2JqZWN0LlxuaWYgKHR5cGVvZiBnbG9iYWwud2luZG93LmRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGdsb2JhbC53aW5kb3cuZGVmaW5lLmFtZCkge1xuICBnbG9iYWwud2luZG93LmRlZmluZSgnand0X2RlY29kZScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGp3dF9kZWNvZGU7IH0pO1xufSBlbHNlIGlmIChnbG9iYWwud2luZG93KSB7XG4gIGdsb2JhbC53aW5kb3cuand0X2RlY29kZSA9IGp3dF9kZWNvZGU7XG59Il19
;