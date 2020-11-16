export class InvalidTokenError extends Error {}

export interface JwtDecodeOptions {
  header?: boolean;
}

export default function jwtDecode<T>(token: string, options?: JwtDecodeOptions): T;
