import axios from "../store/axios-orders";
import axs from "axios";

export const fetchUserApi = () => {
  return axs.get('/api/current_user');
};

export const loginWithGoogleApi = () => {
  return axs('/auth/google', {
    method: 'POST',
    data : {test: 1234567},
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  })
};

export const fetchDatabaseApi = () => {
  return axios('/db.json', {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: false
  })
};

export const setNewEntryApi = (data) => {
  return axios(`/db.json`, {
    method: 'POST',
    data,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  })
};

export const deleteEntryApi = (id) => {
  return axios(`/db/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  });
};

export const editEntryApi = (data) => {
  return axios(`/db/${data.id}.json`, {
    method: 'PUT',
    data: data.edited,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  });
};

