import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  layoutContainer: {
    width: '100%'
  },
  contentContainer: {
    width: '50%',
    margin: 'auto'
  }
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.layoutContainer}>
      <Header />
      <div className={classes.contentContainer}>
        {children}
      </div>
    </div>
  )
}

export default Layout;