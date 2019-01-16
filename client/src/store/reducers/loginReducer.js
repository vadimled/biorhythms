import types from '../types'
import createReducer from '../reducers/createReducer'

const initialState = {
  loggedIn: false,
  model: {
    email: "",
    password: "",
  },
  loginErrors: {},
  loginServerErrors: {
    loginError: [],
    passwordError: [],
    emailError: []
  },
  loading: false
};

const loginReducer = createReducer(initialState, {
  [types.USER_LOGEDIN_SUCCESS]: state => {
    return {
      ...state,
      loggedIn: true
    }
  },
  [types.SET_EMAIL_LOGIN]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, email: payload}
    }
  },
  [types.SET_PASSWORD_LOGIN]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, password: payload}
    }
  },
  [types.CLEAR_LOGIN_MODEL]: state => {
    return {
      ...state,
      model: {...initialState.model}
    }
  },
  [types.SET_LOGIN_ERROR]: (state, {type, payload}) => {
    return {
      ...state,
      loginErrors: {...state.loginErrors, ...{[payload]: payload}}
    }
  },
  [types.CLEAN_LOGIN_ERROR]: (state, {type, payload}) => {
    const newState = Object.assign({}, state, {
      loginErrors: Object.keys(state.loginErrors).reduce((result, key) => {
        if (key !== payload) {
          result[key] = state.loginErrors[key];
        }
        return result;
      }, {})
    });
    return {
      ...state,
      ...newState,
      loginServerErrors: initialState.loginServerErrors
    }
  },
  [types.SET_LOGIN_SERVER_ERROR]: (state, {type, payload}) => {
    return {
      ...state,
      loginServerErrors: {...payload}
    }
  },
  [types.SET_USER_LOGED_OUT]: state => {
    return {
      ...state,
      loggedIn: false
    }
  },
  [types.SET_LOADING]: (state, {type, payload}) => {
    return {
      ...state,
      loading: payload
    }
  }
});

export default loginReducer;
