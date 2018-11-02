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

export function setRegisterButtonState(state) {
  return {
    type: types.SET_REGISTER_BUTTON_STATE,
    payload: state
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

export function clearModel() {
  return {
    type: types.CLEAR_MODEL
  }
}

export function setLoading(status) {
  return {
    type: types.SET_LOADING,
    payload: status
  }
}
