import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import MapIcon from '@material-ui/icons/PinDrop';

import { Typography, Grid, Hidden } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    position: 'fixed',
    width: 'calc(15vw - 10px)',
    right: 10,
  },
}));

const Trending = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Hidden smDown>
      <div className={classes.container} style={{ top: 'calc(80px + 4vh)', color: theme.palette.primary.main }}>
        <Typography variant="h6" style={{ marginBottom: theme.spacing(2) }}>Contact Us</Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <PhoneIcon />
              </Grid>
              <Grid item>
                <Typography variant="body2">221 2411 (Loc. 8332)</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <MailIcon />
              </Grid>
              <Grid item>
                <Typography variant="body2">atenews@addu.edu.ph</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <MapIcon />
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Atenews Office, Ground Floor, Arrupe Hall,
                  Martin Building, Ateneo de Davao University, E. Jacinto St.,
                  {' '}
                  <b>8016 Davao City, Philippines</b>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Hidden>
  );
};

export default Trending;
