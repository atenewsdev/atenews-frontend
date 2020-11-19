import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@/components/Button';
import {
  Paper, Divider,
} from '@material-ui/core';

import { useAuth } from '@/utils/hooks/useAuth';
import AuthForm from '@/components/Auth/AuthForm';

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
  const {
    authUser,
    profile,
    logout,
  } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  if (authUser) {
    return (
      <Paper variant="outlined" className={classes.viewContainer}>
        <div className={classes.arrowUp} />
        <Button onClick={() => { router.push(`/profile/${profile.username}`); close(); }}>
          Profile
        </Button>
        <br />
        <Button onClick={() => { logout(); close(); }}>
          Logout
        </Button>
        <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
        { theme.palette.type === 'dark' ? (
          <Button onClick={() => { setDarkMode(false); close(); }}>
            Light Mode
          </Button>
        ) : (
          <Button onClick={() => { setDarkMode(true); close(); }}>
            Dark Mode
          </Button>
        )}
      </Paper>
    );
  }

  return <AuthForm close={close} />;
};

export default PopoutView;
