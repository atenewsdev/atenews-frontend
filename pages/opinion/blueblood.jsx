import React from 'react';

import listServerSideProps from '@/utils/serverProps/listServerSideProps';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Blueblood" />
  );
}

const CATEGORY_ID = 590;

export async function getStaticProps() {
  return listServerSideProps(CATEGORY_ID);
}
