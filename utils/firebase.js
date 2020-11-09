import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyDZUirIEu-BkcM6Hr6l0bvTCI_E4lwQ5Bo',
  authDomain: 'atenews-socials.firebaseapp.com',
  databaseURL: 'https://atenews-socials.firebaseio.com',
  projectId: 'atenews-socials',
  storageBucket: 'atenews-socials.appspot.com',
  messagingSenderId: '917329069343',
  appId: '1:917329069343:web:e8d2d1855c56b84f595c2a',
  measurementId: 'G-F1WVWQC97X',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
