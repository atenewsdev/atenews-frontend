import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tag from 'src/components/Tag';
import Link from 'src/components/Link';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';

import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';

const useStyles = makeStyles((theme) => ({
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
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));


const Trending = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Card style={{ marginBottom: theme.spacing(2), borderRadius: 10 }} variant="outlined">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6}>
            <CardActionArea>
              <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Link href=""><Typography variant="h5">Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
              <Grid container item xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                <Grid container item xs={6}>
                  <Grid item xs={2}>
                    <AccountIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">Daniel Dave Gomez, Tom Aaron Rica and Julia Alessandra Trinidad</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6}>
                  <Grid item xs={2}>
                    <ClockIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">September 2, 2020</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Typography variant="body1">To address the pandemic response issues of the Filipinos, renowned Sociologist Nicole Curato Ph.D. in the 2nd Social Sciences Online Conversation last August 29 stated that ‘deliberative democracy’ was a necessary component.</Typography>

              <Grid container item xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), width: '100%' }} justify="space-evenly">
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <LikeIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">192</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <DislikeIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">168</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <CommentIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <ShareIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={2} justify="space-between">
        <Grid item sm={4}>
          <Card variant="outlined" style={{ borderRadius: 10 }}>
            <CardActionArea>
              <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
            </CardActionArea>
            <CardContent>
              <Link href=""><Typography variant="h5" className={classes.twoLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
              <Grid container item xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                <Grid container item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                  <Grid item xs={2}>
                    <AccountIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">Daniel Dave Gomez, Tom Aaron Rica and Julia Alessandra Trinidad</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <ClockIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">September 2, 2020</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), width: '100%' }} justify="space-evenly">
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <LikeIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">192</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <DislikeIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">168</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <CommentIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <ShareIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4}>
          <Card variant="outlined" style={{ borderRadius: 10 }}>
            <CardActionArea>
              <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
            </CardActionArea>
            <CardContent>
              <Link href=""><Typography variant="h5" className={classes.twoLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
              <Grid container item xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                <Grid container item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                  <Grid item xs={2}>
                    <AccountIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">Daniel Dave Gomez, Tom Aaron Rica and Julia Alessandra Trinidad</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <ClockIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">September 2, 2020</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), width: '100%' }} justify="space-evenly">
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <LikeIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">192</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <DislikeIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">168</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <CommentIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <ShareIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4}>
          <Card variant="outlined" style={{ borderRadius: 10 }}>
            <CardActionArea>
              <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
            </CardActionArea>
            <CardContent>
              <Link href=""><Typography variant="h5" className={classes.twoLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
              <Grid container item xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                <Grid container item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                  <Grid item xs={2}>
                    <AccountIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">Daniel Dave Gomez, Tom Aaron Rica and Julia Alessandra Trinidad</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <ClockIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">September 2, 2020</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), width: '100%' }} justify="space-evenly">
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <LikeIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">192</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <DislikeIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">168</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <CommentIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={3} spacing={1}>
                  <Grid item>
                    <ShareIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Trending;