import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@/components/Button';
import { Paper, Grid, TextField } from '@material-ui/core';

import { useAuth } from '@/utils/hooks/useAuth';

import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  viewContainer: {
    position: 'relative',
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  arrowUp: {
    position: 'absolute',
    top: -10,
    right: 20,
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: `10px solid ${theme.palette.primary.main}`,
  },
}));

const PopoutView = ({ close, setDarkMode }) => {
  const classes = useStyles();
  const { loginWithTwitter, authUser, logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  return (
    <Paper variant="outlined" className={classes.viewContainer}>
      <div className={classes.arrowUp} />
      {
        authUser
          ? (
            <>
              <Button onClick={() => { router.push('/profile'); close(); }}>
                Profile
              </Button>
              <br />
              <Button onClick={() => { logout(); close(); }}>
                Logout
              </Button>
              <br />
              { theme.palette.type === 'dark' ? (
                <Button onClick={() => { setDarkMode(false); close(); }}>
                  Light Mode
                </Button>
              ) : (
                <Button onClick={() => { setDarkMode(true); close(); }}>
                  Dark Mode
                </Button>
              )}
            </>
          )
          : (
            <>
              <Grid container spacing={2} alignItems="center" direction="column">
                <Grid item style={{ width: '100%' }}>
                  <TextField
                    variant="outlined"
                    label="Email"
                    fullWidth
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <TextField
                    type="password"
                    variant="outlined"
                    label="Password"
                    fullWidth
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <Button variant="contained" color="primary" size="small" fullWidth>Login</Button>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <Button onClick={() => { loginWithTwitter(); close(); }} variant="contained" color="primary" size="small" fullWidth>Login with Twitter</Button>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <Button onClick={() => { router.push('/auth/register'); close(); }} variant="contained" color="primary" size="small" fullWidth>Register</Button>
                </Grid>
              </Grid>
            </>
          )
      }
    </Paper>
  );
};

export default PopoutView;
