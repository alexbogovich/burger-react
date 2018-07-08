import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
} from "../actions/actionTypes"

const initState = {
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
  loading: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN_START:
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case SIGN_IN_SUCCESS:
    case AUTH_SUCCESS:
      return {
        token: action.idToken,
        refreshToken: action.refreshToken,
        userId: action.userId,
        error: null,
        loading: false,
      }
    case SIGN_IN_FAIL:
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}