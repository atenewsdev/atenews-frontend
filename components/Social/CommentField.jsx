import React from 'react';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';

import IconButton from '@material-ui/core/IconButton';

import Avatar from '@material-ui/core/Avatar';
import StockTextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InputAdornment from '@material-ui/core/InputAdornment';

const TextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 30,
      },
    },
  },
})(StockTextField);

const useStyles = makeStyles(() => ({
  avatar: {
    height: 60,
    width: 60,
  },
  avatarReply: {
    height: 50,
    width: 50,
  },
}));

export default function Page({ reply }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ListItem style={{ padding: 0, marginBottom: reply ? 0 : theme.spacing(2) }}>
      <ListItemIcon>
        <Avatar className={reply ? classes.avatarReply : classes.avatar} />
      </ListItemIcon>
      <ListItemText
        primary={(
          <TextField
            variant="outlined"
            placeholder={reply ? 'Write a reply...' : 'Write a comment...'}
            multiline
            rows={1}
            rowsMax={5}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SendIcon color={theme.palette.type === 'light' ? 'primary' : 'secondary'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
      )}
        style={{ paddingLeft: theme.spacing(1) }}
        disableTypography
      />
    </ListItem>
  );
}
