import WP from 'utils/wordpress';

import ArchiveLayout from 'components/ArchiveLayout';

export default function Page(props) {

  return (
    <ArchiveLayout {...props} name="Featured Photos" />
  )
}

export async function getStaticProps(ctx) {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(430)
    ]);
    console.log('success');
    return { props: { articles }, revalidate: 10 };
  } catch (err) {
    console.log('failed');
    return { props: { articles: [] }, revalidate: 10 };
  }
}
