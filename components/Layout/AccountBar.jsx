import React from 'react';

import { useRouter } from 'next/router';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import BellIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import UserIcon from '@material-ui/icons/Person';

import { useSpring, animated } from 'react-spring';

import {
  IconButton,
  Popper,
  ClickAwayListener,
  Avatar,
  Grid,
  TextField as StockTextField,
  InputAdornment,
} from '@material-ui/core';
import { useAuth } from '@/utils/hooks/useAuth';
import imageGenerator from '@/utils/imageGenerator';
import NotificationView from '@/components/Layout/Popouts/Notification';
import ProfileView from '@/components/Layout/Popouts/Profile';

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
  account: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    marginRight: '0.5vw',
    height: 65,
    zIndex: 1100,
    width: '15vw',
    background: theme.palette.background.default,
  },
  button: {
    height: 65,
    width: 65,
  },
  search: {
    height: 105,
    position: 'fixed',
    backgroundColor: theme.palette.background.default,
    right: 'calc(15vw + 20px)',
    top: 0,
    zIndex: 1100,
  },
}));

export default function AccountBar({ setDarkMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const [props, set] = useSpring(() => ({ width: '0vw', opacity: 0 }));
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const { profile, setFormOpen, formOpen } = useAuth();

  const searchBar = React.useRef();
  const notifButton = React.useRef();
  const accountButton = React.useRef();

  const [activeButton, setActiveButton] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    if (formOpen) {
      setActiveButton('Account');
      setAnchorEl(accountButton.current);
    }
  }, [formOpen]);

  const handleClick = (event, button) => {
    if (activeButton === button) {
      setActiveButton(null);
      setAnchorEl(null);
      if (button === 'Account') {
        setFormOpen(false);
      }
    } else if (button === 'Account') {
      setFormOpen(true);
    } else {
      setActiveButton(button);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setActiveButton(null);
    setAnchorEl(null);
    setFormOpen(false);
    if (searchOpened) {
      set({ width: '0vw', opacity: 0 });
      setSearchOpened(false);
    }
  };

  const PopperView = () => {
    if (activeButton === 'Notifications') {
      return <NotificationView />;
    }

    if (activeButton === 'Account') {
      return <ProfileView close={handleClose} setDarkMode={setDarkMode} />;
    }

    return null;
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <animated.div className={classes.search} style={props}>
          <Grid container alignItems="center" style={{ height: '100%' }}>
            <Grid item xs>
              <form onSubmit={(e) => { e.preventDefault(); router.push(`/search?query=${search}`); }}>
                <TextField
                  variant="outlined"
                  placeholder="Search Atenews"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton type="submit" aria-label="Search">
                          <SearchIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputRef={searchBar}
                />
              </form>
            </Grid>
          </Grid>
        </animated.div>
        <div className={classes.account}>
          <IconButton
            aria-label="Open Search Bar"
            className={classes.button}
            color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
            onClick={() => {
              if (searchOpened) {
                set({ width: '0vw', opacity: 0 });
                setSearchOpened(false);
              } else {
                searchBar.current.focus();
                set({ width: '66vw', opacity: 1 });
                setSearchOpened(true);
              }
            }}
          >
            <SearchIcon />
          </IconButton>
          {profile
            ? (
              <IconButton
                aria-label="Open notifications"
                className={classes.button}
                ref={notifButton}
                color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
                onClick={(e) => handleClick(e, 'Notifications')}
              >
                <BellIcon />
              </IconButton>
            )
            : null}
          <IconButton
            aria-label="Open account settings"
            ref={accountButton}
            className={classes.button}
            color={theme.palette.type === 'light' ? 'primary' : 'secondary'}
            onClick={(e) => handleClick(e, 'Account')}
          >
            {profile
              ? (
                <Avatar
                  src={imageGenerator(profile.photoURL, 40)}
                  style={{ width: 40, height: 40 }}
                />
              )
              : <UserIcon />}
          </IconButton>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="bottom-end"
            disablePortal
            modifiers={{
              flip: {
                enabled: false,
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'scrollParent',
              },
            }}
          >
            <PopperView />
          </Popper>
        </div>
      </div>
    </ClickAwayListener>
  );
}
