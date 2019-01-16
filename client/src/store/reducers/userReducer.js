import types from '../../store/types';
import createReducer from '../../store/reducers/createReducer';

const initialState = {
  data: {},
  loading: false
};

const userReducer = createReducer(initialState, {
  [types.FETCH_USER_SUCCESS]: (state, {type, payload}) => {
    return {
      ...state,
      data: {...payload}
    }
  },
  [types.DB_ADD_NEW_ENTRY_SUCCESS]: (state, {type, payload}) => {
    const newItem = {...state.db, [payload.id]: payload.data};
    return {
      ...state,
      db: newItem
    }
  },
  [types.DB_SET_ERROR]: (state, {type, payload}) => {
    return {
      ...state,
      dbError: {...state.dbError, ...{[payload]: payload}}
    }
  },
  [types.SET_LOADING]: (state, {type, payload}) => {
    return {
      ...state,
      loading: payload
    }
  }
});

export default userReducer;
