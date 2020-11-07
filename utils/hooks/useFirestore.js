import firebase from '@/utils/firebase';
import useSWR from 'swr';

const useFirestore = () => {
  const getDocument = (documentPath, onUpdate) => {
    firebase.firestore()
      .doc(documentPath)
      .onSnapshot((doc) => {
        if (doc.exists) {
          onUpdate(doc.data());
        } else {
          onUpdate({});
        }
      });
  };

  const getDocumentOnce = (documentPath) => {
    const { data } = useSWR(documentPath, (path) => firebase.firestore().doc(path).get());
    if (!data.exists) {
      return {};
    }
    return data.data();
  };

  const saveDocument = (documentPath, document) => {
    firebase.firestore()
      .doc(documentPath)
      .set(document);
  };

  const getCollectionOnce = (collectionPath) => {
    const { data } = useSWR(collectionPath, (path) => firebase.firestore().collection(path).get());
    let collection = [];
    if (data) {
      collection = data.docs.map((u) => {
        const tmp = { id: u.id };
        Object.keys(u.data()).forEach((key) => {
          if (key === 'timestamp') {
            tmp[key] = u.data()[key].toDate();
          } else {
            tmp[key] = u.data()[key];
          }
        });

        return tmp;
      });
    }
    return collection;
  };

  const getCollection = (collectionPath, onUpdate) => {
    firebase.firestore()
      .collection(collectionPath)
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        onUpdate(data);
      });
  };

  const saveCollection = (collectionPath, collection) => {
    firebase.firestore()
      .collection(collectionPath)
      .set(collection);
  };

  return {
    getDocument,
    getDocumentOnce,
    saveDocument,
    getCollection,
    getCollectionOnce,
    saveCollection,
  };
};

export default useFirestore;
