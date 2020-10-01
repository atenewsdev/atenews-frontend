import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';

import Tag from 'components/Tag';
import Link from 'components/Link';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';

import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ReactInfo from 'components/Social/ReactInfo';

import { useSpring, animated } from 'react-spring';
import { formatDistanceToNow } from 'date-fns';
import slugGenerator from 'utils/slugGenerator';

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  bannerDetailsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(180deg, transparent, black)'
  },
  bannerDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: 'white',
    padding: theme.spacing(4)
  },
  trendingHead: {
    background: '#195EA9',
    color: '#ffffff',
    padding: 20,
    minHeight: 65,
    textAlign: 'center',
    width: '100%'
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    borderRadius: 0,
    borderBottom: 0,
    borderRight: 0,
    borderLeft: 0,
    padding: theme.spacing(2)
  },
  trendingStats: {
    color: theme.palette.primary.main
  },
  trendingStatsText: {
    fontSize: '0.8rem'
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 'calc(70px + 25px)',
    right: 0,
    borderTop: '20px solid transparent',
    borderBottom: '20px solid transparent',
    borderRight: `20px solid white`,
    zIndex: 1
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.9rem'
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical'
  }
}));


const RecentArticles = ({ articles }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const arrLength = articles.length;
  const [hoveredData, setHoveredData] = React.useState(articles[0]);
  const [props, set, stop] = useSpring(() => ({ top: `calc(70px + 25px)` }));
  const [elRefs, setElRefs] = React.useState([]); 

  React.useEffect(() => {
    // add or remove refs
    setElRefs(elRefs => (
      Array(arrLength).fill().map((_, i) => elRefs[i] || React.createRef())
    ));

    if (elRefs.length > 0) {
      set({ top: elRefs[0].current.offsetTop - 70 });
    }
  }, [arrLength]);

  const onHover = (data) => {
    //console.log(elRefs[data.index].current.getBoundingClientRect())
    set({ top: elRefs[data.index].current.offsetTop - 70 });
    setHoveredData(data);
  }

  return (
    <Grid container spacing={0} component={Paper} variant="outlined" style={{ borderRadius: 10, overflow: 'hidden' }}>
      <Hidden xsDown>
        <Grid item sm={6} md={8} style={{ position: 'relative' }}>
          <animated.div className={classes.arrow} style={props} />
          <div className={classes.bannerImage} style={{ backgroundImage: `url(${hoveredData.featured_image_src})` }}>
            <div className={classes.bannerDetailsContainer}>
              <div className={classes.bannerDetails}>
                <Grid container>
                  <Grid item xs={12}>
                    <Tag type={hoveredData.categories_detailed[0]} />
                  </Grid>
                  <Grid item xs={12}>
                    <Link href={slugGenerator(hoveredData)} color="white"><Typography variant="h5" style={{ marginTop: theme.spacing(1) }} dangerouslySetInnerHTML={{ __html: hoveredData.title.rendered }}></Typography></Link>
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: theme.spacing(2) }} justify="space-between" spacing={2}>
                  <Grid item xs={6} sm={5}>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                      <Grid item>
                        <AccountIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>
                          {
                            hoveredData.coauthors.map((author, i) => {
                              if (i === hoveredData.coauthors.length - 2) {
                                return `${author.display_name} `
                              } else if (i !== hoveredData.coauthors.length - 1) {
                                return `${author.display_name}, `
                              } else if (hoveredData.coauthors.length === 1) {
                                return author.display_name
                              } else {
                                return `and ${author.display_name}`
                              }
                            })
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sm={5}>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                      <Grid item>
                        <ClockIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>{formatDistanceToNow(new Date(hoveredData.date), { addSuffix: true })}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={false} sm={2}>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </Hidden>
      <Grid item sm={6} md={4}>
        <div className={classes.trendingHead}>
          <Typography variant="h5">Recent Articles</Typography>
        </div>
        { articles.map((article, index) => (
          <CardActionArea key={index} onClick={() => router.push(slugGenerator(article))} onMouseOver={() => onHover({ index, ...article })} ref={elRefs[index]}>
            <Paper variant="outlined" className={classes.trendingItem}>
              <Grid container direction="column" spacing={1} justify="space-between">
                <Grid item xs={12}>
                  <Tag type={article.categories_detailed[0]} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" component="div" className={classes.twoLineText} dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} className={classes.trendingStats}>
                    <Grid item xs>
                      <ReactInfo IconProps={{ className: classes.trendingStatsText }} TextProps={{ className: classes.trendingStatsText }} GridProps={{ alignItems: 'center' }} disableHover />
                    </Grid>
                    <Grid item xs>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <CommentIcon className={classes.trendingStatsText} />
                        </Grid>
                        <Grid item>
                          <Typography className={classes.trendingStatsText} variant="subtitle2">254</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <ShareIcon className={classes.trendingStatsText} />
                        </Grid>
                        <Grid item>
                          <Typography className={classes.trendingStatsText} variant="subtitle2">254</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
        )) }
      </Grid>
    </Grid>
  )
}

export default RecentArticles;