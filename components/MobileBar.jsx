import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import UserIcon from '@material-ui/icons/Person';

import { useAuth } from '@/utils/hooks/useAuth';

import {
  AppBar,
  Toolbar,
  Grid,
  Avatar,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(12),
  },
  menuButton: {
    marginLeft: theme.spacing(0.5),
    color: theme.palette.type === 'dark' ? 'white' : theme.palette.primary.main,
  },
  account: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    height: 65,
  },
  button: {
    height: 65,
    width: 65,
  },
  logo: {
    backgroundImage: theme.palette.type === 'dark' ? 'url("/logo.png")' : 'url("/logo-blue.png")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: 40,
    height: 40,
  },
  list: {
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MenuAppBar({ closeButtomNav }) {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const { authUser } = useAuth();

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [sideMenu, setSideMenu] = React.useState(false);

  const [openSubMenu, setOpenSubMenu] = React.useState(null);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenSubMenu(null);
    setSideMenu(open);
  };

  const handleSubMenu = (submenu) => {
    if (openSubMenu === submenu) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(submenu);
    }
  };

  const handleClickLink = (url) => {
    setSideMenu(false);
    setOpenSubMenu(null);
    closeButtomNav();
    router.push(url);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
    >
      <List>
        <ListItem button>
          <ListItemText primary="Home" onClick={() => handleClickLink('/')} />
        </ListItem>
        <ListItem button onClick={() => handleSubMenu('News')}>
          <ListItemText primary="News" />
          { openSubMenu === 'News' ? <ExpandLess /> : <ExpandMore /> }
        </ListItem>
        <Collapse in={openSubMenu === 'News'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => handleClickLink('/news/university')}>
              <ListItemText primary="University" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => handleClickLink('/news/local')}>
              <ListItemText primary="Local" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => handleClickLink('/news/national')}>
              <ListItemText primary="National" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => handleClickLink('/news/sports')}>
              <ListItemText primary="Sports" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={() => handleSubMenu('Features')}>
          <ListItemText primary="Features" />
          { openSubMenu === 'Features' ? <ExpandLess /> : <ExpandMore /> }
        </ListItem>
        <Collapse in={openSubMenu === 'Features'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Features" onClick={() => handleClickLink('/features')} />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Montage" onClick={() => handleClickLink('/features/montage')} />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Artists" onClick={() => handleClickLink('/features/artists')} />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={() => handleSubMenu('Opinion')}>
          <ListItemText primary="Opinion" />
          { openSubMenu === 'Opinion' ? <ExpandLess /> : <ExpandMore /> }
        </ListItem>
        <Collapse in={openSubMenu === 'Opinion'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => handleClickLink('/opinion/column')}>
              <ListItemText primary="Column" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => handleClickLink('/opinion/editorial')}>
              <ListItemText primary="Editorial" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => handleClickLink('/opinion/blueblood')}>
              <ListItemText primary="Blueblood" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={() => handleSubMenu('Photos')}>
          <ListItemText primary="Photos" />
          { openSubMenu === 'Photos' ? <ExpandLess /> : <ExpandMore /> }
        </ListItem>
        <Collapse in={openSubMenu === 'Photos'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Featured Photos" onClick={() => handleClickLink('/photos/featured')} />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button>
          <ListItemText primary="Staff" onClick={() => handleClickLink('/staff')} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        elevation={0}
        variant="outlined"
        style={{
          borderLeft: 0, borderRight: 0, borderTop: 0, backgroundColor: theme.palette.type === 'light' ? 'white' : theme.palette.background.paper,
        }}
      >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Grid container style={{ width: '100%' }} justify="center">
            <Grid item>
              <div className={classes.logo} />
            </Grid>
          </Grid>
          <div className={classes.account}>
            <IconButton
              className={classes.button}
              color="primary"
              onClick={() => handleClickLink('/profile')}
            >
              {authUser
                ? (
                  <Avatar
                    src={authUser.photoURL}
                    style={{ width: 40, height: 40 }}
                  />
                )
                : <UserIcon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="left"
        open={sideMenu}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
