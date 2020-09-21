import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  viewContainer: {
    background: '#195EA9',
    color: '#ffffff',
    padding: 20
  }
});


const PopoutView = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.viewContainer}>
      This is Profile view.
    </div>
  )
}

export default PopoutView;