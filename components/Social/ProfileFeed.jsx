import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import ClockIcon from '@material-ui/icons/AccessTime';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import CommentIcon from '@material-ui/icons/CommentOutlined';

import { formatDistanceToNow } from 'date-fns';

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

const ProfileFeed = () => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  return (
    <CardActionArea onClick={() => router.push()} style={{ marginTop: theme.spacing(1) }}>
      <Paper variant="outlined" className={classes.trendingItem}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap">
          <Grid item>
            <Grid container direction="column" style={{ color: theme.palette.primary.main }}>
              <Grid item>
                <Typography variant="subtitle2">192</Typography>
              </Grid>
              <Grid item>
                <LikeIcon />
              </Grid>
              <Grid item>
                <DislikeIcon />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">168</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container>
              <Grid item sm={12}>
                <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.primary.main }}>
                  <Grid item>
                    <CommentIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" className={classes.oneLineText}>
                      Made a comment on
                      {' '}
                      <i>Students not required to take SAs right after sem —AVP</i>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.primary.main }}>
                  <Grid item>
                    <ClockIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">{ formatDistanceToNow(new Date(), { addSuffix: true }) }</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography style={{ marginLeft: theme.spacing(2), marginTop: theme.spacing(1) }} className={classes.oneLineText} variant="body1">The university admin must be the impostor.</Typography>
          </Grid>
          <Grid item xs={3}>
            <img src="https://atenews.ph/wp-content/uploads/2020/09/forward1st.jpg" alt="Profile" width="100%" />
          </Grid>
        </Grid>
      </Paper>
    </CardActionArea>
  );
};

export default ProfileFeed;
