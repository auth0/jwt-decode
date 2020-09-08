**jwt-decode** is a small browser library that helps decoding JWTs token which are Base64Url encoded.

**IMPORTANT:** This library doesn't validate the token, any well formed JWT can be decoded. You should validate the token in your server-side logic by using something like [express-jwt](https://github.com/auth0/express-jwt), [koa-jwt](https://github.com/stiang/koa-jwt), [Owin Bearer JWT](https://github.com/michaelnoonan/Auth0-Owin-JwtBearerAuthentication), etc.

## Installation

Install with NPM or Yarn.

Run `npm install jwt-decode` or `yarn add jwt-decode` to install the library.

## Usage

```javascript
import jwt_decode from "jwt-decode";

var token = "eyJ0eXAiO.../// jwt token";
var decoded = jwt_decode(token);

console.log(decoded);

/* prints:
 * { foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  }
 */

// decode header by passing in options (useful for when you need `kid` to verify a JWT):
var decodedHeader = jwt_decode(token, { header: true });
console.log(decodedHeader);

/* prints:
 * { typ: "JWT",
 *   alg: "HS256" }
 */
```

**Note:** A falsy or malformed token will throw an `InvalidTokenError` error.

## Older verion

If you want to use the library trough Bower, an HTML import or include it through a `<script>` tag, use [version `v2.2.0`](https://github.com/auth0/jwt-decode/tree/v2.2.0). It has the same functionality.

## Develop

Run `npm run dev`, this will fire up a browser and watch the `/lib` folder.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
