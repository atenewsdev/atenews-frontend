import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AccountIcon from '@material-ui/icons/AccountCircle';
import BellIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

import ProfileView from './PopoutViews/Profile';
import NotificationView from './PopoutViews/Notification';
import SearchView from './PopoutViews/Search';

import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(12)
  },
  menuButton: {
    marginLeft: theme.spacing(0.5),
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
    borderRadius: 0
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    marginLeft: theme.spacing(2),
    backgroundImage: 'url("/logo-blue.png")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: 65,
    height: 65,
  },
  list: {
    width: 250
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const router = useRouter();

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [activeButton, setActiveButton] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentView, setCurrentView] = React.useState(<></>);

  const [sideMenu, setSideMenu] = React.useState(false);

  const [openSubMenu, setOpenSubMenu] = React.useState(null);

  const handleClick = (event, button) => {
    setAnchorEl(event.currentTarget);
    setActiveButton(button);
  }

  const handleClose = () => {
    setActiveButton(null);
    setAnchorEl(null);
  }

  const profileView = () => {
    return (
      <ProfileView />
    )
  }
  
  
  const notificationView = () => {
    return (
      <NotificationView />
    )
  }
  
  const searchView = () => {
    return (
      <SearchView />
    )
  }

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenSubMenu(null);
    setSideMenu(open);
  };

  const handleSubMenu = (submenu) => {
    if (openSubMenu === submenu) {
      setOpenSubMenu(null)
    } else {
      setOpenSubMenu(submenu)
    }
  };

  const handleClickLink = (url) => {
    setSideMenu(false);
    setOpenSubMenu(null);
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
              <ListItemText primary="Features" onClick={() => handleClickLink('/features')}/>
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Montage" onClick={() => handleClickLink('/features/montage')}/>
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Artists" onClick={() => handleClickLink('/features/artists')}/>
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
      </List>
    </div>
  );

  React.useEffect(() => {
    if (activeButton === 'Search') {
      setCurrentView(searchView);
    } else if (activeButton === 'Notifications') {
      setCurrentView(notificationView);
    } else if (activeButton === 'Account') {
      setCurrentView(profileView);
    } else {
      setCurrentView(profileView);
    }
  }, [activeButton])

  return (
    <div className={classes.root}>
      <AppBar color="white" elevation={0} style={{ paddingTop: 5, paddingBottom: 5 }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
            <div className={classes.logo} />
          </div>
          <ClickAwayListener onClickAway={handleClose}>
            <div className={classes.account}>
              <Button className={classes.button}
                variant={activeButton === 'Notifications' ? 'contained' : 'text'}
                color='primary'
                disableElevation
                onClick={(e) => handleClick(e, 'Notifications')}
              >
                <BellIcon />
              </Button>
              <Button className={classes.button}
                variant={activeButton === 'Account' ? 'contained' : 'text'}
                color='primary'
                disableElevation
                onClick={(e) => handleClick(e, 'Account')}
              >
                <AccountIcon />
              </Button>
              <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement="bottom-end"
                disablePortal={false}
                modifiers={{
                  flip: {
                    enabled: false
                  },
                  preventOverflow: {
                    enabled: true,
                    boundariesElement: "scrollParent"
                  }
                }}
              >
                {currentView}
              </Popper>
            </div>
          </ClickAwayListener>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor='left'
        open={sideMenu}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}