import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Features" />
  );
}

export async function getStaticProps() {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(4),
    ]);
    return { props: { articles }, revalidate: 1 };
  } catch (err) {
    return { props: { articles: [] }, revalidate: 1 };
  }
}
