import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { useError } from '@/hooks/useSnackbar';
import useWPUser from '@/hooks/useWPUser';
import imageGenerator from '@/utils/imageGenerator';

const useStyles = makeStyles(() => ({
  avatar: {
    height: 60,
    width: 60,
  },
}));

const IndividualWriter = ({ author }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const { setError } = useError();
  const wpUser = useWPUser(author.databaseId);

  const rolesIgnore = [
    'subscriber',
    'contributor',
    'administrator',
    'editor',
  ];

  const humanRole = (raw) => raw.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return (
    <ListItem
      button
      onClick={() => {
        if (wpUser) {
          router.push(`/profile/${wpUser?.username}`);
        } else {
          setError('This member has yet to set up his/her profile!');
        }
      }}
      style={{ marginTop: theme.spacing(1) }}
      key={author.databaseId}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar} src={imageGenerator(wpUser?.displayPhoto, 60)} />
      </ListItemAvatar>
      <ListItemText
        primary={`${author.firstName} ${author.lastName}`}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={author.roles.nodes.map((role) => (!rolesIgnore.includes(role.name) ? (
          <Typography
            key={`indi_${role.name}`}
            variant="subtitle2"
            style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}
          >
            <i>{humanRole(role.name)}</i>
          </Typography>
        ) : null))}
        style={{ marginLeft: theme.spacing(2) }}
      />
    </ListItem>
  );
};

export default IndividualWriter;
