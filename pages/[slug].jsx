import WP from '@/utils/wordpress';
import slugGenerator from '@/utils/slugGenerator';

export default function Page() {
  return null;
}

const categories = [430, 431];

export const getServerSideProps = async (ctx) => {
  let res = [];
  try {
    res = await WP.posts().slug(ctx.params.slug);
  } catch (err) {
    res = [];
  }
  if (res.length > 0) {
    if (res[0].categories.filter((cat) => categories.includes(cat)) === 0) {
      return { notFound: true };
    }
    return {
      redirect: {
        destination: slugGenerator(res[0]),
        permanent: false,
      },
    };
  }
  return { notFound: true };
};
