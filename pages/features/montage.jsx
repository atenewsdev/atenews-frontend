import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Montage" />
  );
}

export async function getStaticProps() {
  try {
    const [articlesRaw] = await Promise.all([
      WP.posts().categories(31),
    ]);
    return { props: { articlesRaw, category: 31 }, revalidate: 1 };
  } catch (err) {
    return { props: { articlesRaw: [], category: 31 }, revalidate: 1 };
  }
}
