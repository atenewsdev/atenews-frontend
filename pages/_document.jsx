/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

import 'firebase/firestore';
import 'firebase/auth';
import { Fuego, setFuego } from '@nandorojo/swr-firestore';

setFuego(
  new Fuego({
    apiKey: 'AIzaSyDZUirIEu-BkcM6Hr6l0bvTCI_E4lwQ5Bo',
    authDomain: 'atenews-socials.firebaseapp.com',
    databaseURL: 'https://atenews-socials.firebaseio.com',
    projectId: 'atenews-socials',
    storageBucket: 'atenews-socials.appspot.com',
    messagingSenderId: '917329069343',
    appId: '1:917329069343:web:e8d2d1855c56b84f595c2a',
    measurementId: 'G-F1WVWQC97X',
  }),
);

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Atenews" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Atenews" />
          <meta name="description" content="The official student publication of the Ateneo de Davao University" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#195EA9" />

          <link rel="manifest" href="/manifest.json" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link rel="icon" href="/icons/cropped-atenews-header-logo-1-32x32.png" sizes="32x32" />
          <link rel="icon" href="/icons/cropped-atenews-header-logo-1-192x192.png" sizes="192x192" />
          <link rel="apple-touch-icon" href="/icons/cropped-atenews-header-logo-1-180x180.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
