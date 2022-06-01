import { InvalidTokenError, JwtDecodeOptions, JwtHeader, JwtPayload } from "./common";

declare namespace jwtDecode {
  export { InvalidTokenError, JwtDecodeOptions, JwtHeader, JwtPayload }
}

declare function jwtDecode<T = unknown>(
  token: string,
  options?: JwtDecodeOptions
): T

export = jwtDecode;
