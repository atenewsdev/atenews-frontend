import {
  useState, createContext, useContext,
} from 'react';

import firebase from '@/utils/firebase';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [warning, setWarning] = useState(null);

  React.useEffect(() => {
    if (error) {
      firebase.analytics().logEvent('error', {
        error,
      });
    }
  }, [error]);

  React.useEffect(() => {
    if (success) {
      firebase.analytics().logEvent('success', {
        success,
      });
    }
  }, [success]);

  React.useEffect(() => {
    if (warning) {
      firebase.analytics().logEvent('warning', {
        warning,
      });
    }
  }, [warning]);

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
        success,
        setSuccess,
        warning,
        setWarning,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const auth = useContext(ErrorContext);
  return auth;
};
