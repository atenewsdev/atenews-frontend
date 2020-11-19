import {
  useEffect, useState, createContext, useContext, useCallback,
} from 'react';

import firebase from '@/utils/firebase';
import WP from '@/utils/wordpress';
import useFirestore from './useFirestore';
import { useError } from './useSnackbar';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(firebase.auth().currentUser);
  const [profile, setProfile] = useState(null);

  const { setError, setSuccess } = useError();

  const { getDocument, saveDocument } = useFirestore();

  useEffect(() => {
    const unsubscribe = firebase.auth()
      .onAuthStateChanged(async (user) => {
        setAuthUser(user);
        if (user) {
          getDocument(`users/${user.uid}`, async (data) => {
            setProfile({ ...data, id: user.uid });
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
    .signInWithEmailAndPassword(email, password).then(async () => {
      setSuccess('Welcome! You have successfully logged in.');
    }).catch((err) => {
      setError(err.message);
    }), []);

  const updateProfile = useCallback((document) => firebase.firestore()
    .doc(`users/${firebase.auth().currentUser.uid}`)
    .update(document), []);

  const registerEmail = useCallback((email, password, username) => firebase.auth()
    .createUserWithEmailAndPassword(email, password).then(async () => {
      await firebase.auth().currentUser.sendEmailVerification();
      let wpUser = null;
      // defaults
      let userDoc = {
        commentCount: 0,
        downvotesReceived: 0,
        upvotesReceived: 0,
        staff: false,
        email,
        darkMode: false,
      };
      try {
        wpUser = await WP.usersEmail().email(email);
      } catch (err) {
        wpUser = null;
      }
      if (wpUser) {
        if (wpUser.roles.includes('contributor') || wpUser.roles.includes('editor') || wpUser.roles.includes('administrator')) {
          userDoc = {
            ...userDoc,
            displayName: wpUser.display_name,
            staff: true,
            photoURL: wpUser.avatar,
            followerCount: 0,
            username,
          };
        } else {
          userDoc = {
            ...userDoc,
            username,
            displayName: username,
            staff: false,
          };
        }
        await saveDocument(`wordpress/${wpUser.id}`, {
          id: firebase.auth().currentUser.uid,
        });
      } else {
        userDoc = {
          ...userDoc,
          username,
          displayName: username,
          staff: false,
        };
      }
      await saveDocument(`users/${firebase.auth().currentUser.uid}`, userDoc);
      setSuccess('Registration success! Email verification is required to interact with the community.');
    }).catch((err) => {
      setError(err.message);
    }), []);

  const loginWithFacebook = useCallback(() => firebase.auth()
    .signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(async (result) => {
      if (result.additionalUserInfo.isNewUser) {
        await firebase.auth().signOut();
        setError('This Facebook account has not been connected to any Atenews account yet!');
        setProfile(null);
      } else {
        setSuccess('Welcome! You have successfully logged in.');
      }
    }).catch((err) => {
      setError(err.message);
    }), []);

  const connectWithFacebook = useCallback(() => firebase.auth()
    .currentUser.linkWithPopup(new firebase.auth.FacebookAuthProvider()).then(async (result) => {
      if (result.additionalUserInfo.isNewUser) {
        await firebase.auth().signOut();
        setError('This Twitter account has not been connected to any Atenews account yet!');
        setProfile(null);
      }
    }).catch((err) => {
      setError(err.message);
    }), []);

  const loginWithTwitter = useCallback(() => firebase.auth()
    .signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(async (result) => {
      if (result.additionalUserInfo.isNewUser) {
        await firebase.auth().signOut();
        setError('This Twitter account has not been connected to any Atenews account yet!');
        setProfile(null);
      } else {
        setSuccess('Welcome! You have successfully logged in.');
      }
    }).catch((err) => {
      setError(err.message);
    }), []);

  const connectWithTwitter = useCallback(() => firebase.auth()
    .currentUser.linkWithPopup(new firebase.auth.TwitterAuthProvider()), []);

  const logout = useCallback(() => firebase.auth().signOut().then(() => {
  }).catch((err) => {
    setError(err.message);
  }), []);

  return (
    <AuthContext.Provider value={{
      loginWithEmail,
      registerEmail,
      loginWithFacebook,
      connectWithFacebook,
      loginWithTwitter,
      connectWithTwitter,
      updateProfile,
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
