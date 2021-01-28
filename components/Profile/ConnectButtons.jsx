import React from 'react';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import Button from '@/components/General/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

import {
  Grid,
  Typography,
} from '@material-ui/core';

import { useAuth } from '@/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  iconStats: {
    width: 'fit-content',
    marginRight: theme.spacing(4),
  },
  section: {
    marginTop: theme.spacing(4),
  },
}));

export default function ConnectButtons({ loading, profile }) {
  const theme = useTheme();
  const classes = useStyles();

  const {
    profile: authProfile,
    connectWithFacebook,
    connectWithTwitter,
  } = useAuth();

  const [twitterFound, setTwitterFound] = React.useState(false);
  const [facebookFound, setFacebookFound] = React.useState(false);

  React.useEffect(() => {
    if (authProfile) {
      if ('twitterUsername' in authProfile) {
        setTwitterFound(true);
      }
      if ('facebookUsername' in authProfile) {
        setFacebookFound(true);
      }
    }
  }, [authProfile]);

  if (authProfile.username === profile.username) {
    return (
      <Grid container spacing={2} style={{ marginTop: theme.spacing(2) }}>
        { !twitterFound ? (
          <Grid item>
            <Button
              onClick={() => { connectWithTwitter(); }}
              variant="contained"
              size="small"
              fullWidth
              disabled={loading}
              style={{
                backgroundColor: '#00acee',
                color: 'white',
              }}
            >
              <TwitterIcon style={{ marginRight: theme.spacing(1) }} />
              Connect with Twitter
            </Button>
          </Grid>
        ) : (
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
        )}
        { !facebookFound ? (
          <Grid item>
            <Button
              onClick={() => { connectWithFacebook(); }}
              variant="contained"
              size="small"
              fullWidth
              disabled={loading}
              style={{
                backgroundColor: '#3b5998',
                color: 'white',
              }}
            >
              <FacebookIcon style={{ marginRight: theme.spacing(1) }} />
              Connect with FB
            </Button>
          </Grid>
        ) : (
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
        ) }
      </Grid>
    );
  }

  return null;
}
