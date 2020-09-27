import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: theme.spacing(4)
  },
  title: {
    color: '#ffffff',
    height: 65,
    borderRadius: 10
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


const Title = ({ color, children, small }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title} style={{ backgroundColor: color, height: !small ? 65 : 40 }}>
        <Typography style={{ paddingLeft: !small ? 40 : 20, paddingTop: !small ? 10 : 5 }} variant={!small ? "h4" : "h6"}>{ children }</Typography>
      </div>
      {/*
        <div className={classes.design} style={{ backgroundColor: color }}/>
      */}
    </div>
  )
}

export default Title;