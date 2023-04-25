import { LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/typeActions';

export const default_login_state = {
  guest: true,
  isToken: false,
  flagError: "",
  token: "",
};

const login_reducer = (state = default_login_state, action: { type: string, mode: boolean, payload: { msg: string } }) => {
  const { type, mode, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        guest: mode,
        isToken: true,
        flagError: "none",
        token: payload.msg,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        guest: mode,
        isToken: false,
        flagError: "error",
        token: "",
      };
    default:
      return state;
  }
}

export default login_reducer;