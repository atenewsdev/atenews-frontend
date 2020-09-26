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
      <Card variant="outlined" style={{ borderRadius: 10, marginBottom: theme.spacing(4) }}>
        <CardActionArea>
          <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
        </CardActionArea>
        <CardContent>
          <Link href=""><Typography variant="h5" className={classes.twoLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Daniel Dave Gomez, Tom Aaron Rica and Julia Alessandra Trinidad" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ClockIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="September 2, 2020" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
            </ListItem>
          </List>
          <Grid container>
            <Grid item xs={3}>
              <ListItem>
                <ListItemIcon>
                  <LikeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="192" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
              </ListItem>
            </Grid>
            <Grid item xs={3}>
              <ListItem>
                <ListItemIcon>
                  <DislikeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="168" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
              </ListItem>
            </Grid>
            <Grid item xs={3}>
              <ListItem>
                <ListItemIcon>
                  <CommentIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="256" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
              </ListItem>
            </Grid>
            <Grid item xs={3}>
              <ListItem>
                <ListItemIcon>
                  <ShareIcon color="primary" />
                </ListItemIcon>
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