import types from '../../store/types'

export function setUserDataToStore(data) {
  return{
    type: types.FETCH_USER_SUCCESS,
    payload: data
  }
}

export function loginWithGoogle() {
  return{
    type: types.LOGIN_WITH_GOOGLE
  }
}

export function setUserLogedOut() {
  return{
    type: types.SET_USER_LOGED_OUT
  }
}

export function fetchDB() {
  return{
    type: types.DB_FETCH
  }
}

export function fetchUser() {
  return{
    type: types.FETCH_USER
  }
}

export function setDatabaseToStore(dataArray) {
  return {
    type: types.DB_FETCH_SUCCESS,
    payload: dataArray
  }
}

export function addDBEntry(data) {
  return {
    type: types.DB_ADD_NEW_ENTRY,
    payload: data
  }
}

export function addNewEntryToStore(data) {
  return {
    type: types.DB_ADD_NEW_ENTRY_SUCCESS,
    payload: data
  }
}

export function setDbError(data) {
  return {
    type: types.DB_SET_ERROR,
    payload: data
  }
}

