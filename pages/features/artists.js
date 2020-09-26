import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Article from 'src/components/List/Article';
import Trending from 'src/components/Home/Trending';

const useStyles = makeStyles({
  account: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    marginRight: 20,
    height: 65,
  }
});

export default function Page() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Head>
        <title>Artists - Atenews</title>
      </Head>
      <Typography variant="h2" style={{ marginBottom: theme.spacing(4) }}>Artists</Typography>
      <Trending />
      <Article />
      <Article />
      <Article />
      <Article />
      
    </div>
  )
}
