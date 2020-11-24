import React from 'react';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

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
  children, reply, user, comment, socialStats, getReplies,
}) => {
  const classes = useStyles();
  const theme = useTheme();

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
                <Typography variant="body1">{comment}</Typography>
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
              <Grid item>
                <Button variant="text" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="small">
                  <LikeIcon style={{ marginRight: theme.spacing(1) }} />
                  {socialStats ? socialStats.upvoteCount || 0 : 0}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="text" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="small">
                  <DislikeIcon style={{ marginRight: theme.spacing(1) }} />
                  {socialStats ? socialStats.downvoteCount || 0 : 0}
                </Button>
              </Grid>
              {!reply ? (
                <Grid item>
                  <Button
                    variant="text"
                    color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
                    size="small"
                    onClick={getReplies}
                  >
                    <CommentIcon style={{ marginRight: theme.spacing(1) }} />
                    {socialStats.replyCount > 0 ? `View ${socialStats.replyCount} replies` : 'Reply'}
                  </Button>
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
  user: commentUser, comment: commentContent, socialStats: commentSocialStats, commentId, slug,
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
        .orderBy('timestamp', 'desc')
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
          setReplies(tempReplies);
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
    >
      { showReplies ? (
        <>
          <CommentField slug={slug} commentId={commentId} reply />
          { replies.map((reply) => (
            <Template
              commentId={reply.id}
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
              reply
            />
          ))}
        </>
      ) : null }
    </Template>
  );
}
