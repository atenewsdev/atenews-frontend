importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js');

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

  firebase.messaging().setBackgroundMessageHandler(async (payload) => {
    let newNotifs = [payload.data];
    const notifs = await localforage.getItem('atenews-notifs');
    if (notifs) {
      newNotifs = [...newNotifs, ...JSON.parse(notifs)]
    }
    await localforage.setItem('atenews-notifs', JSON.stringify(newNotifs));
    self.registration.showNotification(payload.data.description, {
      badge: '/icons/alpha.png',
      body: payload.data.title,
      actions: [{
        action: 'read',
        title: 'Read new article'
      }],
      icon: '/icons/maskable_512x512.png',
      image: payload.data.featured_photo,
      tag: 'atenews-article',
      data: { ...payload.data },
      vibrate: [300, 100, 400],
    });
  });
}
