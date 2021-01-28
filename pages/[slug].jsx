import WPGraphQL from '@/utils/wpgraphql';
import { gql } from '@apollo/client';
import urlGenerator from '@/utils/urlGenerator';

export default function Page() {
  return null;
}

export const getServerSideProps = async (ctx) => {
  let res = {};
  try {
    const { data: raw } = await WPGraphQL.query({
      query: gql`
        query Article {
          post( id: "${ctx.params.slug}" , idType: SLUG ) {
            categories {
              nodes {
                name
                databaseId
                slug
              }
            }
            slug
          }
        }            
      `,
    });
    res = raw.post;
  } catch (err) {
    res = {};
  }
  if (res) {
    if ('categories' in res) {
      return {
        redirect: {
          destination: urlGenerator(res),
          permanent: true,
        },
      };
    }
  }
  return { notFound: true };
};
