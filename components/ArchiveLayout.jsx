import React from 'react';

import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Article from 'components/List/Article';
import Trending from 'components/Home/Trending';

import Grid from '@material-ui/core/Grid';
import FollowIcon from '@material-ui/icons/Add';
import Button from 'components/Button';

import WP from 'utils/wordpress';

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

  const [trending, setTrending] = React.useState([]);

  React.useEffect(() => {
    WP.posts().perPage(5).then((trendingArticles) => {
      setTrending(trendingArticles);
    });
  }, []);

  return (
    <div className={classes.container}>
      <Head>
        <title>
          {name}
          {' '}
          - Atenews
        </title>
      </Head>
      <Grid container alignItems="center" style={{ marginBottom: theme.spacing(2) }} spacing={4}>
        <Grid item>
          <Typography variant="h2">{name}</Typography>
        </Grid>
        <Grid item xs>
          <Button variant="outlined" color="primary" size="small">
            <FollowIcon style={{ marginRight: theme.spacing(1) }} />
            Follow
          </Button>
        </Grid>
      </Grid>
      <Trending articles={trending} />
      { articles.map((article) => (
        <Article key={article.id} article={article} />
      )) }

    </div>
  );
}
