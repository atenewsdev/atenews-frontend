/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import useWindowDimensions from '@/utils/useWindowDimensions';
import urlGenerator from '@/utils/urlGenerator';

import Tag from '@/components/General/Tag';

import {
  Typography, Paper, Grid, CardActionArea, Hidden, CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    width: 'calc(15vw - 10px)',
    right: 10,
  },
  trendingHead: {
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
    padding: 20,
    height: 65,
    textAlign: 'center',
    width: '100%',
    border: 0,
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
    padding: theme.spacing(2.5),
  },
  trendingStats: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: theme.palette.primary.main,
    padding: theme.spacing(0.5),
  },
  trendingStatsText: {
    fontSize: '0.8rem',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 'calc(70px + 25px)',
    right: 0,
    borderTop: '20px solid transparent',
    borderBottom: '20px solid transparent',
    borderRight: '20px solid white',
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.9rem',
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.9rem',
  },
}));

const Trending = ({ articles }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const [topPosition, setTopPosition] = React.useState(0);

  const { height } = useWindowDimensions();
  const rootRef = React.useRef();

  useScrollPosition(({ prevPos, currPos }) => {
    const currY = 0 - (currPos.y);
    const prevY = 0 - (prevPos.y);
    if (rootRef.current) {
      const divHeight = rootRef.current.getBoundingClientRect().height;
      if (height < divHeight + 100) {
        if (currY < prevY) {
          setTopPosition((prev) => {
            if (prev - (prevY - currY) <= 0) {
              return 0;
            }
            return prev - (prevY - currY);
          });
        } else {
          setTopPosition((prev) => {
            if (currY >= divHeight - (height / 3)) {
              return divHeight - (height / 3);
            }
            return prev + (currY - prevY);
          });
        }
      } else {
        setTopPosition(0);
      }
    }
  });

  return (
    <Hidden smDown>
      <div className={classes.container} style={{ top: `calc((80px + 4vh) - ${topPosition}px)` }} ref={rootRef}>
        <Grid container spacing={0} component={Paper} variant="outlined" style={{ borderRadius: 10, overflow: 'hidden' }}>
          <Paper variant="outlined" square className={classes.trendingHead}>
            <Typography variant="h5">Trending</Typography>
          </Paper>
          {
            articles?.length === 0
              ? (
                <Grid container justify="center" alignItems="center" spacing={2}>
                  <Grid item>
                    <CircularProgress color="primary" style={{ margin: theme.spacing(2) }} />
                  </Grid>
                </Grid>
              )
              : articles?.map((article) => (
                <CardActionArea
                  key={article._id}
                  onClick={() => router.push(urlGenerator({
                    categories: article.categories,
                    slug: article._id,
                  }))}
                >
                  <Paper variant="outlined" square className={classes.trendingItem}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        { article.categories ? <Tag type={article.categories[0]} /> : null }
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" component="div" className={classes.threeLineText} dangerouslySetInnerHTML={{ __html: article.title }} />
                      </Grid>
                    </Grid>
                  </Paper>
                </CardActionArea>
              ))
          }
        </Grid>
      </div>
    </Hidden>
  );
};

export default Trending;
