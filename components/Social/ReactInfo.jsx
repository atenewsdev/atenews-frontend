import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(() => ({
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
  },
}));

const ReactInfo = ({
  IconProps, TextProps, GridProps, disableHover,
}) => {
  const classes = useStyles();
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
        <Grid container spacing={1} {...GridProps} wrap="nowrap">
          <Grid item>
            <InsertEmoticonIcon {...IconProps} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" {...TextProps}>192</Typography>
          </Grid>
        </Grid>
      </div>

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="top"
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
