import React from 'react';

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import DefaultErrorPage from '@/components/404';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import WP from '@/utils/wordpress';

import ReactHtmlParser from 'react-html-parser';
import CustomPage from '@/components/CustomPage';

import { Grid, CircularProgress } from '@material-ui/core';

import { useAuth } from '@/utils/hooks/useAuth';

const useStyles = makeStyles(() => ({
  contentContainer: {
    width: '90%',
    margin: 'auto',
  },
}));

export default function Page({ page }) {
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

  if (!page) {
    return (
      <DefaultErrorPage />
    );
  }

  return (
    <div className={classes.container}>
      <NextSeo
        title={`${ReactHtmlParser(page.title.rendered)} - Atenews`}
        description={page.excerpt.rendered.replace(/<[^>]+>/g, '')}
        openGraph={{
          title: `${ReactHtmlParser(page.title.rendered)} - Atenews`,
          description: page.excerpt.rendered.replace(/<[^>]+>/g, ''),
          images: [
            {
              url: '/default-thumbnail.jpg',
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
        <CustomPage page={page} />
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

export const getStaticProps = async () => {
  let res = [];
  try {
    res = await WP.pages().slug('privacy-policy');
  } catch (err) {
    res = [];
  }
  if (res.length > 0) {
    return { props: { page: res[0] }, revalidate: 10 };
  }
  return { props: { page: {} }, revalidate: 10 };
};
