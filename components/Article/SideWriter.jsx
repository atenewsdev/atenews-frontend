import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Tag from 'components/Tag';

import FollowIcon from '@material-ui/icons/Add';

import Button from 'components/Button';

const useStyles = makeStyles(() => ({
  avatar: {
    height: 60,
    width: 60,
  },
}));

const Trending = ({ authors, tags }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Hidden smDown>
      <List>
        <Typography>Written by:</Typography>
        { authors.map((author) => (
          <ListItem
            style={{ padding: 0, paddingBottom: theme.spacing(1), paddingTop: theme.spacing(1) }}
            key={author.user_nicename}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={author.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={author.display_name}
              secondary={(
                <Button variant="outlined" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="small" style={{ marginTop: theme.spacing(1) }}>
                  <FollowIcon style={{ marginRight: theme.spacing(1) }} />
                  Follow
                </Button>
              )}
              style={{ marginLeft: theme.spacing(2) }}
            />
          </ListItem>
        )) }
        <Divider style={{ marginBottom: theme.spacing(1), marginTop: theme.spacing(1) }} />
        <Typography style={{ marginBottom: theme.spacing(1) }}>Tags:</Typography>
        <Grid container spacing={1}>
          {
            tags.map((tag, i) => (
              <Grid item key={i}>
                <Tag type={tag} />
              </Grid>
            ))
          }
        </Grid>
      </List>
    </Hidden>
  );
};

export default Trending;
