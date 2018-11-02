import types from '../../store/types';
import createReducer from '../../store/reducers/createReducer';

const initialState = {
  db: {},
  loading: false,
  dbError: {}
};

const dataBaseReducer = createReducer(initialState, {
  [types.DB_FETCH_SUCCESS]: (state, {type, payload}) => {
    return {
      ...state,
      db: {...payload}
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
       dbError: {...state.dbError, ...{ [payload]: payload }}
    }
  }
})

/*if (type === types.EDIT_TOOLBAR_STATE) {
    const name = payload.name ? payload.name : null;
    const active = payload.flag ? true : !name;
    return {
        ...state, isActive: active, toolbarAction: name
    }
}
if (type === types.SET_CURRENT_LOCATION) {
    return {
        ...state,
        location: {...state.location, ...payload}
    }
}
if (type === types.SET_DEFAULT_EDIT_MODEL) {
    return {
        ...state,
        editModel: initialState.editModel
    }
}
if (type === types.GM_COORDINATES_FETCH_SUCCESS) {
    return {
        ...state,
        editModel: {...state.editModel, ...payload}
    }
}

if (type === types.CLEAR_CURRENT_EDIT_MODEL) {
    const emptyModel = Object.keys(state.editModel).reduce(function (previous, current) {
        previous[current] = state.editModel[current] = "";
        return previous;
    }, {});
    return {
        ...state,
        editModel: {...state.editModel, ...emptyModel}
    }
}

if (type === types.DB_DELETE_ITEM_SUCCESS) {
    const newState = Object.assign({}, state, {
        db: Object.keys(state.db).reduce((result, key) => {
            if (key !== payload) {
                result[key] = state.db[key];
            }
            return result;
        }, {})
    });
    return {
        ...state,
        ...newState
    }
}
 if (type === types.DB_ADD_NEW_ENTRY_SUCCESS) {
    const newItem = {...state.db, [payload.id]: payload.data};

    return {
        ...state,
        db: newItem
    }
}
if (type === types.DB_EDIT_ITEM_SUCCESS) {
    return {
        ...state,
        db: {...state.db, [payload.id]: payload.edited}
    }
}
if (type === types.SET_FILTER_STATE) {
    return {
        ...state, filter: payload
    }
}
*/

export default dataBaseReducer;
