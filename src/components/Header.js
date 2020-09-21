import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from './Navigation';
import AccountBar from './AccountBar';
import MobileBar from './MobileBar';

const useStyles = makeStyles((theme) => ({
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