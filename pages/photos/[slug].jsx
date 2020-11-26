import React from 'react';

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import DefaultErrorPage from '@/components/404';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import WP from '@/utils/wordpress';

import ReactHtmlParser from 'react-html-parser';
import ArticlePage from '@/components/ArticlePage';

import { Grid, CircularProgress } from '@material-ui/core';

import { useAuth } from '@/utils/hooks/useAuth';
import { ArticleProvider } from '@/utils/hooks/useArticle';

const useStyles = makeStyles(() => ({
  contentContainer: {
    width: '90%',
    margin: 'auto',
  },
  container: {
    minHeight: 800,
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
      <DefaultErrorPage />
    );
  }

  return (
    <div className={classes.container}>
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
          type: 'article',
        }}
        twitter={{
          handle: '@atenews',
          cardType: 'summary_large_image',
        }}
      />
      { !loadingAuth ? (
        <ArticleProvider post={post} key={post.id}>
          <ArticlePage post={post} relatedPosts={relatedPosts} />
        </ArticleProvider>
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

const categories = [430, 431];

export const getStaticPaths = async () => {
  let res = [];
  try {
    const temp = await Promise.all(
      categories.map(
        async (cat) => WP.posts().categories(cat).perPage(1),
      ),
    );
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
    if (res[0].categories.filter((cat) => categories.includes(cat)).length === 0) {
      return { notFound: true, revalidate: 10 };
    }
    relatedPosts = await WP.relatedPosts().id(res[0].id);
    return { props: { post: res[0], relatedPosts }, revalidate: 10 };
  }
  return { notFound: true, revalidate: 10 };
};
