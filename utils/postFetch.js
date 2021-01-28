const postFetch = (url, params, auth) => {
  let formBody = [];
  // eslint-disable-next-line guard-for-in
  for (const property in params) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(params[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join('&');
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: auth ? `Bearer ${auth}` : null,
    },
    body: formBody,
  });
};

export default postFetch;
