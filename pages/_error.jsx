import React from 'react';

import Error from '@/components/Error';

const CustomError = ({ statusCode, error }) => {
  React.useEffect(() => {
    const params = {
      error,
    };

    let formBody = [];
    // eslint-disable-next-line guard-for-in
    for (const property in params) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(params[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join('&');

    fetch('/api/bugs/report', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    }).then((response) => response.json());
  }, []);
  return <Error statusCode={statusCode} />;
};

CustomError.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, error: JSON.stringify(res || err) };
};

export default CustomError;
