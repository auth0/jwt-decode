__jwt-decode__ is a small browser library that helps decoding JWTs token which are Base64Url encoded.

__IMPORTANT:__ This library doesn't validate the token, any well formed JWT can be decoded. You should validate the token in your server-side logic by using something like [express-jwt](http://github.com/auth0/jwt), [koa-jwt](https://github.com/stiang/koa-jwt), [Owin Bearer JWT](https://github.com/michaelnoonan/Auth0-Owin-JwtBearerAuthentication), etc.

## Installation

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
~~~

**Note:** A falsy token will throw an error.

Can also be used with [browserify] or [webpack] by doing `npm install jwt-decode` and requiring:

~~~javascript
var jwtDecode = require('jwt-decode');
~~~

## Develop

Run `grunt dev` and fire a browser at http://localhost:9999/test_harness.html.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.

[browserify]: http://browserify.org
[webpack]: http://webpack.github.io/
