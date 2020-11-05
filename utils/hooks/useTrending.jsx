import {
  useEffect, useState, createContext, useContext,
} from 'react';

import firebase from '@/utils/firebase';

export const TrendingContext = createContext();

export const TrendingProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('articles').orderBy('trendScore', 'desc').limit(5)
      .onSnapshot((querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
          articles.push({ id: doc.id, ...doc.data() });
        });

        setTrending(articles);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TrendingContext.Provider value={trending}>
      {children}
    </TrendingContext.Provider>
  );
};

export const useTrending = () => {
  const trending = useContext(TrendingContext);
  return trending;
};
