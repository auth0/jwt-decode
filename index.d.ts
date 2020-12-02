export class InvalidTokenError extends Error {}

export interface JwtDecodeOptions {
  header?: boolean;
}

export interface JwtHeader {
  type?: string;
  alg?: string;
}

// Authentication Methods Reference (AMR)
// https://tools.ietf.org/html/rfc8176#page-5
export type AMR = 'mfa' | 'pwd' | 'face' | 'fpt' | 'geo' | 'hwk' | 'iris' | 'kba' | 'mca' | 'otp' | 'pin' | 'rba' | 'retina' | 'sc' | 'sms' | 'swk' | 'tel' | 'user' | 'vbm' | 'wia';

// iana.org/assignments/jwt/jwt.xhtml#claims
export interface JwtPayload {
  // Issuer Identifier for the Issuer of the response.
  iss?: string;
  // Subject Identifier.
  sub?: string;
  // Audience(s) that this ID Token is intended for.
  aud?: string[] | string;
  // Expiration time on or after which the ID Token MUST NOT be accepted for processing.
  exp?: number;
  // (Not Before Time): before the JWT must not be accepted for processing.
  nbf?: number;
  // (Issued At Time): when the JWT was issued.
  iat?: number;
  // (JWT ID): Unique identifier.
  jti?: string;
  // String value used to associate a Client session with an ID Token, and to mitigate replay attacks.
  nonce?: string;
  // Authentication Context Class Reference (ACR).
  acr?: string;
  // List of Authentication Methods Reference (AMR) used in the current session.
  amr?: AMR[];
  // Access Token hash value.
  at_hash?: string;
  // Timestamp information was last updated.
  updated_at?: string;
  // Full name of authenticated user.
  name?: string;
  // Given name(s) or first name(s) of authenticated user.
  given_name?: string;
  // Casual name of authenticated user.
  nickname?: string;
  // Profile picture URL of authenticated user.
  picture?: string;
  // Email of authenticated user.
  email?: string;
  // Has email of authenticated user been verified ?
  email_verified?: boolean;
}

export default function jwtDecode<T = unknown>(
  token: string,
  options?: JwtDecodeOptions
): T;
