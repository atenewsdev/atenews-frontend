import React from 'react';

import firebase from '@/utils/firebase';
import fetch from '@/utils/backendFetch';

const useVoteCommentReply = (id, mode) => {
  const [vote, _setVote] = React.useState(null);
  React.useEffect(() => {
    fetch.get(`/votes/${mode}/${id}`).then((res) => res.json()).then((_react) => {
      _setVote(_react);
    }).catch(() => {
      // do nothing
    });
  }, []);

  const setVote = (content) => {
    const user = firebase.auth().currentUser.uid;
    const backupReact = vote;
    if (vote?.content === content) {
      _setVote(null);
    } else {
      _setVote({ [`${mode}`]: id, user, content });
    }

    fetch.post(`/votes/${mode}/${id}`, { content }).then((res) => res.json()).then((_react) => {
      _setVote(_react);
    }).catch(() => {
      // do nothing
      _setVote(backupReact);
    });
  };

  return [vote, setVote];
};

export default useVoteCommentReply;
