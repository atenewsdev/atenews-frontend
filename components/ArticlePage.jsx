import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import FollowIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/ShareOutlined';

import Button from '@/components/Button';

import Comment from '@/components/Social/Comment';
import CommentField from '@/components/Social/CommentField';
import SideWriter from '@/components/Article/SideWriter';

import Article from '@/components/List/Article';
import ReactArticle from '@/components/Social/ReactArticle';
import ReactInfoArticle from '@/components/Social/ReactInfoArticle';
import handleViewport from 'react-in-viewport';

import WPGBlocks from 'react-gutenberg';

import { format } from 'date-fns';

import { CSSTransition } from 'react-transition-group';

import {
  Typography,
  Avatar,
  Paper,
  Grid,
  Button as DefaultButton,
  Divider,
  List,
  Hidden,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
    width: 60,
  },
  readMore: {
    position: 'fixed',
    width: 'calc(15vw - 10px)',
    top: 'calc(65px + 8vh)',
    right: 10,
  },
  sideWriter: {
    position: 'fixed',
    width: 'calc(15vw - 10px)',
    top: 'calc(35px + 8vh)',
    right: 40,
  },
}));

const WriterBlock = handleViewport((props) => {
  const {
    forwardedRef, theme, classes, authors,
  } = props;

  return (
    <div ref={forwardedRef}>
      <Grid container spacing={4} direction="row">
        {
          authors.map((author, i) => (
            <Grid item key={i}>
              <Grid container direction="row" alignItems="center" spacing={1} style={{ marginBottom: theme.spacing(2) }} component="div" key={author.user_nicename}>
                <Grid item>
                  <Avatar className={classes.avatar} src={author.avatar} />
                </Grid>
                <Grid item>
                  <Grid container direction="column" justify="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body1">
                        {author.display_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="small">
                        <FollowIcon style={{ marginRight: theme.spacing(1) }} />
                        Follow
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
});

const ReadMoreBlock = handleViewport((props) => {
  const {
    forwardedRef, theme, relatedPosts, socialStats,
  } = props;

  return (
    <div ref={forwardedRef}>
      <Typography variant="h4">More articles for you</Typography>
      <div style={{ marginTop: theme.spacing(4) }}>
        {
          relatedPosts.map((post) => (
            <Article
              key={post.ID}
              article={{
                featured_image_src: post.featured_image_url,
                coauthors: post.coauthors,
                title: {
                  rendered: post.post_title,
                },
                date: post.post_date,
                excerpt: {
                  rendered: post.excerpt,
                },
                categories_detailed: post.categories,
                slug: post.post_name,
              }}
              socialStats={socialStats[post.post_name]}
            />
          ))
        }
      </div>
    </div>
  );
});

export default function Page({ post, relatedPosts, socialStats }) {
  const classes = useStyles();
  const theme = useTheme();

  const [showSideWriterBlock, setShowSideWriterBlock] = React.useState(false);

  const enterWriterViewport = () => {
    setShowSideWriterBlock(false);
  };

  const leaveWriterViewport = () => {
    setShowSideWriterBlock(true);
  };

  return (
    <div className={classes.container}>
      <Hidden smDown>
        <Typography variant="h3" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </Hidden>
      <Hidden mdUp>
        <Typography variant="h4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </Hidden>
      <Typography variant="body2" style={{ marginTop: theme.spacing(1) }}>{ format(new Date(post.date), 'MMMM d, yyyy') }</Typography>
      <Paper
        elevation={0}
        style={{
          marginBottom: theme.spacing(2), marginTop: theme.spacing(2), backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : '#F0F2F5', borderRadius: 0,
        }}
      >
        <img src={post.featured_image_src} alt={post.featured_image_caption} width="100%" />
        <div style={{ padding: theme.spacing(2) }}>
          <Typography variant="body2"><i>{ post.featured_image_caption }</i></Typography>
        </div>
      </Paper>
      <CSSTransition
        in={showSideWriterBlock}
        timeout={300}
        classNames="side"
        unmountOnExit
      >
        <div className={classes.sideWriter}>
          <SideWriter authors={post.coauthors} tags={post.categories_detailed} />
        </div>
      </CSSTransition>
      <WriterBlock
        theme={theme}
        classes={classes}
        authors={post.coauthors}
        onLeaveViewport={leaveWriterViewport}
        onEnterViewport={enterWriterViewport}
      />
      <Typography variant="body1" component="div" style={{ marginTop: theme.spacing(2), lineHeight: '1.9em', width: '100%' }}>
        <WPGBlocks blocks={post.blocks} />
      </Typography>

      <div style={{ height: theme.spacing(8) }} />

      <ReactInfoArticle />

      <div style={{ height: theme.spacing(2) }} />
      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ReactArticle />
        </Grid>
        <Grid item xs={6}>
          <DefaultButton variant="text" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="large" fullWidth style={{ height: '100%' }}>
            <ShareIcon style={{ marginRight: theme.spacing(1) }} />
            254
          </DefaultButton>
        </Grid>
      </Grid>

      <Divider />
      <div style={{ height: theme.spacing(4) }} />

      <List component="div">
        <CommentField />

        <Comment
          user={{
            name: 'Green',
            avatar: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/3/34/3_green.png/revision/latest/top-crop/width/360/height/450?cb=20200912125201',
          }}
          comment="Cyan sus"
        >
          <Comment user={{ name: 'Cyan', avatar: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/f/f2/11_cyan.png/revision/latest/top-crop/width/360/height/450?cb=20200912125246' }} comment="No green sus. I was at electrical." reply />

        </Comment>
        <Comment user={{ name: 'Red', avatar: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/a/a6/1_red.png/revision/latest/top-crop/width/360/height/450?cb=20200912125145' }} comment="Lol. Both of u sus">
          <CommentField reply />
        </Comment>

      </List>

      <div style={{ height: theme.spacing(2) }} />

      <Divider />

      <div style={{ height: theme.spacing(8) }} />

      <ReadMoreBlock
        theme={theme}
        relatedPosts={relatedPosts}
        onLeaveViewport={leaveWriterViewport}
        onEnterViewport={enterWriterViewport}
        socialStats={socialStats}
      />

    </div>
  );
}
