declare class InvalidTokenError extends Error {}

declare interface JwtDecodeOptions {
  header?: boolean;
}

declare interface JwtHeader {
  type?: string;
  alg?: string;
}

declare interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

declare namespace jwtDecode {
  export { InvalidTokenError, JwtDecodeOptions, JwtHeader, JwtPayload }
}

declare function jwtDecode<T = unknown>(
  token: string,
  options?: JwtDecodeOptions
): T;

export = jwtDecode;
