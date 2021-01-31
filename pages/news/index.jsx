import React from 'react';

import listServerSideProps from '@/utils/serverProps/listServerSideProps';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="News" nofollow />
  );
}

const CATEGORY_ID = 3;

export async function getStaticProps() {
  return listServerSideProps(CATEGORY_ID);
}
