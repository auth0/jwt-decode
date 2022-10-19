![](./banner.png)

**IMPORTANT:** This library doesn't validate the token, any well formed JWT can be decoded. You should validate the token in your server-side logic by using something like [express-jwt](https://github.com/auth0/express-jwt), [koa-jwt](https://github.com/stiang/koa-jwt), [Owin Bearer JWT](https://github.com/michaelnoonan/Auth0-Owin-JwtBearerAuthentication), etc.

![Release](https://img.shields.io/npm/v/jwt-decode)
![Downloads](https://img.shields.io/npm/dw/jwt-decode)
[![License](https://img.shields.io/:license-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
[![CircleCI](https://img.shields.io/circleci/build/github/auth0/jwt-decode)](https://circleci.com/gh/auth0/jwt-decode)

:books: [Documentation](#documentation) - :rocket: [Getting Started](#getting-started) - :speech_balloon: [Feedback](#feedback)

## Documentation

- [Docs site](https://www.auth0.com/docs) - explore our docs site and learn more about Auth0.

## Getting started

### Installation

Install with NPM or Yarn.

Run `npm install jwt-decode` or `yarn add jwt-decode` to install the library.

### Usage

```js
import jwt_decode from "jwt-decode";

var token = "eyJ0eXAiO.../// jwt token";
var decoded = jwt_decode(token);

console.log(decoded);

/* prints:
 * { 
 *   foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  
 * }
 */

// decode header by passing in options (useful for when you need `kid` to verify a JWT):
var decodedHeader = jwt_decode(token, { header: true });
console.log(decodedHeader);

/* prints:
 * { 
 *   typ: "JWT",
 *   alg: "HS256" 
 * }
 */
```

**Note:** A falsy or malformed token will throw an `InvalidTokenError` error.

#### Use with typescript

The `jwt_decode` function will return an `unknown` type by default. You can specify what the expected return type should be by passing a type argument to the `jwt_decode` function.

The package also exports types for a `JwtHeader` and `JwtPayload` with some default claims. You can either use them as-is, or extend them to include non standard claims or properties.

```typescript
import jwtDecode, { JwtPayload } from "jwt-decode";

const token: string = "eyJhsw5c";
const decoded = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type
```

#### Use as a CommonJS package

```javascript
const jwt_decode = require('jwt-decode');
...
```

#### Include with a script tag

Copy the file `jwt-decode.js` from the `build/` folder to your project somewhere, then include like so:

```html
<script src="jwt-decode.js"></script>
```


## Feedback

### Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [Auth0's general contribution guidelines](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
- [Auth0's code of conduct guidelines](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md)

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker](https://github.com/auth0/jwt-decode/issues).

### Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/responsible-disclosure-policy) details the procedure for disclosing security issues.

---

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="./auth0_light_mode.png"   width="150">
    <source media="(prefers-color-scheme: dark)" srcset="./auth0_dark_mode.png" width="150">
    <img alt="Auth0 Logo" src="./auth0_light_mode.png" width="150">
  </picture>
</p>
<p align="center">Auth0 is an easy to implement, adaptable authentication and authorization platform. To learn more checkout <a href="https://auth0.com/why-auth0">Why Auth0?</a></p>
<p align="center">
This project is licensed under the MIT license. See the <a href="./LICENSE"> LICENSE</a> file for more info.</p>
