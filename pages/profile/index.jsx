import React from 'react';

import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import LikeIcon from '@material-ui/icons/ArrowUpwardRounded';
import DislikeIcon from '@material-ui/icons/ArrowDownwardRounded';
import MailIcon from '@material-ui/icons/Mail';
import BirthdayIcon from '@material-ui/icons/Cake';

import ProfileFeed from '@/components/Social/ProfileFeed';
import Flair from '@/components/Social/Flair';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
  },
  iconStats: {
    width: 'fit-content',
    marginRight: theme.spacing(4),
  },
  section: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    height: 250,
    width: 250,
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
    WebkitBoxOrient: 'vertical',
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Head>
        <title>Profile - Atenews</title>
      </Head>
      <Grid container spacing={6} justify="center">
        <Grid item>
          <div className={classes.leftSide}>
            <Avatar className={classes.avatar} src="https://lh3.googleusercontent.com/VHB9bVB8cTcnqwnu0nJqKYbiutRclnbGxTpwnayKB4vMxZj8pk1220Rg-6oQ68DwAkqO" />
          </div>
        </Grid>
        <Grid item xs>
          <Grid container spacing={2} alignItems="center" style={{ marginBottom: theme.spacing(2) }}>
            <Grid item>
              <Typography variant="h4">The Impostor</Typography>
            </Grid>
            <Grid item xs>
              <Flair />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <div className={classes.iconStats}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LikeIcon style={{ fontSize: 50 }} color={theme.palette.type === 'light' ? "primary" : "secondary"} />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" justify="center">
                      <Grid item>
                        <Typography variant="h5" color={theme.palette.type === 'light' ? "primary" : "secondary"}>192</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">Upvotes</Typography>
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
                    <DislikeIcon style={{ fontSize: 50 }} color={theme.palette.type === 'light' ? "primary" : "secondary"} />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" justify="center">
                      <Grid item>
                        <Typography variant="h5" color={theme.palette.type === 'light' ? "primary" : "secondary"}>168</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">Downvotes</Typography>
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
                      <MailIcon color={theme.palette.type === 'light' ? "primary" : "secondary"} />
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
                      <BirthdayIcon color={theme.palette.type === 'light' ? "primary" : "secondary"} />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">June 15, 2018</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />

      <ProfileFeed />
    </div>
  );
}
