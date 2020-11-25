import React, {
  useState, createContext, useContext,
} from 'react';

import firebase from '@/utils/firebase';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children, post }) => {
  const [users, setUsers] = useState({});
  const [article, setArticle] = React.useState(null);
  const [writerImages, setWriterImages] = React.useState({});
  const [profiles, setProfiles] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [commentsSocialStats, setCommentSocialStats] = React.useState({});
  const [repliesSocialStats, setRepliesSocialStats] = React.useState({});

  React.useEffect(() => {
    const commentsRef = firebase.firestore().collection('comments')
      .where('articleSlug', '==', post.slug)
      .orderBy('socialScore', 'desc');

    const updateUsersCache = async (userId) => {
      if (!users[userId]) {
        const user = await firebase.firestore().collection('users').doc(userId).get();
        setUsers((prevState) => ({
          ...prevState,
          [user.id]: user.data(),
        }));
      }
    };

    const sortArray = (array) => array.sort((a, b) => (b.socialScore - a.socialScore));

    const unsubscribe = commentsRef
      .onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          await updateUsersCache(change.doc.data().userId);
          if (change.type === 'added') {
            setComments((prev) => (
              sortArray([
                ...prev,
                { id: change.doc.id, ...change.doc.data() },
              ])
            ));
            setCommentSocialStats((prev) => ({
              ...prev,
              [change.doc.id]: {
                upvoteCount: change.doc.data().upvoteCount,
                downvoteCount: change.doc.data().downvoteCount,
                replyCount: change.doc.data().replyCount,
              },
            }));
            // This is equivalent to child_added
          }
          if (change.type === 'modified') {
            setComments((prev) => {
              const newArray = prev;
              const index = prev.findIndex((comment) => comment.id === change.doc.id);
              newArray[index] = { ...change.doc.data(), id: change.doc.id };
              return newArray;
            });
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
            // This is equivalent to child_changed
          }
          if (change.type === 'removed') {
            setComments((prev) => prev.filter((comment) => comment.id !== change.doc.id));
            // This is equivalent to child_removed
          }
        });
      });

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
      unsubscribe();
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
