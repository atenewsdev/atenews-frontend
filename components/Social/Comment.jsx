import React from 'react';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { formatDistanceToNow } from 'date-fns';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Button from '@/components/Button';
import CommentField from '@/components/Social/CommentField';
import Flair from '@/components/Social/Flair';

import {
  Typography,
  Avatar,
  Grid,
  IconButton,
  Paper as StockPaper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import imageGenerator from '@/utils/imageGenerator';
import useFirebase from '@/utils/hooks/useFirestore';
import { useCache } from '@/utils/hooks/useCache';
import { useAuth } from '@/utils/hooks/useAuth';
import { useError } from '@/utils/hooks/useSnackbar';

const Paper = withStyles((theme) => ({
  root: {
    borderRadius: 30,
    backgroundColor: theme.palette.type === 'light' ? '#F0F2F5' : theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}))(StockPaper);

const useStyles = makeStyles(() => ({
  avatar: {
    height: 60,
    width: 60,
  },
  avatarReply: {
    height: 50,
    width: 50,
  },
}));

const Template = ({
  children,
  reply,
  user,
  comment,
  socialStats,
  getReplies,
  timestamp,
  slug,
  commentId,
  replyId,
  commenterId,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const { profile } = useAuth();
  const { firebase } = useFirebase();
  const { setError } = useError();

  const [vote, setVote] = React.useState(null);

  React.useEffect(() => {
    const unsub = firebase.firestore().collection('votes').doc(`${reply ? replyId : commentId}_${profile.id}`).onSnapshot(async (snapshot) => {
      if (snapshot.exists) {
        setVote(snapshot.data().content);
      } else {
        setVote(null);
      }
    });

    return () => {
      unsub();
    };
  }, [reply ? replyId : commentId]);

  const handleVote = async (voteHandle) => {
    try {
      if (vote !== voteHandle) {
        let data = {
          articleSlug: slug,
          commenterId,
          content: voteHandle,
          timestamp: new Date(),
          userId: profile.id,
        };
        if (commentId) {
          data = { ...data, commentId };
        }
        if (replyId) {
          data = { ...data, replyId };
        }

        await firebase.firestore().collection('votes').doc(`${reply ? replyId : commentId}_${profile.id}`).set(data);
      } else {
        await firebase.firestore().collection('votes').doc(`${reply ? replyId : commentId}_${profile.id}`).delete();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ListItem style={{ padding: 0 }} alignItems="flex-start" component="div">
      <ListItemAvatar>
        <Avatar
          className={reply ? classes.avatarReply : classes.avatar}
          src={imageGenerator(user.avatar, 300)}
        />
      </ListItemAvatar>
      <ListItemText
        primary={(
          <>
            <ListItem style={{ padding: 0 }}>
              <Paper elevation={0} style={{ width: 'fit-content', maxWidth: '80%' }}>
                <Grid container spacing={1} style={{ marginBottom: theme.spacing(0.5) }}>
                  <Grid item>
                    <Typography variant="body2"><b>{user.name}</b></Typography>
                  </Grid>
                  { user.staff ? (
                    <Grid item xs>
                      <Flair small />
                    </Grid>
                  ) : null }
                </Grid>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="body1">{comment}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption"><i>{formatDistanceToNow(new Date(timestamp || null), { addSuffix: true })}</i></Typography>
                  </Grid>
                </Grid>
              </Paper>
              <IconButton style={{ marginLeft: theme.spacing(1) }}>
                <MoreHorizIcon />
              </IconButton>
            </ListItem>
          </>
        )}
        secondary={(
          <div style={{ marginTop: theme.spacing(1) }}>
            <Grid container spacing={1} style={{ color: theme.palette.primary.main }}>
              {profile ? (
                <>
                  <Grid item>
                    <Button
                      variant={vote === 'up' ? 'contained' : 'text'}
                      style={{ padding: 0 }}
                      color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => { handleVote('up'); }}
                    >
                      <LikeIcon style={{ marginRight: theme.spacing(1) }} />
                      {socialStats ? socialStats.upvoteCount || 0 : 0}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant={vote === 'down' ? 'contained' : 'text'}
                      style={{ padding: 0 }}
                      color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => { handleVote('down'); }}
                    >
                      <DislikeIcon style={{ marginRight: theme.spacing(1) }} />
                      {socialStats ? socialStats.downvoteCount || 0 : 0}
                    </Button>
                  </Grid>
                </>
              ) : null}
              {!reply ? (
                <Grid item>
                  { profile || socialStats.replyCount > 0 ? (
                    <Button
                      style={{ padding: 0 }}
                      variant="text"
                      color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
                      size="small"
                      onClick={getReplies}
                    >
                      <CommentIcon style={{ marginRight: theme.spacing(1) }} />
                      {socialStats.replyCount > 0 ? `View ${socialStats.replyCount} replies` : 'Reply'}
                    </Button>
                  ) : null }
                </Grid>
              ) : null}
            </Grid>
            { children ? (
              <List>
                {children}
              </List>
            ) : null }
          </div>
        )}
        style={{ paddingLeft: theme.spacing(1) }}
        disableTypography
      />
    </ListItem>
  );
};

export default function Page({
  user: commentUser,
  comment: commentContent,
  socialStats: commentSocialStats,
  commenterId,
  commentId,
  slug,
  timestamp,
}) {
  const { firebase } = useFirebase();
  const [showReplies, setShowReplies] = React.useState(false);
  const [replies, setReplies] = React.useState([]);
  const { users: [users, setUsers] } = useCache();

  let repliesUnsubscribe = () => { };

  const getReplies = () => {
    if (showReplies) {
      setShowReplies(false);
      repliesUnsubscribe();
    } else {
      repliesUnsubscribe = firebase.firestore().collection('replies')
        .where('commentId', '==', commentId)
        .orderBy('timestamp', 'asc')
        .onSnapshot(async (snapshot) => {
          const tempReplies = [];
          await Promise.all(snapshot.docs.map(async (doc) => {
            if (!users[doc.data().userId]) {
              const user = await firebase.firestore().collection('users').doc(doc.data().userId).get();
              setUsers((prevState) => ({
                ...prevState,
                [user.id]: user.data(),
              }));
            }
            tempReplies.push({ id: doc.id, ...doc.data() });
          }));
          setShowReplies(true);
          setReplies(
            tempReplies.sort((a, b) => (
              a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime()
            )),
          );
        });
    }
  };

  React.useEffect(() => {
    setShowReplies(false);
    repliesUnsubscribe();
    return () => {
      repliesUnsubscribe();
    };
  }, [commentId]);
  return (
    <Template
      user={commentUser}
      comment={commentContent}
      socialStats={commentSocialStats}
      getReplies={getReplies}
      timestamp={timestamp}
      slug={slug}
      commentId={commentId}
      commenterId={commenterId}
    >
      { showReplies ? (
        <>
          <CommentField slug={slug} commentId={commentId} reply />
          { replies.map((reply) => (
            <Template
              replyId={reply.id}
              key={reply.id}
              user={{
                name: users[reply.userId].displayName,
                avatar: users[reply.userId].photoURL,
                staff: users[reply.userId].staff,
              }}
              comment={reply.content}
              socialStats={{
                upvoteCount: reply.upvoteCount,
                downvoteCount: reply.downvoteCount,
              }}
              timestamp={reply.timestamp.toDate()}
              slug={slug}
              commenterId={reply.userId}
              reply
            />
          ))}
        </>
      ) : null }
    </Template>
  );
}
