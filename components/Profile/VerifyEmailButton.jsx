import React from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/General/Button';

import localforage from 'localforage';

import { useAuth } from '@/hooks/useAuth';
import { useError } from '@/hooks/useSnackbar';

export default function VerifyEmailButton() {
  const router = useRouter();
  const { setSuccess } = useError();

  const [timerRunning, setTimerRunning] = React.useState(false);
  const [timer, setTimer] = React.useState(30);
  const [interval, setIntervalState] = React.useState(null);

  const initiateTimer = () => {
    setTimerRunning(true);
    const temp = setInterval(() => {
      if (timer !== 0) {
        setTimer((prev) => prev - 1);
      } else {
        clearInterval(interval);
        router.reload();
      }
    }, 1000);
    setIntervalState(temp);
  };

  React.useEffect(() => {
    localforage.getItem('verifyEmailTimer').then((state) => {
      if (state) {
        setTimer(state);
      }
    });
    localforage.getItem('verifyEmailTimerRunning').then((state) => {
      setTimerRunning(state);
      if (state) {
        initiateTimer();
      }
    });
  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      setTimerRunning(false);
      setTimer(30);
    }
    localforage.setItem('verifyEmailTimer', timer);
  }, [timer]);

  React.useEffect(() => {
    localforage.setItem('verifyEmailTimerRunning', timerRunning);
  }, [timerRunning]);

  const {
    authUser,
  } = useAuth();

  const verifyAction = (email) => fetch('/api/auth/verify', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: `email=${email}`,
  }).then((response) => response.json());

  if (!authUser.emailVerified) {
    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={timerRunning}
        onClick={() => {
          verifyAction(authUser.email).then(() => {
            setSuccess('Email sent! Please check your inbox and spam folder for the verification link.');
            initiateTimer();
          });
        }}
      >
        Verify Email
        {' '}
        {timerRunning ? `(Retry in ${timer})` : ''}
      </Button>
    );
  }

  return null;
}
