import React from 'react';

import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useRouter } from 'next/router';

import {
  Typography, TextField, Grid, Divider,
} from '@material-ui/core';

import Button from '@/components/Button';

import { useAuth } from '@/utils/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
  },
  iconStats: {
    width: 'fit-content',
    marginRight: theme.spacing(4),
  },
  section: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    height: 250,
    width: 250,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  leftSide: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const { authUser } = useAuth();

  if (authUser) {
    router.push('/profile');
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>Register - Atenews</title>
      </Head>
      <Grid container spacing={4} alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h3">Account Registration</Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Divider style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />
        </Grid>
        <Grid item>
          <Typography variant="h5">Basic Information</Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            label="First Name"
            fullWidth
          />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            label="Last Name"
            fullWidth
          />
        </Grid>
        <Grid item>
          <Typography variant="h5">Credentials</Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            fullWidth
          />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField
            type="password"
            variant="outlined"
            label="Confirm Password"
            fullWidth
          />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Divider style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Button variant="contained" color="primary" size="large" fullWidth>Register</Button>
        </Grid>
      </Grid>
    </div>
  );
}
