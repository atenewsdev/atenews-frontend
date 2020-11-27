import React from 'react';

import Button from '@/components/General/Button';
import FollowIcon from '@material-ui/icons/Add';
import UnfollowIcon from '@material-ui/icons/Remove';
import { useTheme } from '@material-ui/core/styles';

import { useAuth } from '@/utils/hooks/useAuth';

import firebase from '@/utils/firebase';

export default function FollowButton({ category }) {
  const theme = useTheme();

  const { profile, authUser } = useAuth();

  const [ready, setReady] = React.useState(false);
  const [unfollowed, setUnfollowed] = React.useState(false);

  React.useEffect(() => {
    if (profile) {
      firebase.database().ref(`unfollows/${profile.id}`).once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUnfollowed(data[category]);
          }
          setReady(true);
        });
    }
  }, [profile]);

  React.useEffect(() => {
    if (profile) {
      firebase.database().ref(`unfollows/${profile.id}`).update({
        [category]: unfollowed,
      });
    }
  }, [unfollowed]);

  if (!profile) {
    return null;
  }

  if (!authUser.emailVerified) {
    return null;
  }

  if (!ready) {
    return null;
  }

  if (!unfollowed) {
    return (
      <Button
        variant="outlined"
        color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
        size="small"
        onClick={() => setUnfollowed((prev) => !prev)}
      >
        <UnfollowIcon style={{ marginRight: theme.spacing(1) }} />
        Unfollow
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      elevation={0}
      color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
      size="small"
      onClick={() => setUnfollowed((prev) => !prev)}
    >
      <FollowIcon style={{ marginRight: theme.spacing(1) }} />
      Follow
    </Button>
  );
}
