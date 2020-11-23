import React from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';

import { useAuth } from '@/utils/hooks/useAuth';

import { useTheme } from '@material-ui/core/styles';

export default function VerifyEmailButton() {
  const theme = useTheme();
  const router = useRouter();

  const [timer, setTimer] = React.useState(0);
  const [interval, setIntervalState] = React.useState(null);

  const initiateTimer = () => {
    setTimer(30);
    const temp = setInterval(() => {
      if (timer !== 0) {
        setTimer((prev) => prev - 1);
      } else {
        router.reload();
        clearInterval(interval);
      }
    }, 1000);
    setIntervalState(temp);
  };

  const {
    authUser,
  } = useAuth();

  if (!authUser.emailVerified) {
    return (
      <Button
        style={{ marginTop: theme.spacing(1) }}
        variant="contained"
        color="primary"
        size="small"
        disabled={timer !== 0}
        onClick={() => {
          authUser.sendEmailVerification();
          initiateTimer();
        }}
      >
        Verify Email
        {' '}
        {timer !== 0 ? `(Retry in ${timer}s)` : ''}
      </Button>
    );
  }

  return null;
}
