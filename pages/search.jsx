import React from 'react';

import WPGraphQL from '@/utils/wpgraphql';
import { gql } from '@apollo/client';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <ArchiveLayout {...props} name={`Search Results for "${props.query}"`} />
  );
}

export async function getServerSideProps({ query: rawQuery }) {
  try {
    const { query } = rawQuery;
    const { data } = await WPGraphQL.query({
      query: gql`
        query Search {
          posts(first: 5, where: { search: "${query}" }) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
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
              excerpt
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
        }            
      `,
    });
    return {
      props: {
        articlesRaw: data.posts.nodes,
        pageInfo: data.posts.pageInfo,
        query,
        category: 'search',
      },
    };
  } catch (err) {
    return {
      props: {
        articlesRaw: [], query: '', category: 'search',
      },
    };
  }
}
