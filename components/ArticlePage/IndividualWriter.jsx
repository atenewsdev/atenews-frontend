import React from 'react';

import handleViewport from 'react-in-viewport';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Typography,
  Avatar,
  Grid,
} from '@material-ui/core';

import useFirestore from '@/utils/hooks/useFirestore';
import imageGenerator from '@/utils/imageGenerator';

const useStyles = makeStyles(() => ({
  avatar: {
    height: 60,
    width: 60,
  },
}));

export default handleViewport((props) => {
  const {
    author, key, setWriterImages,
  } = props;

  const classes = useStyles();
  const theme = useTheme();

  const rolesIgnore = [
    'subscriber',
    'contributor',
    'administrator',
    'editor',
  ];

  const [image, setImage] = React.useState('');

  const { getDocumentOnce } = useFirestore();

  React.useEffect(() => {
    getDocumentOnce(`wordpress/${author.id}`).then(async (wpFirebaseId) => {
      if (wpFirebaseId) {
        const profile = await getDocumentOnce(`users/${wpFirebaseId.id}`);
        setImage(profile.photoURL);
        setWriterImages((prev) => ({ ...prev, [author.id]: profile.photoURL }));
      } else {
        setImage(author.avatar);
        setWriterImages((prev) => ({ ...prev, [author.id]: author.avatar }));
      }
    });
  }, []);

  const humanRole = (raw) => raw.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return (
    <Grid item key={key}>
      <Grid container direction="row" alignItems="center" spacing={2} style={{ marginBottom: theme.spacing(2) }} component="div" key={author.user_nicename}>
        <Grid item>
          <Avatar className={classes.avatar} src={imageGenerator(image, 60)} />
        </Grid>
        <Grid item>
          <Grid container direction="column" justify="center">
            <Grid item>
              <Typography variant="body1">
                {author.display_name}
              </Typography>
            </Grid>
            <Grid item>
              {author.roles.map((role) => (!rolesIgnore.includes(role) ? (
                <Typography key={role} variant="subtitle2" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}><i>{humanRole(role)}</i></Typography>
              ) : null)) }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
