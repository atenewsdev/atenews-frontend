import React from 'react';

import listServerSideProps from '@/utils/serverProps/listServerSideProps';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Opinion" nofollow />
  );
}

const CATEGORY_ID = 13;

export async function getStaticProps() {
  return listServerSideProps(CATEGORY_ID);
}
