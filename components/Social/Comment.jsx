import React from 'react';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@/components/Button';
import StockPaper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Flair from '@/components/Social/Flair';

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

export default function Page({
  children, reply, user, comment,
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ListItem style={{ padding: 0 }} alignItems="flex-start" component="div">
      <ListItemAvatar>
        <Avatar className={reply ? classes.avatarReply : classes.avatar} src={user.avatar} />
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
                  <Grid item xs>
                    <Flair small />
                  </Grid>
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
                  192
                </Button>
              </Grid>
              <Grid item>
                <Button variant="text" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="small">
                  <DislikeIcon style={{ marginRight: theme.spacing(1) }} />
                  192
                </Button>
              </Grid>
              <Grid item>
                <Button variant="text" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="small">
                  <CommentIcon style={{ marginRight: theme.spacing(1) }} />
                  Reply
                </Button>
              </Grid>
            </Grid>
            { children
              ? (
                <List>
                  {children}
                </List>
              )
              : null}
          </div>
        )}
        style={{ paddingLeft: theme.spacing(1) }}
        disableTypography
      />
    </ListItem>
  );
}
