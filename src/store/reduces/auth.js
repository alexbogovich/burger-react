import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from "../actions/actionTypes"

const initState = {
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
  loading: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case AUTH_SUCCESS:
      return {
        token: action.idToken,
        refreshToken: action.refreshToken,
        userId: action.userId,
        error: null,
        loading: false,
      }
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