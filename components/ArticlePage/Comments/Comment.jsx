import React from 'react';

import dynamic from 'next/dynamic';

import CommentField from '@/components/ArticlePage/Comments/CommentField';
import Template from '@/components/ArticlePage/Comments/Template';

const Replies = dynamic(import('@/components/ArticlePage/Comments/Replies'));

export default function Page({
  details,
  slug,
}) {
  const [showReplies, setShowReplies] = React.useState(false);

  const getReplies = () => {
    if (showReplies) {
      setShowReplies(false);
    } else {
      setShowReplies(true);
    }
  };

  return (
    <Template
      details={details}
      getReplies={getReplies}
      slug={slug}
    >
      { showReplies ? (
        <>
          <CommentField slug={slug} rootDetails={details} reply />
          <Replies rootDetails={details} slug={slug} />
        </>
      ) : null }
    </Template>
  );
}
