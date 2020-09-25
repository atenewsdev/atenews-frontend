import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  viewContainer: {
    marginTop: 5,
    padding: 20,
    borderRadius: 10
  }
});


const PopoutView = () => {
  const classes = useStyles();
  
  return (
    <Paper variant="outlined" className={classes.viewContainer}>
      This is Profile view.
    </Paper>
  )
}

export default PopoutView;