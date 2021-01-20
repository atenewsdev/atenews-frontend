import React from 'react';

import listServerSideProps from '@/utils/serverProps/listServerSideProps';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Photos" nofollow />
  );
}

const CATEGORY_ID = 431;

export async function getServerSideProps() {
  return listServerSideProps(CATEGORY_ID);
}
