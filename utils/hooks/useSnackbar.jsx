import {
  useState, createContext, useContext, useEffect,
} from 'react';

import firebase from '@/utils/firebase';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    if (error) {
      firebase.analytics().logEvent('error', {
        error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      firebase.analytics().logEvent('success', {
        success,
      });
    }
  }, [success]);

  useEffect(() => {
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
