import React from 'react';

import dynamic from 'next/dynamic';

import { NextSeo } from 'next-seo';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { useTrending } from '@/utils/hooks/useTrending';
import { useAuth } from '@/utils/hooks/useAuth';
import { useRouter } from 'next/router';
import { useError } from '@/utils/hooks/useSnackbar';
import firebase from '@/utils/firebase';

import useSWR from 'swr';

import {
  Typography, Grid, CircularProgress,
} from '@material-ui/core';

import RecentArticles from '@/components/Home/RecentArticles';

const Title = dynamic(import('@/components/Home/Title'));

const ArticleGrid = dynamic(import('@/components/Home/ArticleGrid'));
const Trending = dynamic(import('@/components/Home/Trending'));

const EditorialColumn = dynamic(import('@/components/Home/EditorialColumn'));
const Hulagway = dynamic(import('@/components/Home/Hulagway'));
const LatestRelease = dynamic(import('@/components/Home/LatestRelease'));

const useStyles = makeStyles((theme) => ({
  container: {
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    height: 65,
    padding: 5,
  },
  account: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    marginRight: 20,
    height: 65,
  },
  section: {
    marginTop: 80,
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const trending = useTrending();
  const {
    loadingAuth,
  } = useAuth();
  const router = useRouter();

  const {
    mode,
    oobCode,
    continueUrl,
  } = router.query;

  const { setSuccess, setError } = useError();

  const [loading, setLoading] = React.useState(true);

  const [recentArticles, setRecentArticles] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [features, setFeatures] = React.useState([]);
  const [featuredPhoto, setFeaturedPhoto] = React.useState({});
  const [editorial, setEditorial] = React.useState({});
  const [columns, setColumns] = React.useState([]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR('/api/graphql/getHome', fetcher);
  React.useEffect(() => {
    setLoading(true);
    if (data) {
      setRecentArticles(data.data.recentArticles.nodes);
      setNews(data.data.news.nodes);
      setFeatures(data.data.features.nodes);
      setFeaturedPhoto(data.data.featuredPhoto.nodes[0]);
      setEditorial(data.data.editorial.nodes[0]);
      setColumns(data.data.columns.nodes);
      setLoading(false);
    }
    if (error) {
      setError(error);
      setLoading(false);
    }
  }, [data, error]);

  React.useEffect(() => {
    if (mode && oobCode) {
      switch (mode) {
        case 'resetPassword':
          // Display reset password handler and UI.
          router.push(`/reset-password?mode=${mode}&oobCode=${oobCode}`);
          break;
        case 'recoverEmail':
          // Display email recovery handler and UI.
          setError('Email recovery has not been implemented yet! Please contact us at dev@atenews.ph for urgent matters.');
          break;
        case 'verifyEmail':
          // Display email verification handler and UI.
          firebase.auth().applyActionCode(oobCode).then(async () => {
            setSuccess('Successfully verified email!');
            if (continueUrl) {
              router.push(continueUrl);
            }
          }).catch((err) => {
            setError(err.message);
          });
          break;
        default:
          // Error: invalid mode.
          break;
      }
    }
  }, [setSuccess, mode, oobCode]);

  return (
    <div className={classes.container}>
      <NextSeo
        title="Atenews"
        description="The official student publication of the Ateneo de Davao University"
        openGraph={{
          title: 'Atenews',
          description: 'The official student publication of the Ateneo de Davao University',
          images: [
            {
              url: '/default-thumbnail.jpg',
            },
          ],
          type: 'article',
        }}
        twitter={{
          handle: '@atenews',
          cardType: 'summary_large_image',
        }}
      />
      { !loadingAuth ? (
        <>
          <div className={classes.header}>
            <img src={theme.palette.type === 'dark' ? '/atenews-footer.svg' : '/atenews-header.svg'} alt="Atenews Header" height="35" />
            <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>
              The official student publication of the Ateneo de Davao University
            </Typography>
          </div>
          <Trending articles={trending} />
          { loading ? (
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <CircularProgress color="primary" style={{ margin: theme.spacing(2) }} />
              </Grid>
            </Grid>
          ) : (
            <>
              <RecentArticles articles={recentArticles} />
              <LazyLoadComponent>
                <div className={classes.section}>
                  <Title color={theme.palette.atenews.news}>News</Title>
                  <ArticleGrid articles={news} />
                </div>
              </LazyLoadComponent>

              <LazyLoadComponent>
                <div className={classes.section}>
                  <Title color={theme.palette.atenews.features}>Features</Title>
                  <ArticleGrid articles={features} />
                </div>
              </LazyLoadComponent>

              <LazyLoadComponent>
                <Hulagway featuredPhoto={featuredPhoto} />
              </LazyLoadComponent>

              <LazyLoadComponent>
                <EditorialColumn editorial={editorial} columns={columns} />
              </LazyLoadComponent>

              <LazyLoadComponent>
                <LatestRelease />
              </LazyLoadComponent>
            </>
          ) }
        </>
      ) : (
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item>
            <img src={theme.palette.type === 'light' ? '/logo-blue.png' : '/logo.png'} alt="Atenews Logo" width="100" />
          </Grid>
        </Grid>
      ) }
    </div>
  );
}
