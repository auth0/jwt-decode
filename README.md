__jwt-decode__ is a small browser library that helps decoding JWTs token which are Base64Url encoded.

__IMPORTANT:__ This library doesn't validate the token, any well formed JWT can be decoded. You should validate the token in your server-side logic by using something like [express-jwt](https://github.com/auth0/express-jwt), [koa-jwt](https://github.com/stiang/koa-jwt), [Owin Bearer JWT](https://github.com/michaelnoonan/Auth0-Owin-JwtBearerAuthentication), etc.

## Installation
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauth0%2Fjwt-decode.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauth0%2Fjwt-decode?ref=badge_shield)


Install with npm, bower, or downloading from the build directory of this repository.

Use with AMD, browserify or just include with an script tag.

## Usage

~~~javascript
var token = 'eyJ0eXAiO.../// jwt token';

var decoded = jwt_decode(token);
console.log(decoded);

/* prints:
 * { foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  }
 */

 // decode header by passing in options (useful for when you need `kid` to verify a JWT):
 var decodedHeader = jwt_decode(token, { header: true });
 console.log(decodedHeader)

 /* prints:
  * { typ: "JWT",
  *   alg: "HS256" }
  */

~~~

**Note:** A falsy or malformed token will throw an `InvalidTokenError` error.

Can also be used with [browserify] or [webpack] by doing `npm install jwt-decode` and requiring:

~~~javascript
var jwtDecode = require('jwt-decode');
~~~

## Polymer Web Component

Can also be installed and used with [Polymer-based wrapper](https://github.com/firmfirm/f-jwt-decode).

## Include with a script tag

Copy the file jwt-decode.min.js from the build/ folder to your project somewhere, then include like so:

~~~html
<script src="jwt-decode.min.js"></script>
~~~

## Develop

Run `grunt dev` and fire a browser at http://localhost:9999/test_harness.html.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

[browserify]: http://browserify.org
[webpack]: http://webpack.github.io/


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauth0%2Fjwt-decode.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauth0%2Fjwt-decode?ref=badge_large)