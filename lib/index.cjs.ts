import jwtDecode, { InvalidTokenError } from "./index";

const wrapper = jwtDecode as any;
wrapper.default = jwtDecode;
wrapper.InvalidTokenError = InvalidTokenError;
export default wrapper;
