import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Trending from 'src/components/Home/Trending';
import Title from 'src/components/Home/Title';

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: -1
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(4)
  },
  account: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    marginRight: 20,
    height: 65,
  },
  section: {
    marginTop: 80
  }
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Head>
        <title>Home - Atenews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={ classes.header }>
        <img src="/atenews-header.svg" height="40"></img>
        <Typography variant="subtitle2">
          The official student publication of the Ateneo de Davao University
        </Typography>
      </div>
      <Trending />

      <div className={classes.section}>
        <Title color={theme.palette.atenews.news}>News</Title>
        <div style={{ height: 500 }} />
      </div>

      <div className={classes.section}>
        <Title color={theme.palette.atenews.features}>Features</Title>
        <div style={{ height: 500 }} />
      </div>

      <div style={{ height: 500 }} />

    </div>
  )
}
