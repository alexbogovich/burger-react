import axios from "axios"
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from "./actionTypes"

const fbAuthUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqBAskHQJp11DVBkqtMPRyQJ4-XWM94ec"

const authStart = () => ({
  type: AUTH_START,
})

const authSucces = authData => ({
  type: AUTH_SUCCESS,
  authData: authData,
})

const authFail = error => ({
  type: AUTH_FAIL,
  error: error,
})

export const auth = (email, password) => dispatch => {
  dispatch(authStart())
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }
  axios.post(fbAuthUrl, authData)
  .then(r => {
    console.log(r)
    dispatch(authSucces(r.data))
  })
  .catch(err => {
    console.log(err)
    dispatch(authFail(err))
  })
}