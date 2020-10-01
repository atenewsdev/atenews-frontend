import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';
import Tag from 'components/Tag';
import Link from 'components/Link';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';

import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import { formatDistanceToNow } from 'date-fns';
import slugGenerator from 'utils/slugGenerator';

import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
  reacts: {
    width: 40,
    height: 57,
    overflow: 'visible',
  },
  container: {
    width: 'fit-content',
    '&:hover': {
      cursor: 'pointer',
    },
    marginLeft: theme.spacing(1),
    zIndex: 1
  },
  infoReacts: {
    width: 30,
    height: 43,
    backgroundColor: 'transparent',
    overflow: 'visible',
    border: 0
  }
}));


const ReactInfo = ({ IconProps, TextProps, GridProps, disableHover }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    if (!disableHover) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    if (!disableHover) {
      setAnchorEl(null);
    }
  };

  return (
    <>
      <div className={classes.container} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={handlePopoverOpen}>
        <Grid container spacing={1} {...GridProps} alignItems="center" wrap="nowrap">
          <Grid item>
            <AvatarGroup style={{ marginRight: theme.spacing(1) }} spacing={5}>
              <Avatar className={classes.infoReacts} src="/reacts/happy.svg" />
              <Avatar className={classes.infoReacts} src="/reacts/angry.svg" />
              <Avatar className={classes.infoReacts} src="/reacts/sad.svg" />
              <Avatar className={classes.infoReacts} src="/reacts/disgust.svg" />
              <Avatar className={classes.infoReacts} src="/reacts/worried.svg" />
            </AvatarGroup>
          </Grid>
          <Grid item xs>
            <Typography variant="body2" {...TextProps}><b>192</b> people reacted to this article</Typography>
          </Grid>
        </Grid>
      </div>

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="top-start"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: false
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent"
          }
        }}
      >
        <Grow in={Boolean(anchorEl)}>
          <Card elevation={0} variant="outlined">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/happy.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">38</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/sad.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">38</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/angry.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">38</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/disgust.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">38</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/worried.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">2</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grow>
      </Popper>
    </>
  )
}

export default ReactInfo;