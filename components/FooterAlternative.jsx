import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import LocationIcon from '@material-ui/icons/PinDrop';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(20),
    height: 'calc(1000px - 30vw)',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: theme.spacing(6),
    display: 'flex',
  },
  desktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Grid container spacing={4}>
        <Grid container item sm={6} className={classes.mobile}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <img src="/atenews-footer.svg" alt="Atenews Footer" height="40" />
          </Grid>
        </Grid>
        <Grid container item sm={3} direction="column" justify="space-between">
          <Grid item>
            <Typography variant="body1">Est. 1955</Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs={1}>
                <PhoneIcon />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="body1"><b>221 2411 (Loc. 8332)</b></Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={1}>
                <MailIcon />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="body1"><b>atenews@addu.edu.ph</b></Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={1}>
                <LocationIcon />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="body1">
                  <b>Atenews Office</b>
                  , Ground Floor, Arrupe Hall, Martin Building,
                  Ateneo de Davao University, E. Jacinto St., 8016 Davao City, Philippines
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={4}>
            <Grid item>
              <FacebookIcon />
            </Grid>
            <Grid item>
              <TwitterIcon />
            </Grid>
            <Grid item>
              <InstagramIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item sm={6} className={classes.desktop}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <img src="/atenews-footer.svg" alt="Atenews Footer" height="40" />
          </Grid>
        </Grid>
        <Grid container item sm={3} direction="column" justify="space-between">
          <Grid item>
            <Typography variant="body1">End the silence of the gagged!</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" component="p" style={{ marginBottom: theme.spacing(1) }}><b>About Atenews</b></Typography>
            <Typography variant="body1" component="p">Atenews is the official student publication of Ateneo de Davao University that aims to advance students&apos; level of consciousness on significant university and socially relevant issues and on matters of general concern by publishing online articles, tabloids, magazines, and other forms of releases.</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              ©
              {' '}
              {(new Date()).getFullYear()}
              {' '}
              <b>Atenews</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
