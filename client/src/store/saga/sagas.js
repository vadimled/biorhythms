import {call, put} from 'redux-saga/effects';
import types from '../types'
import * as api from '../../api';
import * as userActions from '../actions/userActions';
import * as registerActions from '../actions/registerActions';
import * as loginActions from '../actions/loginActions';

export function* registryUserSaga(action) {
  try {
    yield put(userActions.setLoading(true));
    const result = yield call(api.registryUserApi, action.payload);
    if (result.data.status === 400) {
      yield put(registerActions.setRegServerError(result.data.errors));
    } else if (result.status === 200) {
      yield put(registerActions.userRegisteredSuccess(true));
    }
  } catch (error) {
    yield put({type: types.REGISTER_FAILED, payload: error.message});
  }
  yield put(userActions.setLoading(false));
}

export function* loginUserSaga(action) {
  try {
    yield put(userActions.setLoading(true));
    const result = yield call(api.loginUserApi, action.payload);
    if (result.data.status === 400) {
      yield put(loginActions.setLoginServerError(result.data.errors));
    } else if (result.data) {
      yield put(userActions.setUserDataToStore(result.data));
      yield put(loginActions.userLoggedInSuccess());
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
    const result = yield call(api.fetchUserApi);
    if (result.data) {
       yield put(userActions.setUserDataToStore(result.data));
      yield put(loginActions.userLoggedInSuccess());
    }
    else if (!result.data) {
      yield put(loginActions.setUserLoggedOut());
    }
  } catch (error) {
    yield put({type: types.FETCH_USER_FAILED, payload: error.message});
  }
  yield put(userActions.setLoading(false));
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
