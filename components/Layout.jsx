import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

import Tag from '@/components/Tag';
import slugGenerator from '@/utils/slugGenerator';

import { useError } from '@/utils/hooks/useSnackbar';
import { useAuth } from '@/utils/hooks/useAuth';

import {
  Hidden,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
  Dialog,
  AppBar,
  Grid,
  Typography,
  Slide,
  CardActionArea,
  TextField as StockTextField,
  InputAdornment,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import Footer from './Footer';
import Header from './Header';

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
    overflowX: 'hidden',
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
    minHeight: 500,
  },
  homeContainer: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    minHeight: 500,
    margin: 'auto',
  },
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1100,
    borderRadius: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: 0,
  },
  appBar: {
    position: 'relative',
    height: 65,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  trendingHead: {
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
    padding: 20,
    height: 65,
    textAlign: 'center',
    width: '100%',
    border: 0,
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
    padding: theme.spacing(2.5),
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Layout = ({ children, trending, setDarkMode }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const { profile } = useAuth();

  React.useEffect(() => {
    if (profile) {
      if (profile.darkMode !== null) {
        setDarkMode(profile.darkMode);
      }
    }
  }, [profile]);

  const [isLargeWidth, setIsLargeWidth] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const baseUrlMenu = (url) => (url !== '/' ? `${url.split('/').slice(0, 2).join('/')}` : '/');

  const [open, setOpen] = React.useState(false);

  const {
    error,
    setError,
    success,
    setSuccess,
    warning,
    setWarning,
  } = useError();

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(null);
  };

  const handleCloseWarning = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setWarning(null);
  };

  React.useEffect(() => {
    const largerWidthPages = [
      '/',
      '/news/university',
      '/news/local',
      '/news/national',
      '/news/sports',
      '/features',
      '/features/montage',
      '/features/artists',
      '/opinion/column',
      '/opinion/editorial',
      '/opinion/blueblood',
      '/photos/featured',
    ];
    if (largerWidthPages.includes(baseUrlMenu(router.pathname))) {
      setIsLargeWidth(true);
    } else {
      setIsLargeWidth(false);
    }
  }, [router.pathname]);

  return (
    <div className={classes.layoutContainer}>
      <Header
        closeButtomNav={() => {
          setValue(0);
          setOpen(false);
        }}
        setDarkMode={setDarkMode}
      />
      <div className={isLargeWidth ? classes.homeContainer : classes.contentContainer}>
        <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
        <Snackbar open={warning !== null} autoHideDuration={3000} onClose={handleCloseWarning}>
          <Alert onClose={handleCloseWarning} severity="warning">
            {warning}
          </Alert>
        </Snackbar>
        <Snackbar open={success !== null} autoHideDuration={3000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success">
            {success}
          </Alert>
        </Snackbar>
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
          <AppBar className={classes.appBar} color="default" elevation={0} />
          <Paper elevation={0} style={{ padding: theme.spacing(2), paddingBottom: 70 }}>
            { value === 1
              ? (
                <>
                  <TextField
                    variant="outlined"
                    placeholder="Search Atenews"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid container spacing={0} component={Paper} variant="outlined" style={{ borderRadius: 10, overflow: 'hidden', marginTop: theme.spacing(4) }}>
                    <Paper variant="outlined" square className={classes.trendingHead}>
                      <Typography variant="h5">Trending</Typography>
                    </Paper>
                    {
                    trending.length === 0
                      ? (
                        <Grid container justify="center" alignItems="center" spacing={2}>
                          <Grid item>
                            <CircularProgress color={theme.palette.type === 'light' ? 'primary' : 'secondary'} style={{ margin: theme.spacing(2) }} />
                          </Grid>
                        </Grid>
                      )
                      : null
                  }
                    { trending.map((article) => (
                      <CardActionArea
                        key={article.id}
                        onClick={() => {
                          setValue(0);
                          setOpen(false);
                          router.push(slugGenerator(article));
                        }}
                      >
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
              )
              : null }
            { value === 2
              ? <Typography>Notification Sheet Test</Typography>
              : null }
          </Paper>
        </Dialog>
      </Hidden>
    </div>
  );
};

export default Layout;
