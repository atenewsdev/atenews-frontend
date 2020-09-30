import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

import Link from 'components/Link';

import LikeIcon from '@material-ui/icons/ThumbUp';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import MailIcon from '@material-ui/icons/Mail';
import BirthdayIcon from '@material-ui/icons/Cake';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';

import Title from 'components/Home/Title';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { useSpring, animated } from 'react-spring';

import WP from 'utils/wordpress';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80
  },
  iconStats: {
    width: 'fit-content',
    marginRight: theme.spacing(4)
  },
  section: {
    marginTop: theme.spacing(4)
  },
  avatar: {
    height: 250,
    width: 250
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  leftSide: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical'
  }
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();

  const [props, set, stop] = useSpring(() => ({ width: 250, height: 0, backgroundColor: 'transparent' }));

  useScrollPosition(({ currPos }) => {
    if (-(currPos.y) <= (document.body.scrollHeight/2) - 20) {
      set({ width: 250, height: -(currPos.y), backgroundColor: 'transparent' });
    }
  });

  return (
    <div className={classes.container}>
      <Head>
        <title>Profile - Atenews</title>
      </Head>
      <Grid container spacing={6} justify="center">
        <Grid item>
          <Hidden xsDown>
            <animated.div style={props} />
          </Hidden>
          <div className={classes.leftSide}>
            <Avatar className={classes.avatar} src="https://lh3.googleusercontent.com/VHB9bVB8cTcnqwnu0nJqKYbiutRclnbGxTpwnayKB4vMxZj8pk1220Rg-6oQ68DwAkqO" />
          </div>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>The Impostor</Typography>
          <Grid container>
            <Grid item>
              <div className={classes.iconStats}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LikeIcon style={{ fontSize: 50 }} color="primary" />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" justify="center">
                      <Grid item>
                        <Typography variant="h5" color="primary">192</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">Received</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.iconStats}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <DislikeIcon style={{ fontSize: 50 }} color="primary" />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" justify="center">
                      <Grid item>
                        <Typography variant="h5" color="primary">168</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">Received</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <div className={classes.section}>
            <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum etiam est adipiscing at ultricies. Euismod pulvinar morbi varius sed volutpat in vitae id aliquam. Massa malesuada odio ut maecenas turpis venenatis id elit. Consectetur est, eleifend feugiat massa. Adipiscing blandit orci pulvinar ultrices. Orci facilisi neque nunc, ullamcorper enim. </Typography>
          </div>
          <div className={classes.section}>
            <Grid container>
              <Grid item>
                <div className={classes.iconStats}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <MailIcon color="primary" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">theimpostor@amongus.com</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.iconStats}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <BirthdayIcon color="primary" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">June 15, 2018</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>

          <Divider style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />

          <Typography variant="h5">Followed Tags</Typography>

          <div style={{ height: theme.spacing(2) }} />
          <Title color={theme.palette.atenews.news} small><b>University News</b></Title>
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" style={{ borderRadius: 10 }}>
                <CardActionArea>
                  <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
                </CardActionArea>
                <CardContent>
                  <Link href=""><Typography variant="h5" className={classes.threeLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
                  <List disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <ClockIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="September 2, 2020" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" style={{ borderRadius: 10 }}>
                <CardActionArea>
                  <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
                </CardActionArea>
                <CardContent>
                  <Link href=""><Typography variant="h5" className={classes.threeLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
                  <List disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <ClockIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="September 2, 2020" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" style={{ borderRadius: 10 }}>
                <CardActionArea>
                  <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
                </CardActionArea>
                <CardContent>
                  <Link href=""><Typography variant="h5" className={classes.threeLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
                  <List disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <ClockIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="September 2, 2020" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <div style={{ height: theme.spacing(4) }} />
          <Title color={theme.palette.atenews.features} small><b>Features</b></Title>
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" style={{ borderRadius: 10 }}>
                <CardActionArea>
                  <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
                </CardActionArea>
                <CardContent>
                  <Link href=""><Typography variant="h5" className={classes.threeLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
                  <List disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <ClockIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="September 2, 2020" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" style={{ borderRadius: 10 }}>
                <CardActionArea>
                  <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
                </CardActionArea>
                <CardContent>
                  <Link href=""><Typography variant="h5" className={classes.threeLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
                  <List disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <ClockIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="September 2, 2020" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" style={{ borderRadius: 10 }}>
                <CardActionArea>
                  <CardMedia className={classes.media} image="https://atenews.ph/wp-content/uploads/2020/09/578B2798-4333-45B4-9C8F-AC5C6A470537-768x401.jpeg" />
                </CardActionArea>
                <CardContent>
                  <Link href=""><Typography variant="h5" className={classes.threeLineText}>Sociologist highlights ‘deliberative democracy’ as response to pandemic issues</Typography></Link>
                  <List disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <ClockIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="September 2, 2020" primaryTypographyProps={{ variant: 'subtitle2', color: 'primary' }} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Divider style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />

          <Typography variant="h5">Followed Staff</Typography>

        </Grid>
      </Grid>
    </div>
  )
}
