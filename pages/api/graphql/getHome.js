import WPGraphQL from '@/utils/wpgraphql';
import { gql } from '@apollo/client';

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(500).send({
      error: 'Not a GET request.',
    });
  }
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
    res.status(200).send({
      data,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
