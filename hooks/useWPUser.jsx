import React from 'react';

import fetch from '@/utils/backendFetch';

const useWPUser = (wpId) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    fetch.get(`/wp-users/${wpId}`).then((res) => res.json()).then((_user) => {
      setUser(_user);
    }).catch(() => {
      // do nothing
    });
  }, []);

  return user;
};

export default useWPUser;
