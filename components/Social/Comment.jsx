import React from 'react';

import CommentField from '@/components/Social/CommentField';
import Template from '@/components/Social/CommentReplyTemplate';
import useFirebase from '@/utils/hooks/useFirestore';
import { useArticle } from '@/utils/hooks/useArticle';

export default function Page({
  comment: commentContent,
  socialStats: commentSocialStats,
  commenterId,
  commentId,
  slug,
  timestamp,
}) {
  const { firebase } = useFirebase();
  const [showReplies, setShowReplies] = React.useState(false);
  const [replies, setReplies] = React.useState([]);
  const {
    users: { users, setUsers },
    replies: { repliesSocialStats, setRepliesSocialStats },
  } = useArticle();

  let repliesUnsubscribe = () => { };

  const getReplies = () => {
    if (showReplies) {
      setShowReplies(false);
      repliesUnsubscribe();
    } else {
      const repliesRef = firebase.firestore().collection('replies')
        .where('commentId', '==', commentId)
        .orderBy('timestamp', 'asc');

      const updateUsersCache = async (userId) => {
        if (!users[userId]) {
          const user = await firebase.firestore().collection('users').doc(userId).get();
          setUsers((prevState) => ({
            ...prevState,
            [user.id]: user.data(),
          }));
        }
      };

      const sortArray = (array) => array.sort((a, b) => (
        a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime()
      ));

      repliesUnsubscribe = repliesRef
        .onSnapshot(async (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
              await updateUsersCache(change.doc.data().userId);
              setReplies((prev) => (
                sortArray([
                  ...prev,
                  { id: change.doc.id, ...change.doc.data() },
                ])
              ));
              setRepliesSocialStats((prev) => ({
                ...prev,
                [change.doc.id]: {
                  upvoteCount: change.doc.data().upvoteCount,
                  downvoteCount: change.doc.data().downvoteCount,
                },
              }));
            // This is equivalent to child_added
            }
            if (change.type === 'modified') {
              setReplies((prev) => {
                const newArray = prev;
                const index = prev.findIndex((comment) => comment.id === change.doc.id);
                newArray[index] = { ...change.doc.data(), id: change.doc.id };
                return newArray;
              });
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
            // This is equivalent to child_changed
            }
            if (change.type === 'removed') {
              setReplies((prev) => prev.filter((comment) => comment.id !== change.doc.id));
            // This is equivalent to child_removed
            }
            setShowReplies(true);
          });
        });
    }
  };

  React.useEffect(() => {
    setShowReplies(false);
    repliesUnsubscribe();
    return () => {
      repliesUnsubscribe();
    };
  }, []);

  return (
    <Template
      comment={commentContent}
      socialStats={commentSocialStats}
      getReplies={getReplies}
      timestamp={timestamp}
      slug={slug}
      commentId={commentId}
      commenterId={commenterId}
    >
      { showReplies ? (
        <>
          <CommentField slug={slug} commentId={commentId} reply />
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
      ) : null }
    </Template>
  );
}
