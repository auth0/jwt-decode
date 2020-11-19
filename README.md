## **jwt-decode** is a small browser library that helps decoding JWTs token which are Base64Url encoded.

**IMPORTANT:** This library doesn't validate the token, any well formed JWT can be decoded. You should validate the token in your server-side logic by using something like [express-jwt](https://github.com/auth0/express-jwt), [koa-jwt](https://github.com/stiang/koa-jwt), [Owin Bearer JWT](https://github.com/michaelnoonan/Auth0-Owin-JwtBearerAuthentication), etc.

---

**Warning: When upgrading from version `2` to `3`, there's a potentially breaking change**

If you've previously imported the library as `import * as jwt_decode from 'jwt-decode'`, you'll have to change your import to `import jwt_decode from 'jwt-decode';`.

---

## Sponsor

|||
|-|-|
|![auth0 logo](https://user-images.githubusercontent.com/83319/31722733-de95bbde-b3ea-11e7-96bf-4f4e8f915588.png)|If you want to quickly add secure token-based authentication to your JavaScript projects, feel free to check Auth0's JavaScript SDK and free plan at [auth0.com/developers](https://auth0.com/developers?utm_source=GHsponsor&utm_medium=GHsponsor&utm_campaign=jwt-decode&utm_content=auth)|

## Installation

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauth0%2Fjwt-decode.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauth0%2Fjwt-decode?ref=badge_shield)

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

## Use with typescript

The `jwt_decode` function will return an `unknown` type by default. You can specify what the expected return type should be by passing a type argument to the `jwt_decode` function.

The package also exports types for a `JwtHeader` and `JwtPayload` with some default claims. You can either use them as-is, or extend them to include non standard claims or properties.

```typescript
import jwtDecode, { JwtPayload } from "jwt-decode";

const token: string = "eyJhsw5c";
const decoded = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type
```

## Use as a CommonJS package

```javascript
const jwt_decode = require('jwt-decode');
...
```

## Include with a script tag

Copy the file `jwt-decode.js` from the `build/` folder to your project somewhere, then include like so:

```html
<script src="jwt-decode.js"></script>
```

## Older versions

If you want to use the library trough Bower, an HTML import, use [version `v2.2.0`](https://github.com/auth0/jwt-decode/tree/v2.2.0). It has the same functionality.

## Develop

Run `npm run dev`, this will fire up a browser and watch the `/lib` folder.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

[browserify]: http://browserify.org
[webpack]: http://webpack.github.io/

# [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauth0%2Fjwt-decode.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauth0%2Fjwt-decode?ref=badge_large)
