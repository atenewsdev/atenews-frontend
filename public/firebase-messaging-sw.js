importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');

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

console.log('test');
if (!firebase.apps.length) {
  firebase.initializeApp(config);

  firebase.messaging();

  firebase.messaging().setBackgroundMessageHandler((payload) =>
    console.log('payload', payload)
  );
}
