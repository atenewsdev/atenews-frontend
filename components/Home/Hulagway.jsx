import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
  Typography, Grid,
} from '@material-ui/core';

import WPGBlocks from 'react-gutenberg';
import imageGenerator from '@/utils/imageGenerator';

const useStyles = makeStyles(() => ({
  section: {
    marginTop: 80,
  },
}));

export default function Hulagway({ featuredPhoto }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.section}>
      <Grid container justify="center" alignItems="center" spacing={1} style={{ marginBottom: theme.spacing(4), paddingLeft: theme.spacing(8), paddingRight: theme.spacing(8) }}>
        <Grid item xs>
          <div style={{ backgroundColor: theme.palette.type === 'light' ? 'black' : 'white', height: 1, width: '100%' }} />
        </Grid>
        <Grid item xs>
          <Typography
            variant="h4"
            style={{
              fontFamily: 'Open Sans', fontWeight: 300, letterSpacing: 5, textAlign: 'center',
            }}
          >
            HULAGWAY
          </Typography>
        </Grid>
        <Grid item xs>
          <div style={{ backgroundColor: theme.palette.type === 'light' ? 'black' : 'white', height: 1, width: '100%' }} />
        </Grid>
      </Grid>
      <div style={{ borderRadius: 10, overflow: 'hidden' }}>
        <LazyLoadImage src={imageGenerator(featuredPhoto.featured_image_src, 800)} alt="Featured" width="100%" style={{ width: '100%' }} effect="blur" />
      </div>
      <Typography variant="body1" component="div" style={{ padding: theme.spacing(2), textAlign: 'center' }}>
        <Grid container justify="center">
          <Grid item>
            <WPGBlocks blocks={featuredPhoto.blocks} />
          </Grid>
        </Grid>
      </Typography>

      <Typography variant="body2" style={{ textAlign: 'center' }}>
        <i>
          Photo by&nbsp;
          {
          featuredPhoto.coauthors.map((author, i) => {
            if (i === featuredPhoto.coauthors.length - 2) {
              return `${author.display_name} `;
            } if (i !== featuredPhoto.coauthors.length - 1) {
              return `${author.display_name}, `;
            } if (featuredPhoto.coauthors.length === 1) {
              return author.display_name;
            }
            return `and ${author.display_name}`;
          })
        }
        </i>

      </Typography>
    </div>
  );
}
