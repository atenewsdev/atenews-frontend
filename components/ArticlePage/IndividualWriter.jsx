import React from 'react';

import { useRouter } from 'next/router';

import handleViewport from 'react-in-viewport';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Typography,
  Avatar,
  Grid,
  CardActionArea,
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

export default handleViewport((props) => {
  const {
    author, key,
  } = props;

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
    <Grid item key={key}>
      <CardActionArea
        style={{ marginBottom: theme.spacing(2), padding: theme.spacing(2) }}
        onClick={() => {
          if (wpUser) {
            router.push(`/profile/${wpUser?.username}`);
          } else {
            setError('This member has yet to set up his/her profile!');
          }
        }}
      >
        <Grid container direction="row" alignItems="center" spacing={2} component="div" key={author.databaseId} wrap="nowrap">
          <Grid item>
            <Avatar className={classes.avatar} src={imageGenerator(wpUser?.displayPhoto, 60)} />
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="center">
              <Grid item>
                <Typography variant="body1">
                  {`${author.firstName} ${author.lastName}`}
                </Typography>
              </Grid>
              <Grid item>
                {author.roles.nodes.map((role) => (!rolesIgnore.includes(role.name) ? (
                  <Typography key={role.name} variant="subtitle2" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}><i>{humanRole(role.name)}</i></Typography>
                ) : null)) }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Grid>
  );
});
