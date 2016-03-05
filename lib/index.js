'use strict';

var base64_url_decode = require('./base64_url_decode');

module.exports = function (token) {
  if (!token) {
    throw new Error('Invalid token specified');
  }
  
  return JSON.parse(base64_url_decode(token.split('.')[1]));
};
