import React from 'react';

import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import WP from '@/utils/wordpress';

import ReactHtmlParser from 'react-html-parser';
import ArticlePage from '@/components/ArticlePage';

import { Grid, CircularProgress } from '@material-ui/core';

import { useAuth } from '@/utils/hooks/useAuth';

const useStyles = makeStyles(() => ({
  contentContainer: {
    width: '90%',
    margin: 'auto',
  },
}));

export default function Page({ post, relatedPosts }) {
  const classes = useStyles();
  const theme = useTheme();
  const { loadingAuth } = useAuth();
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={classes.contentContainer}>
        <Grid container direction="row" justify="center">
          <CircularProgress style={{ marginTop: 100, marginBottom: 100 }} />
        </Grid>
      </div>
    );
  }

  if (!post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>
          {ReactHtmlParser(post.title.rendered)}
          {' '}
          - Atenews
        </title>
        <meta name="description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
        <meta name="twitter:card" value="summary" />
        <meta property="og:title" content={`${ReactHtmlParser(post.title.rendered)} - Atenews`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.featured_image_src} />
        <meta name="twitter:image" content={post.featured_image_src} />

        <meta property="og:url" content={`https://beta.atenews.ph/news/${post.slug}`} />
        <meta property="og:description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
      </Head>
      <NextSeo
        title={`${ReactHtmlParser(post.title.rendered)} - Atenews`}
        description={post.excerpt.rendered.replace(/<[^>]+>/g, '')}
        openGraph={{
          title: `${ReactHtmlParser(post.title.rendered)} - Atenews`,
          description: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
          images: [
            {
              url: post.featured_image_src,
            },
          ],
        }}
        twitter={{
          handle: '@atenews',
          cardType: 'summary_large_image',
        }}
      />
      { !loadingAuth ? (
        <ArticlePage post={post} relatedPosts={relatedPosts} />
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

export const getStaticPaths = async () => {
  const categories = [3, 20, 18, 19, 7];

  let res = [];
  try {
    const temp = await Promise.all(categories.map(async (cat) => WP.posts().categories(cat)));
    temp.forEach((arr) => {
      res = [...res, ...arr];
    });
  } catch (err) {
    res = [];
  }
  const paths = [];
  for (const post of res) {
    paths.push({
      params: { slug: post.slug },
    });
  }
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  let res = [];
  let relatedPosts = [];
  try {
    res = await WP.posts().slug(ctx.params.slug);
  } catch (err) {
    res = [];
  }
  if (res.length > 0) {
    relatedPosts = await WP.relatedPosts().id(res[0].id);
    return { props: { post: res[0], relatedPosts }, revalidate: 1 };
  }
  return { props: { post: {}, relatedPosts: [] }, revalidate: 1 };
};
