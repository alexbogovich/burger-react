import axios from "axios"
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from "./actionTypes"

const fireBaseSignUp = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"
const fireBaseSignIn = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"

const authStart = () => ({
  type: AUTH_START,
})

const authSuccess = authData => ({
  type: AUTH_SUCCESS,
  idToken: authData.idToken,
  userId: authData.localId,
  refreshToken: authData.refreshToken,
})

const authFail = error => ({
  type: AUTH_FAIL,
  error: error,
})

export const signUp = (email, password) => dispatch => {
  dispatch(authStart())
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }
  axios.post(fireBaseSignUp, authData)
  .then(r => {
    console.log(r)
    dispatch(authSuccess(r.data))
  })
  .catch(err => {
    console.log(err)
    dispatch(authFail(err))
  })
}

export const signIn = (email, password) => dispatch => {
  dispatch(authStart())
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }
  axios.post(fireBaseSignIn, authData)
  .then(r => {
    console.log(r)
    dispatch(authSuccess(r.data))
  })
  .catch(err => {
    console.log(err)
    dispatch(authFail(err))
  })
}