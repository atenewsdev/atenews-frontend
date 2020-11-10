import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
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

import { TrendingProvider, useTrending } from '@/utils/hooks/useTrending';
import { AuthProvider } from '@/utils/hooks/useAuth';
import { ErrorProvider } from '@/utils/hooks/useSnackbar';
import { CacheProvider } from '@/utils/hooks/useCache';
import useFirestore from '@/utils/hooks/useFirestore';

import { CssBaseline, Grid } from '@material-ui/core';

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

  const trending = useTrending();
  const { saveDocument } = useFirestore();
  const [loadingAuth, setLoadingAuth] = React.useState(true);

  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    firebase.auth().onAuthStateChanged(() => {
      if (loadingAuth) {
        setLoadingAuth(false);
      } else {
        setLoadingAuth(true);
      }

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
        <title>Atenews - The official student publication of the Ateneo de Davao University</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />

        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preload" href="/logo-blue.png" as="image" />
      </Head>

      <ThemeProvider theme={theme(darkMode)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CacheProvider>
            <ErrorProvider>
              <AuthProvider>
                <TrendingProvider>
                  {!loadingAuth
                    ? (
                      <Layout trending={trending} setDarkMode={setDarkMode}>
                        <Component {...pageProps} />
                      </Layout>
                    )
                    : (
                      <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                      >
                        <Grid item>
                          <img src={theme(darkMode).palette.type === 'light' ? '/logo-blue.png' : '/logo.png'} alt="Atenews Logo" width="100" />
                        </Grid>
                      </Grid>
                    )}
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
