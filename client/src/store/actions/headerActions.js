import types from '../../store/types'

export function setLoading(status) {
  return {
    type: types.SET_LOADING,
    payload: status
  }
}

export function setHeaderButtonsMode(obj) {
  return {
    type: types.SET_HEADER_BUTTON_MODE,
    payload: obj
  }
}
