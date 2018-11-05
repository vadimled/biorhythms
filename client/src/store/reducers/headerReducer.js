import types from '../types'
import createReducer from '../reducers/createReducer'

const initialState = {
  isActive: false,
  headerAction: null,
  loginBtn: true,
  model: {
    name: "",
    email: "",
    password: "",
    gender: "",
    birthday: "",
    birthTime: "",
    weight: ""
  },
  registerBtn: true,
  regErrors: {},
  loading: false
};

const headerReducer = createReducer(initialState, {
  [types.SET_NAME_REGISTER]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, name: payload}
    }
  },
  [types.SET_EMAIL_REGISTER]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, email: payload}
    }
  },
  [types.SET_PASSWORD_REGISTER]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, password: payload}
    }
  },
  [types.SET_GENDER_REGISTER]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, gender: payload}
    }
  },
  [types.SET_BIRTHDAY_REGISTER]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, birthday: payload}
    }
  },
  [types.SET_BIRTHTIME_REGISTER]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, birthTime: payload}
    }
  },
  [types.SET_WEIGHT_REGISTER]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...state.model, weight: payload}
    }
  },
  [types.SET_REGISTER_BUTTON_STATE]: (state, {type, payload}) => {
    return {
      ...state,
      registerBtn: payload
    }
  },
  [types.SET_REGISTER_ERROR]: (state, {type, payload}) => {
    return {
      ...state,
      regErrors: {...state.regErrors, ...{[payload]: payload}},
      model: {...state.model, ...{[payload]: ""}}
    }
  },
  [types.CLEAN_REGISTER_ERROR]: (state, {type, payload}) => {
    const newState = Object.assign({}, state, {
      regErrors: Object.keys(state.regErrors).reduce((result, key) => {
        if (key !== payload) {
          result[key] = state.regErrors[key];
        }
        return result;
      }, {})
    });
    return {
      ...state,
      ...newState
    }
  },
  [types.CLEAR_MODEL]: (state, {type, payload}) => {
    return {
      ...state,
      model: {...initialState.model }
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
/*,
 [COMPLETE_ALL]: state => {
  const areAllMarked = state.every(todo => todo.completed);
  return state.map(todo => Object.assign({}, todo, {
    completed: !areAllMarked
  }));
},

[CLEAR_COMPLETED]: state => state.filter(todo => todo.completed === false)
*/


