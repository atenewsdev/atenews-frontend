import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Paper,
  Divider,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/Auth/AuthForm';

import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  viewContainer: {
    position: 'relative',
    marginTop: 10,
    padding: theme.spacing(2),
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
    borderBottom: `10px solid ${theme.palette.divider}`,
  },
  list: {
    width: '100%',
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
        <List
          subheader={(
            <ListSubheader component="div">
              User Settings
            </ListSubheader>
          )}
          className={classes.list}
        >
          <ListItem button onClick={() => { router.push(`/profile/${profile.username}`); close(); }}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => { logout(); close(); }}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Divider />
        <List
          subheader={(
            <ListSubheader component="div">
              Theme Settings
            </ListSubheader>
          )}
          className={classes.list}
        >
          { theme.palette.type === 'dark' ? (
            <ListItem button onClick={() => { setDarkMode(false); }}>
              <ListItemIcon>
                <Brightness7Icon />
              </ListItemIcon>
              <ListItemText primary="Light Mode" />
            </ListItem>
          ) : (
            <ListItem button onClick={() => { setDarkMode(true); }}>
              <ListItemIcon>
                <NightsStayIcon />
              </ListItemIcon>
              <ListItemText primary="Dark Mode" />
            </ListItem>
          )}
        </List>
      </Paper>
    );
  }

  return <AuthForm close={close} />;
};

export default PopoutView;
