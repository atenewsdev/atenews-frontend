import React from 'react';

import CommentField from '@/components/Social/CommentField';
import Template from '@/components/Social/CommentReplyTemplate';
import Replies from '@/components/Social/Replies';

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
          <Replies commentId={commentId} slug={slug} />
        </>
      ) : null }
    </Template>
  );
}
