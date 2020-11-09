import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import {
  Typography, Grid, Card, CardContent, Avatar, Grow, Popper,
} from '@material-ui/core';

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
  IconProps,
  TextProps,
  GridProps,
  disableHover,
  totalCount,
  happyCount,
  disgustedCount,
  worriedCount,
  sadCount,
  angryCount,
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
            <Typography variant="subtitle2" {...TextProps}>{totalCount}</Typography>
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
                  <Typography variant="subtitle1">{happyCount}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/sad.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{sadCount}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/angry.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{angryCount}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/disgust.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{disgustedCount}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.reacts} src="/reacts/worried.svg" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{worriedCount}</Typography>
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
