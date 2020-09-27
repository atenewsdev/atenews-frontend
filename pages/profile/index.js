import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import LikeIcon from '@material-ui/icons/ThumbUp';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import MailIcon from '@material-ui/icons/Mail';
import BirthdayIcon from '@material-ui/icons/Cake';

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
  leftSide: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
  }
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
        <Grid item sm={3}>
          <div className={classes.leftSide}>
            <Avatar className={classes.avatar} />
          </div>
        </Grid>
        <Grid item sm={9}>
          <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>Joeshua Dequina</Typography>
          <Grid container>
            <Grid item>
              <div className={classes.iconStats}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LikeIcon style={{ fontSize: 50 }} />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" justify="center">
                      <Grid item>
                        <Typography variant="h5">192</Typography>
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
                    <DislikeIcon style={{ fontSize: 50 }} />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" justify="center">
                      <Grid item>
                        <Typography variant="h5">168</Typography>
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
                      <MailIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">jrdequina@addu.edu.ph</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.iconStats}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <BirthdayIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">May 21, 1999</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>

          <Divider style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />

          
        </Grid>
      </Grid>
    </div>
  )
}
