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

import Button from '@material-ui/core/Button';
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

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
  reacts: {
    width: 40,
    height: 57,
    overflow: 'visible',
  },
  buttonReacts: {
    width: 19,
    height: 26,
    backgroundColor: 'transparent',
    overflow: 'visible',
    border: 0
  },
  infoReacts: {
    width: 30,
    height: 43,
    backgroundColor: 'transparent',
    overflow: 'visible',
    border: 0
  },
  container: {
    width: 'fit-content',
    '&:hover': {
      cursor: 'pointer',
    }
  }
}));


const ReactInfo = ({ IconProps, TextProps, GridProps, disableHover }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [buttonText, setButtonText] = React.useState('React');
  const [react, setReact] = React.useState(null);

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

  const handleReact = (reactX) => {
    handlePopoverClose();
    if (react === reactX) {
      setReact(null);
      setButtonText('React');
      return;
    }

    setReact(reactX);
    switch (reactX) {
      case 'happy':
        setButtonText('Happy');
        break;
      case 'sad':
        setButtonText('Sad');
        break;
      case 'angry':
        setButtonText('Angry');
        break;
      case 'disgust':
        setButtonText('Disgusted');
        break;
      case 'worried':
        setButtonText('Worried');
        break;
    }
  }

  return (
    <ClickAwayListener onClickAway={handlePopoverClose}>
      <div>
        <Button variant="text" color="primary" size="large" fullWidth onClick={handlePopoverOpen}>
          { !react ?
            <InsertEmoticonIcon style={{ marginRight: theme.spacing(1) }} />
          :
            react === 'happy' ?
              <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/happy.svg" />
            :
              react === 'sad' ?
                <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/sad.svg" />
              :
                react === 'angry' ?
                  <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/angry.svg" />
                :
                  react === 'disgust' ?
                    <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/disgust.svg" />
                  :
                    react === 'worried' ?
                      <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/worried.svg" />
                    :
                      null
          }
          { buttonText === 'React' ? buttonText : 
            <b>{buttonText}</b>
          }
        </Button>

        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="top"
          disablePortal={false}
          style={{ zIndex: 2000 }}
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
            <Card elevation={0} variant="outlined" style={{ borderRadius: 40, marginBottom: theme.spacing(1) }}>
              <Grid container>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('happy')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/happy.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('sad')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/sad.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('angry')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/angry.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('disgust')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/disgust.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('worried')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/worried.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
              </Grid>
            </Card>
          </Grow>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default ReactInfo;