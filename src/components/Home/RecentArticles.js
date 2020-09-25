import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';

import Tag from 'src/components/Tag';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';

import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    width: '100%',
    height: 570,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  bannerDetailsContainer: {
    position: 'relative',
    width: '100%',
    height: 570,
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
    height: 65,
    textAlign: 'center',
    width: '100%'
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    height: 101,
    borderRadius: 0,
    borderBottom: 0,
    borderRight: 0,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  trendingStats: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: theme.palette.primary.main,
    padding: theme.spacing(0.5)
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


const RecentArticles = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [hoveredData, setHoveredData] = React.useState({ image: 'https://atenews.ph/wp-content/uploads/2020/09/IMG_5676.jpg', index: 0, title: 'Did the pandemic stop the sex trade?', type: 'Features', author: 'Anna Mae Escobar', date: 'September 14, 2020', photojournalist: 'Raphael Eddmon Tiu' });
  

  const onHover = (data) => {
    setHoveredData(data);
  }

  return (
    <Grid container spacing={0} component={Paper} variant="outlined" style={{ borderRadius: 10, overflow: 'hidden' }}>
      <Hidden xsDown>
        <Grid item sm={8} style={{ position: 'relative' }}>
          <div className={classes.arrow} style={{ top: `calc(70px + ${(100 * hoveredData.index) + 25}px)` }} />
          <div className={classes.bannerImage} style={{ backgroundImage: `url(${hoveredData.image})` }}>
            <div className={classes.bannerDetailsContainer}>
              <div className={classes.bannerDetails}>
                <Grid container>
                  <Grid item xs={12}>
                    <Tag type={hoveredData.type} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" style={{ marginTop: theme.spacing(1) }}>{hoveredData.title}</Typography>
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: theme.spacing(2) }} justify="space-between">
                  <Grid container item xs={4} spacing={1}>
                    <Grid item xs={2}>
                      <AccountIcon />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>{hoveredData.author}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={4} spacing={1}>
                    <Grid item xs={2}>
                      <ClockIcon />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>{hoveredData.date}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={4} spacing={1}>
                    <Grid item xs={2}>
                      <PhotoIcon />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="subtitle2" style={{ fontSize: '0.7rem' }}>{hoveredData.photojournalist}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </Hidden>
      <Grid item sm={4}>
        <div className={classes.trendingHead}>
          <Typography variant="h5">Recent Articles</Typography>
        </div>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/IMG_5676.jpg', index: 0, title: 'Did the pandemic stop the sex trade?', type: 'Features', author: 'Anna Mae Escobar', date: 'September 14, 2020', photojournalist: 'Raphael Eddmon Tiu' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            <Grid container>
              <Grid item xs={12}>
                <Tag type="Features" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="div" className={classes.twoLineText}>
                  Did the pandemic stop the sex trade?
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.trendingStats}>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <LikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>192</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <DislikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>168</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <CommentIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <ShareIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </CardActionArea>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/open-sports.jpg', index: 1, title: 'PH Olympian highlights effort and excellence for sports and academic success', type: 'News', author: 'Tom Aaron Rica', date: 'September 21, 2020', photojournalist: 'Tom Aaron Rica' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            <Grid container>
              <Grid item xs={12}>
                <Tag type="News" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="div" className={classes.twoLineText}>
                  PH Olympian highlights effort and excellence for sports and academic success
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.trendingStats}>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <LikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>192</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <DislikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>168</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <CommentIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <ShareIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </CardActionArea>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/C4391BC7-8A79-4062-B1C7-41023DACA962-2048x1068.jpeg', index: 2, title: '‘Forget your limitations’, says alumnus-entrepreneur on overcoming failure', type: 'News', author: 'Johanna Vaughn Dejito and Julia Alessandra Trinidad', date: 'September 15, 2020', photojournalist: 'Julia Alessandra Trinidad' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            <Grid container>
              <Grid item xs={12}>
                <Tag type="News" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="div" className={classes.twoLineText}>
                  ‘Forget your limitations’, says alumnus-entrepreneur on overcoming failure
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.trendingStats}>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <LikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>192</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <DislikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>168</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <CommentIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <ShareIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </CardActionArea>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/E8EBE884-674A-46DA-95E8-92AF65AACC7D-2048x1068.jpeg', index: 3, title: 'Satellite use key to internet democracy in PH—ICT researcher', type: 'News', author: 'Percival Cyber Vargas and Tom Aaron Rica', date: 'September 13, 2020', photojournalist: '@WinGatchalian74' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            <Grid container>
              <Grid item xs={12}>
                <Tag type="News" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="div" className={classes.twoLineText}>
                  Satellite use key to internet democracy in PH—ICT researcher
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.trendingStats}>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <LikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>192</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <DislikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>168</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <CommentIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <ShareIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </CardActionArea>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/319F7398-AEDE-4475-A46A-A780D3AAFCEA.jpeg', index: 4, title: 'LGBTQIA+ orgs condemn Pemberton’s ‘absolute pardon’ grant', type: 'News', author: 'Jared Joshua Bangcaya', date: 'September 10, 2020', photojournalist: 'Johanna Vaughn Dejito' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            <Grid container>
              <Grid item xs={12}>
                <Tag type="News" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="div" className={classes.twoLineText}>
                  LGBTQIA+ orgs condemn Pemberton’s ‘absolute pardon’ grant
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.trendingStats}>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <LikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>192</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <DislikeIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>168</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <CommentIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={3} spacing={1} alignItems="center">
                <Grid item>
                  <ShareIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" className={classes.trendingStatsText}>254</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </CardActionArea>
      </Grid>
    </Grid>
  )
}

export default RecentArticles;