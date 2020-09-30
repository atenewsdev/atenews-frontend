import Head from 'next/head'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import FollowIcon from '@material-ui/icons/Add';
import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from 'components/Button';
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



export default function Page({ children, reply, user, comment }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ListItem style={{ padding: 0 }} alignItems="flex-start" component="div">
      <ListItemAvatar>
        <Avatar className={reply ? classes.avatarReply : classes.avatar} src={user.avatar}></Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={
          <>
            <ListItem style={{ padding: 0 }}>
              <Paper elevation={0} style={{ width: 'fit-content', maxWidth: '80%' }}>
                <Typography variant="body2"><b>{user.name}</b></Typography>
                <Typography variant="body1">{comment}</Typography>
              </Paper>
              <IconButton style={{ marginLeft: theme.spacing(1) }}>
                <MoreHorizIcon />
              </IconButton>
            </ListItem>
          </>
        }
        secondary={
          <div style={{ marginTop: theme.spacing(1) }}>
            <Grid container spacing={1} style={{ color: theme.palette.primary.main }}>
              <Grid item>
                <Button variant="text" color="primary" size="small"><LikeIcon style={{ marginRight: theme.spacing(1) }} />192</Button>
              </Grid>
              <Grid item>
                <Button variant="text" color="primary" size="small"><DislikeIcon style={{ marginRight: theme.spacing(1) }} />192</Button>
              </Grid>
              <Grid item>
                <Button variant="text" color="primary" size="small"><CommentIcon style={{ marginRight: theme.spacing(1) }} />Reply</Button>
              </Grid>
            </Grid>
            { children ? 
              <List>
                {children}
              </List>
            : null}
          </div>
        }
        style={{ paddingLeft: theme.spacing(1) }}
        disableTypography
      />
    </ListItem>
  )
}
