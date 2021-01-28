import React from 'react';

import dynamic from 'next/dynamic';

import { NextSeo } from 'next-seo';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Typography, Grid, Hidden, CircularProgress,
} from '@material-ui/core';

import { useTrending } from '@/hooks/useTrending';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';

import InfiniteScroll from 'react-infinite-scroll-component';

import postFetch from '@/utils/postFetch';

const Article = dynamic(import('@/components/List/Article'));
const Trending = dynamic(import('@/components/Home/Trending'));
const FollowButton = dynamic(import('@/components/Social/FollowButton'));

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
  container: {
    minHeight: 800,
  },
});

export default function Page({
  articlesRaw, name, category, nofollow, pageInfo, query,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const { loadingAuth } = useAuth();

  // eslint-disable-next-line no-underscore-dangle
  const [articles, setArticles] = React.useState(articlesRaw);
  const [hasMore, setHasMore] = React.useState(true);
  const [cursor, setCursor] = React.useState(null);

  React.useEffect(() => {
    setArticles(articlesRaw);
    setCursor(pageInfo.endCursor);
    setHasMore(pageInfo.hasNextPage);
  }, [articlesRaw]);

  const next = () => {
    if (category !== 'search') {
      postFetch('/api/graphql/getArticles', {
        category,
        cursor,
      }).then((res) => res.json()).then((x) => {
        setHasMore(x.pageInfo.hasNextPage);
        setCursor(x.pageInfo.endCursor);
        setArticles([...articles, ...x.articlesRaw]);
      });
    } else {
      postFetch('/api/graphql/getSearch', {
        query,
        cursor,
      }).then((res) => res.json()).then((x) => {
        setHasMore(x.pageInfo.hasNextPage);
        setCursor(x.pageInfo.endCursor);
        setArticles([...articles, ...x.articlesRaw]);
      });
    }
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
            {baseUrlMenu(router.pathname) !== '/search' && !nofollow ? (
              <Grid item xs>
                <FollowButton category={category} />
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
