import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Article from 'components/List/Article';
import Trending from 'components/Home/Trending';

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
  }
});

export default function Page({ trending, articles }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Head>
        <title>Montage - Atenews</title>
      </Head>
      <Typography variant="h2" style={{ marginBottom: theme.spacing(4) }}>Montage</Typography>
      <Trending articles={trending} />
      { articles.map((article) => (
        <Article key={article.id} article={article} />
      )) }
      
    </div>
  )
}

export async function getStaticProps(ctx) {
  try {
    const [trending, articles] = await Promise.all([
      WP.posts().perPage(5),
      WP.posts().categories(31)
    ]);
    console.log('success');
    return { props: { trending, articles }, revalidate: 10 };
  } catch (err) {
    console.log('failed');
    return { props: { trending: [], articles: [] }, revalidate: 10 };
  }
}