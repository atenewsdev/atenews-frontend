import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  tag: {
    width: 'max-content',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    height: 25,
    color: 'white',
    textAlign: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: theme.palette.atenews.features
  }
}));


const Flair = ({ small }) => {
  const classes = useStyles();
  const theme = useTheme();


  return (
    <div className={classes.tag} style={small ? { height: 20 } : null}>
      <Typography variant="body2" style={small ? { fontSize: 10 } : null}>
        <Grid container spacing={1} alignItems="center" wrap="nowrap" justify="center" style={{ height: 'max-content' }}>
          <Grid item>
            <Grid container>
              <StarIcon style={small ? { fontSize: 18 } : null} />
            </Grid>
          </Grid>
          <Grid item xs>
            <b>Top Fan</b>
          </Grid>
        </Grid>
      </Typography>
    </div>
  )
}

export default Flair;