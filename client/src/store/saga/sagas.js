import {call, put} from 'redux-saga/effects';
import types from '../types'
import {fetchUserApi, loginUserApi, registryUserApi} from "../../api";
import * as userActions from "../actions/userActions";
import {userRegisteredSuccess, setRegServerError} from "../actions/registerActions";
import {setLoginServerError, userLoggedInSuccess, setUserLoggedOut} from "../actions/loginActions";

export function* registryUserSaga(action) {
  try {
    yield put(userActions.setLoading(true));
    const result = yield call(registryUserApi, action.payload);
    if (result.data.status === 400) {
      yield put(setRegServerError(result.data.errors));
    } else if (result.status === 200) {
      yield put(userRegisteredSuccess(true));
    }
  } catch (error) {
    yield put({type: types.REGISTER_FAILED, payload: error.message});
  }
  yield put(userActions.setLoading(false));
}

export function* loginUserSaga(action) {
  try {
    yield put(userActions.setLoading(true));
    const result = yield call(loginUserApi, action.payload);
    if (result.data.status === 400) {
      yield put(setLoginServerError(result.data.errors));
    } else if (result.data) {
      yield put(userActions.setUserDataToStore(result.data));
      yield put(userLoggedInSuccess());
    }
    yield put(userActions.setLoading(false));
  } catch (error) {
    //yield put({type: types.LOGIN_FAILED, payload: error.message});
    yield put(userActions.setLoading(false));
  }
}

export function* fetchUserSaga() {
  try {
    yield put(userActions.setLoading(true));
    const result = yield call(fetchUserApi);
    if (result.data) {
       yield put(userActions.setUserDataToStore(result.data));
      yield put(userLoggedInSuccess());
    }
    else if (!result.data) {
      yield put(setUserLoggedOut());
    }
  } catch (error) {
    yield put({type: types.FETCH_USER_FAILED, payload: error.message});
  }
  yield put(userActions.setLoading(false));
}

/////////////////////////////////////////////////////////////////////////////////////

export function* fetchDatabaseSaga() {
  // try {
  //   yield put(userActions.setLoading(true));
  //   const db = yield call(fetchDatabaseApi);
  //   yield put(userActions.setDatabaseToStore(db.data));
  //   yield put(userActions.setLoading(false));
  // } catch (error) {
  //   yield put({type: types.DB_FETCH_FAILED, payload: error.message});
  //   yield put(userActions.setLoading(false));
  // }
}

export function* setNewEntrySaga(action) {
  // try {
  //   yield put(userActions.setLoading(true));
  //   const result = yield call(setNewEntryApi, action.payload);
  //   const id = result.data.name;
  //   yield put(userActions.addNewEntryToStore({id, data: action.payload}));
  //   yield put(clearRegModel());
  //   yield put(userActions.setLoading(false));
  // } catch (error) {
  //   yield put({type: types.DB_ADD_NEW_ENTRY_FAILED, payload: error.message});
  //   yield put(userActions.setLoading(false));
  // }
}

/*export function* deleteEntrySaga(action) {
    yield put(userActions.setToolBarActive);
    try {
        yield call(deleteEntryApi, action.payload);
        yield put(userActions.deleteDataFromStore(action.payload))
    } catch (error) {
        yield put({type: types.DB_DELETE_ITEM_FAILED, payload: error.message});
    }
}

export function* deleteCategorySaga(action) {
    try {
        for (const i in action.payload) {
            if (action.payload.hasOwnProperty(i)) {
                yield race({
                    key1: call(deleteEntryApi, action.payload[i]),
                    key2: put(userActions.deleteDataFromStore(action.payload[i]))}
                )
            }
        }
        yield put(userActions.setToolBarActive);
    } catch (error) {
        put({type: types.DB_DELETE_CATEGORY_FAILED, payload: error.message});
    }
}

export function* editEntrySaga(action) {
    yield put(userActions.setToolBarActive);
    try {
        yield call(editEntryApi, action.payload);
        yield put(userActions.editEntryInStore((action.payload)));
    } catch (error) {
        yield put({type: types.DB_EDIT_ITEM_FAILED, payload: error.message});
    }
}

export function* fetchCoordinates(action) {
    try {
        const res = yield call(getCoordinatesApi, action.payload);
        if (res.data.results.length) {
            const {lat, lng} = res.data.results[0].geometry.location;
            const newModel = {...action.payload, ...{latitude: lat, longitude: lng}};
            yield put(userActions.onSetCurrentEditModel(newModel));
        } else {
            yield put(userActions.onSetCurrentEditModel(action.payload));
        }
    } catch (error) {
        yield put({type: types.GM_COORDINATES_FETCH_FAILED, payload: error.message});
    }

}
*/
