import firebase from '@/utils/firebase';
import useSWR from 'swr';

const useFirestore = () => {
  const getDocument = (documentPath, onUpdate) => {
    firebase.database()
      .ref(documentPath)
      .on('value', (doc) => {
        if (doc.exists()) {
          onUpdate(doc.val());
        } else {
          onUpdate(null);
        }
      });
  };

  const getDocumentOnce = (documentPath) => {
    const { data } = useSWR(documentPath, (path) => firebase.database().ref(path).once('value'));
    if (!data.exists()) {
      return null;
    }
    return data.val();
  };

  const saveDocument = async (documentPath, document) => {
    await firebase.database()
      .ref(documentPath)
      .set(document, { merge: true });
  };

  return {
    getDocument,
    getDocumentOnce,
    saveDocument,
  };
};

export default useFirestore;
