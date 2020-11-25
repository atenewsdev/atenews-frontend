import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { useRouter } from 'next/router';
import { useError } from '@/utils/hooks/useSnackbar';
import firebase from '@/utils/firebase';

const ActionAuth = () => {
  const router = useRouter();
  const theme = useTheme();

  const [mode] = React.useState(router.query.mode);
  const [oobCode] = React.useState(router.query.oobCode);
  const [continueUrl] = React.useState(router.query.continueUrl);

  const { setSuccess, setError } = useError();
  React.useEffect(() => {
    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.
        setError('Reset password has not been implemented yet!');
        router.push('/');
        break;
      case 'recoverEmail':
        // Display email recovery handler and UI.
        setError('Email recovery has not been implemented yet!');
        router.push('/');
        break;
      case 'verifyEmail':
        // Display email verification handler and UI.
        firebase.auth().applyActionCode(oobCode).then(() => {
          setSuccess('Successfully verified email!');
          if (continueUrl) {
            router.push(continueUrl);
          } else {
            router.push('/');
          }
        }).catch((err) => {
          setError(err.message);
          router.push('/');
        });
        break;
      default:
        // Error: invalid mode.
        break;
    }
  }, [mode]);

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item>
        <CircularProgress color="primary" style={{ margin: theme.spacing(2) }} />
      </Grid>
    </Grid>
  );
};

export default ActionAuth;
