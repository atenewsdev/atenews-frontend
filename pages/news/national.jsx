import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

import useFirestore from '@/utils/hooks/useAdminFirestore';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="National News" />
  );
}

export async function getStaticProps() {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(19),
    ]);
    const { getDocumentOnce } = useFirestore();

    const socialStats = {};

    await Promise.all(articles.map(async (post) => {
      socialStats[post.slug] = await getDocumentOnce(`articles/${post.slug}`);
      delete socialStats[post.slug].timestamp;
    }));

    return { props: { articles, socialStats }, revalidate: 10 };
  } catch (err) {
    return { props: { articles: [], socialStats: {} }, revalidate: 10 };
  }
}
