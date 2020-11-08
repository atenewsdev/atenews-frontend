import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

import useFirestore from '@/utils/hooks/useAdminFirestore';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Local News" />
  );
}

export async function getStaticProps() {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(18),
    ]);
    const { saveDocument } = useFirestore();

    const posts = [
      ...articles,
    ];

    posts.forEach((post) => {
      saveDocument(`articles/${post.slug}`, {
        title: post.title.rendered,
      });
    });
    return { props: { articles }, revalidate: 10 };
  } catch (err) {
    return { props: { articles: [] }, revalidate: 10 };
  }
}
