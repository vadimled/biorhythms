import {takeEvery, takeLatest} from "redux-saga/effects";
import types from '../types'
import {fetchDatabaseSaga, setNewEntrySaga/*,deleteEntrySaga, editEntrySaga*/} from "../saga/sagas";

export function* watchSaga() {
    yield takeEvery(types.DB_FETCH, fetchDatabaseSaga);
    yield takeEvery(types.DB_ADD_NEW_ENTRY, setNewEntrySaga);
    // yield takeEvery(types.DB_DELETE_ITEM, deleteEntrySaga);
    // yield takeEvery(types.DB_EDIT_ITEM, editEntrySaga);
}
