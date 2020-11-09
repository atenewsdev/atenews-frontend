import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ReactInfo from '@/components/Social/ReactInfo';

import { formatDistanceToNow } from 'date-fns';
import slugGenerator from '@/utils/slugGenerator';

import {
  Typography, Paper, Grid, CardActionArea, Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  trendingItem: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },
  trendingStats: {
    width: '100%',
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
    padding: theme.spacing(0.5),
  },
  trendingStatsText: {
    fontSize: '0.8rem',
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Column = ({ article }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  return (
    <CardActionArea
      onClick={() => router.push(slugGenerator(article))}
      style={{ marginTop: theme.spacing(1) }}
    >
      <Paper variant="outlined" className={classes.trendingItem}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar} src={article.coauthors[0].avatar} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" component="div" className={classes.twoLineText} style={{ marginBottom: theme.spacing(1) }} dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>
                  <Grid item>
                    <AccountIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      {
                        article.coauthors.map((author, i) => {
                          if (i === article.coauthors.length - 2) {
                            return `${author.display_name} `;
                          } if (i !== article.coauthors.length - 1) {
                            return `${author.display_name}, `;
                          } if (article.coauthors.length === 1) {
                            return author.display_name;
                          }
                          return `and ${author.display_name}`;
                        })
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container spacing={1} wrap="nowrap" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>
                  <Grid item>
                    <ClockIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">{ formatDistanceToNow(new Date(article.date), { addSuffix: true }) }</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} component="div" className={classes.trendingStats} justify="flex-start">
              <Grid item xs>
                <ReactInfo IconProps={{ className: classes.trendingStatsText }} TextProps={{ className: classes.trendingStatsText }} GridProps={{ alignItems: 'center' }} />
              </Grid>
              <Grid item xs>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <CommentIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.trendingStatsText} variant="subtitle2">254</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
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
  );
};

export default Column;
