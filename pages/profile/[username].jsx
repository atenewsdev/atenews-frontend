import React from 'react';

import { NextSeo } from 'next-seo';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import DisplayAvatar from '@/components/Profile/DisplayAvatar';

import ProfileFeed from '@/components/Social/ProfileFeed';
import Trending from '@/components/Home/Trending';

import DefaultErrorPage from '@/components/404';

import {
  Grid,
  Divider,
  CircularProgress,
} from '@material-ui/core';

import ShowDetails from '@/components/Profile/ShowDetails';
import EditDetails from '@/components/Profile/EditDetails';
import EditProfileButton from '@/components/Profile/EditProfileButton';

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
    backgroundColor: theme.palette.primary.main,
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

export default function Home({ profile, cdnKey }) {
  const classes = useStyles();
  const theme = useTheme();
  const trending = useTrending();

  const {
    profile: authProfile, loadingAuth,
  } = useAuth();
  const { firebase } = useFirestore();
  const { setError } = useError();

  const [loading, setLoading] = React.useState(true);
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
    if (profile) {
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
                <DisplayAvatar editMode={editMode} profile={profile} cdnKey={cdnKey} />
              </Grid>
              <Grid item xs>
                {editMode ? (
                  <EditDetails
                    profile={profile}
                    displayName={displayName}
                    setDisplayName={setDisplayName}
                    username={username}
                    setUsername={setUsername}
                    bio={bio}
                    setBio={setBio}
                    email={email}
                    setEmail={setEmail}
                  />
                ) : (
                  <ShowDetails
                    profile={profile}
                    displayName={displayName}
                    username={username}
                    bio={bio}
                    email={email}
                  />
                )}
                {authProfile ? (
                  <EditProfileButton
                    profile={profile}
                    displayName={displayName}
                    username={username}
                    backup={backup}
                    bio={bio}
                    email={email}
                    setBackup={setBackup}
                    setDisplayName={setDisplayName}
                    setUsername={setUsername}
                    setBio={setBio}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    editMode={editMode}
                    setEditMode={setEditMode}
                  />
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
    const keySnapshot = await firebase.firestore().collection('keys').doc('custom').get();
    if (!snapshot.empty) {
      return {
        props: {
          profile: {
            ...snapshot.docs[0].data(),
            id: snapshot.docs[0].id,
          },
          cdnKey: keySnapshot.data().cdn,
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
