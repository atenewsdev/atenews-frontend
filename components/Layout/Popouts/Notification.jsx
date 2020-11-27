import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { useRouter } from 'next/router';

import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';

import { useAuth } from '@/utils/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  viewContainer: {
    position: 'relative',
    marginTop: 10,
    padding: theme.spacing(2),
    borderRadius: 10,
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

const PopoutView = () => {
  const classes = useStyles();
  const router = useRouter();
  const { notifications } = useAuth();

  return (
    <Paper variant="outlined" className={classes.viewContainer}>
      <div className={classes.arrowUp} />
      <List subheader={<ListSubheader>Recent Notifications</ListSubheader>}>
        {notifications.slice(0, 3).map((notification, i) => (
          <ListItem
            key={`${notification.slug}_${i}`}
            button
            onClick={() => {
              router.push(`/${notification.slug}`);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <AnnouncementIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={notification.title} secondary={notification.description} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PopoutView;
