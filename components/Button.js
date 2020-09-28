import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    borderRadius: 40
  },
};

function ClassNames(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={classes.root} {...other}>
      {children || 'class names'}
    </Button>
  );
}

export default withStyles(styles)(ClassNames);