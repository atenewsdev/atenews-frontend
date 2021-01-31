import React from 'react';

import listServerSideProps from '@/utils/serverProps/listServerSideProps';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Local News" />
  );
}

const CATEGORY_ID = 18;

export async function getStaticProps() {
  return listServerSideProps(CATEGORY_ID);
}
