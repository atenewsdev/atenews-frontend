import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from './Navigation';
import AccountBar from './AccountBar';
import MobileBar from './MobileBar';

const useStyles = makeStyles((theme) => ({
  margin: {
    position: 'fixed',
    width: '15vw',
    height: 20,
    right: 0,
    top: 0,
    zIndex: 1500,
    background: 'white'
  },
  container: {
    marginTop: 20
  },
  desktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  mobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.margin} />
      <div className={classes.desktop}>
        <Navigation />
        <AccountBar />
      </div>
      <div className={classes.mobile}>
        <MobileBar />
      </div>
    </div>
  );
}