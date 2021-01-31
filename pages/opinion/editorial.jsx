import React from 'react';

import listServerSideProps from '@/utils/serverProps/listServerSideProps';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="Editorial" />
  );
}

const CATEGORY_ID = 428;

export async function getServerSideProps() {
  return listServerSideProps(CATEGORY_ID);
}
