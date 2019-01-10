import types from '../types'
import * as actions from "../actions/loginActions";

const loginMiddleware = store => next => action => {
  next(action);
  
  if (action.type !== types.LOGIN_FORM_ACTION) {
    return;
  }
  
  const
    loginActions = {
      email: (data) => actions.setEmailLogin(data),
      password: (data) => actions.setPasswordLogin(data),
    },
    res = Object.entries(loginActions).find(entry => entry[0] === action.payload.name);
  
  return res && store.dispatch(res[1](action.payload.value));
};

export default loginMiddleware;
