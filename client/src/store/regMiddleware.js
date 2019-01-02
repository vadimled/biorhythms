import types from '../store/types'
import * as headerActions from "../store/actions/registerActions";

const regMiddleware = store => next => action => {
  next(action);
  
  if (action.type !== types.REGISTER_FORM_ACTION) {
    return;
  }
  
  const registeringActions = {
    name: (data) => headerActions.setNameRegister(data),
    email: (data) => headerActions.setEmailRegister(data),
    password: (data) => headerActions.setPasswordRegister(data),
    gender: (data) => headerActions.setGenderRegister(data),
    birthday: (data) => headerActions.setBirthdayRegister(data),
    birthTime: (data) => headerActions.setBirthtimeRegister(data),
    weight: (data) => headerActions.setWeightRegister(data)
  };
  
  Object.entries(registeringActions).find(entry => {
    if (entry[0] === action.payload.name){
      return store.dispatch(entry[1](action.payload.value));
    }
  });
  
};

export default regMiddleware;
