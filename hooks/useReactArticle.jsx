import React from 'react';

import firebase from '@/utils/firebase';
import fetch from '@/utils/backendFetch';

const useReactArticle = (articleSlug) => {
  const [react, _setReact] = React.useState(null);
  React.useEffect(() => {
    fetch.get(`/reacts/${articleSlug}`).then((res) => res.json()).then((_react) => {
      _setReact(_react);
    }).catch(() => {
      // do nothing
    });
  }, []);

  const setReact = (content) => {
    const user = firebase.auth().currentUser.uid;
    const backupReact = react;
    if (react?.content === content) {
      _setReact({ article: articleSlug, user, content: null });
    } else {
      _setReact({ article: articleSlug, user, content });
    }

    fetch.post(`/reacts/${articleSlug}`, { content }).then((res) => res.json()).then((_react) => {
      _setReact(_react);
    }).catch(() => {
      // do nothing
      _setReact(backupReact);
    });
  };

  return [react, setReact];
};

export default useReactArticle;
