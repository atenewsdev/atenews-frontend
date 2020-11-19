import React from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import MailIcon from '@material-ui/icons/Mail';

import ProfileFeed from '@/components/Social/ProfileFeed';
import Flair from '@/components/Social/Flair';
import Button from '@/components/Button';

import {
  Typography,
  Avatar,
  Grid,
  Divider,
  CircularProgress,
  TextField as StockTextField,
  InputAdornment,
  FormControl,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import { useError } from '@/utils/hooks/useSnackbar';
import useFirestore from '@/utils/hooks/useFirestore';
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

const TextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 30,
      },
    },
  },
})(StockTextField);

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const { authUser, profile: authProfile } = useAuth();
  const { firebase } = useFirestore();
  const { setError, setSuccess } = useError();

  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [updating, setUpdating] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [editMode, setEditMode] = React.useState(false);

  const [displayName, setDisplayName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [backup, setBackup] = React.useState({
    displayName: '',
    username: '',
    bio: '',
    email: '',
  });

  React.useEffect(() => {
    const { username: queryUsername } = router.query;

    firebase.firestore().collection('users').where('username', '==', queryUsername).get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          setProfile({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
        } else {
          setError('User not found!');
        }
      });
  }, [router.query]);

  const [confirmPasswordDialog, setConfirmPasswordDialog] = React.useState(false);

  const [firebaseUser, setFirebaseUser] = React.useState(null);

  React.useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setUsername(profile.username);
      setBio(profile.bio);
      setEmail(profile.email);

      const arrayList = [];
      Promise.all([
        firebase.firestore().collection('comments').where('userId', '==', profile.id).limit(5)
          .get(),
        firebase.firestore().collection('replies').where('userId', '==', profile.id).limit(5)
          .get(),
      ]).then(async ([commentsQuery, repliesQuery]) => {
        await Promise.all([
          ...commentsQuery.docs.map(async (doc) => {
            const article = await firebase.database().ref(`articles/${doc.data().articleSlug}`).once('value');
            arrayList.push({
              ...doc.data(), type: 'comment', id: doc.id, article: article.val(),
            });
          }),
          ...repliesQuery.docs.map(async (doc) => {
            const article = await firebase.database().ref(`articles/${doc.data().articleSlug}`).once('value');
            arrayList.push({
              ...doc.data(), type: 'reply', id: doc.id, article: article.val(),
            });
          }),
        ]);
        arrayList.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
        setComments(arrayList);
        setLoading(false);
      }).catch((err) => {
        setError(err.message);
      });
    }
  }, [profile]);

  const testDisplayName = () => /^.{1,50}$/.test(displayName);
  const testUsername = () => /^[a-zA-Z0-9_]{1,15}$/.test(username);
  const testBio = () => /^.{0,160}$/.test(bio);
  const testEmail = () => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

  const handleDialogClose = () => {
    setConfirmPasswordDialog(false);
  };

  const handleDialogOpen = () => {
    setConfirmPasswordDialog(true);
  };

  const handleEditProfile = async () => {
    if (editMode) {
      setUpdating(true);
      if (!testDisplayName()) {
        setError('Display Name is limited to 50 characters only!');
        setUpdating(false);
        return;
      }
      if (!testUsername()) {
        setError('Username is limited to 15 alphanumeric characters only!');
        setUpdating(false);
        return;
      }
      if (username !== backup.username) {
        const existingUser = await firebase.firestore().collection('users').where('username', '==', username).get();
        if (!existingUser.empty) {
          setError('Username already taken!');
          setUpdating(false);
          return;
        }
      }
      if (!testBio()) {
        setError('Bio is limited to 160 characters only!');
        setUpdating(false);
        return;
      }
      if (!testEmail()) {
        setError('Invalid email format detected!');
        setUpdating(false);
        return;
      }
      try {
        if (email !== backup.email) {
          await firebaseUser.updateEmail(email);
          await firebase.auth().currentUser.sendEmailVerification();
        }
        await firebase.firestore().collection('users').doc(authUser.uid).update({
          displayName,
          username,
          bio: bio || '',
          email,
        });

        setBackup({
          displayName,
          username,
          bio,
          email,
        });

        setSuccess('Successfully updated profile!');
      } catch (err) {
        setDisplayName(backup.displayName);
        setUsername(backup.username);
        setBio(backup.bio);
        setEmail(backup.email);

        setError(err.message);
      }
      setUpdating(false);
    } else {
      setBackup({
        displayName,
        username,
        bio,
        email,
      });
    }

    setEditMode((prev) => !prev);
  };

  const handleConfirmPassword = async () => {
    setConfirming(true);
    try {
      const userCredential = await firebase.auth()
        .signInWithEmailAndPassword(profile.email, password);
      setFirebaseUser(userCredential.user);
      handleDialogClose();
      handleEditProfile();
    } catch (err) {
      setError('Incorrect password! Please try again.');
    }
    setConfirming(false);
    setPassword('');
  };

  const EditButton = () => (authProfile.username === profile.username ? (
    <div className={classes.section} style={{ marginTop: theme.spacing(3) }}>
      <Button variant="contained" color="primary" size="large" onClick={editMode ? handleEditProfile : handleDialogOpen} disabled={updating}>{editMode ? 'Update Profile' : 'Edit Profile'}</Button>
    </div>
  ) : null);

  if (profile) {
    return (
      <div className={classes.container}>
        <Head>
          <title>Profile - Atenews</title>
        </Head>
        <Grid container spacing={6} justify="center">
          <Grid item>
            <div className={classes.leftSide}>
              <Avatar className={classes.avatar} src={profile.photoURL ? profile.photoURL.replace('_normal', '') : ''} />
            </div>
          </Grid>
          <Grid item xs>
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: theme.spacing(2) }}>
              <Grid item style={{ padding: 0, paddingLeft: theme.spacing(1) }}>
                {editMode ? (
                  <FormControl style={{ marginBottom: theme.spacing(2) }}>
                    <TextField
                      label="Display Name"
                      variant="outlined"
                      value={displayName}
                      error={!(testDisplayName())}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <FormHelperText variant="outlined">{`${displayName ? displayName.length || 0 : 0}/50`}</FormHelperText>
                  </FormControl>
                ) : (
                  <Typography variant="h4">{displayName}</Typography>
                )}
              </Grid>
              { profile.staff ? (
                <Grid item xs>
                  <Flair />
                </Grid>
              ) : null}
              <Grid item xs={12} style={{ padding: 0, paddingLeft: theme.spacing(1) }}>
                {editMode ? (
                  <FormControl>
                    <TextField
                      label="Username"
                      variant="outlined"
                      value={username}
                      size="small"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">@</InputAdornment>,
                      }}
                      error={!(testUsername())}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <FormHelperText variant="outlined">{`${username ? username.length || 0 : 0}/15`}</FormHelperText>
                  </FormControl>
                ) : (
                  <Typography variant="body1">{`@${username}`}</Typography>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <div className={classes.iconStats}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <LikeIcon style={{ fontSize: 50 }} color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                    </Grid>
                    <Grid item>
                      <Grid container direction="column" justify="center">
                        <Grid item>
                          <Typography variant="h5" color={theme.palette.type === 'light' ? 'primary' : 'secondary'}>{profile.upvotesReceived || 0}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">Upvotes</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.iconStats}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <DislikeIcon style={{ fontSize: 50 }} color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                    </Grid>
                    <Grid item>
                      <Grid container direction="column" justify="center">
                        <Grid item>
                          <Typography variant="h5" color={theme.palette.type === 'light' ? 'primary' : 'secondary'}>{profile.downvotesReceived || 0}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">Downvotes</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
            <div className={classes.section}>
              {editMode ? (
                <FormControl fullWidth>
                  <TextField
                    label="Bio"
                    variant="outlined"
                    value={bio}
                    multiline
                    rows={4}
                    rowsMax={4}
                    fullWidth
                    error={!(testBio())}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <FormHelperText variant="outlined">{`${bio ? bio.length || 0 : 0}/160`}</FormHelperText>
                </FormControl>
              ) : (
                <Typography variant="body1">{bio || <i>This profile has no bio.</i>}</Typography>
              )}
            </div>
            <div className={classes.section}>
              <Grid container>
                <Grid item>
                  <div className={classes.iconStats}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <MailIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                      </Grid>
                      <Grid item>
                        {editMode ? (
                          <FormControl>
                            <TextField
                              label="Email"
                              variant="outlined"
                              value={email}
                              error={!(testEmail())}
                              size="small"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormHelperText variant="outlined">Verification email will be sent after updating.</FormHelperText>
                          </FormControl>
                        ) : (
                          <Typography variant="body1">{email}</Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>
            {authProfile ? (
              <EditButton />
            ) : null }
          </Grid>
        </Grid>
        <Divider style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />

        { !loading ? comments.map((comment) => (
          <ProfileFeed key={comment.id} comment={comment} />
        ))
          : (
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <CircularProgress color="primary" style={{ margin: theme.spacing(2) }} />
              </Grid>
            </Grid>
          )}

        <Dialog
          open={confirmPasswordDialog}
          onClose={handleDialogClose}
        >
          <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
          <DialogContent style={{ padding: theme.spacing(2) }}>
            <FormControl>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={password}
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormHelperText variant="outlined">Password is required to update profile.</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions style={{ padding: theme.spacing(2) }}>
            <Button variant="contained" color="primary" onClick={handleConfirmPassword} disabled={confirming}>{editMode ? 'Update Profile' : 'Edit Profile'}</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item>
        <CircularProgress color="primary" style={{ margin: theme.spacing(2) }} />
      </Grid>
    </Grid>
  );
}
