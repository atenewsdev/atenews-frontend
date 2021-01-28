require('firebase/firestore');
require('firebase/database');
require('firebase/auth');
require('firebase/messaging');
require('firebase/analytics');

const firebase = require('firebase/app').default;

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);

  firebase.firestore()
    .enablePersistence().catch(() => {});

  if (typeof navigator !== 'undefined' && 'measurementId' in config) {
    firebase.analytics();
  }
}

module.exports = firebase;
