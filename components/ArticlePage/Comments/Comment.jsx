import React from 'react';

import dynamic from 'next/dynamic';

import CommentField from '@/components/ArticlePage/Comments/CommentField';
import Template from '@/components/ArticlePage/Comments/Template';

const Replies = dynamic(import('@/components/ArticlePage/Comments/Replies'));

export default function Page({
  comment: commentContent,
  socialStats: commentSocialStats,
  commenterId,
  commentId,
  slug,
  timestamp,
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
      comment={commentContent}
      socialStats={commentSocialStats}
      getReplies={getReplies}
      timestamp={timestamp}
      slug={slug}
      commentId={commentId}
      commenterId={commenterId}
    >
      { showReplies ? (
        <>
          <CommentField slug={slug} commentId={commentId} reply />
          <Replies commentId={commentId} slug={slug} count={commentSocialStats.replyCount} />
        </>
      ) : null }
    </Template>
  );
}
