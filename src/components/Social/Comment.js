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
import StockPaper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const TextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 40,
      },
    },
  },
})(StockTextField);

const Paper = withStyles((theme) => ({
  root: {
    borderRadius: 30,
    backgroundColor: '#F0F2F5',
    padding: theme.spacing(2)
  }
}))(StockPaper);

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



export default function Page({ children, reply }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ListItem style={{ padding: 0 }} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={reply ? classes.avatarReply : classes.avatar}></Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={
          <Paper elevation={0}>
            <Typography variant="body2"><b>Son Roy Almerol</b></Typography>
            <Typography variant="body1">I definitely agree Gwyn. More is expected of Samahan as leaders than just be content with its privileges…
  Hope they will learn sooner…</Typography>
          </Paper>
        } 
        secondary={
          <div style={{ marginTop: theme.spacing(1) }}>
            <Grid container spacing={1} style={{ color: theme.palette.primary.main }}>
              <Grid item>
                <LikeIcon />
              </Grid>
              <Grid item>
                <Typography>192</Typography>
              </Grid>
              <Grid item>
                <DislikeIcon />
              </Grid>
              <Grid item>
                <Typography>192</Typography>
              </Grid>
              <Grid item>
                <CommentIcon />
              </Grid>
              <Grid item>
                <Typography>Reply</Typography>
              </Grid>
            </Grid>
            { children ? 
              <List component="div">
                {children}
              </List>
            : null}
          </div>
        }
        style={{ paddingLeft: theme.spacing(1) }} 
      />
    </ListItem>
  )
}
