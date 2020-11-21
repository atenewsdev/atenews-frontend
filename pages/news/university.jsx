import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="University News" />
  );
}

export async function getStaticProps() {
  try {
    const [articlesRaw] = await Promise.all([
      WP.posts().categories(20),
    ]);
    return { props: { articlesRaw, category: 20 }, revalidate: 1 };
  } catch (err) {
    return { props: { articlesRaw: [], category: 20 }, revalidate: 1 };
  }
}
