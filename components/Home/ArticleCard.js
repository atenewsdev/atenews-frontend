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

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

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
import ReactInfo from 'components/Social/ReactInfo';

import { useSpring, animated } from 'react-spring';

import { formatDistanceToNow } from 'date-fns';
import slugGenerator from 'utils/slugGenerator';

const useStyles = makeStyles((theme) => ({
  bannerDetailsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundImage: 'linear-gradient(180deg, transparent, black)'
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  }
}));


const Trending = ({ article }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const [containerProps, setContainerProps] = useSpring(() => ({ backgroundColor: 'rgba(0, 0, 0, 0.5)' }));
  const [textProps, setTextProps] = useSpring(() => ({ opacity: 1 }));

  const onHover = () => {
    setContainerProps({ backgroundColor: 'rgba(0, 0, 0, 0)' });
    setTextProps({ opacity: 0 });
  }

  const onLeave = () => {
    setContainerProps({ backgroundColor: 'rgba(0, 0, 0, 0.5)' });
    setTextProps({ opacity: 1 });
  }

  return (
    <Grid item sm={6} key={article.id}>
      <CardActionArea onClick={() => router.push(slugGenerator(article))} style={{ borderRadius: 10 }} onMouseEnter={onHover} onMouseLeave={onLeave}>
        <Card style={{ borderRadius: 10, height: '100%', background: `url(${article.featured_image_src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} variant="outlined">
          <animated.div className={classes.bannerDetailsContainer} style={containerProps}>
            <CardContent style={{ padding: theme.spacing(3) }}>
              <Grid container alignItems="flex-end">
                <Grid item xs={12}>
                  <animated.div style={textProps}>
                    <Typography variant="h5" component="div" className={classes.twoLineText} style={{ color: 'white' }} dangerouslySetInnerHTML={{ __html: article.title.rendered }}></Typography>
                  </animated.div>
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(1) }}>
                  <animated.div style={textProps}>
                    <Grid container style={{ color: 'white' }} spacing={1}>
                      <Grid item xs={12}>
                        <Grid container spacing={1} wrap="nowrap">
                          <Grid item>
                            <AccountIcon style={{ color: 'white' }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="caption" style={{ color: 'white' }}>
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
                      <Grid item xs={12}>
                        <Grid container spacing={1} wrap="nowrap">
                          <Grid item>
                            <ClockIcon style={{ color: 'white' }} />
                          </Grid>
                          <Grid item>
                            <Typography style={{ color: 'white' }} variant="caption">{ formatDistanceToNow(new Date(article.date), { addSuffix: true }) }</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </animated.div>
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
                  <Grid container style={{ color: theme.palette.primary.main, width: '100%' }} spacing={2} justify="space-between" alignItems="center">
                    <Grid item xs>
                      <ReactInfo TextProps={{style: { color: 'white' }}} IconProps={{style: { color: 'white' }}} />
                    </Grid>
                    <Grid item xs>
                      <Grid container spacing={1} wrap="nowrap">
                        <Grid item>
                          <CommentIcon style={{ color: 'white' }} />
                        </Grid>
                        <Grid item>
                          <Typography style={{ color: 'white' }} variant="subtitle2">254</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      <Grid container spacing={1} wrap="nowrap">
                        <Grid item>
                          <ShareIcon style={{ color: 'white' }} />
                        </Grid>
                        <Grid item>
                          <Typography style={{ color: 'white' }} variant="subtitle2">254</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </animated.div>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default Trending;