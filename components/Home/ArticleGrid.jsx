import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Link from '@/components/General/Link';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';

import ReactInfo from '@/components/Social/ReactInfo';
import ArticleCard from '@/components/Home/ArticleCard';

import { formatDistanceToNow } from 'date-fns';
import slugGenerator from '@/utils/slugGenerator';
import coauthors from '@/utils/coauthors';
import imageGenerator from '@/utils/imageGenerator';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import {
  Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Hidden,
} from '@material-ui/core';

import useFirebaseDatabase from '@/utils/hooks/useFirebaseDatabase';

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

const ArticleGrid = ({ articles }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const { getDocument } = useFirebaseDatabase();

  const [socialStats, setSocialStats] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = getDocument(`articles/${articles[0].slug}`, (doc) => {
      setSocialStats(doc);
    });

    return () => {
      unsubscribe.off();
    };
  }, [articles]);

  return (
    <div>
      <Card style={{ marginBottom: theme.spacing(2), borderRadius: 10 }} variant="outlined">
        <Grid container alignItems="stretch">
          <Hidden smUp>
            <Grid item xs={12}>
              <CardActionArea onClick={() => router.push(slugGenerator(articles[0]))}>
                <LazyLoadComponent>
                  <CardMedia
                    className={classes.media}
                    image={imageGenerator(articles[0].featuredImage?.node.sourceUrl, 600)}
                  />
                </LazyLoadComponent>
              </CardActionArea>
            </Grid>
          </Hidden>
          <Hidden xsDown>
            <Grid item sm={6} component={CardActionArea} className={classes.bannerImage} style={{ backgroundImage: `url(${imageGenerator(articles[0].featuredImage?.node.sourceUrl, 600)})` }} onClick={() => router.push(slugGenerator(articles[0]))} />
          </Hidden>
          <Grid item xs={12} sm={6} style={{ padding: theme.spacing(1) }}>
            <CardContent>
              <Link href={slugGenerator(articles[0])}><Typography variant="h5" component="div" dangerouslySetInnerHTML={{ __html: articles[0].title }} /></Link>
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
                        { coauthors(articles[0].coauthors.nodes) }
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

              <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: articles[0].excerpt }} />
              <Grid
                container
                style={{
                  color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
                  marginTop: theme.spacing(2),
                  width: '100%',
                }}
                spacing={2}
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs>
                  <ReactInfo socialStats={socialStats} />
                </Grid>
                <Grid item xs>
                  <Grid container spacing={1}>
                    <Grid item>
                      <CommentIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">{socialStats ? socialStats.commentCount : 0}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Grid container spacing={1}>
                    <Grid item>
                      <ShareIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">{socialStats ? socialStats.shareCount || 0 : 0}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Grid container spacing={1}>
                    <Grid item>
                      <VisibilityIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">{socialStats ? socialStats.viewsCount || 0 : 0}</Typography>
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

export default ArticleGrid;
