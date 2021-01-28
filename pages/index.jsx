import React from 'react';

import dynamic from 'next/dynamic';

import { NextSeo } from 'next-seo';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { LazyLoadComponent } from 'react-lazy-load-image-component';

import WPGraphQL from '@/utils/wpgraphql';
import { gql } from '@apollo/client';

import { useTrending } from '@/hooks/useTrending';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useError } from '@/hooks/useSnackbar';
import firebase from '@/utils/firebase';

import {
  Typography, Grid,
} from '@material-ui/core';

import RecentArticles from '@/components/Home/RecentArticles';

const Title = dynamic(import('@/components/Home/Title'));

const ArticleGrid = dynamic(import('@/components/Home/ArticleGrid'));
const Trending = dynamic(import('@/components/Home/Trending'));

const EditorialColumn = dynamic(import('@/components/Home/EditorialColumn'));
const Hulagway = dynamic(import('@/components/Home/Hulagway'));
const LatestRelease = dynamic(import('@/components/Home/LatestRelease'));

const useStyles = makeStyles((theme) => ({
  container: {
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    height: 65,
    padding: 5,
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
    marginTop: 80,
  },
}));

export default function Home({
  recentArticles,
  news,
  features,
  featuredPhoto,
  editorial,
  columns,
  mode,
  oobCode,
  continueUrl,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const trending = useTrending();
  const {
    loadingAuth,
  } = useAuth();
  const router = useRouter();

  const { setSuccess, setError } = useError();

  const [applied, setApplied] = React.useState(false);

  React.useEffect(() => {
    if (mode && oobCode && !applied) {
      setApplied(true);
      switch (mode) {
        case 'resetPassword':
          // Display reset password handler and UI.
          setError('Reset password has not been implemented yet! Please contact us at dev@atenews.ph for urgent matters.');
          break;
        case 'recoverEmail':
          // Display email recovery handler and UI.
          setError('Email recovery has not been implemented yet! Please contact us at dev@atenews.ph for urgent matters.');
          break;
        case 'verifyEmail':
          // Display email verification handler and UI.
          firebase.auth().applyActionCode(oobCode).then(async () => {
            setSuccess('Successfully verified email!');
            if (continueUrl) {
              router.push(continueUrl);
            }
          }).catch((err) => {
            setError(err.message);
          });
          break;
        default:
          // Error: invalid mode.
          break;
      }
    }
  }, []);

  return (
    <div className={classes.container}>
      <NextSeo
        title="Atenews"
        description="The official student publication of the Ateneo de Davao University"
        openGraph={{
          title: 'Atenews',
          description: 'The official student publication of the Ateneo de Davao University',
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
        <>
          <div className={classes.header}>
            <img src={theme.palette.type === 'dark' ? '/atenews-footer.svg' : '/atenews-header.svg'} alt="Atenews Header" height="35" />
            <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>
              The official student publication of the Ateneo de Davao University
            </Typography>
          </div>
          <Trending articles={trending} />
          <RecentArticles articles={recentArticles} />
          <LazyLoadComponent>
            <div className={classes.section}>
              <Title color={theme.palette.atenews.news}>News</Title>
              <ArticleGrid articles={news} />
            </div>
          </LazyLoadComponent>

          <LazyLoadComponent>
            <div className={classes.section}>
              <Title color={theme.palette.atenews.features}>Features</Title>
              <ArticleGrid articles={features} />
            </div>
          </LazyLoadComponent>

          <LazyLoadComponent>
            <Hulagway featuredPhoto={featuredPhoto} />
          </LazyLoadComponent>

          <LazyLoadComponent>
            <EditorialColumn editorial={editorial} columns={columns} />
          </LazyLoadComponent>

          <LazyLoadComponent>
            <LatestRelease />
          </LazyLoadComponent>
        </>
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

export async function getServerSideProps({ query }) {
  try {
    const { data } = await WPGraphQL.query({
      query: gql`
        query Home {
          recentArticles: posts(first: 5) {
            nodes {
              title(format: RENDERED)
              slug
              date
              coauthors {
                nodes {
                  firstName
                  lastName
                  databaseId
                }
              }
              categories {
                nodes {
                  name
                  databaseId
                  slug
                }
              }
              databaseId
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
            }
          }
          news: posts(first: 5, where: { categoryName: "news" }) {
            nodes {
              title(format: RENDERED)
              slug
              date
              databaseId
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              categories {
                nodes {
                  name
                  databaseId
                  slug
                }
              }
              excerpt
              coauthors {
                nodes {
                  firstName
                  lastName
                  databaseId
                }
              }
            }
          }
          features: posts(first: 5, where: { categoryName: "features" }) {
            nodes {
              title(format: RENDERED)
              slug
              date
              databaseId
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              categories {
                nodes {
                  name
                  databaseId
                  slug
                }
              }
              excerpt
              coauthors {
                nodes {
                  firstName
                  lastName
                  databaseId
                }
              }
            }
          }
          featuredPhoto: posts(first: 1, where: { categoryName: "featured-photos" }) {
            nodes {
              databaseId
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              content
              excerpt
              categories {
                nodes {
                  name
                  databaseId
                  slug
                }
              }
              coauthors {
                nodes {
                  firstName
                  lastName
                  databaseId
                }
              }
            }
          }
          editorial: posts(first: 1, where: { categoryName: "editorial" }) {
            nodes {
              title(format: RENDERED)
              databaseId
              date
              slug
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              excerpt
              categories {
                nodes {
                  name
                  databaseId
                  slug
                }
              }
              coauthors {
                nodes {
                  firstName
                  lastName
                  databaseId
                }
              }
            }
          }
          columns: posts(first: 4, where: { categoryName: "columns" }) {
            nodes {
              title(format: RENDERED)
              databaseId
              date
              slug
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              categories {
                nodes {
                  name
                  databaseId
                  slug
                }
              }
              coauthors {
                nodes {
                  firstName
                  lastName
                  databaseId
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }        
      `,
    });
    return {
      props: {
        recentArticles: data.recentArticles.nodes,
        news: data.news.nodes,
        features: data.features.nodes,
        featuredPhoto: data.featuredPhoto.nodes[0],
        editorial: data.editorial.nodes[0],
        columns: data.columns.nodes,
        mode: 'mode' in query ? query.mode : null,
        oobCode: 'oobCode' in query ? query.oobCode : null,
        continueUrl: 'continueUrl' in query ? query.continueUrl : null,
      },
    };
  } catch (err) {
    return {
      props: {
        recentArticles: [], news: [], features: [], featuredPhoto: {}, editorial: {}, columns: [],
      },
    };
  }
}
