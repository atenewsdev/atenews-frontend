import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import Tag from '@/components/General/Tag';

import {
  Typography,
  Grid,
  Hidden,
  Divider,
  List,
} from '@material-ui/core';

import IndividualWriter from '@/components/ArticlePage/SideWriter/IndividualWriter';

const SideWriter = ({
  authors, tags, writerImages, profiles,
}) => {
  const theme = useTheme();

  return (
    <Hidden smDown>
      <List>
        <Typography>Written by:</Typography>
        { authors.map((author, i) => (
          <IndividualWriter key={`sideauthor${i}`} author={author} images={writerImages} profiles={profiles} />
        )) }
        <Divider style={{ marginBottom: theme.spacing(1), marginTop: theme.spacing(1) }} />
        <Typography style={{ marginBottom: theme.spacing(1) }}>Tags:</Typography>
        <Grid container spacing={1}>
          {
            tags.map((tag, i) => (
              <Grid item key={i}>
                <Tag clickable type={tag} />
              </Grid>
            ))
          }
        </Grid>
      </List>
    </Hidden>
  );
};

export default SideWriter;
