import { useState, useEffect } from 'react';

const useFirestoreSubscribe = (
  docRef,
  {
    added = () => {},
    modified = () => {},
    removed = () => {},
    any = () => {},
    started = () => {},
    sort = null,
  },
) => {
  const [doc, setDoc] = useState([]);

  const sortArray = (array) => (sort ? array.sort(sort) : array);

  useEffect(() => {
    started();
    const unsubscribe = docRef.onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          added(change);
          setDoc((prev) => sortArray([
            ...prev,
            { id: change.doc.id, ...change.doc.data() },
          ]));
          // This is equivalent to child_added
        }
        if (change.type === 'modified') {
          modified(change);
          setDoc((prev) => {
            const newArray = prev;
            const index = prev.findIndex((comment) => comment.id === change.doc.id);
            newArray[index] = { ...change.doc.data(), id: change.doc.id };
            return sortArray(newArray);
          });
          // This is equivalent to child_changed
        }
        if (change.type === 'removed') {
          removed(change);
          setDoc((prev) => prev.filter((comment) => comment.id !== change.doc.id));
          // This is equivalent to child_removed
        }
        any();
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return [doc, setDoc];
};

export default useFirestoreSubscribe;
