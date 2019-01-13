import types from '../types'
import * as headerActions from "../actions/registerActions";

const regMiddleware = store => next => action => {
  next(action);
  
  if (action.type !== types.REGISTER_FORM_ACTION) {
    return;
  }
  
  const
    registeringActions = {
      userName: (data) => headerActions.setNameRegister(data),
      email: (data) => headerActions.setEmailRegister(data),
      password: (data) => headerActions.setPasswordRegister(data),
      gender: (data) => headerActions.setGenderRegister(data),
      birthday: (data) => headerActions.setBirthdayRegister(data),
      birthTime: (data) => headerActions.setBirthtimeRegister(data),
      weight: (data) => headerActions.setWeightRegister(data)
    },
    res = Object.entries(registeringActions).find(entry => entry[0] === action.payload.name);
  
  return res && store.dispatch(res[1](action.payload.value));
};

export default regMiddleware;
