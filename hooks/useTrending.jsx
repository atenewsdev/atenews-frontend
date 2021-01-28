import {
  useEffect, createContext, useContext,
} from 'react';

import firebase from '@/utils/firebase';
import fetch from '@/utils/backendFetch';

import useSWR from 'swr';

export const TrendingContext = createContext();

export const TrendingProvider = ({ children }) => {
  const { data, mutate } = useSWR('/trending', (path) => fetch.get(path).then((res) => res.json()));

  useEffect(() => {
    const unsubscribe = firebase.database().ref('generalChanges/articles').on('value', () => {
      mutate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TrendingContext.Provider value={data}>
      {children}
    </TrendingContext.Provider>
  );
};

export const useTrending = () => {
  const trending = useContext(TrendingContext);
  return trending;
};
