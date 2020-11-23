import React from 'react';

import Article from '@/components/List/Article';
import handleViewport from 'react-in-viewport';

import {
  Typography,
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

export default handleViewport((props) => {
  const { forwardedRef, relatedPosts } = props;
  const theme = useTheme();

  return (
    <div ref={forwardedRef}>
      <Typography variant="h4">More articles for you</Typography>
      <div style={{ marginTop: theme.spacing(4) }}>
        {
          relatedPosts.map((post) => (
            <Article
              key={post.ID}
              article={{
                featured_image_src: post.featured_image_url,
                coauthors: post.coauthors,
                title: {
                  rendered: post.post_title,
                },
                date: post.post_date,
                excerpt: {
                  rendered: post.excerpt,
                },
                categories_detailed: post.categories,
                slug: post.post_name,
              }}
            />
          ))
        }
      </div>
    </div>
  );
});
