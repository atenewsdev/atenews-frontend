import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RecentArticles from 'components/Home/RecentArticles';
import Title from 'components/Home/Title';
import ArticleGrid from 'components/Home/ArticleGrid';
import Trending from 'components/Home/Trending';

const useStyles = makeStyles((theme) => ({
  container: {
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    height: 65,
    padding: 5
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
    marginTop: 80
  }
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Head>
        <title>Home - Atenews</title>
      </Head>
      <div className={ classes.header }>
        <img src="/atenews-header.svg" height="35"></img>
        <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>
          The official student publication of the Ateneo de Davao University
        </Typography>
      </div>
      <Trending />
      <RecentArticles />

      <div className={classes.section}>
        <Title color={theme.palette.atenews.news}>News</Title>
        <ArticleGrid />
      </div>

      <div className={classes.section}>
        <Title color={theme.palette.atenews.features}>Features</Title>
        <ArticleGrid />
      </div>

    </div>
  )
}
