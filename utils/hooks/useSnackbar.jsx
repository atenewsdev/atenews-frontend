import {
  useState, createContext, useContext, useEffect,
} from 'react';

import firebase from '@/utils/firebase';

import { useAlert } from 'react-alert';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const alert = useAlert();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    if (error) {
      firebase.analytics().logEvent('error', {
        error,
      });
      alert.error(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      firebase.analytics().logEvent('success', {
        success,
      });
      alert.success(success);
      setSuccess(null);
    }
  }, [success]);

  useEffect(() => {
    if (warning) {
      firebase.analytics().logEvent('warning', {
        warning,
      });
      alert.info(warning);
      setWarning(null);
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
