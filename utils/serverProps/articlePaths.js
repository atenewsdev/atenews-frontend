import WP from '@/utils/wordpress';

const articlePaths = async (categories) => {
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

export default articlePaths;
