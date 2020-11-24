import React from 'react';

import CommentField from '@/components/Social/CommentField';
import Template from '@/components/Social/CommentReplyTemplate';
import useFirebase from '@/utils/hooks/useFirestore';
import { useCache } from '@/utils/hooks/useCache';

export default function Page({
  user: commentUser,
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
  const { users: [users, setUsers] } = useCache();

  let repliesUnsubscribe = () => { };

  const getReplies = () => {
    if (showReplies) {
      setShowReplies(false);
      repliesUnsubscribe();
    } else {
      repliesUnsubscribe = firebase.firestore().collection('replies')
        .where('commentId', '==', commentId)
        .orderBy('timestamp', 'asc')
        .onSnapshot(async (snapshot) => {
          const tempReplies = [];
          await Promise.all(snapshot.docs.map(async (doc) => {
            if (!users[doc.data().userId]) {
              const user = await firebase.firestore().collection('users').doc(doc.data().userId).get();
              setUsers((prevState) => ({
                ...prevState,
                [user.id]: user.data(),
              }));
            }
            tempReplies.push({ id: doc.id, ...doc.data() });
          }));
          setShowReplies(true);
          setReplies(
            tempReplies.sort((a, b) => (
              a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime()
            )),
          );
        });
    }
  };

  React.useEffect(() => {
    setShowReplies(false);
    repliesUnsubscribe();
    return () => {
      repliesUnsubscribe();
    };
  }, [commentId]);
  return (
    <Template
      user={commentUser}
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
          { replies.map((reply) => (
            <Template
              replyId={reply.id}
              key={reply.id}
              user={{
                name: users[reply.userId].displayName,
                avatar: users[reply.userId].photoURL,
                staff: users[reply.userId].staff,
              }}
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
          ))}
        </>
      ) : null }
    </Template>
  );
}
