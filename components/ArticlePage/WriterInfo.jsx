import React from 'react';

import handleViewport from 'react-in-viewport';

import {
  Grid,
} from '@material-ui/core';

import IndividualWriter from '@/components/ArticlePage/IndividualWriter';

export default handleViewport((props) => {
  const {
    forwardedRef, authors, setWriterImages,
  } = props;

  return (
    <div ref={forwardedRef}>
      <Grid container spacing={4} direction="row">
        {
          authors.map((author, i) => (
            <IndividualWriter author={author} key={i} setWriterImages={setWriterImages} />
          ))
        }
      </Grid>
    </div>
  );
});
