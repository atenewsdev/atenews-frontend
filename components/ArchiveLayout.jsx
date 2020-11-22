import React from 'react';

import { NextSeo } from 'next-seo';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Article from '@/components/List/Article';
import Trending from '@/components/Home/Trending';

import FollowIcon from '@material-ui/icons/Add';
import Button from '@/components/Button';

import {
  Typography, Grid, Hidden, CircularProgress,
} from '@material-ui/core';

import { useTrending } from '@/utils/hooks/useTrending';
import { useRouter } from 'next/router';

import { useAuth } from '@/utils/hooks/useAuth';

import InfiniteScroll from 'react-infinite-scroll-component';
import WP from '@/utils/wordpress';

const useStyles = makeStyles({
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
});

export default function Page({
  articlesRaw, name, category, query, totalPages,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const { loadingAuth } = useAuth();

  // eslint-disable-next-line no-underscore-dangle
  const [articles, setArticles] = React.useState(articlesRaw);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(2);

  const checkPage = () => {
    if (totalPages < page) {
      setHasMore(false);
    }
  };

  React.useEffect(() => {
    setArticles(articlesRaw);
    setPage(2);
    setHasMore(true);
    checkPage();
  }, [articlesRaw]);

  const next = () => {
    if (category !== 'search') {
      WP.posts().categories(category).page(page).then((posts) => {
        if (posts.length === 0) {
          setHasMore(false);
        }
        setArticles([...articles, ...posts]);
      });
    } else {
      WP.posts().search(query).page(page).then((posts) => {
        if (posts.length === 0) {
          setHasMore(false);
        }
        setArticles([...articles, ...posts]);
      });
    }
    setPage((prev) => prev + 1);
    checkPage();
  };

  const trending = useTrending();

  const baseUrlMenu = (url) => (url !== '/' ? `${url.split('/').slice(0, 2).join('/')}` : '/');

  return (
    <div className={classes.container}>
      <NextSeo
        title={`${name} - Atenews`}
        description={`Welcome to the official student publication of AdDU. Here is a list of ${name} written by Atenews.`}
      />
      { !loadingAuth ? (
        <>
          <Grid container alignItems="center" style={{ marginBottom: theme.spacing(2) }} spacing={4}>
            <Grid item>
              <Hidden smDown>
                <Typography variant="h3" component="h1">{name}</Typography>
              </Hidden>
              <Hidden mdUp>
                <Typography variant="h4" component="h1">{name}</Typography>
              </Hidden>
            </Grid>
            {baseUrlMenu(router.pathname) !== '/search' ? (
              <Grid item xs>
                <Button aria-label={`Follow ${name}`} variant="outlined" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="small">
                  <FollowIcon style={{ marginRight: theme.spacing(1) }} />
                  Follow
                </Button>
              </Grid>
            ) : null }
          </Grid>
          <Trending articles={trending} />
          <InfiniteScroll
            dataLength={articles.length}
            next={next}
            hasMore={hasMore}
            loader={(
              <div style={{ overflow: 'hidden' }}>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              </div>
            )}
          >
            { articles.map((article, index) => (
              <Article key={index} article={article} />
            ))}
          </InfiniteScroll>
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
