import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Tag from '@/components/General/Tag';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ReactInfo from '@/components/Social/ReactInfo';

import {
  Typography, Paper, Grid, useMediaQuery,
} from '@material-ui/core';

import imageGenerator from '@/utils/imageGenerator';
import useArticleStats from '@/hooks/useArticleStats';

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  bannerDetailsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(180deg, transparent, black)',
  },
  bannerDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: 'white',
    padding: theme.spacing(4),
  },
  trendingHead: {
    background: '#195EA9',
    color: '#ffffff',
    padding: 20,
    minHeight: 65,
    textAlign: 'center',
    width: '100%',
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    borderRadius: 0,
    borderBottom: 0,
    borderRight: 0,
    borderLeft: 0,
  },
  trendingStats: {
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
  },
  trendingStatsText: {
    fontSize: '0.8rem',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 'calc(70px + 25px)',
    right: 0,
    borderTop: '20px solid transparent',
    borderBottom: '20px solid transparent',
    borderRight: `20px solid ${theme.palette.background.default}`,
    zIndex: 1,
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.9rem',
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

function RecentArticle({ article }) {
  const classes = useStyles();
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const articleStats = useArticleStats(article.slug);

  return (
    <Paper
      variant="outlined"
      className={classes.trendingItem}
      style={xsDown ? {
        background: `url(${imageGenerator(article.featuredImage.node.sourceUrl, 600)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        border: 0,
      } : {
        padding: theme.spacing(2),
      }}
    >
      <div style={xsDown ? {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: theme.spacing(2),
        width: '100%',
      } : { width: '100%' }}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid
            item
          >
            <Tag type={article.categories.nodes[0]} />
          </Grid>
          <Grid
            item
          >
            <Typography
              variant="body1"
              component="div"
              className={classes.twoLineText}
              dangerouslySetInnerHTML={{ __html: article.title }}
            />
          </Grid>
          <Grid
            item
            style={{ width: '100%' }}
          >
            <Grid
              container
              className={classes.trendingStats}
              justify="space-between"
              alignItems="baseline"
              style={xsDown ? { width: '100%', color: 'white' } : { width: '100%' }}
            >
              <Grid
                item
                xs={4}
              >
                <ReactInfo
                  IconProps={{ className: classes.trendingStatsText }}
                  TextProps={{ className: classes.trendingStatsText }}
                  GridProps={{ alignItems: 'center' }}
                  socialStats={articleStats?.reacts}
                  disableHover
                />
              </Grid>
              <Grid
                item
                xs={4}
              >
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item>
                    <CommentIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography
                      className={classes.trendingStatsText}
                      variant="subtitle2"
                    >
                      {articleStats?.comments || 0 + articleStats?.replies || 0}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item>
                    <ShareIcon className={classes.trendingStatsText} />
                  </Grid>
                  <Grid item>
                    <Typography
                      className={classes.trendingStatsText}
                      variant="subtitle2"
                    >
                      {articleStats?.twitterShareCount || 0 + articleStats?.fbShareCount || 0}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default RecentArticle;
