import types from '../../store/types'

export function setUserDataToStore(data) {
  return{
    type: types.FETCH_USER_SUCCESS,
    payload: data
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

