/* eslint-disable no-underscore-dangle */
import React from 'react';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { formatDistanceToNow } from 'date-fns';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import CommentIcon from '@material-ui/icons/CommentOutlined';

import Button from '@/components/General/Button';
import Flair from '@/components/Social/Flair';
import Link from '@/components/General/Link';
import Options from '@/components/ArticlePage/Comments/Options';

import {
  Typography,
  Avatar,
  Grid,
  Paper as StockPaper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import imageGenerator from '@/utils/imageGenerator';

import { useAuth } from '@/hooks/useAuth';
import { useError } from '@/hooks/useSnackbar';
import useCommentStats from '@/hooks/useCommentStats';
import useReplyStats from '@/hooks/useReplyStats';
import useVoteCommentReply from '@/hooks/useVoteCommentReply';

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

const CommentReplyTemplate = ({
  children,
  content,
  getReplies,
  reply,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const { profile, authUser } = useAuth();
  const { setError, setSuccess } = useError();

  let stats = null;

  if (reply) {
    stats = useReplyStats(content._id);
  } else {
    stats = useCommentStats(content._id);
  }

  const [vote, setVote] = useVoteCommentReply(content._id, reply ? 'reply' : 'comment');

  const handleVote = async (voteHandle) => {
    if (!authUser) {
      setError('You need to be logged in to do this action!');
      return;
    }

    if (!authUser.emailVerified) {
      setError('A verified email is required to do this action!');
      return;
    }
    setVote(voteHandle);
  };

  const handleCommentDelete = async () => {
    try {
      setSuccess('Successfully deleted comment!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReplyDelete = async () => {
    try {
      setSuccess('Successfully deleted reply!');
    } catch (err) {
      setError(err.message);
    }
  };

  const isOwner = () => {
    if (profile) {
      if (content.user._id === profile.id) {
        return true;
      }
    }
    return false;
  };
  return (
    <ListItem style={{ padding: 0 }} alignItems="flex-start" component="div">
      <ListItemAvatar>
        <Avatar
          className={reply ? classes.avatarReply : classes.avatar}
          src={imageGenerator(content.user.displayPhoto, 300)}
        />
      </ListItemAvatar>
      <ListItemText
        primary={(
          <>
            <ListItem style={{ padding: 0 }}>
              <Paper elevation={0} style={{ width: 'fit-content', maxWidth: '80%' }}>
                <Grid container spacing={1} style={{ marginBottom: theme.spacing(0.5) }}>
                  <Grid item>
                    <Typography variant="body2"><Link href={`/profile/${content.user.username}`}><b>{content.user.displayName}</b></Link></Typography>
                  </Grid>
                  { content.user.isStaff ? (
                    <Grid item xs>
                      <Flair small />
                    </Grid>
                  ) : null }
                </Grid>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="body1">{content.content}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption"><i>{formatDistanceToNow(new Date(content.timestamp || null), { addSuffix: true })}</i></Typography>
                  </Grid>
                </Grid>
              </Paper>
              {isOwner() ? (
                <Options onDelete={reply ? handleReplyDelete : handleCommentDelete} />
              ) : null}
            </ListItem>
          </>
        )}
        secondary={(
          <div style={{ marginTop: theme.spacing(1) }}>
            <Grid container spacing={1} style={{ color: theme.palette.primary.main }}>
              <Grid item>
                <Button
                  variant={vote === 'up' ? 'contained' : 'text'}
                  style={{ padding: 0 }}
                  color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => { handleVote('up'); }}
                  disabled={!profile}
                >
                  <LikeIcon style={{ marginRight: theme.spacing(1) }} />
                  {stats?.upvotes || 0}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant={vote === 'down' ? 'contained' : 'text'}
                  style={{ padding: 0 }}
                  color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => { handleVote('down'); }}
                  disabled={!profile}
                >
                  <DislikeIcon style={{ marginRight: theme.spacing(1) }} />
                  {stats?.downvotes || 0}
                </Button>
              </Grid>
              {!reply ? (
                <Grid item>
                  { profile || stats?.replies > 0 ? (
                    <Button
                      style={{ padding: 0 }}
                      variant="text"
                      color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
                      size="small"
                      onClick={getReplies}
                    >
                      <CommentIcon style={{ marginRight: theme.spacing(1) }} />
                      {stats?.replies > 0 ? `View ${stats?.replies} replies` : 'Reply'}
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

export default CommentReplyTemplate;
