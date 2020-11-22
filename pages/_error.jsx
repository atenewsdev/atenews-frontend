import React from 'react';

import Error from '@/components/Error';

const CustomError = ({ statusCode }) => (
  <Error statusCode={statusCode} />
);

CustomError.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
