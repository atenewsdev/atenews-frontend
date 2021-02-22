const withPWA = require('next-pwa');
require('next/webpack-backwards-compat-require-hook');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    // importScripts: ['/firebase-messaging-sw.js'],
    disable: process.env.NODE_ENV === 'development',
    register: true,
  },
  images: {
    domains: ['wp.atenews.ph'],
  },
  async redirects() {
    return [
      {
        source: '/admin-login',
        destination: 'https://wp.atenews.ph/admin-login',
        permanent: false,
      },
      {
        source: '/wp-admin/:path*',
        destination: 'https://wp.atenews.ph/wp-admin/:path*',
        permanent: false,
      },
    ];
  },
});
