import types from '../../store/types'

export function fetchDB() {
  return{
    type: types.DB_FETCH
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

