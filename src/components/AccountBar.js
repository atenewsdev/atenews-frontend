import React from 'react';
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
    marginRight: '1vw',
    height: 65,
  },
  button: {
    height: 65,
    width: 65
  }
});


export default function AccountBar() {
  const classes = useStyles();

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
    setAnchorEl(event.currentTarget);
    setActiveButton(button);
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
          onClick={(e) => handleClick(e, 'Account')}
        >
          <Avatar src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/109357379_3800608606621682_4436730203378985831_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=8FgzSOAJeLcAX_b5n3x&_nc_ht=scontent-hkg4-1.xx&oh=a626c619a053c914a8728dae4a86684c&oe=5F91EEDF" style={{ width: 40, height: 40 }} />
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