importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

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

self.onnotificationclick = (event) => {
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == self.registration.scope && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow(`/${event.notification.data.slug}`);
    }
  }));
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);

  firebase.messaging();

  firebase.messaging().setBackgroundMessageHandler((payload) => {
    console.log('payload', payload.data)
    self.registration.showNotification('Check out our new article!', {
      body: payload.data.title,
      icon: '/icons/icon-512x512.png',
      tag: 'atenews-article',
      data: { ...payload.data },
    })
  });
}
