/* eslint-disable no-underscore-dangle */
import React from 'react';

import dynamic from 'next/dynamic';

import CommentField from '@/components/ArticlePage/Comments/CommentField';
import Template from '@/components/ArticlePage/Comments/Template';

import useCommentStats from '@/hooks/useCommentStats';

const Replies = dynamic(import('@/components/ArticlePage/Comments/Replies'));

export default function Page({
  comment,
  slug,
}) {
  const [showReplies, setShowReplies] = React.useState(false);
  const commentStats = useCommentStats(comment._id);

  const getReplies = () => {
    if (showReplies) {
      setShowReplies(false);
    } else {
      setShowReplies(true);
    }
  };

  return (
    <Template
      content={comment}
      getReplies={getReplies}
    >
      { showReplies ? (
        <>
          <CommentField slug={slug} commentId={comment._id} reply />
          <Replies commentId={comment._id} count={commentStats?.replies || 0} />
        </>
      ) : null }
    </Template>
  );
}
