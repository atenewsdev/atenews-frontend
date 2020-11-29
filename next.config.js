const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    // importScripts: ['/firebase-messaging-sw.js'],
    disable: process.env.NODE_ENV === 'development',
    register: true,
  },
  images: {
    domains: ['atenews.ph'],
  },
});
