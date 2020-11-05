import {
  useEffect, useState, createContext, useContext, useCallback,
} from 'react';

import firebase from '@/utils/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    const unsubscribe = firebase.auth()
      .onAuthStateChanged((user) => setAuthUser(user));
    return () => {
      unsubscribe();
    };
  }, []);

  const loginWithEmail = useCallback((email, password) => firebase.auth()
    .signInWithEmailAndPassword(email, password), []);

  const loginWithFacebook = useCallback(() => firebase.auth()
    .signInWithPopup(new firebase.auth.FacebookAuthProvider()), []);

  const loginWithTwitter = useCallback(() => firebase.auth()
    .signInWithPopup(new firebase.auth.TwitterAuthProvider()), []);

  const logout = useCallback(() => firebase.auth().signOut(), []);

  return (
    <AuthContext.Provider value={{
      loginWithEmail, loginWithFacebook, loginWithTwitter, authUser, logout,
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
