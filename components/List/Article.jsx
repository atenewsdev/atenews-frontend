import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from '@/components/Link';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ReactInfo from '@/components/Social/ReactInfo';

import { formatDistanceToNow } from 'date-fns';
import slugGenerator from '@/utils/slugGenerator';

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
  bannerImage: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

const Trending = ({ article, topImage }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  return (
    <div>
      <Card style={{ marginBottom: theme.spacing(4), borderRadius: 10 }} variant="outlined">
        <Grid container alignItems="stretch">
          { topImage
            ? (
              <>
                <Grid item xs={12}>
                  <CardActionArea onClick={() => router.push(slugGenerator(article))}>
                    <CardMedia className={classes.media} image={article.featured_image_src} />
                  </CardActionArea>
                </Grid>
                <Grid item xs={12}>
                  <CardContent style={{ padding: theme.spacing(3) }}>
                    <Link href={slugGenerator(article)}><Typography variant="h5" component="div" dangerouslySetInnerHTML={{ __html: article.title.rendered }} /></Link>
                    <Grid
                      container
                      style={
                        {
                          color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
                          marginTop: theme.spacing(1),
                        }
}
                      spacing={1}
                    >
                      <Grid item xs>
                        <Grid container spacing={1} wrap="nowrap">
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
                      <Grid item xs>
                        <Grid container spacing={1} wrap="nowrap">
                          <Grid item>
                            <ClockIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="caption">{ formatDistanceToNow(new Date(article.date), { addSuffix: true }) }</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
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
              </>
            )
            : (
              <>
                <Hidden smUp>
                  <Grid item xs={12}>
                    <CardActionArea onClick={() => router.push(slugGenerator(article))}>
                      <CardMedia className={classes.media} image={article.featured_image_src} />
                    </CardActionArea>
                  </Grid>
                </Hidden>
                <Hidden xsDown>
                  <Grid item sm={6} component={CardActionArea} className={classes.bannerImage} style={{ backgroundImage: `url(${article.featured_image_src})` }} onClick={() => router.push(slugGenerator(article))} />
                </Hidden>
                <Grid item xs={12} sm={6}>
                  <CardContent style={{ padding: theme.spacing(4) }}>
                    <Link href={slugGenerator(article)}><Typography variant="h5" component="div" dangerouslySetInnerHTML={{ __html: article.title.rendered }} /></Link>
                    <Grid
                      container
                      style={
                        {
                          color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
                          marginTop: theme.spacing(1),
                        }
}
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Grid container spacing={1} wrap="nowrap">
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
                      <Grid item xs={12}>
                        <Grid container spacing={1} wrap="nowrap">
                          <Grid item>
                            <ClockIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="caption">{ formatDistanceToNow(new Date(article.date), { addSuffix: true }) }</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
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
              </>
            )}
        </Grid>
      </Card>
    </div>
  );
};

export default Trending;
