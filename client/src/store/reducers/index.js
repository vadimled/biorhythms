import {combineReducers} from "redux";
import headerReducer from "../reducers/headerReducer";
import loginReducer from "../reducers/loginReducer";
import dataBaseReducer from "../reducers/dataBaseReducer";
import registerReducer from "../reducers/registerReducer";

export default combineReducers({
  dataBase: dataBaseReducer,
  header: headerReducer,
  register: registerReducer,
  login: loginReducer
});

