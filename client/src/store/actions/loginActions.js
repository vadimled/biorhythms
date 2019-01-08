import types from '../../store/types'

export function sendLoginData(data) {
  return {
    type: types.ON_LOGIN_USER,
    payload: data
  }
}

export function loginFormAction(data) {
  return {
    type: types.LOGIN_FORM_ACTION,
    payload: data
  }
}


export function setEmailLogin(data) {
  return {
    type: types.SET_EMAIL_LOGIN,
    payload: data
  }
}

export function setPasswordLogin(data) {
  return {
    type: types.SET_PASSWORD_LOGIN,
    payload: data
  }
}
export function setLoginError(error) {
  return {
    type: types.SET_LOGIN_ERROR,
    payload: error
  }
}

export function setLoginServerError(error) {
  return {
    type: types.SET_LOGIN_SERVER_ERROR,
    payload: error
  }
}

export function cleanLoginError(error) {
  return {
    type: types.CLEAN_LOGIN_ERROR,
    payload: error
  }
}

export function clearLoginModel() {
  return {
    type: types.CLEAR_LOGIN_MODEL
  }
}

export function userLogedinSuccess(mode) {
  return {
    type: types.USER_LOGEDIN_SUCCESS,
    payload: mode
  }
}

