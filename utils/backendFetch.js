const firebase = require('@/utils/firebase');

const BACKEND_URL = 'https://api.atenews.ph/v1';

const postFetch = async (url, params) => {
  let formBody = [];
  const auth = await firebase.auth().currentUser?.getIdToken();
  // eslint-disable-next-line guard-for-in
  for (const property in params) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(params[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join('&');
  return fetch(`${BACKEND_URL}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: auth ? `Bearer ${auth}` : null,
    },
    body: formBody,
  });
};

const getFetch = async (url) => {
  const auth = await firebase.auth().currentUser?.getIdToken();
  return fetch(`${BACKEND_URL}${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth ? `Bearer ${auth}` : null,
    },
  });
};

const putFetch = async (url, params) => {
  const auth = await firebase.auth().currentUser?.getIdToken();
  let formBody = [];
  // eslint-disable-next-line guard-for-in
  for (const property in params) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(params[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join('&');
  return fetch(`${BACKEND_URL}${url}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: auth ? `Bearer ${auth}` : null,
    },
    body: formBody,
  });
};

const deleteFetch = async (url) => {
  const auth = await firebase.auth().currentUser?.getIdToken();
  return fetch(`${BACKEND_URL}${url}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: auth ? `Bearer ${auth}` : null,
    },
  });
};

module.exports = {
  post: postFetch, get: getFetch, put: putFetch, delete: deleteFetch,
};
