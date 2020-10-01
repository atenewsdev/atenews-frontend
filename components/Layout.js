import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import CardActionArea from '@material-ui/core/CardActionArea';
import Tag from 'components/Tag';
import slugGenerator from 'utils/slugGenerator';

import StockTextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

const TextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 30,
      },
    },
  },
})(StockTextField);

const useStyles = makeStyles((theme) => ({
  layoutContainer: {
    width: '100%',
    overflowX: 'hidden'
  },
  contentContainer: {
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    margin: 'auto',
    minHeight: 500
  },
  homeContainer: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    minHeight: 500,
    margin: 'auto'
  },
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1100,
    borderRadius: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: 0
  },
  appBar: {
    position: 'relative',
    height: 65
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  trendingHead: {
    color: '#195EA9',
    padding: 20,
    height: 65,
    textAlign: 'center',
    width: '100%',
    border: 0
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
    padding: theme.spacing(2.5)
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Layout = ({ children, trending }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  const [isLargeWidth, setIsLargeWidth] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const baseUrlMenu = (url) => {
    return url !== '/' ? `${url.split('/').slice(0, 2).join('/')}` : '/';
  }

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (
      baseUrlMenu(router.pathname) === '/' ||
      router.pathname === '/news/university' ||
      router.pathname === '/news/local' ||
      router.pathname === '/news/national' ||
      router.pathname === '/news/sports' ||
      router.pathname === '/features' ||
      router.pathname === '/features/montage' ||
      router.pathname === '/features/artists' ||
      router.pathname === '/opinion/column' ||
      router.pathname === '/opinion/editorial' ||
      router.pathname === '/opinion/blueblood' ||
      router.pathname === '/photos/featured'
    ) {
      setIsLargeWidth(true);
    } else {
      setIsLargeWidth(false);
    }
  }, [router.pathname])

  return (
    <div className={classes.layoutContainer}>
      <Header closeButtomNav={() => {
        setValue(0);
        setOpen(false);
      }} />
      <div className={isLargeWidth ? classes.homeContainer : classes.contentContainer}>
        {children}
        <Footer />
      </div>
      <Hidden mdUp>
        <div style={{ height: theme.spacing(8) }} />
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 0 && value !== newValue) {
              setOpen(false);
            } else if (newValue === 0 && value === newValue) {
              router.push('/');
            } else {
              setOpen(true);
            }
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
          component={Paper}
          variant="outlined"
        >
          <BottomNavigationAction icon={<HomeIcon />} />
          <BottomNavigationAction icon={<SearchIcon />} />
          <BottomNavigationAction icon={<NotificationIcon />} />
        </BottomNavigation>

        <Dialog fullScreen open={open} TransitionComponent={Transition} style={{ zIndex: 1000 }}>
          <AppBar className={classes.appBar} color="secondary" elevation={0} />
          <Paper elevation={0} style={{ padding: theme.spacing(2), paddingBottom: 70 }}>
            { value === 1 ?
              <>
                <TextField
                  variant="outlined"
                  placeholder='Search Atenews'
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Grid container spacing={0} component={Paper} variant="outlined" style={{ borderRadius: 10, overflow: 'hidden', marginTop: theme.spacing(4) }}>
                  <Paper variant="outlined" square className={classes.trendingHead}>
                    <Typography variant="h5">Trending</Typography>
                  </Paper>
                  {
                    trending.length === 0 ? 
                      <Grid container justify="center" alignItems="center">
                        <Grid item>
                          <CircularProgress color="primary" />
                        </Grid>
                      </Grid>
                    : null
                  }
                  { trending.map((article) => (
                    <CardActionArea key={article.id} onClick={() => router.push(slugGenerator(article))}>
                      <Paper variant="outlined" square className={classes.trendingItem}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Tag type={article.categories_detailed[0]} />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1" component="div" className={classes.threeLineText} dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
                          </Grid>
                        </Grid>
                      </Paper>
                    </CardActionArea>
                  ))}
                </Grid>
              </>
            : null }
            { value === 2 ?
              <Typography>Notification Sheet Test</Typography>
            : null }
          </Paper>
        </Dialog>
      </Hidden>
    </div>
  )
}

export default Layout;