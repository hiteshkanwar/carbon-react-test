import * as actionTypes from '../actions/actionTypes'

const INITIAL_AUTH_STATE = {
  success: undefined,
  error: undefined,
  user: null,
}

const auth = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      return { ...state, user: action.payload.response.user, error: false };
    case actionTypes.REGISTER_USER_ERROR:
      return {...state, success: false, error: action.payload };
    case actionTypes.LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload.response.user, error: false };
    case actionTypes.LOGIN_USER_ERROR:
      return {...state, success: false, error: action.payload };
    default:
      return {...state, user: null }
  }

}

export default auth;

