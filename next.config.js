const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
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

module.exports = withPWA(withBundleAnalyzer({}));
