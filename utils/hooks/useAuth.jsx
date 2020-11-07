import {
  useEffect, useState, createContext, useContext, useCallback,
} from 'react';

import firebase from '@/utils/firebase';
import useFirestore from './useFirestore';
import { useError } from './useError';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(firebase.auth().currentUser);
  const [profile, setProfile] = useState(null);

  const { setError } = useError();

  const { getDocument } = useFirestore();

  useEffect(() => {
    const unsubscribe = firebase.auth()
      .onAuthStateChanged((user) => {
        setAuthUser(user);
        if (user) {
          getDocument(`users/${user.uid}`, (data) => {
            setProfile(data);
          });
        } else {
          setProfile(null);
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const loginWithEmail = useCallback((email, password) => firebase.auth()
    .signInWithEmailAndPassword(email, password), []);

  const loginWithFacebook = useCallback(() => firebase.auth()
    .signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((result) => {
      if (result.additionalUserInfo.isNewUser) {
        const user = firebase.auth().currentUser;
        user.delete().then(() => {
          setError('This Facebook account has not been connected to any Atenews account yet!');
        });
      }
    }), []);

  const connectWithFacebook = useCallback(() => firebase.auth()
    .currentUser.linkWithPopup(new firebase.auth.FacebookAuthProvider()), []);

  const loginWithTwitter = useCallback(() => firebase.auth()
    .signInWithPopup(new firebase.auth.TwitterAuthProvider()).then((result) => {
      if (result.additionalUserInfo.isNewUser) {
        const user = firebase.auth().currentUser;
        user.delete().then(() => {
          setError('This Twitter account has not been connected to any Atenews account yet!');
        });
      }
    }), []);

  const connectWithTwitter = useCallback(() => firebase.auth()
    .currentUser.linkWithPopup(new firebase.auth.TwitterAuthProvider()), []);

  const logout = useCallback(() => firebase.auth().signOut(), []);

  return (
    <AuthContext.Provider value={{
      loginWithEmail,
      loginWithFacebook,
      connectWithFacebook,
      loginWithTwitter,
      connectWithTwitter,
      authUser,
      profile,
      logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
