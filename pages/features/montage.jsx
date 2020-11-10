import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Montage" />
  );
}

export async function getServerSideProps() {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(31),
    ]);
    return { props: { articles } };
  } catch (err) {
    return { props: { articles: [] } };
  }
}
