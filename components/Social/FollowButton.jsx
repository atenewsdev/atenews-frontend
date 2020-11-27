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

  const [unfollowed, setUnfollowed] = React.useState(false);

  React.useEffect(() => {
    if (profile) {
      firebase.firestore().collection('unfollows').doc(profile.id).get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const data = snapshot.data();
            setUnfollowed(data[category]);
          }
        });
    }
  }, [profile]);

  React.useEffect(() => {
    if (profile) {
      firebase.firestore().collection('unfollows').doc(profile.id).set({
        [category]: unfollowed,
      }, { merge: true });
    }
  }, [unfollowed]);

  if (!profile) {
    return null;
  }

  if (!authUser.emailVerified) {
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
