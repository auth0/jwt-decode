import { JwtDecodeOptions } from "./common.js";
export * from "./common.js";

declare function jwtDecode<T = unknown>(
  token: string,
  options?: JwtDecodeOptions
): T

export default jwtDecode;
