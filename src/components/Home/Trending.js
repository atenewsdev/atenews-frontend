import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';

import Tag from 'src/components/Tag';

import useScrollPosition from '@react-hook/window-scroll';
import handleViewport from 'react-in-viewport';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    width: 'calc(15vw - 10px)',
    right: 10
  },
  trendingHead: {
    color: '#195EA9',
    padding: 20,
    height: 65,
    textAlign: 'center',
    width: '100%',
    border: 0
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    height: 100,
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
  },
  trendingStats: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: theme.palette.primary.main,
    padding: theme.spacing(0.5)
  },
  trendingStatsText: {
    fontSize: '0.8rem'
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 'calc(70px + 25px)',
    right: 0,
    borderTop: '20px solid transparent',
    borderBottom: '20px solid transparent',
    borderRight: `20px solid white`
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.9rem'
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.9rem'
  }
}));

const EndBlock = handleViewport((props) => {
  const { forwardedRef } = props;

  return (
    <div ref={forwardedRef} style={{ background: 'transparent', height: 65, width: '-15vw' }} />
  )
});


const Trending = () => {
  const classes = useStyles();
  const theme = useTheme();
  const scrollY = useScrollPosition(60);

  const [topPosition, setTopPosition] = React.useState(0);


  const [seenEnd, setSeenEnd] = React.useState(false);

  React.useEffect(() => {
    console.log('at end', seenEnd);
    setTopPosition((prev) => {
      /* if ((seenEnd && prev < scrollY) || (scrollY <= 0)) {
        return prev;
      } */
      if (prev < scrollY) {
        console.log('scrolling down', seenEnd);
        if (seenEnd) {
          return prev;
        }
      } else {
        console.log('scrolling up');
      }
      return scrollY;
    });
  }, [scrollY])

  return (
    <Hidden smDown>
      <div className={classes.container} style={{ top: `calc((65px + 4vh) - ${topPosition}px)` }}>
        <Grid container spacing={0} component={Paper} variant="outlined" style={{ borderRadius: 10, overflow: 'hidden', paddingBottom: theme.spacing(2) }}>
          <Paper variant="outlined" square className={classes.trendingHead}>
            <Typography variant="h5">Trending</Typography>
          </Paper>
          <CardActionArea>
            <Paper variant="outlined" square className={classes.trendingItem}>
              <Grid container>
                <Grid item xs={12}>
                  <Tag type="Features" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" component="div" className={classes.threeLineText}>
                    Did the pandemic stop the sex trade?
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
          <CardActionArea>
            <Paper variant="outlined" square className={classes.trendingItem}>
              <Grid container>
                <Grid item xs={12}>
                  <Tag type="News" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" component="div" className={classes.threeLineText}>
                    PH Olympian highlights effort and excellence for sports and academic success
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
          <CardActionArea>
            <Paper variant="outlined" square className={classes.trendingItem}>
              <Grid container>
                <Grid item xs={12}>
                  <Tag type="News" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" component="div" className={classes.threeLineText}>
                    ‘Forget your limitations’, says alumnus-entrepreneur on overcoming failure
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
          <CardActionArea>
            <Paper variant="outlined" square className={classes.trendingItem}>
              <Grid container>
                <Grid item xs={12}>
                  <Tag type="News" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" component="div" className={classes.threeLineText}>
                    Satellite use key to internet democracy in PH—ICT researcher
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
          <CardActionArea>
            <Paper variant="outlined" square className={classes.trendingItem}>
              <Grid container>
                <Grid item xs={12}>
                  <Tag type="News" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" component="div" className={classes.threeLineText}>
                    LGBTQIA+ orgs condemn Pemberton’s ‘absolute pardon’ grant
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
        </Grid>
        <EndBlock onLeaveViewport={() => setSeenEnd(false)} onEnterViewport={() => setSeenEnd(true)} />
      </div>
    </Hidden>
  )
}

export default Trending;