import React from 'react';

import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Article from '@/components/List/Article';
import Trending from '@/components/Home/Trending';

import FollowIcon from '@material-ui/icons/Add';
import Button from '@/components/Button';

import { Typography, Grid, Hidden } from '@material-ui/core';

import { useTrending } from '@/utils/hooks/useTrending';
import { useRouter } from 'next/router';

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

export default function Page({ articles, name }) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const trending = useTrending();

  const baseUrlMenu = (url) => (url !== '/' ? `${url.split('/').slice(0, 2).join('/')}` : '/');

  return (
    <div className={classes.container}>
      <Head>
        <title>
          {name}
          {' '}
          - Atenews
        </title>
      </Head>
      <NextSeo
        title={`${name} - Atenews`}
        description={`Welcome to the official student publication of AdDU. Here is a list of ${name} written by Atenews.`}
      />
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
      { articles.map((article) => (
        <Article key={article.id} article={article} />
      )) }

    </div>
  );
}
