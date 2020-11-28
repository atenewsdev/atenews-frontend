import React from 'react';

import Article from '@/components/List/Article';
import handleViewport from 'react-in-viewport';

import {
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

import InfiniteScroll from 'react-infinite-scroll-component';
import WP from '@/utils/wordpress';

export default handleViewport((props) => {
  const { forwardedRef, relatedPosts, postId } = props;
  const theme = useTheme();

  const [articles, setArticles] = React.useState(relatedPosts);
  const [page, setPage] = React.useState(2);
  const [hasMore, setHasMore] = React.useState(true);

  const checkPage = () => {
    if (Math.ceil(articles[0].total_count / 5) < page) {
      setHasMore(false);
    }
  };

  React.useEffect(() => {
    setArticles(relatedPosts);
    setPage(2);
    setHasMore(true);
    checkPage();
  }, [relatedPosts]);

  const next = () => {
    WP.relatedPosts().id(postId).page(page)
      .then((posts) => {
        if (posts.length === 0) {
          setHasMore(false);
        }
        setArticles([...articles, ...posts]);
      });
    setPage((prev) => prev + 1);
    if (articles.length > 0) {
      checkPage();
    }
  };

  return (
    <div ref={forwardedRef}>
      <Typography variant="h4">More articles for you</Typography>
      <div style={{ marginTop: theme.spacing(4) }}>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={articles.length}
          next={next}
          hasMore={hasMore}
          loader={(
            <div style={{ overflow: 'hidden' }}>
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </div>
          )}
        >
          {
            articles.map((post) => (
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
        </InfiniteScroll>
      </div>
    </div>
  );
});
