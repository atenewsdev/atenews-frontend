import Head from 'next/head'
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';


import WP from 'utils/wordpress';

import ReactHtmlParser from 'react-html-parser';
import ArticlePage from 'components/ArticlePage';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    width: '90%',
    margin: 'auto'
  }
}));

export default function Page({ post }) {
  const classes = useStyles();
  const theme = useTheme();

  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={classes.contentContainer}>
        <Grid container direction="row" justify="center">
          <CircularProgress style={{ marginTop: 100, marginBottom: 100 }} />
        </Grid>
      </div>
    )
  }

  if(!post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>{ReactHtmlParser(post.title.rendered)} - Atenews</title>
        <meta name="description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
        <meta name="twitter:card" value="summary" />
        <meta property="og:title" content={ReactHtmlParser(post.title.rendered)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.featured_image_src} /> 
        <meta name="twitter:image" content={post.featured_image_src} />

        <meta property="og:url" content={`https://beta.atenews.ph/features/${post.slug}`} />
        <meta property="og:description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
      </Head>
      <ArticlePage post={post} />
    </div>
  )
}


export const getStaticPaths = async () => {
  let res = []
  try {
    res = await WP.posts().categories(4);
  } catch (err) {
    res = []
  }
  let paths = [];
  for (let post of res) {
    paths.push({
      params: { slug: post.slug }
    });
  }
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (ctx) => {
  let res = []
  try {
    res = await WP.posts().slug(ctx.params.slug);
  } catch (err) {
    res = []
  }
  if (res.length > 0) {
    return { props: { post: res[0] }, revalidate: 10 };
  }
  return { props: { post: {} }, revalidate: 10 };
}