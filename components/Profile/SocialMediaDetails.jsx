import React from 'react';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

import {
  Grid,
  Typography,
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

export default function ConnectButtons({ profile }) {
  const theme = useTheme();
  const classes = useStyles();

  const [twitterFound, setTwitterFound] = React.useState(false);
  const [facebookFound, setFacebookFound] = React.useState(false);

  React.useEffect(() => {
    if (profile) {
      if ('twitterUsername' in profile) {
        setTwitterFound(true);
      }
      if ('facebookUsername' in profile) {
        setFacebookFound(true);
      }
    }
  }, [profile]);

  return (
    <Grid container spacing={2} style={{ marginTop: theme.spacing(2) }}>
      { twitterFound ? (
        <Grid item>
          <Grid container>
            <Grid item>
              <div className={classes.iconStats}>
                <Grid container spacing={1}>
                  <Grid item>
                    <TwitterIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{`@${profile.twitterUsername}`}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      { facebookFound ? (
        <Grid item>
          <Grid container>
            <Grid item>
              <div className={classes.iconStats}>
                <Grid container spacing={1}>
                  <Grid item>
                    <FacebookIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{profile.facebookUsername}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
