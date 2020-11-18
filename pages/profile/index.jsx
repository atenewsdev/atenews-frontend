import React from 'react';

import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import MailIcon from '@material-ui/icons/Mail';
import BirthdayIcon from '@material-ui/icons/Cake';
import CheckIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';

import ProfileFeed from '@/components/Social/ProfileFeed';
import Flair from '@/components/Social/Flair';

import {
  Typography, Avatar, Grid, Divider, CircularProgress,
} from '@material-ui/core';

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

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const { profile, authUser } = useAuth();
  const { firebase } = useFirestore();

  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    const arrayList = [];
    Promise.all([
      firebase.firestore().collection('comments').where('userId', '==', authUser.uid).limit(5)
        .get(),
      firebase.firestore().collection('replies').where('userId', '==', authUser.uid).limit(5)
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
    });
  }, []);

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
                <Typography variant="h4">{profile.displayName}</Typography>
              </Grid>
              { profile.staff ? (
                <Grid item xs>
                  <Flair />
                </Grid>
              ) : null}
              <Grid item xs={12} style={{ padding: 0, paddingLeft: theme.spacing(1) }}>
                <Typography variant="body1">{`@${profile.username}`}</Typography>
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
              <Typography variant="body1">{profile.bio || <i>This profile has no bio.</i>}</Typography>
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
                        <Typography variant="body1">{profile.email}</Typography>
                      </Grid>
                      {authUser ? (
                        <Grid item xs>
                          { authUser.emailVerified ? <CheckIcon /> : <InfoIcon /> }
                        </Grid>
                      ) : null }
                    </Grid>
                  </div>
                </Grid>
                {profile.birthday
                  ? (
                    <Grid item>
                      <div className={classes.iconStats}>
                        <Grid container spacing={1}>
                          <Grid item>
                            <BirthdayIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">{profile.birthday}</Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  ) : null }
              </Grid>
            </div>
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
      </div>
    );
  }

  return null;
}
