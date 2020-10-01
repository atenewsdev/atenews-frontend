import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RecentArticles from 'components/Home/RecentArticles';
import Title from 'components/Home/Title';
import ArticleGrid from 'components/Home/ArticleGrid';
import Trending from 'components/Home/Trending';
import CardActionArea from '@material-ui/core/CardActionArea';

import Article from 'components/List/Article';
import Column from 'components/List/Column';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import WPGBlocks from 'react-gutenberg';

import WP from 'utils/wordpress';

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

export default function Home({ recentArticles, news, features, featuredPhoto, editorial, columns }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Head>
        <title>Atenews - The official student publication of the Ateneo de Davao University</title>
      </Head>
      <div className={ classes.header }>
        <img src="/atenews-header.svg" height="35"></img>
        <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>
          The official student publication of the Ateneo de Davao University
        </Typography>
      </div>
      <Trending articles={recentArticles} />
      <RecentArticles articles={recentArticles} />

      <div className={classes.section}>
        <Title color={theme.palette.atenews.news}>News</Title>
        <ArticleGrid articles={news} />
      </div>

      <div className={classes.section}>
        <Title color={theme.palette.atenews.features}>Features</Title>
        <ArticleGrid articles={features} />
      </div>

      <div className={classes.section}>
        <Grid container justify="center" alignItems="center" spacing={1} style={{ marginBottom: theme.spacing(4), paddingLeft: theme.spacing(8), paddingRight: theme.spacing(8) }}>
          <Grid item xs>
            <div style={{ backgroundColor: 'black', height: 1, width: '100%' }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" style={{ fontFamily: 'Open Sans', fontWeight: 300, letterSpacing: 5, textAlign: 'center' }}>HULAGWAY</Typography>
          </Grid>
          <Grid item xs>
            <div style={{ backgroundColor: 'black', height: 1, width: '100%' }} />
          </Grid>
        </Grid>
        <div style={{ borderRadius: 10, overflow: 'hidden' }}>
          <img src={featuredPhoto.featured_image_src} style={{ width: '100%' }} />
        </div>
        <Typography variant="body1" component="div" style={{ padding: theme.spacing(2), textAlign: 'center' }}>
          <Grid container justify="center">
            <Grid item>
              <WPGBlocks blocks={featuredPhoto.blocks} />
            </Grid>
          </Grid>
        </Typography>

        <Typography variant="body2" style={{ textAlign: 'center' }}>
        <i>
          Photo by&nbsp;
          {
            featuredPhoto.coauthors.map((author, i) => {
              if (i === featuredPhoto.coauthors.length - 2) {
                return `${author.display_name} `
              } else if (i !== featuredPhoto.coauthors.length - 1) {
                return `${author.display_name}, `
              } else if (featuredPhoto.coauthors.length === 1) {
                return author.display_name
              } else {
                return `and ${author.display_name}`
              }
            })
          }
        </i></Typography>
      </div>

      <div className={classes.section}>
        <Title color={theme.palette.atenews.highlight}>Opinion</Title>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" style={{ fontFamily: 'Open Sans', fontWeight: 400, letterSpacing: 5, marginBottom: theme.spacing(4) }}>Editorial</Typography>
            <Article article={editorial} topImage />
          </Grid>
          <Grid item xs={12} sm={6}>
              <Typography variant="h4" style={{ fontFamily: 'Open Sans', fontWeight: 400, letterSpacing: 5, marginBottom: theme.spacing(4) }}>Columns</Typography>
              {
                columns.map((column) => (
                  <Column article={column} key={column.id} />
                ))
              }
          </Grid>
        </Grid>
      </div>

      <div className={classes.section}>
        <Grid container justify="center" alignItems="center" spacing={1} style={{ marginBottom: theme.spacing(4), paddingLeft: theme.spacing(8), paddingRight: theme.spacing(8) }}>
          <Grid item xs>
            <div style={{ backgroundColor: 'black', height: 1, width: '100%' }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" style={{ fontFamily: 'Open Sans', fontWeight: 300, letterSpacing: 5, textAlign: 'center' }}>LATEST RELEASE</Typography>
          </Grid>
          <Grid item xs>
            <div style={{ backgroundColor: 'black', height: 1, width: '100%' }} />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} sm={6}>
            <CardActionArea onClick={() => window.open('https://issuu.com/atenews/docs/vol66no1', '_blank')}>
              <Paper variant="outlined" style={{ borderRadius: 10, overflow: 'hidden' }}>
                <img src="/issuu-demo.png" style={{ width: '100%' }} />
              </Paper>
            </CardActionArea>
          </Grid>
        </Grid>
      </div>

    </div>
  )
}

export async function getStaticProps(ctx) {
  try {
    const [recentArticles, news, features, featuredPhoto, editorial, columns] = await Promise.all([
      WP.posts().perPage(5),
      WP.posts().categories(3).perPage(5),
      WP.posts().categories(4).perPage(5),
      WP.posts().categories(430).perPage(1),
      WP.posts().categories(428).perPage(1),
      WP.posts().categories(21).perPage(4)
    ]);
    return { props: { recentArticles, news, features, featuredPhoto: featuredPhoto[0], editorial: editorial[0], columns }, revalidate: 10 };
  } catch (err) {
    return { props: { recentArticles: [], news: [], features: [], featuredPhoto: {}, editorial: {}, columns: [] }, revalidate: 10 };
  }
}
