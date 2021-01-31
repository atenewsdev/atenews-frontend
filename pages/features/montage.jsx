import React from 'react';

import listServerSideProps from '@/utils/serverProps/listServerSideProps';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Montage" />
  );
}

const CATEGORY_ID = 31;

export async function getStaticProps() {
  return listServerSideProps(CATEGORY_ID);
}
