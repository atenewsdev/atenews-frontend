import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

import Template from '@/components/Social/CommentReplyTemplate';
import useFirebase from '@/utils/hooks/useFirestore';
import { useArticle } from '@/utils/hooks/useArticle';
import useFirestoreSubscribe from '@/utils/hooks/useFirestoreSubscribe';

export default function Replies({
  commentId,
  slug,
}) {
  const { firebase } = useFirebase();
  const [loading, setLoading] = React.useState(true);

  const {
    users: { users, setUsers },
    replies: { repliesSocialStats, setRepliesSocialStats },
  } = useArticle();

  const updateUsersCache = async (userId) => {
    if (!users[userId]) {
      const user = await firebase.firestore().collection('users').doc(userId).get();
      setUsers((prevState) => ({
        ...prevState,
        [user.id]: user.data(),
      }));
    }
  };

  const repliesRef = firebase.firestore().collection('replies')
    .where('commentId', '==', commentId)
    .orderBy('timestamp', 'asc');

  const [replies] = useFirestoreSubscribe(repliesRef, {
    added: async (change) => {
      await updateUsersCache(change.doc.data().userId);
      setRepliesSocialStats((prev) => ({
        ...prev,
        [change.doc.id]: {
          upvoteCount: change.doc.data().upvoteCount,
          downvoteCount: change.doc.data().downvoteCount,
        },
      }));
    },
    modified: (change) => {
      if (repliesSocialStats[change.doc.id] !== {
        upvoteCount: change.doc.data().upvoteCount,
        downvoteCount: change.doc.data().downvoteCount,
      }) {
        setRepliesSocialStats((prev) => ({
          ...prev,
          [change.doc.id]: {
            upvoteCount: change.doc.data().upvoteCount,
            downvoteCount: change.doc.data().downvoteCount,
          },
        }));
      }
    },
    sort: (a, b) => (
      a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime()
    ),
    any: () => {
      setLoading(false);
    },
  });

  if (loading) {
    return (
      <Grid container direction="row" justify="center">
        <CircularProgress style={{ marginTop: 100, marginBottom: 100 }} />
      </Grid>
    );
  }

  return (
    <>
      { replies.map((reply) => (repliesSocialStats[reply.id] ? (
        <Template
          replyId={reply.id}
          key={reply.id}
          comment={reply.content}
          socialStats={{
            upvoteCount: reply.upvoteCount,
            downvoteCount: reply.downvoteCount,
          }}
          timestamp={reply.timestamp.toDate()}
          slug={slug}
          commenterId={reply.userId}
          reply
        />
      ) : null))}
    </>
  );
}
