import WP from 'utils/wordpress';

import ArchiveLayout from 'components/ArchiveLayout';

export default function Page(props) {

  return (
    <ArchiveLayout {...props} name="Local News" />
  )
}

export async function getStaticProps(ctx) {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(18)
    ]);
    console.log('success');
    return { props: { articles }, revalidate: 10 };
  } catch (err) {
    console.log('failed');
    return { props: { articles: [] }, revalidate: 10 };
  }
}
