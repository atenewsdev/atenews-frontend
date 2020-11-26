import WP from '@/utils/wordpress';
import slugGenerator from '@/utils/slugGenerator';

export default function Page() {
  return null;
}

export const getServerSideProps = async (ctx) => {
  let res = [];
  try {
    res = await WP.posts().slug(ctx.params.slug);
  } catch (err) {
    res = [];
  }
  if (res.length > 0) {
    return {
      redirect: {
        destination: slugGenerator(res[0]),
        permanent: true,
      },
    };
  }
  return { notFound: true };
};
