import React from 'react';

import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Avatar from '@material-ui/core/Avatar';
import AccountIcon from '@material-ui/icons/AccountCircle';
import BellIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

import ProfileView from './PopoutViews/Profile';
import NotificationView from './PopoutViews/Notification';
import SearchView from './PopoutViews/Search';

const useStyles = makeStyles({
  account: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    marginRight: '0.5vw',
    height: 65,
    zIndex: 1500,
    width: '15vw',
    background: 'white'
  },
  button: {
    height: 65,
    width: 65
  }
});


export default function AccountBar() {
  const classes = useStyles();
  const router = useRouter();

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

  const [activeButton, setActiveButton] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentView, setCurrentView] = React.useState(profileView);

  const handleClick = (event, button) => {
    if (activeButton === button) {
      setActiveButton(null);
      setAnchorEl(null);
    } else {
      setActiveButton(button);
      setAnchorEl(event.currentTarget);
    }
  }

  const handleClose = () => {
    setActiveButton(null);
    setAnchorEl(null);
  }

  React.useEffect(() => {
    if (activeButton === 'Search') {
      setCurrentView(searchView);
    } else if (activeButton === 'Notifications') {
      setCurrentView(notificationView);
    } else if (activeButton === 'Account') {
      setCurrentView(profileView);
    }
  }, [activeButton])

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={classes.account}>
        <IconButton className={classes.button}
          color='primary'
          onClick={(e) => handleClick(e, 'Search')}
        >
          <SearchIcon />
        </IconButton>
        <IconButton className={classes.button}
          color='primary'
          onClick={(e) => handleClick(e, 'Notifications')}
        >
          <BellIcon />
        </IconButton>
        <IconButton className={classes.button}
          color='primary'
          onClick={() => router.push('/profile')}
        >
          <Avatar src="https://lh3.googleusercontent.com/VHB9bVB8cTcnqwnu0nJqKYbiutRclnbGxTpwnayKB4vMxZj8pk1220Rg-6oQ68DwAkqO" style={{ width: 40, height: 40 }} />
        </IconButton>
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
  );
}