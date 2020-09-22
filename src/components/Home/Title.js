import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: -9999,
    marginBottom: theme.spacing(4)
  },
  title: {
    color: '#ffffff',
    height: 65,
  },
  design: {
    position: 'absolute',
    top: 0,
    right: 'calc(-15vw - 2.5vw)',
    color: '#ffffff',
    width: '15vw',
    height: 65,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));


const Title = ({ color, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title} style={{ backgroundColor: color }}>
        <Typography style={{ paddingLeft: 40 }} variant="h3">{ children }</Typography>
      </div>
      <div className={classes.design} style={{ backgroundColor: color }}/>
    </div>
  )
}

export default Title;