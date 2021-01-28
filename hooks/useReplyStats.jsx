/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import firebase from '@/utils/firebase';
import fetch from '@/utils/backendFetch';

import useSWR from 'swr';

const useReplyStats = (id) => {
  const { data, mutate } = useSWR(`/replies/${id}?stats=true`, (path) => fetch.get(path).then((res) => res.json()));

  const getDocument = (documentPath, onUpdate) => {
    firebase.database().ref(documentPath).on('value', onUpdate);

    return () => firebase.database().ref(documentPath).off('value', onUpdate);
  };
  const getData = () => {
    mutate();
  };

  useEffect(() => getDocument(`replyChanges/${id}`, getData), [id]);

  return data;
};

export default useReplyStats;
