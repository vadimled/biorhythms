import {takeEvery, takeLatest} from "redux-saga/effects";
import types from '../types'
import {setNewEntrySaga, fetchUserSaga, loginUserSaga, registryUserSaga} from "../saga/sagas";

export function* watchSaga() {
    yield takeEvery(types.DB_ADD_NEW_ENTRY, setNewEntrySaga);
    yield takeEvery(types.FETCH_USER, fetchUserSaga);
    yield takeLatest(types.ON_LOGIN_USER, loginUserSaga);
    yield takeLatest(types.ON_REGISTER_USER, registryUserSaga);
}
