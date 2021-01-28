import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

import useCommentReplies from '@/hooks/useCommentReplies';

import Template from '@/components/ArticlePage/Comments/Template';

export default function Replies({
  commentId,
  count,
}) {
  const [loading, setLoading] = React.useState(count !== 0);
  const replies = useCommentReplies(commentId, () => setLoading(false));

  if (loading) {
    return (
      <Grid container direction="row" justify="center">
        <CircularProgress style={{ marginTop: 20 }} />
      </Grid>
    );
  }

  return (
    <>
      { replies.map((reply) => (
        <Template
          content={reply}
          reply
        />
      ))}
    </>
  );
}
