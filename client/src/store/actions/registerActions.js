import types from '../../store/types'

export function regFormAction(data) {
  return {
    type: types.REGISTER_FORM_ACTION,
    payload: data
  }
}

export function setNameRegister(data) {
  return {
    type: types.SET_NAME_REGISTER,
    payload: data
  }
}

export function setEmailRegister(data) {
  return {
    type: types.SET_EMAIL_REGISTER,
    payload: data
  }
}

export function setPasswordRegister(data) {
  return {
    type: types.SET_PASSWORD_REGISTER,
    payload: data
  }
}

export function setGenderRegister(data) {
  return {
    type: types.SET_GENDER_REGISTER,
    payload: data
  }
}

export function setBirthdayRegister(data) {
  return {
    type: types.SET_BIRTHDAY_REGISTER,
    payload: data
  }
}

export function setBirthtimeRegister(data) {
  return {
    type: types.SET_BIRTHTIME_REGISTER,
    payload: data
  }
}

export function setWeightRegister(data) {
  return {
    type: types.SET_WEIGHT_REGISTER,
    payload: data
  }
}

export function setRegError(error) {
  return {
    type: types.SET_REGISTER_ERROR,
    payload: error
  }
}

export function cleanRegError(error) {
  return {
    type: types.CLEAN_REGISTER_ERROR,
    payload: error
  }
}

export function setRegServerError(error) {
  return {
    type: types.SET_REGISTER_SERVER_ERROR,
    payload: error
  }
}


export function clearRegModel() {
  return {
    type: types.CLEAR_REGISTER_MODEL
  }
}

export function setLoading(status) {
  return {
    type: types.SET_LOADING,
    payload: status
  }
}

export function sendRegistryData(data) {
  return {
    type: types.ON_REGISTER_USER,
    payload: data
  }
}

export function userRegisteredSuccess(mode) {
  return {
    type: types.USER_REGISTERED_SUCCESS,
    payload: mode
  }
}

