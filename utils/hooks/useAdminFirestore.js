import firebase from '@/utils/firebaseAdmin';

const useFirestore = () => {
  const getDocument = (documentPath, onUpdate) => {
    firebase.firestore()
      .doc(documentPath)
      .onSnapshot((doc) => {
        if (doc.exists) {
          onUpdate(doc.data());
        } else {
          onUpdate(null);
        }
      });
  };

  const getDocumentOnce = (documentPath) => {
    const { data } = firebase.firestore().doc(documentPath).get();
    if (!data.exists) {
      return null;
    }
    return data.data();
  };

  const saveDocument = (documentPath, document) => {
    firebase.firestore()
      .doc(documentPath)
      .set(document, { merge: true });
  };

  const getCollectionOnce = (collectionPath) => {
    const { data } = firebase.firestore().collection(collectionPath).get();
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
    firebase,
  };
};

export default useFirestore;
