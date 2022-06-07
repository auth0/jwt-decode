export class InvalidTokenError extends Error {}

export interface JwtDecodeOptions {
  header?: boolean;
}

export interface JwtHeader {
  typ?: string;
  alg?: string;
  kid?: string;
}

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}
