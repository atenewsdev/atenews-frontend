import React, {
  useState, createContext, useContext,
} from 'react';

import firebase from '@/utils/firebase';

import useFirestoreSubscribe from '@/utils/hooks/useFirestoreSubscribe';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children, post }) => {
  const [users, setUsers] = useState({});
  const [article, setArticle] = React.useState(null);
  const [writerImages, setWriterImages] = React.useState({});
  const [profiles, setProfiles] = React.useState({});
  const [commentsSocialStats, setCommentSocialStats] = React.useState({});
  const [repliesSocialStats, setRepliesSocialStats] = React.useState({});

  const updateUsersCache = async (userId) => {
    if (!users[userId]) {
      const user = await firebase.firestore().collection('users').doc(userId).get();
      setUsers((prevState) => ({
        ...prevState,
        [user.id]: user.data(),
      }));
    }
  };

  const [comments, setComments] = useFirestoreSubscribe(
    firebase.firestore().collection('comments')
      .where('articleSlug', '==', post.slug)
      .orderBy('socialScore', 'desc'),
    {
      added: async (change) => {
        await updateUsersCache(change.doc.data().userId);
        setCommentSocialStats((prev) => ({
          ...prev,
          [change.doc.id]: {
            upvoteCount: change.doc.data().upvoteCount,
            downvoteCount: change.doc.data().downvoteCount,
            replyCount: change.doc.data().replyCount,
          },
        }));
      },
      modified: (change) => {
        if (commentsSocialStats[change.doc.id] !== {
          upvoteCount: change.doc.data().upvoteCount,
          downvoteCount: change.doc.data().downvoteCount,
          replyCount: change.doc.data().replyCount,
        }) {
          setCommentSocialStats((prev) => ({
            ...prev,
            [change.doc.id]: {
              upvoteCount: change.doc.data().upvoteCount,
              downvoteCount: change.doc.data().downvoteCount,
              replyCount: change.doc.data().replyCount,
            },
          }));
        }
      },
      sort: (a, b) => (b.socialScore - a.socialScore),
    },
  );

  React.useEffect(() => {
    const statsRef = firebase.database().ref(`articles/${post.slug}`);
    statsRef.once('value').then((data) => {
      setArticle(data.val());
    });

    const onUpdate = (data) => {
      setArticle((prev) => ({
        ...prev,
        [data.ref.key]: data.val(),
      }));
    };
    statsRef.on('child_changed', onUpdate);

    return () => {
      statsRef.off('child_changed', onUpdate);
    };
  }, []);

  return (
    <ArticleContext.Provider
      value={{
        users: { users, setUsers },
        article: { article, setArticle },
        writerImages: { writerImages, setWriterImages },
        profiles: { profiles, setProfiles },
        comments: {
          comments, setComments, commentsSocialStats, setCommentSocialStats,
        },
        replies: { repliesSocialStats, setRepliesSocialStats },
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const article = useContext(ArticleContext);
  return article;
};
