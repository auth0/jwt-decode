export class InvalidTokenError extends Error {}

export interface JwtDecodeOptions {
  header?: boolean;
}

export interface JwtClaims {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export default function jwtDecode(token: string, options?: JwtDecodeOptions): JwtClaims;
