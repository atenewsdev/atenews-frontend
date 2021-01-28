import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  Popper,
} from '@material-ui/core';

import { useAuth } from '@/hooks/useAuth';
import { useError } from '@/hooks/useSnackbar';
import useReactArticle from '@/hooks/useReactArticle';

const useStyles = makeStyles(() => ({
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
    border: 0,
  },
  infoReacts: {
    width: 30,
    height: 43,
    backgroundColor: 'transparent',
    overflow: 'visible',
    border: 0,
  },
  container: {
    width: 'fit-content',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  focusHighlight: {
    opacity: 0.3,
  },
}));

const ReactArticle = ({
  disableHover,
  slug,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { authUser, profile } = useAuth();
  const { setError } = useError();

  const [buttonText, setButtonText] = React.useState('React');
  const [react, setReact] = useReactArticle(slug);

  React.useEffect(() => {
    switch (react?.content) {
      case 'happy':
        setButtonText('Happy');
        break;
      case 'sad':
        setButtonText('Sad');
        break;
      case 'angry':
        setButtonText('Angry');
        break;
      case 'disgusted':
        setButtonText('Disgusted');
        break;
      case 'worried':
        setButtonText('Worried');
        break;
      default:
        setButtonText('React');
    }
  }, [react]);

  const handlePopoverOpen = (event) => {
    if (!disableHover) {
      setAnchorEl(event.currentTarget);
      if (authUser) {
        if (authUser.emailVerified) {
          setAnchorEl(event.currentTarget);
        } else {
          setError('A verified email is required to do this action!');
        }
      } else {
        setError('You need to be logged in to do this action!');
      }
    }
  };

  const handlePopoverClose = () => {
    if (!disableHover) {
      setAnchorEl(null);
    }
  };

  const handleReact = (_react) => {
    handlePopoverClose();
    if (profile) {
      setReact(_react);
    } else {
      setError('You need to be logged in to do this action!');
    }
  };

  const ButtonIcon = () => {
    if (!react) {
      return <InsertEmoticonIcon style={{ marginRight: theme.spacing(1) }} />;
    }

    switch (react?.content) {
      case 'happy':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/happy.svg" />;
      case 'sad':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/sad.svg" />;
      case 'angry':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/angry.svg" />;
      case 'disgusted':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/disgust.svg" />;
      case 'worried':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/worried.svg" />;
      default:
        return <InsertEmoticonIcon style={{ marginRight: theme.spacing(1) }} />;
    }
  };

  return (
    <ClickAwayListener onClickAway={handlePopoverClose}>
      <div>
        <Button variant="text" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="large" fullWidth onClick={handlePopoverOpen}>
          <ButtonIcon />
          { buttonText === 'React' ? buttonText
            : <b>{buttonText}</b>}
        </Button>

        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="top"
          disablePortal={false}
          style={{ zIndex: 2000 }}
          modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          }}
        >
          <Grow in={Boolean(anchorEl)}>
            <Card elevation={0} variant="outlined" style={{ borderRadius: 40, marginBottom: theme.spacing(1) }}>
              <Grid container>
                <Grid item>
                  <CardActionArea
                    onClick={() => handleReact('happy')}
                    classes={{
                      focusHighlight: react?.content === 'happy' ? classes.focusHighlight : null,
                    }}
                  >
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/happy.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea
                    onClick={() => handleReact('sad')}
                    classes={{
                      focusHighlight: react?.content === 'sad' ? classes.focusHighlight : null,
                    }}
                  >
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/sad.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea
                    onClick={() => handleReact('angry')}
                    classes={{
                      focusHighlight: react?.content === 'angry' ? classes.focusHighlight : null,
                    }}
                  >
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/angry.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea
                    onClick={() => handleReact('disgusted')}
                    classes={{
                      focusHighlight: react?.content === 'disgusted' ? classes.focusHighlight : null,
                    }}
                  >
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/disgust.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea
                    onClick={() => handleReact('worried')}
                    classes={{
                      focusHighlight: react?.content === 'worried' ? classes.focusHighlight : null,
                    }}
                  >
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
  );
};

export default ReactArticle;
