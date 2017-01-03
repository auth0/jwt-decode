import base64_url_decode from "./base64_url_decode";
'use strict';

export class JwtDecode {

  constructor(token,options){
    this.token = token;
    this.options = options;
    return this.decode();
  }

  decode() {
      if (typeof this.token !== 'string') {
          throw new Error('Invalid token specified');
      }

      this.options = this.options || {};
      let pos = this.options.header === true ? 0 : 1;
      return JSON.parse(base64_url_decode(this.token.split('.')[pos]));
  }

}
