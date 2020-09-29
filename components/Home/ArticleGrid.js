import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';
import Tag from 'components/Tag';
import Link from 'components/Link';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

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
  },
  iconList: {
    padding: 0, margin: 0
  },
  bannerImage: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
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
            <Grid item sm={6} component={CardActionArea} className={classes.bannerImage} style={{ backgroundImage: `url(${articles[0].featured_image_src})` }} onClick={() => router.push(slugGenerator(articles[0]))}>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Link href={slugGenerator(articles[0])}><Typography variant="h5" component="div" dangerouslySetInnerHTML={{ __html: articles[0].title.rendered }}></Typography></Link>
              <Grid container style={{ color: theme.palette.primary.main, marginTop: theme.spacing(1) }} spacing={2}>
                <Grid item xs>
                  <Grid container spacing={1} wrap="nowrap">
                    <Grid item>
                      <AccountIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        {
                          articles[0].coauthors.map((author, i) => {
                            if (i === articles[0].coauthors.length - 2) {
                              return `${author.display_name} `
                            } else if (i !== articles[0].coauthors.length - 1) {
                              return `${author.display_name}, `
                            } else if (articles[0].coauthors.length === 1) {
                              return author.display_name
                            } else {
                              return `and ${author.display_name}`
                            }
                          })
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Grid container spacing={1} wrap="nowrap">
                    <Grid item>
                      <ClockIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">{ formatDistanceToNow(new Date(articles[0].date), { addSuffix: true }) }</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: articles[0].excerpt.rendered }} />
              <Grid container xs={12} style={{ color: theme.palette.primary.main, marginTop: theme.spacing(2), width: '100%' }} spacing={2} justify="space-between">
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <LikeIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">192</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <DislikeIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">168</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <CommentIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">254</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
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
              <Grid item sm={4} key={article.id}>
                <Card variant="outlined" style={{ borderRadius: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardActionArea onClick={() => router.push(slugGenerator(article))}>
                    <CardMedia className={classes.media} image={article.featured_image_src} />
                  </CardActionArea>
                  <div style={{ padding: theme.spacing(2) }}>
                    <Link href={slugGenerator(article)}><Typography variant="h5" className={classes.twoLineText} component="div" dangerouslySetInnerHTML={{ __html: article.title.rendered }}></Typography></Link>
                  </div>
                  <Grid container style={{ color: theme.palette.primary.main, paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2), paddingBottom: theme.spacing(1) }} spacing={2}>
                    <Grid item xs>
                      <Grid container spacing={1} wrap="nowrap">
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
                    </Grid>
                    <Grid item xs>
                      <Grid container spacing={1} wrap="nowrap">
                        <Grid item>
                          <ClockIcon />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">{ formatDistanceToNow(new Date(article.date), { addSuffix: true }) }</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} spacing={2} component="div" style={{ color: theme.palette.primary.main, paddingBottom: theme.spacing(2), paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2), paddingTop: theme.spacing(1) }} justify="space-evenly" alignItems="flex-end">
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>
                          <LikeIcon />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">192</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>
                          <DislikeIcon />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">168</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>
                          <CommentIcon />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">254</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
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
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  )
}

export default Trending;