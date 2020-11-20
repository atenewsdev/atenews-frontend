import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Layout from '@/components/Layout';
import theme from '@/styles/theme';
import Router from 'next/router';

import NProgress from 'nprogress';
import '@/styles/nprogress.css';
import '@/styles/main.css';
import 'react-gutenberg/default.css';

import { TrendingProvider } from '@/utils/hooks/useTrending';
import { AuthProvider } from '@/utils/hooks/useAuth';
import { ErrorProvider } from '@/utils/hooks/useSnackbar';
import { CacheProvider } from '@/utils/hooks/useCache';
import useFirestore from '@/utils/hooks/useFirestore';

import { CssBaseline } from '@material-ui/core';

import firebase from '@/utils/firebase';

NProgress.configure({
  showSpinner: false,
});

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

Router.events.on('routeChangeComplete', () => { window.scrollTo(0, 0); });

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const { saveDocument } = useFirestore();

  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    firebase.auth().onAuthStateChanged(() => {
      if (!firebase.auth().currentUser) {
        setDarkMode(false);
      }
    });
  }, []);

  React.useEffect(() => {
    if (firebase.auth().currentUser) {
      saveDocument(`users/${firebase.auth().currentUser.uid}`, { darkMode });
    }
  }, [darkMode]);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      </Head>
      <ThemeProvider theme={theme(darkMode)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CacheProvider>
            <ErrorProvider>
              <AuthProvider>
                <TrendingProvider>
                  <Layout setDarkMode={setDarkMode}>
                    <Component {...pageProps} />
                  </Layout>
                </TrendingProvider>
              </AuthProvider>
            </ErrorProvider>
          </CacheProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
