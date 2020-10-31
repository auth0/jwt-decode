export class InvalidTokenError extends Error {}

export interface JwtDecodeOptions {
  header?: boolean;
}

export default function jwtDecode(token: string, options?: JwtDecodeOptions): unknown;
