import {call, put, race} from 'redux-saga/effects';
import * as actions from "../actions/dbActions";
import types from '../types'
import {fetchUserApi, fetchDatabaseApi, setNewEntryApi, loginWithGoogleApi, registryUserApi} from "../../api";
import {clearModel, setLoading, userRegisteredSuccess} from "../actions/registerActions";

export function* fetchDatabaseSaga() {
  try {
    yield put(setLoading(true));
    const db = yield call(fetchDatabaseApi);
    yield put(actions.setDatabaseToStore(db.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put({type: types.DB_FETCH_FAILED, payload: error.message});
    yield put(setLoading(false));
  }
}

export function* fetchUserSaga() {
  try {
    yield put(setLoading(true));
    const result = yield call(fetchUserApi);
    yield put(actions.setUserDataToStore(result.data));
    if(!result.data){
      yield put(actions.setUserLogedOut());
    }
  } catch (error) {
    yield put({type: types.FETCH_USER_FAILED, payload: error.message});
  }
  yield put(setLoading(false));
}


export function* setNewEntrySaga(action) {
  try {
    yield put(setLoading(true));
    const result = yield call(setNewEntryApi, action.payload);
    const id = result.data.name;
    yield put(actions.addNewEntryToStore({id, data: action.payload}));
    yield put(clearModel());
    yield put(setLoading(false));
  } catch (error) {
    yield put({type: types.DB_ADD_NEW_ENTRY_FAILED, payload: error.message});
    yield put(setLoading(false));
  }
}


export function* registryUserSaga(action) {
  try {
    yield put(setLoading(true));
    const result = yield call(registryUserApi, action.payload);
     if(result.status === 200) {
      yield put(userRegisteredSuccess(true));
     }
  } catch (error) {
    yield put({type: types.REGISTER_FAILED, payload: error.message});
  }
  yield put(setLoading(false));
}

export function* loginWithGoogleSaga() {
  yield put(setLoading(true));
  try {
    yield call(loginWithGoogleApi);
    //yield put(actions.deleteDataFromStore(action.payload))
  } catch (error) {
    yield put({type: types.FETCH_USER_FAILED, payload: error.message});
  }
}/*export function* deleteEntrySaga(action) {
    yield put(actions.setToolBarActive);
    try {
        yield call(deleteEntryApi, action.payload);
        yield put(actions.deleteDataFromStore(action.payload))
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
                    key2: put(actions.deleteDataFromStore(action.payload[i]))}
                )
            }
        }
        yield put(actions.setToolBarActive);
    } catch (error) {
        put({type: types.DB_DELETE_CATEGORY_FAILED, payload: error.message});
    }
}

export function* editEntrySaga(action) {
    yield put(actions.setToolBarActive);
    try {
        yield call(editEntryApi, action.payload);
        yield put(actions.editEntryInStore((action.payload)));
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
            yield put(actions.onSetCurrentEditModel(newModel));
        } else {
            yield put(actions.onSetCurrentEditModel(action.payload));
        }
    } catch (error) {
        yield put({type: types.GM_COORDINATES_FETCH_FAILED, payload: error.message});
    }

}
*/
