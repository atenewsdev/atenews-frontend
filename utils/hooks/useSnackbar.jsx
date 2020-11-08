import {
  useState, createContext, useContext,
} from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [warning, setWarning] = useState(null);

  return (
    <ErrorContext.Provider value={{
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
