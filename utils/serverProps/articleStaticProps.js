import WPGraphQL from '@/utils/wpgraphql';
import { gql } from '@apollo/client';
import WP from '@/utils/wordpress';

const articleStaticProps = async (ctx, categories) => {
  let res = [];
  try {
    res = await WP.posts().slug(ctx.params.slug);
  } catch (err) {
    res = [];
  }
  if (res.length > 0) {
    if (res[0].categories.filter((cat) => categories.includes(cat)).length === 0) {
      return { notFound: true, revalidate: 10 };
    }
    const { data } = await WPGraphQL.query({
      query: gql`
        query Articles {
          posts(first: 5, where: { notIn: [${res[0].id}], categoryIn: [${categories.toString()}] }) {
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
        post: res[0],
        relatedPosts: data.posts.nodes,
        categories,
        pageInfo: data.posts.pageInfo,
      },
      revalidate: 10,
    };
  }
  return { notFound: true, revalidate: 10 };
};

export default articleStaticProps;
