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
  }
}));


const Trending = ({ article }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  return (
    <div>
      <Card variant="outlined" style={{ borderRadius: 10, marginBottom: theme.spacing(4) }}>
        <CardActionArea onClick={() => router.push(slugGenerator(article))}>
          <CardMedia className={classes.media} image={article.featured_image_src ? article.featured_image_src : null} />
        </CardActionArea>
        <CardContent>
          <Link href={slugGenerator(article)}><Typography variant="h5" className={classes.twoLineText} component="div" dangerouslySetInnerHTML={{ __html: article.title.rendered }}></Typography></Link>
          <List>
            <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
              <ListItemIcon>
                <AccountIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={
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
              } primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
            </ListItem>
            <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
              <ListItemIcon>
                <ClockIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={ formatDistanceToNow(new Date(article.date), { addSuffix: true }) } primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
            </ListItem>
          </List>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                <LikeIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                <ListItemText primary="192" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
              </ListItem>
            </Grid>
            <Grid item xs={3}>
              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                <DislikeIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                <ListItemText primary="168" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
              </ListItem>
            </Grid>
            <Grid item xs={3}>
              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                <CommentIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                <ListItemText primary="256" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
              </ListItem>
            </Grid>
            <Grid item xs={3}>
              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                <ShareIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                <ListItemText primary="256" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
              </ListItem>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default Trending;