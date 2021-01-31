import React from 'react';

import listServerSideProps from '@/utils/serverProps/listServerSideProps';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Features" />
  );
}

const CATEGORY_ID = 4;

export async function getStaticProps() {
  return listServerSideProps(CATEGORY_ID);
}
