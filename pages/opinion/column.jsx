import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Column" />
  );
}

export async function getServerSideProps() {
  try {
    const [articlesRaw] = await Promise.all([
      WP.posts().categories(21),
    ]);
    return {
      props: {
        articlesRaw,
        category: 21,
        // eslint-disable-next-line no-underscore-dangle
        totalPages: articlesRaw._paging ? articlesRaw._paging.totalPages : 0,
      },
    };
  } catch (err) {
    return { props: { articlesRaw: [], category: 21, totalPages: 0 } };
  }
}
