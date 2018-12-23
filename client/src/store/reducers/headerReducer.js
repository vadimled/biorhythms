import types from '../types'
import createReducer from '../reducers/createReducer'

const initialState = {
  loginBtn: true,
  registerBtn: true,
  loading: false
};

const headerReducer = createReducer(initialState, {
  [types.SET_HEADER_BUTTON_MODE]: (state, {type, payload}) => {
    return {
      ...state,
      [payload.button]: payload.mode
    }
  },
  [types.SET_LOADING]: (state, {type, payload}) => {
    return {
      ...state,
      loading: payload
    }
  }
});

export default headerReducer;
