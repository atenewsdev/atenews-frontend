import {
  useState, createContext, useContext,
} from 'react';

export const CacheContext = createContext();

export const CacheProvider = ({ children }) => {
  const [users, setUsers] = useState({});

  return (
    <CacheContext.Provider value={{ users: [users, setUsers] }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  const cache = useContext(CacheContext);
  return cache;
};
