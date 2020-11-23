import React from 'react';

import { NextSeo } from 'next-seo';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Contact from '@/components/Staff/Contact';
import Staff from '@/components/Staff/Staff';

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import MapIcon from '@material-ui/icons/PinDrop';

import WP from '@/utils/wordpress';

import { Typography, Grid, Hidden } from '@material-ui/core';

import { useAuth } from '@/utils/hooks/useAuth';

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
  const { loadingAuth } = useAuth();

  const [editors, setEditors] = React.useState([]);
  const [seniors, setSeniors] = React.useState([]);
  const [juniors, setJuniors] = React.useState([]);

  React.useEffect(() => {
    const rolesIgnore = [
      'subscriber',
      'contributor',
      'administrator',
      'editor',
    ];
    setEditors(staffsRaw.filter((staff) => {
      const cleanRoles = staff.roles.filter((role) => !rolesIgnore.includes(role));

      let isIncluded = false;
      cleanRoles.forEach((role) => {
        if (role.toLowerCase().includes('editor')) {
          isIncluded = true;
        }
      });

      return cleanRoles.length > 0 && isIncluded;
    }));

    setSeniors(staffsRaw.filter((staff) => {
      const cleanRoles = staff.roles.filter((role) => !rolesIgnore.includes(role));

      let isIncluded = false;
      cleanRoles.forEach((role) => {
        if (role.toLowerCase().includes('senior') || role.toLowerCase().includes('head')) {
          isIncluded = true;
        }
      });

      return cleanRoles.length > 0 && isIncluded;
    }));

    setJuniors(staffsRaw.filter((staff) => {
      const cleanRoles = staff.roles.filter((role) => !rolesIgnore.includes(role));

      let isIncluded = false;
      cleanRoles.forEach((role) => {
        if (role.toLowerCase().includes('junior')) {
          isIncluded = true;
        }
      });

      return cleanRoles.length > 0 && isIncluded;
    }));
  }, [staffsRaw]);

  return (
    <div className={classes.container}>
      <NextSeo
        title="Staff - Atenews"
        description="Welcome to the official student publication of AdDU. Here is a list of the current staff of Atenews."
      />
      { !loadingAuth ? (
        <>
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

          <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>Editorial Board</Typography>

          <Grid container spacing={2}>
            { editors.map((staff, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Staff details={staff} />
              </Grid>
            )) }
          </Grid>

          <Typography variant="h4" style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(4) }}>Senior Staff</Typography>

          <Grid container spacing={2}>
            { seniors.map((staff, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Staff details={staff} />
              </Grid>
            )) }
          </Grid>

          <Typography variant="h4" style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(4) }}>Junior Staff</Typography>

          <Grid container spacing={2}>
            { juniors.map((staff, i) => (
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
        </>
      ) : (
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item>
            <img src={theme.palette.type === 'light' ? '/logo-blue.png' : '/logo.png'} alt="Atenews Logo" width="100" />
          </Grid>
        </Grid>
      ) }
    </div>
  );
}

export async function getStaticProps() {
  try {
    const staffs = await WP.staffs();
    return {
      props: {
        staffs,
      },
      revalidate: 1,
    };
  } catch (err) {
    return {
      props: {
        staffs: [],
      },
      revalidate: 1,
    };
  }
}
