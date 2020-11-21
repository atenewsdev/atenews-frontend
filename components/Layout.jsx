import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Tag from '@/components/Tag';
import slugGenerator from '@/utils/slugGenerator';

import { useError } from '@/utils/hooks/useSnackbar';
import { useAuth } from '@/utils/hooks/useAuth';
import { useTrending } from '@/utils/hooks/useTrending';

import AuthForm from '@/components/Auth/AuthForm';

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
  arrowUp: {
    position: 'absolute',
    top: -10,
    right: 20,
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: `10px solid ${theme.palette.primary.main}`,
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Layout = ({ children, setDarkMode }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const {
    profile,
    loadingAuth,
  } = useAuth();

  const {
    error,
    setError,
    success,
    setSuccess,
    warning,
    setWarning,
  } = useError();

  const trending = useTrending();

  const [isLargeWidth, setIsLargeWidth] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const baseUrlMenu = (url) => url.split('?')[0];

  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = React.useState('');

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
      '/search',
    ];
    if (largerWidthPages.includes(baseUrlMenu(router.pathname))) {
      setIsLargeWidth(true);
    } else {
      setIsLargeWidth(false);
    }
  }, [router.pathname]);

  if (loadingAuth) {
    return children;
  }

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
          {profile ? (
            <BottomNavigationAction icon={<NotificationIcon />} />
          ) : (
            <BottomNavigationAction icon={<AccountCircleIcon />} />
          ) }
        </BottomNavigation>

        <Dialog fullScreen open={open} TransitionComponent={Transition} style={{ zIndex: 1000 }}>
          <AppBar className={classes.appBar} color="default" elevation={0} />
          <Paper elevation={0} style={{ padding: theme.spacing(2), paddingBottom: 70 }}>
            { value === 1
              ? (
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      router.push(`/search?query=${search}`);
                      setValue(0);
                      setOpen(false);
                    }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Search Atenews"
                      fullWidth
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton type="submit">
                              <SearchIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      autoFocus
                    />
                  </form>
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
                        key={article.slug}
                        onClick={() => {
                          setValue(0);
                          setOpen(false);
                          router.push(slugGenerator({
                            categories_detailed: article.categories,
                            slug: article.slug,
                          }));
                        }}
                      >
                        <Paper variant="outlined" square className={classes.trendingItem}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Tag type={article.categories[0]} />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body1" component="div" className={classes.threeLineText} dangerouslySetInnerHTML={{ __html: article.title }} />
                            </Grid>
                          </Grid>
                        </Paper>
                      </CardActionArea>
                    ))}
                  </Grid>
                </>
              )
              : null }
            { value === 2 && profile
              ? <Typography>Notifications coming soon!</Typography>
              : null}
            { value === 2 && !profile ? (
              <AuthForm
                close={() => {
                  setValue(0);
                  setOpen(false);
                }}
                mobile
              />
            ) : null }
          </Paper>
        </Dialog>
      </Hidden>
    </div>
  );
};

export default Layout;
