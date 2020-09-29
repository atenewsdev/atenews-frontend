import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

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
    width: '65%',
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
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  const [isHome, setIsHome] = React.useState(false);
  const [isProfile, setIsProfile] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const baseUrlMenu = (url) => {
    return url !== '/' ? `${url.split('/').slice(0, 2).join('/')}` : '/';
  }

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (baseUrlMenu(router.pathname) === '/') {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
    if (baseUrlMenu(router.pathname) === '/profile') {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [router.pathname])

  return (
    <div className={classes.layoutContainer}>
      <Header />
      <div className={isHome || isProfile ? classes.homeContainer : classes.contentContainer}>
        {children}
        <Footer />
      </div>
      <Hidden mdUp>
        <div style={{ height: theme.spacing(8) }} />
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 0) {
              setOpen(false);
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
          <AppBar className={classes.appBar} color="secondary" elevation={0}>
            <Toolbar>
            </Toolbar>
          </AppBar>
          <Paper elevation={0} style={{ padding: theme.spacing(2) }}>
            <Typography>Search/Notification Sheet Test</Typography>
          </Paper>
        </Dialog>
      </Hidden>
    </div>
  )
}

export default Layout;