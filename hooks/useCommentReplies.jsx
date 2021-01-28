/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';

import firebase from '@/utils/firebase';
import fetch from '@/utils/backendFetch';

import useSWR from 'swr';

const useCommentReplies = (commentId, callback) => {
  const { data, mutate } = useSWR(`/replies?id=${commentId}`, (path) => fetch.get(path).then((res) => res.json()));

  const getDocument = (documentPath, onUpdate) => {
    firebase.database().ref(documentPath).on('value', onUpdate);

    return () => firebase.database().ref(documentPath).off('value', onUpdate);
  };
  const getData = () => {
    callback();
    mutate();
  };

  useEffect(() => getDocument(`replyCommentChanges/${commentId}`, getData), [commentId]);

  return data;
};

export default useCommentReplies;
