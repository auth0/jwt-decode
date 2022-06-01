import { JwtDecodeOptions } from "./common";
export * from "./common";

declare function jwtDecode<T = unknown>(
  token: string,
  options?: JwtDecodeOptions
): T

export default jwtDecode;
