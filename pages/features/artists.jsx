import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Artists" />
  );
}

export async function getStaticProps() {
  try {
    const [articlesRaw] = await Promise.all([
      WP.posts().categories(437),
    ]);
    return { props: { articlesRaw, category: 437 }, revalidate: 1 };
  } catch (err) {
    return { props: { articlesRaw: [], category: 437 }, revalidate: 1 };
  }
}
