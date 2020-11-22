import {
  useEffect, useState, createContext, useContext,
} from 'react';

import firebase from '@/utils/firebase';

export const TrendingContext = createContext();

export const TrendingProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.database().ref('articles').orderByChild('trendScore').limitToLast(10)
      .on('value', (doc) => {
        if (doc) {
          const values = doc.val();
          const result = [];
          Object.keys(values).forEach((key) => {
            const obj = values[key];
            const backupCat = obj.categories;
            if (obj.categories) {
              obj.categories = Object.keys(backupCat).map((keyCat) => backupCat[keyCat]);
            }
            obj.slug = key;
            if (!obj.trashed) {
              result.push(obj);
            }
          });
          setTrending(result.sort((a, b) => b.trendScore - a.trendScore).slice(0, 5));
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
