import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@/components/Button';
import {
  Paper, Grid, TextField, Divider,
} from '@material-ui/core';

import { useError } from '@/utils/hooks/useSnackbar';
import { useAuth } from '@/utils/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  viewContainer: {
    position: 'relative',
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  arrowUp: {
    position: 'absolute',
    top: -10,
    right: 20,
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: `10px solid ${theme.palette.primary.main}`,
  },
}));

const AuthForm = ({ close, mobile }) => {
  const classes = useStyles();
  const {
    loginWithEmail,
    loginWithTwitter,
    registerEmail,
  } = useAuth();
  const theme = useTheme();
  const { setError } = useError();

  const [isRegister, setIsRegister] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = () => {
    if (email && password && password === confirmPassword) {
      registerEmail(email, password);
      close();
    } else {
      setError('All fields are required!');
    }
  };

  const handleLogin = () => {
    if (email && password) {
      loginWithEmail(email, password);
      close();
    } else {
      setError('All fields are required!');
    }
  };

  if (!isRegister) {
    return (
      <Paper variant="outlined" className={classes.viewContainer}>
        { mobile ? null : <div className={classes.arrowUp} /> }
        <Grid container spacing={2} alignItems="center" direction="column">
          <Grid item style={{ width: '100%' }}>
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              required
              error={!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) && email !== ''}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Button onClick={handleLogin} variant="contained" color="primary" size="small" fullWidth>Login</Button>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Button onClick={() => { loginWithTwitter(); close(); }} variant="contained" color="primary" size="small" fullWidth>Login with Twitter</Button>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Divider style={{ marginBottom: theme.spacing(2) }} />
            <Button onClick={() => { setIsRegister(true); }} variant="contained" color="primary" size="small" fullWidth>Register</Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" className={classes.viewContainer}>
      { mobile ? null : <div className={classes.arrowUp} /> }
      <Grid container spacing={2} alignItems="center" direction="column">
        <Grid item style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            required
            error={!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) && email !== ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField
            error={password !== confirmPassword}
            type="password"
            variant="outlined"
            label="Confirm Password"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Button onClick={handleRegister} variant="contained" color="primary" size="small" fullWidth>Register</Button>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Divider style={{ marginBottom: theme.spacing(2) }} />
          <Button onClick={() => { setIsRegister(false); }} variant="contained" color="primary" size="small" fullWidth>Login</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AuthForm;
