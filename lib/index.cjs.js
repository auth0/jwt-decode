import jwtDecode, { InvalidTokenError } from "./index";

const wrapper = jwtDecode;
wrapper.InvalidTokenError = InvalidTokenError;
export default wrapper;