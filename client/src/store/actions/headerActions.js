import types from '../../store/types'

export function setHeaderButtonsMode(obj) {
  return {
    type: types.SET_HEADER_BUTTON_MODE,
    payload: obj
  }
}
