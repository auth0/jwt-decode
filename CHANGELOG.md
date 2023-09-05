# Change log

## Version [4.0.0-beta.4](https://github.com/auth0/jwt-decode/releases/tag/v4.0.0-beta.4)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v4.0.0-beta.3..v4.0.0-beta.4)

**Breaking changes**
- Raise minimum Node.js version to 18 [\#209](https://github.com/auth0/jwt-decode/pull/209) ([jonkoops](https://github.com/jonkoops))

**Fixed**
- fix default condition should be the last one [\#199](https://github.com/auth0/jwt-decode/pull/199) ([frederikprijck](https://github.com/frederikprijck))

## Version [4.0.0-beta.3](https://github.com/auth0/jwt-decode/releases/tag/v4.0.0-beta.3)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v4.0.0-beta.2..v4.0.0-beta.3)

**Breaking changes**
- Drop UMD bundle [\#193](https://github.com/auth0/jwt-decode/pull/193) ([frederikprijck](https://github.com/frederikprijck))

**Changed**
- Use modern JavaScript syntax [\#187](https://github.com/auth0/jwt-decode/pull/187) ([jonkoops](https://github.com/jonkoops))
- Use ESNext as default module system [\#188](https://github.com/auth0/jwt-decode/pull/188) ([jonkoops](https://github.com/jonkoops))
- Avoid using any bundlers but use tsc instead [\#192](https://github.com/auth0/jwt-decode/pull/192) ([frederikprijck](https://github.com/frederikprijck))

## Version [4.0.0-beta.2](https://github.com/auth0/jwt-decode/releases/tag/v4.0.0-beta.2)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v4.0.0-beta.1..v4.0.0-beta.2)

**Changed**
- Avoid using default exports [\#175](https://github.com/auth0/jwt-decode/pull/175) ([frederikprijck](https://github.com/frederikprijck))
- Make options optional no default function parameter initializer [\#179](https://github.com/auth0/jwt-decode/pull/179) ([cristobal](https://github.com/cristobal))

**Fixed**
- Ensure types are bundled and correctly linked [\#174](https://github.com/auth0/jwt-decode/pull/174) ([jonkoops](https://github.com/jonkoops))

## Version [4.0.0-beta.1](https://github.com/auth0/jwt-decode/releases/tag/v4.0.0-beta.1)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v4.0.0-beta.0..v4.0.0-beta.1)

**Fixed**
- Ensure build is run on prepack [\#167](https://github.com/auth0/jwt-decode/pull/167) ([frederikprijck](https://github.com/frederikprijck))

## Version [4.0.0-beta.0](https://github.com/auth0/jwt-decode/releases/tag/v4.0.0-beta.0)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v3.1.2..v4.0.0-beta.0)

A new version of the library, including a couple of improvements:

- No longer include a polyfill for [atob](https://developer.mozilla.org/en-US/docs/Web/API/atob), as this is [supported in all major browsers](https://caniuse.com/?search=atob) (and [node environments > 14](https://developer.mozilla.org/en-US/docs/Web/API/atob#browser_compatibility)).
- Compile to ES2017, dropping support for anything that does not support ES2017 (which should be very limited [according to caniuse](https://caniuse.com/?search=es2017))
- Use Node's atob when running on node.
- Drop support for Node 14, add support for Node 20.
- Add support for package.json's `exports` field, for better CJS/ESM support
- Reorganize build artifacts for better CJS/ESM support (cjs and esm needs to be their own directory with a cjs specific package.json file)
- Drop manual UMD bundle creation in `index.standalone.ts`, but rely on rollup instead.
- Infer JwtPayload and JwtHeader default types from the `header` argument by using overloads.

**Additionally, this PR ensures the file size is decreased:**

- **ESM and CJS decreased by 22%**
- **UMD decreased by 37%**

Even though some users might experience breaking changes, mostly because of the `exports` field, the majority should be able to update without making any changes, assuming the SDK is used in environments with support for `atob`.

## Version [3.1.2](https://github.com/auth0/jwt-decode/releases/tag/v3.1.2)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v3.1.1..v3.1.2)

- Add a generic as return type so the user can specify what's expected, this will still be `unknown` by default
- Export `JwtHeader`and `JwtPayload` that can be used with the generic return type as-is or extended.

## Version [3.1.0](https://github.com/auth0/jwt-decode/releases/tag/v3.1.0)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v3.0.0..v3.1.0)

- Add TypeScript type definition
- Fix CJS default export

## Version [3.0.0](https://github.com/auth0/jwt-decode/releases/tag/v3.0.0)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v2.0.0..v3.0.0)

- Include an ESM build for native JavaScript imports

**Warning: this version has some potentially breaking changes!**

- If you've previously imported the library as `import * as jwt_decode from 'jwt-decode'`, you'll have to change your import to `import jwt_decode from 'jwt-decode';`.
