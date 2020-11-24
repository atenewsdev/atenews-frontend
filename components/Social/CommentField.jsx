import React from 'react';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import { useAuth } from '@/utils/hooks/useAuth';
import { useError } from '@/utils/hooks/useSnackbar';
import useFirebase from '@/utils/hooks/useFirestore';
import imageGenerator from '@/utils/imageGenerator';

import SendIcon from '@material-ui/icons/Send';
import { isMobile } from 'react-device-detect';

import {
  IconButton,
  Avatar,
  TextField as StockTextField,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from '@material-ui/core';

const TextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 30,
      },
    },
  },
})(StockTextField);

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

export default function Page({ reply, slug, commentId }) {
  const classes = useStyles();
  const theme = useTheme();
  const { profile, authUser } = useAuth();
  const { firebase } = useFirebase();
  const { setError } = useError();

  const [content, setContent] = React.useState('');
  const inputRef = React.useRef();

  React.useEffect(() => {
    setContent('');
  }, [slug]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (authUser) {
      if (authUser.emailVerified) {
        if (content.trim()) {
          await firebase.firestore().collection('comments').add({
            articleSlug: slug,
            content,
            downvoteCount: 0,
            replyCount: 0,
            socialScore: 0,
            timestamp: new Date(),
            upvoteCount: 0,
            userId: profile.id,
          });
          setContent('');
        }
      } else {
        setError('A verified email is required to do this action!');
      }
    } else {
      setError('You need to be logged in to do this action!');
    }
  };

  const submitReply = async (e) => {
    e.preventDefault();
    if (authUser) {
      if (authUser.emailVerified) {
        if (content.trim()) {
          await firebase.firestore().collection('replies').add({
            articleSlug: slug,
            commentId,
            content,
            downvoteCount: 0,
            timestamp: new Date(),
            upvoteCount: 0,
            userId: profile.id,
          });
          setContent('');
        }
      } else {
        setError('A verified email is required to do this action!');
      }
    } else {
      setError('You need to be logged in to do this action!');
    }
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      if (!event.shiftKey && !isMobile) {
        if (reply) {
          submitReply(event);
        } else {
          submitComment(event);
        }
      }
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <ListItem style={{ padding: 0, marginBottom: reply ? 0 : theme.spacing(2) }}>
      <ListItemIcon>
        <Avatar
          src={imageGenerator(profile.photoURL, 60)}
          className={reply ? classes.avatarReply : classes.avatar}
        />
      </ListItemIcon>
      <ListItemText
        primary={(
          <form onSubmit={reply ? submitReply : submitComment}>
            <TextField
              ref={inputRef}
              variant="outlined"
              placeholder={reply ? 'Write a reply...' : 'Write a comment...'}
              on
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={content}
              multiline
              rows={1}
              rowsMax={5}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton type="submit">
                      <SendIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}
        style={{ paddingLeft: theme.spacing(1) }}
        disableTypography
      />
    </ListItem>
  );
}
