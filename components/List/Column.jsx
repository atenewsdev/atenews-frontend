import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';

import ReactInfo from '@/components/Social/ReactInfo';

import { formatDistanceToNow } from 'date-fns';
import coauthors from '@/utils/coauthors';
import slugGenerator from '@/utils/slugGenerator';
import imageGenerator from '@/utils/imageGenerator';

import {
  Typography, Paper, Grid, CardActionArea, Avatar,
} from '@material-ui/core';

import useFirebaseDatabase from '@/utils/hooks/useFirebaseDatabase';

const useStyles = makeStyles((theme) => ({
  trendingItem: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },
  trendingStats: {
    width: '100%',
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
    padding: theme.spacing(0.5),
  },
  trendingStatsText: {
    fontSize: '0.8rem',
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

const Column = ({ article }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const { getDocument } = useFirebaseDatabase();

  const [socialStats, setSocialStats] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = getDocument(`articles/${article.slug}`, (doc) => {
      setSocialStats(doc);
    });
    return () => {
      unsubscribe.off();
    };
  }, [article]);

  return (
    <CardActionArea
      onClick={() => router.push(slugGenerator(article))}
      style={{ marginTop: theme.spacing(1) }}
    >
      <Paper variant="outlined" className={classes.trendingItem}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              className={classes.avatar}
              src={imageGenerator(article.coauthors.nodes[0].avatar.url, 300)}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" component="div" className={classes.twoLineText} style={{ marginBottom: theme.spacing(1) }} dangerouslySetInnerHTML={{ __html: article.title }} />
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>
                  <Grid item>
                    <AccountIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      { coauthors(article.coauthors.nodes) }
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
                    <Typography variant="caption">{ formatDistanceToNow(new Date(article.date), { addSuffix: true }) }</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} component="div" className={classes.trendingStats} justify="flex-start">
              <Grid item xs>
                <ReactInfo
                  IconProps={{ className: classes.trendingStatsText }}
                  TextProps={{ className: classes.trendingStatsText }}
                  GridProps={{ alignItems: 'center' }}
                  socialStats={socialStats}
                />
              </Grid>
              <Grid item xs>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <CommentIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.trendingStatsText} variant="subtitle2">{socialStats ? socialStats.commentCount : 0}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <ShareIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.trendingStatsText} variant="subtitle2">{socialStats ? socialStats.shareCount || 0 : 0}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <VisibilityIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.trendingStatsText} variant="subtitle2">{socialStats ? socialStats.viewsCount || 0 : 0}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </CardActionArea>
  );
};

export default Column;
