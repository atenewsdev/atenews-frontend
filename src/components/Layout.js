import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

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
    zIndex: -9999
  },
  homeContainer: {
    width: '65%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    margin: 'auto'
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();

  const [isHome, setIsHome] = React.useState(false);

  const baseUrlMenu = (url) => {
    return url !== '/' ? `${url.split('/').slice(0, 2).join('/')}` : '/';
  }

  React.useEffect(() => {
    if (baseUrlMenu(router.pathname) === '/') {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [router.pathname])

  return (
    <div className={classes.layoutContainer}>
      <Header />
      <div className={isHome ? classes.homeContainer : classes.contentContainer}>
        {children}
      </div>
    </div>
  )
}

export default Layout;