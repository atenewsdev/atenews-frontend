import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Link from '@/components/Link';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ReactInfo from '@/components/Social/ReactInfo';
import ArticleCard from '@/components/Home/ArticleCard';

import { formatDistanceToNow } from 'date-fns';
import slugGenerator from '@/utils/slugGenerator';

import {
  Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Hidden,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  trendingStats: {
    position: 'absolute',
    bottom: 0,
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  iconList: {
    padding: 0, margin: 0,
  },
  bannerImage: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  reacts: {
    width: 30,
    height: 30,
    overflow: 'visible',
  },
}));

const Trending = ({ articles }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  return (
    <div>
      <Card style={{ marginBottom: theme.spacing(2), borderRadius: 10 }} variant="outlined">
        <Grid container alignItems="stretch">
          <Hidden smUp>
            <Grid item xs={12}>
              <CardActionArea onClick={() => router.push(slugGenerator(articles[0]))}>
                <CardMedia className={classes.media} image={articles[0].featured_image_src} />
              </CardActionArea>
            </Grid>
          </Hidden>
          <Hidden xsDown>
            <Grid item sm={6} component={CardActionArea} className={classes.bannerImage} style={{ backgroundImage: `url(${articles[0].featured_image_src})` }} onClick={() => router.push(slugGenerator(articles[0]))} />
          </Hidden>
          <Grid item xs={12} sm={6} style={{ padding: theme.spacing(1) }}>
            <CardContent>
              <Link href={slugGenerator(articles[0])}><Typography variant="h5" component="div" dangerouslySetInnerHTML={{ __html: articles[0].title.rendered }} /></Link>
              <Grid
                container
                style={
                  {
                    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
                    marginTop: theme.spacing(1),
                  }
                }
                spacing={2}
              >
                <Grid item sm>
                  <Grid container spacing={1} wrap="nowrap">
                    <Grid item>
                      <AccountIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {
                          articles[0].coauthors.map((author, i) => {
                            if (i === articles[0].coauthors.length - 2) {
                              return `${author.display_name} `;
                            } if (i !== articles[0].coauthors.length - 1) {
                              return `${author.display_name}, `;
                            } if (articles[0].coauthors.length === 1) {
                              return author.display_name;
                            }
                            return `and ${author.display_name}`;
                          })
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm>
                  <Grid container spacing={1} wrap="nowrap">
                    <Grid item>
                      <ClockIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">{ formatDistanceToNow(new Date(articles[0].date), { addSuffix: true }) }</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: articles[0].excerpt.rendered }} />
              <Grid
                container
                style={
                {
                  color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
                  marginTop: theme.spacing(2),
                  width: '100%',
                }
}
                spacing={2}
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs>
                  <ReactInfo />
                </Grid>
                <Grid item xs>
                  <Grid container spacing={1}>
                    <Grid item>
                      <CommentIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">254</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Grid container spacing={1}>
                    <Grid item>
                      <ShareIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">254</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={2} justify="space-between">
        { articles.map((article, i) => {
          if (i !== 0) {
            return (
              <ArticleCard key={i} article={article} />
            );
          }
          return null;
        })}
      </Grid>
    </div>
  );
};

export default Trending;
