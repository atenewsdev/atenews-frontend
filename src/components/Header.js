import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from './Navigation';
import AccountBar from './AccountBar';

const useStyles = makeStyles({
  container: {
    marginTop: 20
  }
});

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Navigation />
      <AccountBar />
    </div>
  );
}