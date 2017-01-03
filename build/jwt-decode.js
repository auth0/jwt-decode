(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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

function polyfill(input) {
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
  bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}

module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

},{}],2:[function(require,module,exports){
'use strict';

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

module.exports = function (str) {
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

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};

},{"./atob":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtDecode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base64_url_decode = require('./base64_url_decode');

var _base64_url_decode2 = _interopRequireDefault(_base64_url_decode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

'use strict';

var JwtDecode = exports.JwtDecode = function () {
  function JwtDecode(token, options) {
    _classCallCheck(this, JwtDecode);

    this.token = token;
    this.options = options;
    return this.decode();
  }

  _createClass(JwtDecode, [{
    key: 'decode',
    value: function decode() {
      if (typeof this.token !== 'string') {
        throw new Error('Invalid token specified');
      }

      this.options = this.options || {};
      var pos = this.options.header === true ? 0 : 1;
      return JSON.parse((0, _base64_url_decode2.default)(this.token.split('.')[pos]));
    }
  }]);

  return JwtDecode;
}();

},{"./base64_url_decode":2}],4:[function(require,module,exports){
(function (global){
'use strict';

var _index = require('./lib/index');

//use amd or just throught to window object.
if (typeof global.window.define == 'function' && global.window.define.amd) {
  global.window.define('jwt_decode', function () {
    return _index.JwtDecode;
  });
} else if (global.window) {
  global.window.jwt_decode = _index.JwtDecode;
} /*
   *
   * This is used to build the bundle with browserify.
   *
   * The bundle is used by people who doesn't use browserify.
   * Those who use browserify will install with npm and require the module,
   * the package.json file points to index.js.
   */

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lib/index":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXRvYi5qcyIsImxpYi9iYXNlNjRfdXJsX2RlY29kZS5qcyIsImxpYi9pbmRleC5qcyIsInN0YW5kYWxvbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7OztBQUtBLElBQUksUUFBUSxtRUFBWjs7QUFFQSxTQUFTLHFCQUFULENBQStCLE9BQS9CLEVBQXdDO0FBQ3RDLE9BQUssT0FBTCxHQUFlLE9BQWY7QUFDRDs7QUFFRCxzQkFBc0IsU0FBdEIsR0FBa0MsSUFBSSxLQUFKLEVBQWxDO0FBQ0Esc0JBQXNCLFNBQXRCLENBQWdDLElBQWhDLEdBQXVDLHVCQUF2Qzs7QUFFQSxTQUFTLFFBQVQsQ0FBbUIsS0FBbkIsRUFBMEI7QUFDeEIsTUFBSSxNQUFNLE9BQU8sS0FBUCxFQUFjLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNkIsRUFBN0IsQ0FBVjtBQUNBLE1BQUksSUFBSSxNQUFKLEdBQWEsQ0FBYixJQUFrQixDQUF0QixFQUF5QjtBQUN2QixVQUFNLElBQUkscUJBQUosQ0FBMEIsbUVBQTFCLENBQU47QUFDRDtBQUNEO0FBQ0U7QUFDQSxNQUFJLEtBQUssQ0FBVCxFQUFZLEVBQVosRUFBZ0IsTUFBaEIsRUFBd0IsTUFBTSxDQUE5QixFQUFpQyxTQUFTLEVBRjVDO0FBR0U7QUFDQSxXQUFTLElBQUksTUFBSixDQUFXLEtBQVgsQ0FKWDtBQUtFO0FBQ0EsR0FBQyxNQUFELEtBQVksS0FBSyxLQUFLLENBQUwsR0FBUyxLQUFLLEVBQUwsR0FBVSxNQUFuQixHQUE0QixNQUFqQztBQUNWO0FBQ0E7QUFDQSxTQUFPLENBSFQsSUFHYyxVQUFVLE9BQU8sWUFBUCxDQUFvQixNQUFNLE9BQU8sQ0FBQyxDQUFELEdBQUssRUFBTCxHQUFVLENBQWpCLENBQTFCLENBSHhCLEdBR3lFLENBVDNFLEVBVUU7QUFDQTtBQUNBLGFBQVMsTUFBTSxPQUFOLENBQWMsTUFBZCxDQUFUO0FBQ0Q7QUFDRCxTQUFPLE1BQVA7QUFDRDs7QUFHRCxPQUFPLE9BQVAsR0FBaUIsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLE9BQU8sSUFBeEMsSUFBZ0QsT0FBTyxJQUFQLENBQVksSUFBWixDQUFpQixNQUFqQixDQUFoRCxJQUE0RSxRQUE3Rjs7Ozs7QUNyQ0EsSUFBSSxPQUFPLFFBQVEsUUFBUixDQUFYOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsR0FBMUIsRUFBK0I7QUFDN0IsU0FBTyxtQkFBbUIsS0FBSyxHQUFMLEVBQVUsT0FBVixDQUFrQixNQUFsQixFQUEwQixVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ2xFLFFBQUksT0FBTyxFQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWdCLFFBQWhCLENBQXlCLEVBQXpCLEVBQTZCLFdBQTdCLEVBQVg7QUFDQSxRQUFJLEtBQUssTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ25CLGFBQU8sTUFBTSxJQUFiO0FBQ0Q7QUFDRCxXQUFPLE1BQU0sSUFBYjtBQUNELEdBTnlCLENBQW5CLENBQVA7QUFPRDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsVUFBUyxHQUFULEVBQWM7QUFDN0IsTUFBSSxTQUFTLElBQUksT0FBSixDQUFZLElBQVosRUFBa0IsR0FBbEIsRUFBdUIsT0FBdkIsQ0FBK0IsSUFBL0IsRUFBcUMsR0FBckMsQ0FBYjtBQUNBLFVBQVEsT0FBTyxNQUFQLEdBQWdCLENBQXhCO0FBQ0UsU0FBSyxDQUFMO0FBQ0U7QUFDRixTQUFLLENBQUw7QUFDRSxnQkFBVSxJQUFWO0FBQ0E7QUFDRixTQUFLLENBQUw7QUFDRSxnQkFBVSxHQUFWO0FBQ0E7QUFDRjtBQUNFLFlBQU0sMkJBQU47QUFWSjs7QUFhQSxNQUFHO0FBQ0QsV0FBTyxpQkFBaUIsTUFBakIsQ0FBUDtBQUNELEdBRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWTtBQUNaLFdBQU8sS0FBSyxNQUFMLENBQVA7QUFDRDtBQUNGLENBcEJEOzs7Ozs7Ozs7Ozs7QUNaQTs7Ozs7Ozs7QUFDQTs7SUFFYSxTLFdBQUEsUztBQUVYLHFCQUFZLEtBQVosRUFBa0IsT0FBbEIsRUFBMEI7QUFBQTs7QUFDeEIsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxXQUFPLEtBQUssTUFBTCxFQUFQO0FBQ0Q7Ozs7NkJBRVE7QUFDTCxVQUFJLE9BQU8sS0FBSyxLQUFaLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2hDLGNBQU0sSUFBSSxLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUNIOztBQUVELFdBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxJQUFnQixFQUEvQjtBQUNBLFVBQUksTUFBTSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEtBQXdCLElBQXhCLEdBQStCLENBQS9CLEdBQW1DLENBQTdDO0FBQ0EsYUFBTyxLQUFLLEtBQUwsQ0FBVyxpQ0FBa0IsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixHQUFqQixFQUFzQixHQUF0QixDQUFsQixDQUFYLENBQVA7QUFDSDs7Ozs7Ozs7OztBQ1hIOztBQUVBO0FBQ0EsSUFBSSxPQUFPLE9BQU8sTUFBUCxDQUFjLE1BQXJCLElBQStCLFVBQS9CLElBQTZDLE9BQU8sTUFBUCxDQUFjLE1BQWQsQ0FBcUIsR0FBdEUsRUFBMkU7QUFDekUsU0FBTyxNQUFQLENBQWMsTUFBZCxDQUFxQixZQUFyQixFQUFtQyxZQUFZO0FBQUU7QUFBbUIsR0FBcEU7QUFDRCxDQUZELE1BRU8sSUFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDeEIsU0FBTyxNQUFQLENBQWMsVUFBZDtBQUNELEMsQ0FmRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIFRoZSBjb2RlIHdhcyBleHRyYWN0ZWQgZnJvbTpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuICovXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcbkludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBwb2x5ZmlsbCAoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCkucmVwbGFjZSgvPSskLywgJycpO1xuICBpZiAoc3RyLmxlbmd0aCAlIDQgPT0gMSkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IoXCInYXRvYicgZmFpbGVkOiBUaGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLlwiKTtcbiAgfVxuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyc1xuICAgIHZhciBiYyA9IDAsIGJzLCBidWZmZXIsIGlkeCA9IDAsIG91dHB1dCA9ICcnO1xuICAgIC8vIGdldCBuZXh0IGNoYXJhY3RlclxuICAgIGJ1ZmZlciA9IHN0ci5jaGFyQXQoaWR4KyspO1xuICAgIC8vIGNoYXJhY3RlciBmb3VuZCBpbiB0YWJsZT8gaW5pdGlhbGl6ZSBiaXQgc3RvcmFnZSBhbmQgYWRkIGl0cyBhc2NpaSB2YWx1ZTtcbiAgICB+YnVmZmVyICYmIChicyA9IGJjICUgNCA/IGJzICogNjQgKyBidWZmZXIgOiBidWZmZXIsXG4gICAgICAvLyBhbmQgaWYgbm90IGZpcnN0IG9mIGVhY2ggNCBjaGFyYWN0ZXJzLFxuICAgICAgLy8gY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIG9uZSBhc2NpaSBjaGFyYWN0ZXJcbiAgICAgIGJjKysgJSA0KSA/IG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSAmIGJzID4+ICgtMiAqIGJjICYgNikpIDogMFxuICApIHtcbiAgICAvLyB0cnkgdG8gZmluZCBjaGFyYWN0ZXIgaW4gdGFibGUgKDAtNjMsIG5vdCBmb3VuZCA9PiAtMSlcbiAgICBidWZmZXIgPSBjaGFycy5pbmRleE9mKGJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5hdG9iICYmIHdpbmRvdy5hdG9iLmJpbmQod2luZG93KSB8fCBwb2x5ZmlsbDtcbiIsInZhciBhdG9iID0gcmVxdWlyZSgnLi9hdG9iJyk7XG5cbmZ1bmN0aW9uIGI2NERlY29kZVVuaWNvZGUoc3RyKSB7XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoYXRvYihzdHIpLnJlcGxhY2UoLyguKS9nLCBmdW5jdGlvbiAobSwgcCkge1xuICAgIHZhciBjb2RlID0gcC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChjb2RlLmxlbmd0aCA8IDIpIHtcbiAgICAgIGNvZGUgPSAnMCcgKyBjb2RlO1xuICAgIH1cbiAgICByZXR1cm4gJyUnICsgY29kZTtcbiAgfSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cikge1xuICB2YXIgb3V0cHV0ID0gc3RyLnJlcGxhY2UoLy0vZywgXCIrXCIpLnJlcGxhY2UoL18vZywgXCIvXCIpO1xuICBzd2l0Y2ggKG91dHB1dC5sZW5ndGggJSA0KSB7XG4gICAgY2FzZSAwOlxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgb3V0cHV0ICs9IFwiPT1cIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIG91dHB1dCArPSBcIj1cIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBcIklsbGVnYWwgYmFzZTY0dXJsIHN0cmluZyFcIjtcbiAgfVxuXG4gIHRyeXtcbiAgICByZXR1cm4gYjY0RGVjb2RlVW5pY29kZShvdXRwdXQpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gYXRvYihvdXRwdXQpO1xuICB9XG59O1xuIiwiaW1wb3J0IGJhc2U2NF91cmxfZGVjb2RlIGZyb20gXCIuL2Jhc2U2NF91cmxfZGVjb2RlXCI7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjbGFzcyBKd3REZWNvZGUge1xuXG4gIGNvbnN0cnVjdG9yKHRva2VuLG9wdGlvbnMpe1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHJldHVybiB0aGlzLmRlY29kZSgpO1xuICB9XG5cbiAgZGVjb2RlKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnRva2VuICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0b2tlbiBzcGVjaWZpZWQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9O1xuICAgICAgbGV0IHBvcyA9IHRoaXMub3B0aW9ucy5oZWFkZXIgPT09IHRydWUgPyAwIDogMTtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGJhc2U2NF91cmxfZGVjb2RlKHRoaXMudG9rZW4uc3BsaXQoJy4nKVtwb3NdKSk7XG4gIH1cblxufVxuIiwiLypcbiAqXG4gKiBUaGlzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIGJ1bmRsZSB3aXRoIGJyb3dzZXJpZnkuXG4gKlxuICogVGhlIGJ1bmRsZSBpcyB1c2VkIGJ5IHBlb3BsZSB3aG8gZG9lc24ndCB1c2UgYnJvd3NlcmlmeS5cbiAqIFRob3NlIHdobyB1c2UgYnJvd3NlcmlmeSB3aWxsIGluc3RhbGwgd2l0aCBucG0gYW5kIHJlcXVpcmUgdGhlIG1vZHVsZSxcbiAqIHRoZSBwYWNrYWdlLmpzb24gZmlsZSBwb2ludHMgdG8gaW5kZXguanMuXG4gKi9cbmltcG9ydCB7IEp3dERlY29kZSB9IGZyb20gJy4vbGliL2luZGV4JztcblxuLy91c2UgYW1kIG9yIGp1c3QgdGhyb3VnaHQgdG8gd2luZG93IG9iamVjdC5cbmlmICh0eXBlb2YgZ2xvYmFsLndpbmRvdy5kZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBnbG9iYWwud2luZG93LmRlZmluZS5hbWQpIHtcbiAgZ2xvYmFsLndpbmRvdy5kZWZpbmUoJ2p3dF9kZWNvZGUnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBKd3REZWNvZGU7IH0pO1xufSBlbHNlIGlmIChnbG9iYWwud2luZG93KSB7XG4gIGdsb2JhbC53aW5kb3cuand0X2RlY29kZSA9IEp3dERlY29kZTtcbn0iXX0=
