import React from 'react';

import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import MailIcon from '@material-ui/icons/Mail';

import ProfileFeed from '@/components/Social/ProfileFeed';
import Flair from '@/components/Social/Flair';
import Button from '@/components/Button';
import Trending from '@/components/Home/Trending';

import DefaultErrorPage from '@/components/404';

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
import { useTrending } from '@/utils/hooks/useTrending';

import useAdminFirestore from '@/utils/hooks/useAdminFirestore';

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

export default function Home({ profile }) {
  const classes = useStyles();
  const theme = useTheme();
  const trending = useTrending();
  const router = useRouter();

  const {
    authUser, profile: authProfile, loadingAuth, deleteAccount,
  } = useAuth();
  const { firebase } = useFirestore();
  const { setError, setSuccess } = useError();

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

  const [followerCount, setFollowerCount] = React.useState(0);

  const [backup, setBackup] = React.useState({
    displayName: '',
    username: '',
    bio: '',
    email: '',
  });

  const [confirmPasswordDialog, setConfirmPasswordDialog] = React.useState(false);
  const [deleteAccountDialog, setDeleteAccountDialog] = React.useState(false);

  const [firebaseUser, setFirebaseUser] = React.useState(null);

  React.useEffect(() => {
    if (profile) {
      firebase.firestore().collection('followers').doc(profile.id).get()
        .then((followers) => {
          if (followers.exists) {
            const followersObject = { ...followers.data() };
            setFollowerCount(Object.keys(followersObject).length);
          }
        });
      setDisplayName(profile.displayName);
      setUsername(profile.username);
      setBio(profile.bio);
      setEmail(profile.email);

      firebase.firestore().collection('profileFeeds').doc(profile.id)
        .get()
        .then(async (doc) => {
          const arrayList = [];
          if (doc.exists) {
            await Promise.all(Object.keys(doc.data()).map(async (key) => {
              arrayList.push(doc.data()[key]);
            }));

            arrayList.sort(
              (a, b) => b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime(),
            );
          }
          setLoading(false);
          setComments(arrayList);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    } else {
      setError('User not found!');
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

  const handleDeleteClose = () => {
    setDeleteAccountDialog(false);
  };

  const handleDeleteOpen = () => {
    setDeleteAccountDialog(true);
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

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
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

  const handleDeleteAccount = async () => {
    setConfirming(true);
    try {
      await deleteAccount();
      handleDeleteClose();
      setSuccess('Your account has been successfully deleted from our system!');
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
    setConfirming(false);
  };

  const EditButton = () => (authProfile.username === profile.username ? (
    <div className={classes.section} style={{ marginTop: theme.spacing(3) }}>
      { editMode ? (
        <>
          <Button
            variant="contained"
            style={{
              color: 'white',
              backgroundColor: 'red',
            }}
            size="small"
            onClick={handleDeleteOpen}
            disabled={updating}
          >
            Delete Account
          </Button>
          <br />
          <br />
        </>
      ) : null }
      <Button variant="contained" color="primary" size="large" onClick={editMode ? handleEditProfile : handleDialogOpen} disabled={updating}>{editMode ? 'Update Profile' : 'Edit Profile'}</Button>
    </div>
  ) : null);

  if (profile) {
    return (
      <div className={classes.container}>
        <NextSeo
          title={`${profile.displayName} (@${profile.username}) - Atenews`}
          description={`The latest interactions from ${profile.displayName} (@${profile.username}). Join us here in the Atenews website!`}
          openGraph={{
            title: `${profile.displayName} (@${profile.username}) - Atenews`,
            description: `The latest interactions from ${profile.displayName} (@${profile.username}). Join us here in the Atenews website!`,
            images: profile.photoURL ? [
              {
                url: profile.photoURL.replace('_normal', ''),
              },
            ] : [{
              url: '/default-thumbnail.jpg',
            }],
          }}
          twitter={{
            handle: '@atenews',
          }}
        />
        { !loadingAuth ? (
          <>
            <Grid container spacing={6} justify="center">
              <Grid item>
                <Avatar className={classes.avatar} src={profile.photoURL ? profile.photoURL.replace('_normal', '') : ''} />
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
                { followerCount > 0 ? (
                  <div className={classes.section} style={{ marginTop: theme.spacing(2) }}>
                    <Typography variant="body1">
                      <b>{followerCount}</b>
                      {' '}
                      followers
                    </Typography>
                  </div>
                ) : null }
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
              <form onSubmit={handleConfirmPassword}>
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
                  <Button variant="contained" color="primary" type="submit" disabled={confirming}>{editMode ? 'Update Profile' : 'Edit Profile'}</Button>
                </DialogActions>
              </form>
            </Dialog>

            <Dialog
              open={deleteAccountDialog}
              onClose={handleDeleteClose}
            >
              <DialogTitle id="form-dialog-title">This will delete your account.</DialogTitle>
              <Divider />
              <DialogContent style={{ padding: theme.spacing(2) }}>
                <Typography variant="body1">As much as we want you to stay, you&apos;re about to start the process of deleting your Atenews account.</Typography>
              </DialogContent>
              <DialogContent style={{ padding: theme.spacing(2) }}>
                <Typography variant="h6">What else you should know</Typography>
              </DialogContent>
              <DialogContent style={{ padding: theme.spacing(2) }}>
                <Typography variant="body1">All your comments, replies, reacts, upvotes, downvotes, and profile will be PERMANENTLY deleted from our system.</Typography>
                <Typography variant="body1">If you want to change your email address or @username, you don&apos;t need to deactivate your account. Updating your profile will suffice.</Typography>
              </DialogContent>
              <DialogContent style={{ padding: theme.spacing(2) }}>
                <Typography variant="body1">If you are sure you want to delete your account, press the confirm button below.</Typography>
              </DialogContent>
              <DialogActions style={{ padding: theme.spacing(2) }}>
                <Button
                  variant="contained"
                  style={{
                    color: 'white',
                    backgroundColor: 'red',
                  }}
                  onClick={handleDeleteAccount}
                  disabled={confirming}
                >
                  Confirm Deletion
                </Button>
              </DialogActions>
            </Dialog>

            <Trending articles={trending} />
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

  return (
    <DefaultErrorPage />
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { firebase } = useAdminFirestore();
    const snapshot = await firebase.firestore().collection('users').where('username', '==', params.username).get();
    if (!snapshot.empty) {
      return {
        props: {
          profile: { ...snapshot.docs[0].data(), id: snapshot.docs[0].id },
        },
      };
    }

    return {
      props: {
        profile: null,
      },
    };
  } catch (err) {
    return {
      props: {
        profile: null,
      },
    };
  }
}
