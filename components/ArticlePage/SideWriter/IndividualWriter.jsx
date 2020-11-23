import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

import imageGenerator from '@/utils/imageGenerator';

const useStyles = makeStyles(() => ({
  avatar: {
    height: 60,
    width: 60,
  },
}));

const Trending = ({ author, images }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [image, setImage] = React.useState('');

  React.useEffect(() => {
    setImage(images[author.id]);
  }, [images]);

  const rolesIgnore = [
    'subscriber',
    'contributor',
    'administrator',
    'editor',
  ];

  const humanRole = (raw) => raw.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return (
    <ListItem
      style={{ padding: 0, paddingBottom: theme.spacing(1), paddingTop: theme.spacing(1) }}
      key={author.user_nicename}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar} src={imageGenerator(image, 60)} />
      </ListItemAvatar>
      <ListItemText
        primary={author.display_name}
        secondary={author.roles.map((role) => (!rolesIgnore.includes(role) ? (
          <Typography variant="subtitle2" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}><i>{humanRole(role)}</i></Typography>
        ) : null))}
        style={{ marginLeft: theme.spacing(2) }}
      />
    </ListItem>
  );
};

export default Trending;
