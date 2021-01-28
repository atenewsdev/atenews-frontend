import React from 'react';

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import DefaultErrorPage from '@/components/404';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import articlePaths from '@/utils/serverProps/articlePaths';
import articleStaticProps from '@/utils/serverProps/articleStaticProps';

import ReactHtmlParser from 'react-html-parser';

import { Grid, CircularProgress } from '@material-ui/core';

import { useAuth } from '@/hooks/useAuth';

import ArticlePage from '@/components/ArticlePage';

const useStyles = makeStyles(() => ({
  contentContainer: {
    width: '90%',
    margin: 'auto',
  },
  container: {
    minHeight: 800,
  },
}));

export default function Page(args) {
  const { post } = args;
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
        title={`${ReactHtmlParser(post.title)} - Atenews`}
        description={post.excerpt.replace(/<[^>]+>/g, '')}
        openGraph={{
          title: `${ReactHtmlParser(post.title)} - Atenews`,
          description: post.excerpt.replace(/<[^>]+>/g, ''),
          images: [
            {
              url: post.featuredImage.node.sourceUrl,
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
        <ArticlePage {...args} />
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

const categories = [3, 20, 18, 19, 7];

export const getStaticPaths = async () => articlePaths(categories);
export const getStaticProps = async (ctx) => articleStaticProps(ctx, categories);
