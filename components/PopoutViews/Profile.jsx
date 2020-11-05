import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@/components/Button';
import { Paper } from '@material-ui/core';

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

const PopoutView = () => {
  const classes = useStyles();
  const { loginWithTwitter, authUser, logout } = useAuth();
  const router = useRouter();

  return (
    <Paper variant="outlined" className={classes.viewContainer}>
      <div className={classes.arrowUp} />
      {
        authUser
          ? (
            <>
              <Button onClick={() => { router.push('/profile'); }}>
                Profile
              </Button>
              <br />
              <Button onClick={logout}>
                Logout
              </Button>
            </>
          )
          : (
            <Button onClick={loginWithTwitter}>
              Login
            </Button>
          )
      }
    </Paper>
  );
};

export default PopoutView;
