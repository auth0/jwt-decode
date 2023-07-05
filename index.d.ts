export class InvalidTokenError extends Error {}

export interface JwtDecodeOptions {
  header?: boolean;
  validate?: boolean;
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

export default function jwtDecode(
  token: string,
  options?: JwtDecodeOptions & { header: true; validate: true }
): JwtHeader;
export default function jwtDecode(
  token: string,
  options?: JwtDecodeOptions & { header?: false; validate: true }
): JwtPayload;
export default function jwtDecode<T = unknown>(
  token: string,
  options?: JwtDecodeOptions
): T;
