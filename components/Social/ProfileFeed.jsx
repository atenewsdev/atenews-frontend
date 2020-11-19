import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import ClockIcon from '@material-ui/icons/AccessTime';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import CommentIcon from '@material-ui/icons/CommentOutlined';

import slugGenerator from '@/utils/slugGenerator';

import { formatDistanceToNow } from 'date-fns';

import {
  Typography, Paper, Grid, CardActionArea, CircularProgress,
} from '@material-ui/core';

import WP from '@/utils/wordpress';

const useStyles = makeStyles((theme) => ({
  trendingItem: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },
  trendingStats: {
    width: '100%',
    color: theme.palette.primary.main,
    padding: theme.spacing(0.5),
  },
  trendingStatsText: {
    fontSize: '0.8rem',
  },
  oneLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

const ProfileFeed = ({ comment }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const [image, setImage] = React.useState('');

  React.useEffect(() => {
    WP.posts().slug(comment.article.id).then((res) => {
      const article = res[0];
      setImage(article.featured_image_src);
    });
  }, []);

  return (
    <CardActionArea
      onClick={() => router.push(slugGenerator({
        categories_detailed: comment.article.categories,
        slug: comment.article.id,
      }))}
      style={{ marginTop: theme.spacing(1) }}
    >
      <Paper variant="outlined" className={classes.trendingItem}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap">
          <Grid item>
            <Grid container direction="column" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }} alignItems="center">
              <Grid item>
                <Typography variant="subtitle2">{comment.upvoteCount}</Typography>
              </Grid>
              <Grid item>
                <LikeIcon />
              </Grid>
              <Grid item>
                <DislikeIcon />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{comment.downvoteCount}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container>
              <Grid item sm={12}>
                <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>
                  <Grid item>
                    <CommentIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" className={classes.oneLineText}>
                      Made a
                      {' '}
                      { comment.type === 'comment' ? 'comment' : 'reply' }
                      {' '}
                      on
                      {' '}
                      <i>{comment.article.title}</i>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>
                  <Grid item>
                    <ClockIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">{ formatDistanceToNow(comment.timestamp.toDate(), { addSuffix: true }) }</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography style={{ marginLeft: theme.spacing(2), marginTop: theme.spacing(1) }} className={classes.oneLineText} variant="body1">{comment.content}</Typography>
          </Grid>
          <Grid item xs={3}>
            { image
              ? <img src={image} alt="Profile" width="100%" />
              : (
                <Grid container justify="center" alignItems="center" spacing={2}>
                  <Grid item>
                    <CircularProgress color="primary" style={{ margin: theme.spacing(2) }} />
                  </Grid>
                </Grid>
              )}
          </Grid>
        </Grid>
      </Paper>
    </CardActionArea>
  );
};

export default ProfileFeed;
