import types from '../../store/types'

export function setUserDataToStore(data) {
  return{
    type: types.FETCH_USER_SUCCESS,
    payload: data
  }
}

export function fetchUser() {
  return{
    type: types.FETCH_USER
  }
}

export function setLoading(status) {
  return {
    type: types.SET_LOADING,
    payload: status
  }
}

