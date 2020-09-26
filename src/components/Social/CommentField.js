import Head from 'next/head'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import FollowIcon from '@material-ui/icons/Add';
import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from 'src/components/Button';
import Divider from '@material-ui/core/Divider';
import StockTextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Comment from 'src/components/Social/Comment';

const TextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 30,
      },
    },
  },
})(StockTextField);

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 60,
    width: 60
  },
  avatarReply: {
    height: 50,
    width: 50
  }
}));

export default function Page({ reply }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ListItem style={{ padding: 0, marginBottom: reply ? 0 : theme.spacing(2) }}>
      <ListItemIcon>
        <Avatar className={reply ? classes.avatarReply : classes.avatar}></Avatar>
      </ListItemIcon>
      <ListItemText primary={
        <TextField
          variant="outlined"
          placeholder={reply ? 'Write a reply...' : 'Write a comment...'}
          multiline
          rows={1}
          rowsMax={5}
          fullWidth
        />
      } style={{ paddingLeft: theme.spacing(1) }} disableTypography />
    </ListItem>
  )
}
