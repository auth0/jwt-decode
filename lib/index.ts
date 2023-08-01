import base64_url_decode from "./base64_url_decode";
import { JwtDecodeOptions, JwtHeader, JwtPayload } from "./global";
export * from './global';

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

InvalidTokenError.prototype.name = "InvalidTokenError";

function jwtDecode<T = JwtHeader>(
  token: string,
  options: JwtDecodeOptions & { header: true }
): T;
function jwtDecode<T = JwtPayload>(token: string, options?: JwtDecodeOptions): T;
function jwtDecode(token: string, options?: JwtDecodeOptions) {
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
    decoded = base64_url_decode(part);
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

export default jwtDecode;
