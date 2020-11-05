import jwtDecode, { InvalidTokenError } from "./index";

const wrapper = jwtDecode;
wrapper.default = jwtDecode;
wrapper.InvalidTokenError = InvalidTokenError;
export default wrapper;