import React from 'react';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Contact from '@/components/Staff/Contact';
import Staff from '@/components/Staff/Staff';

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import MapIcon from '@material-ui/icons/PinDrop';

import WP from '@/utils/wordpress';

import { Typography, Grid, Hidden } from '@material-ui/core';

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

export default function Home({ staffs: staffsRaw }) {
  const classes = useStyles();
  const theme = useTheme();

  const [staffs, setStaffs] = React.useState([]);

  React.useEffect(() => {
    setStaffs(staffsRaw.filter((staff) => {
      const rolesIgnore = [
        'subscriber',
        'contributor',
        'administrator',
        'editor',
      ];
      const cleanRoles = staff.roles.filter((role) => !rolesIgnore.includes(role));

      return cleanRoles.length > 0;
    }));
  }, [staffsRaw]);

  return (
    <div className={classes.container}>
      <Head>
        <title>Staff - Atenews</title>
      </Head>
      <div className={classes.header}>
        <img src={theme.palette.type === 'dark' ? '/atenews-footer.svg' : '/atenews-header.svg'} alt="Atenews Header" height="35" />
        <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>
          The official student publication of the Ateneo de Davao University
        </Typography>
      </div>
      <Contact />
      <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>About</Typography>
      <Typography variant="body1" component="div" style={{ marginBottom: theme.spacing(4) }}>
        <b style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>Atenews</b>
        {' '}
        is the official student publication of Ateneo de Davao University that
        aims to advance students&apos; level of consciousness on significant
        university and socially relevant issues and on matters of general
        concern by publishing online articles, tabloids, magazines, and other forms of releases.
      </Typography>

      <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>Staff</Typography>

      <Grid container spacing={2}>
        { staffs.map((staff, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Staff details={staff} />
          </Grid>
        )) }
      </Grid>

      <Hidden mdUp>
        <Typography variant="h4" style={{ marginBottom: theme.spacing(4), marginTop: theme.spacing(8) }}>Contact Us</Typography>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Grid container direction="column" spacing={2} style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>
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

export async function getServerSideProps() {
  try {
    const staffs = await WP.staffs();
    return {
      props: {
        staffs,
      },
    };
  } catch (err) {
    return {
      props: {
        staffs: [],
      },
    };
  }
}
