import React from 'react';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Contact from 'components/Staff/Contact';
import Staff from 'components/Staff/Staff';

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import MapIcon from '@material-ui/icons/PinDrop';

const useStyles = makeStyles((theme) => ({
  container: {
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    height: 65,
    padding: 5,
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();

  const staffSample = [
    {
      name: 'Gwyneth Marie Vasquez',
      avatar: '',
      position: 'Editor-In-Chief',
    },
    {
      name: 'Sofia Roena Guan',
      avatar: '',
      position: 'Associate and Managing Editor',
    },
    {
      name: 'Red',
      avatar: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/a/a6/1_red.png/revision/latest/top-crop/width/360/height/450?cb=20200912125145',
      position: 'The Impostor',
    },
    {
      name: 'Green',
      avatar: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/3/34/3_green.png/revision/latest/top-crop/width/360/height/450?cb=20200912125201',
      position: 'A Crewmate',
    },
    {
      name: 'Cyan',
      avatar: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/5/5a/DeadCharacter.png/revision/latest/top-crop/width/220/height/220?cb=20200803160829',
      position: 'A Dead Crewmate',
    },
    {
      name: 'Black',
      avatar: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/5/55/7_black.png/revision/latest/top-crop/width/360/height/450?cb=20200912125223',
      position: 'A Crewmate',
    },
    {
      name: 'Brown',
      avatar: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/b/b2/10_brown.png/revision/latest/top-crop/width/360/height/450?cb=20200912125240',
      position: 'A Crewmate',
    },
  ];

  return (
    <div className={classes.container}>
      <Head>
        <title>Staff - Atenews</title>
      </Head>
      <div className={classes.header}>
        <img src="/atenews-header.svg" alt="Atenews Header" height="35" />
        <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>
          The official student publication of the Ateneo de Davao University
        </Typography>
      </div>
      <Contact />
      <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>About</Typography>
      <Typography variant="body1" component="div" style={{ marginBottom: theme.spacing(4) }}>
        <b style={{ color: theme.palette.primary.main }}>Atenews</b>
        {' '}
        is the official student publication of Ateneo de Davao University that
        aims to advance students&apos; level of consciousness on significant
        university and socially relevant issues and on matters of general
        concern by publishing online articles, tabloids, magazines, and other forms of releases.
      </Typography>

      <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>Staff</Typography>

      <Grid container spacing={2}>
        { staffSample.map((staff, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Staff details={staff} />
          </Grid>
        )) }
      </Grid>

      <Hidden mdUp>
        <Typography variant="h4" style={{ marginBottom: theme.spacing(4), marginTop: theme.spacing(8) }}>Contact Us</Typography>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Grid container direction="column" spacing={2} style={{ color: theme.palette.primary.main }}>
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
                      Atenews Office, Ground Floor, Arrupe Hall, Martin Building,
                      Ateneo de Davao University,E. Jacinto St.,
                      {' '}
                      <b>8016 Davao City, Philippines</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

    </div>
  );
}
