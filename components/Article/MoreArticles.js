import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

import Tag from 'components/Tag';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';

import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';

const useStyles = makeStyles((theme) => ({
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


const Trending = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container spacing={0} component={Paper} variant="outlined" style={{ borderRadius: 10, overflow: 'hidden', paddingBottom: theme.spacing(2) }}>
      <Paper variant="outlined" square className={classes.trendingHead}>
        <Typography variant="h5">Read More</Typography>
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
  )
}

export default Trending;