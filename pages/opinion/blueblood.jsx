import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Blueblood" />
  );
}

export async function getServerSideProps() {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(590),
    ]);
    return { props: { articles } };
  } catch (err) {
    return { props: { articles: [] } };
  }
}
