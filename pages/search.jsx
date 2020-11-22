import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <ArchiveLayout {...props} name={`Search Results for "${props.query}"`} />
  );
}

export async function getServerSideProps({ query: rawQuery }) {
  try {
    const { query } = rawQuery;
    const [articlesRaw] = await Promise.all([
      WP.posts().search(query),
    ]);
    return {
      props: {
        articlesRaw,
        query,
        category: 'search',
        // eslint-disable-next-line no-underscore-dangle
        totalPages: articlesRaw._paging ? articlesRaw._paging.totalPages : 0,
      },
    };
  } catch (err) {
    return {
      props: {
        articlesRaw: [], query: '', category: 'search', totalPages: 0,
      },
    };
  }
}
