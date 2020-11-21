import {
  useEffect, useState, createContext, useContext,
} from 'react';

import firebase from '@/utils/firebase';

export const TrendingContext = createContext();

export const TrendingProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.database().ref('articles').orderByChild('trendScore').limitToLast(5)
      .on('value', (doc) => {
        if (doc) {
          const values = doc.val();
          setTrending(Object.keys(values).map((key) => {
            const obj = values[key];
            const backupCat = obj.categories;
            if (obj.categories) {
              obj.categories = Object.keys(backupCat).map((keyCat) => backupCat[keyCat]);
            }
            obj.slug = key;
            if (obj.trashed) {
              return null;
            }
            return obj;
          }).sort((a, b) => b.trendScore - a.trendScore));
        }
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
