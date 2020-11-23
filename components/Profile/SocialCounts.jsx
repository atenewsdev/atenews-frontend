import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';

import {
  Typography,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  iconStats: {
    width: 'fit-content',
    marginRight: theme.spacing(4),
  },
  section: {
    marginTop: theme.spacing(4),
  },
}));

export default function SocialCounts({
  profile,
  followerCount,
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Grid container>
        <Grid item>
          <div className={classes.iconStats}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LikeIcon style={{ fontSize: 50 }} color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
              </Grid>
              <Grid item>
                <Grid container direction="column" justify="center">
                  <Grid item>
                    <Typography variant="h5" color={theme.palette.type === 'light' ? 'primary' : 'secondary'}>{profile.upvotesReceived || 0}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Upvotes</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <div className={classes.iconStats}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <DislikeIcon style={{ fontSize: 50 }} color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
              </Grid>
              <Grid item>
                <Grid container direction="column" justify="center">
                  <Grid item>
                    <Typography variant="h5" color={theme.palette.type === 'light' ? 'primary' : 'secondary'}>{profile.downvotesReceived || 0}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Downvotes</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      { followerCount > 0 ? (
        <div className={classes.section} style={{ marginTop: theme.spacing(2) }}>
          <Typography variant="body1">
            <b>{followerCount}</b>
            {' '}
            followers
          </Typography>
        </div>
      ) : null }
    </>
  );
}
