import {takeEvery, takeLatest} from "redux-saga/effects";
import types from '../types'
import {fetchDatabaseSaga, setNewEntrySaga, fetchUserSaga, loginWithGoogleSaga} from "../saga/sagas";

export function* watchSaga() {
    yield takeEvery(types.DB_FETCH, fetchDatabaseSaga);
    yield takeEvery(types.DB_ADD_NEW_ENTRY, setNewEntrySaga);
    yield takeEvery(types.FETCH_USER, fetchUserSaga);
    yield takeLatest(types.LOGIN_WITH_GOOGLE, loginWithGoogleSaga);
}
