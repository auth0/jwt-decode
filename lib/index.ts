import { base64UrlDecode } from "./base64_url_decode";

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

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

InvalidTokenError.prototype.name = "InvalidTokenError";

export function jwtDecode<T = JwtHeader>(
  token: string,
  options: JwtDecodeOptions & { header: true }
): T;
export function jwtDecode<T = JwtPayload>(token: string, options?: JwtDecodeOptions): T;
export function jwtDecode(token: string, options?: JwtDecodeOptions) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }

  options = options || {};
  const pos = options.header === true ? 0 : 1;

  const part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError(
      "Invalid token specified: missing part #" + (pos + 1)
    );
  }

  let decoded: string;
  try {
    decoded = base64UrlDecode(part);
  } catch (e: any) {
    throw new InvalidTokenError(
      "Invalid token specified: invalid base64 for part #" +
        (pos + 1) +
        " (" +
        e.message +
        ")"
    );
  }

  try {
    return JSON.parse(decoded);
  } catch (e: any) {
    throw new InvalidTokenError(
      "Invalid token specified: invalid json for part #" +
        (pos + 1) +
        " (" +
        e.message +
        ")"
    );
  }
}

