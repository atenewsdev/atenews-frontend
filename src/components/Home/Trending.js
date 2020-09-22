import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tag from 'src/components/Tag';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';

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
    color: 'white',
    padding: theme.spacing(4)
  },
  trendingHead: {
    background: '#195EA9',
    color: '#ffffff',
    padding: 20,
    height: 70,
    textAlign: 'center'
  },
  trendingItem: {
    width: '100%',
    height: 100,
    borderRadius: 0,
    borderLeft: 0,
    borderTop: 0,
    padding: theme.spacing(2)
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
    zIndex: 9999
  }
}));


const Trending = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [hoveredData, setHoveredData] = React.useState({ image: 'https://atenews.ph/wp-content/uploads/2020/09/IMG_5676.jpg', index: 0, title: 'Did the pandemic stop the sex trade?', type: 'Features', author: 'Anna Mae Escobar', date: 'September 14, 2020', photojournalist: 'Raphael Eddmon Tiu' });
  

  const onHover = (data) => {
    setHoveredData(data);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={8} style={{ position: 'relative', zIndex: -9999 }}>
        <div className={classes.arrow} style={{ top: `calc(70px + ${(100 * hoveredData.index) + 25}px)` }} />
        <div className={classes.bannerImage} style={{ backgroundImage: `url(${hoveredData.image})` }}>
          <div className={classes.bannerDetailsContainer}>
            <div className={classes.bannerDetails}>
              <Tag type={hoveredData.type} />
              <Typography variant="h4">{hoveredData.title}</Typography>
              <Grid container style={{ marginTop: theme.spacing(2) }}>
                <Grid container xs={4} spacing={1}>
                  <Grid item xs={2}>
                    <AccountIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">{hoveredData.author}</Typography>
                  </Grid>
                </Grid>
                <Grid container xs={4} spacing={1}>
                  <Grid item xs={2}>
                    <ClockIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">{hoveredData.date}</Typography>
                  </Grid>
                </Grid>
                <Grid container xs={4} spacing={1}>
                  <Grid item xs={2}>
                    <PhotoIcon />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">{hoveredData.photojournalist}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.trendingHead}>
          <Typography variant="h6">Trending Articles</Typography>
        </div>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/IMG_5676.jpg', index: 0, title: 'Did the pandemic stop the sex trade?', type: 'Features', author: 'Anna Mae Escobar', date: 'September 14, 2020', photojournalist: 'Raphael Eddmon Tiu' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/open-sports.jpg', index: 1, title: 'PH Olympian highlights effort and excellence for sports and academic success', type: 'News', author: 'Tom Aaron Rica', date: 'September 21, 2020', photojournalist: 'Tom Aaron Rica' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/C4391BC7-8A79-4062-B1C7-41023DACA962-2048x1068.jpeg', index: 2, title: '‘Forget your limitations’, says alumnus-entrepreneur on overcoming failure', type: 'News', author: 'Johanna Vaughn Dejito and Julia Alessandra Trinidad', date: 'September 15, 2020', photojournalist: 'Julia Alessandra Trinidad' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/E8EBE884-674A-46DA-95E8-92AF65AACC7D-2048x1068.jpeg', index: 3, title: 'Satellite use key to internet democracy in PH—ICT researcher', type: 'News', author: 'Percival Cyber Vargas and Tom Aaron Rica', date: 'September 13, 2020', photojournalist: '@WinGatchalian74' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
        <CardActionArea onMouseOver={() => onHover({ image: 'https://atenews.ph/wp-content/uploads/2020/09/319F7398-AEDE-4475-A46A-A780D3AAFCEA.jpeg', index: 4, title: 'LGBTQIA+ orgs condemn Pemberton’s ‘absolute pardon’ grant', type: 'News', author: 'Jared Joshua Bangcaya', date: 'September 10, 2020', photojournalist: 'Johanna Vaughn Dejito' })}>
          <Paper variant="outlined" className={classes.trendingItem}>
            test
          </Paper>
        </CardActionArea>
      </Grid>
    </Grid>
  )
}

export default Trending;