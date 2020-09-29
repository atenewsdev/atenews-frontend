import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';

import Tag from 'components/Tag';
import Link from 'components/Link';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';

import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';

import { formatDistanceToNow } from 'date-fns';
import slugGenerator from 'utils/slugGenerator';

const useStyles = makeStyles((theme) => ({
  trendingItem: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },
  trendingStats: {
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
  avatar: {
    height: 100,
    width: 100
  }
}));


const Column = ({ article }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  return (
    <CardActionArea onClick={() => router.push(slugGenerator(article))} style={{ marginTop: theme.spacing(1) }}>
      <Paper variant="outlined" className={classes.trendingItem}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar} src={article.coauthors[0].avatar}></Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" component="div" className={classes.twoLineText} style={{ marginBottom: theme.spacing(1) }} dangerouslySetInnerHTML={{ __html: article.title.rendered }} />

            <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.primary.main }}>
              <Grid item>
                <AccountIcon />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {
                    article.coauthors.map((author, i) => {
                      if (i === article.coauthors.length - 2) {
                        return `${author.display_name} `
                      } else if (i !== article.coauthors.length - 1) {
                        return `${author.display_name}, `
                      } else if (article.coauthors.length === 1) {
                        return author.display_name
                      } else {
                        return `and ${author.display_name}`
                      }
                    })
                  }
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.primary.main }}>
              <Grid item>
                <ClockIcon />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{ formatDistanceToNow(new Date(article.date), { addSuffix: true }) }</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} component="div" className={classes.trendingStats} justify="flex-start">
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <LikeIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.trendingStatsText} variant="subtitle2">192</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <DislikeIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.trendingStatsText} variant="subtitle2">168</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <CommentIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.trendingStatsText} variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <ShareIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.trendingStatsText} variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </CardActionArea>
  )
}

export default Column;