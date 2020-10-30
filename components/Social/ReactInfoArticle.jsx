import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

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
    zIndex: 1,
  },
  infoReacts: {
    width: 30,
    height: 43,
    backgroundColor: 'transparent',
    overflow: 'visible',
    border: 0,
  },
}));

const ReactInfo = ({
  TextProps, GridProps, disableHover,
}) => {
  const classes = useStyles();
  const theme = useTheme();
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
      <div
        className={classes.container}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handlePopoverOpen}
      >
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
            <Typography variant="body2" {...TextProps}>
              <b>192</b>
              {' '}
              people reacted to this article
            </Typography>
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
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
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
  );
};

export default ReactInfo;
