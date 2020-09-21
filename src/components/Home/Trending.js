import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    width: '100%',
    height: 570,
    backgroundImage: 'url(https://atenews.ph/wp-content/uploads/2020/09/IMG_5676.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  trendingHead: {
    background: '#195EA9',
    color: '#ffffff',
    padding: 20,
    height: 70,
    textAlign: 'center'
  },
  trendingItem: {
    width: '100%',
    height: 100,
    borderRadius: 0,
    borderLeft: 0,
    borderTop: 0,
    padding: theme.spacing(2)
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 'calc(70px + 25px)',
    right: 0,
    borderTop: '20px solid transparent',
    borderBottom: '20px solid transparent',
    borderRight: '20px solid white'
  }
}));


const Trending = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item xs={8} style={{ position: 'relative', zIndex: -9999 }}>
        <div className={classes.arrow} />
        <div className={classes.bannerImage} />
      </Grid>
      <Grid item xs={4}>
        <div className={classes.trendingHead}>
          <Typography variant="h5">Trending Articles</Typography>
        </div>
        <CardActionArea>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
        <CardActionArea>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
        <CardActionArea>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
        <CardActionArea>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
        <CardActionArea>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
      </Grid>
    </Grid>
  )
}

export default Trending;