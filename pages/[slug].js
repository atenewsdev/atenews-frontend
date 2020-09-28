import Head from 'next/head'
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import FollowIcon from '@material-ui/icons/Add';
import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from 'components/Button';
import Divider from '@material-ui/core/Divider';
import StockTextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Comment from 'components/Social/Comment';
import CommentField from 'components/Social/CommentField';
import SideWriter from 'components/Article/SideWriter';
import MoreArticles from 'components/Article/MoreArticles';

import CircularProgress from '@material-ui/core/CircularProgress';

import Hidden from '@material-ui/core/Hidden';

import Article from 'components/List/Article';
import handleViewport from 'react-in-viewport';

import WP from 'utils/wordpress';
import WPGBlocks from 'react-gutenberg';

import { formatDistanceToNow } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

const TextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 30,
      },
    },
  },
})(StockTextField);

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    width: '90%',
    margin: 'auto'
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
  avatar: {
    height: 60,
    width: 60
  },
  readMore: {
    position: 'fixed',
    width: 'calc(15vw - 10px)',
    top: 'calc(65px + 8vh)',
    right: 10
  },
  sideWriter: {
    position: 'fixed',
    width: 'calc(20vw - 10px)',
    top: 'calc(35px + 8vh)',
    right: 40
  }
}));

const WriterBlock = handleViewport((props) => {
  const { forwardedRef, theme, classes, article } = props;

  return (
    <Grid container direction="row" alignItems="center" spacing={2} style={{ marginBottom: theme.spacing(2), width: 450 }} component="div" ref={forwardedRef}>
      <Grid item xs={2}>
        <Avatar className={classes.avatar}></Avatar>
      </Grid>
      <Grid container item direction="column" justify="center" spacing={1} xs={10}>
        <Grid item>
          <Typography variant="body1">
            {
              article.coauthors.map((author, i) => {
                if (i === article.coauthors.length - 2) {
                  return `${author.display_name} `
                } else if (i !== article.coauthors.length - 1) {
                  return `${author.display_name}, `
                } else if (article.coauthors.length === 1) {
                  return author.display_name
                } else {
                  return `and ${author.display_name}`
                }
              })
            }
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" size="small"><FollowIcon style={{ marginRight: theme.spacing(1) }} />Follow</Button>
        </Grid>
      </Grid>
    </Grid>
  )
})

const ReadMoreBlock = handleViewport((props) => {
  const { forwardedRef, theme } = props;

  return (
    <div ref={forwardedRef}>
      <Typography variant="h4">More articles for you</Typography>
      <div style={{ marginTop: theme.spacing(4) }}>
        {/*<Article />*/}
      </div>
    </div>
  )
});

export default function Page({ post }) {
  const classes = useStyles();
  const theme = useTheme();

  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={classes.contentContainer}>
        <Grid container direction="row" justify="center">
          <CircularProgress style={{ marginTop: 100, marginBottom: 100 }} />
        </Grid>
      </div>
    )
  }

  if(!post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  const [showSideWriterBlock, setShowSideWriterBlock] = React.useState(false);

  const enterWriterViewport = () => {
    setShowSideWriterBlock(false);
  }

  const leaveWriterViewport = () => {
    setShowSideWriterBlock(true);
  }

  React.useEffect(() => {
    console.log(post);
  }, [])

  return (
    <div className={classes.container}>
      <Head>
        <title>{ReactHtmlParser(post.title.rendered)} - Atenews</title>
        <meta name="description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
        <meta name="twitter:card" value="summary" />
        <meta property="og:title" content={ReactHtmlParser(post.title.rendered)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.featured_image_src} /> 
        <meta name="twitter:image" content={post.featured_image_src} />

        <meta property="og:url" content={`https://beta.atenews.ph/${post.slug}`} />
        <meta property="og:description" content={post.excerpt.rendered.replace(/<[^>]+>/g, '')} />
      </Head>
      <Typography variant="h3" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <Typography variant="body2" style={{ marginTop: theme.spacing(1) }}>{ formatDistanceToNow(new Date(post.date), { addSuffix: true }) }</Typography>
      <Paper elevation={0} style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2), backgroundColor: '#F0F2F5', borderRadius: 0 }}>
        <img src={post.featured_image_src} width="100%" />
        {/*<div style={{ padding: theme.spacing(2) }}>
          <Typography variant="body2"><i>IN TUITION. Survey conducted by the SAMAHAN Research & Development department shows dissatisfied ratings from the university students on the tuition rates as AdDU shifts online. Photo by Jeni Anne Rosario</i></Typography>
        </div>*/}
      </Paper>
      { showSideWriterBlock ?
        <div className={classes.sideWriter}>
          <SideWriter article={post} />
        </div>
      : null }
      <WriterBlock theme={theme} classes={classes} article={post} onLeaveViewport={leaveWriterViewport} onEnterViewport={enterWriterViewport} />
      <Typography variant="body1" component="div" style={{ marginTop: theme.spacing(2) }}>
        <WPGBlocks blocks={post.blocks} />
      </Typography>

      <div style={{ height: theme.spacing(8) }} />

      <Divider />

      <div style={{ height: theme.spacing(2) }} />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button variant="outlined" color="primary" size="large" fullWidth><LikeIcon style={{ marginRight: theme.spacing(1) }} />192</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" color="primary" size="large" fullWidth><DislikeIcon style={{ marginRight: theme.spacing(1) }} />168</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" color="primary" size="large" fullWidth><ShareIcon style={{ marginRight: theme.spacing(1) }} />254</Button>
        </Grid>
      </Grid>

      <div style={{ height: theme.spacing(4) }} />

      <List component="div">
        <CommentField />

        <Comment>
          <Comment reply></Comment>
          <CommentField reply />
        </Comment>

      </List>

      <div style={{ height: theme.spacing(2) }} />

      <Divider />

      <div style={{ height: theme.spacing(8) }} />
      
      <ReadMoreBlock theme={theme} onLeaveViewport={leaveWriterViewport} onEnterViewport={enterWriterViewport} />
      
    </div>
  )
}


export const getStaticPaths = async () => {
  let res = []
  try {
    res = await WP.posts();
  } catch (err) {
    res = []
  }
  let paths = [];
  for (let post of res) {
    paths.push({
      params: { slug: post.slug }
    });
  }
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (ctx) => {
  let res = []
  try {
    res = await WP.posts().slug(ctx.params.slug);
  } catch (err) {
    res = []
  }
  if (res.length > 0) {
    return { props: { post: res[0] }, revalidate: 10 };
  }
  return { props: { post: {} }, revalidate: 10 };
}