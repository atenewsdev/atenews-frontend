import React from 'react';

import { useTheme } from '@material-ui/core/styles';

import Button from '@/components/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

import {
  Grid,
} from '@material-ui/core';

import { useAuth } from '@/utils/hooks/useAuth';

export default function ConnectButtons({ loading, profile }) {
  const theme = useTheme();

  const {
    authUser,
    profile: authProfile,
    connectWithFacebook,
    connectWithTwitter,
  } = useAuth();

  const [twitterFound, setTwitterFound] = React.useState(false);
  const [facebookFound, setFacebookFound] = React.useState(false);

  React.useEffect(() => {
    if (authUser) {
      authUser.providerData.forEach((data) => {
        if (data.providerId === 'twitter.com') {
          setTwitterFound(true);
        } else if (data.providerId === 'facebook.com') {
          setFacebookFound(true);
        }
      });
    }
  }, [authUser]);

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
        ) : null}
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
        ) : null }
      </Grid>
    );
  }

  return null;
}
