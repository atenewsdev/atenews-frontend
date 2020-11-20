import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Column" />
  );
}

export async function getStaticProps() {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(21),
    ]);
    return { props: { articles }, revalidate: 5 };
  } catch (err) {
    return { props: { articles: [] }, revalidate: 5 };
  }
}
