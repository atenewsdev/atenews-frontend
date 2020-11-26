import React from 'react';

import dynamic from 'next/dynamic';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import CommentField from '@/components/ArticlePage/Comments/CommentField';

import WPGBlocks from 'react-gutenberg';

import { format } from 'date-fns';

import { CSSTransition } from 'react-transition-group';

import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import imageGenerator from '@/utils/imageGenerator';
import { useArticle } from '@/utils/hooks/useArticle';

import {
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  Hidden,
  Avatar,
} from '@material-ui/core';
import ShareButton from '@/components/ArticlePage/ShareButton';
import Error404 from '@/components/404';

const WriterInfo = dynamic(import('@/components/ArticlePage/WriterInfo'));
const ReactArticle = dynamic(import('@/components/ArticlePage/Reacts/ReactArticle'));
const ReactInfoArticle = dynamic(import('@/components/ArticlePage/Reacts/ReactInfoArticle'));
const Comment = dynamic(import('@/components/ArticlePage/Comments/Comment'));
const ReadMore = dynamic(import('@/components/ArticlePage/ReadMore'));
const SideWriter = dynamic(import('@/components/ArticlePage/SideWriter'));

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

export default function Page({ post, relatedPosts }) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    article: { article },
    writerImages: { writerImages },
    profiles: { profiles },
    comments: { comments, commentsSocialStats },
  } = useArticle();

  const [showSideWriterBlock, setShowSideWriterBlock] = React.useState(false);

  if (post === null) {
    return <Error404 />;
  }

  const enterWriterViewport = () => {
    setShowSideWriterBlock(false);
  };

  const leaveWriterViewport = () => {
    setShowSideWriterBlock(true);
  };

  return (
    <div className={classes.container}>
      <Hidden smDown>
        <Typography variant="h3" component="h1" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </Hidden>
      <Hidden mdUp>
        <Typography variant="h4" component="h1" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </Hidden>
      <Typography variant="body2" style={{ marginTop: theme.spacing(1) }}>{ format(new Date(post.date), 'MMMM d, yyyy') }</Typography>
      <Paper
        elevation={0}
        style={{
          marginBottom: theme.spacing(2), marginTop: theme.spacing(2), backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : '#F0F2F5', borderRadius: 0,
        }}
      >
        <LazyLoadImage src={imageGenerator(post.featured_image_src, 800)} alt={post.featured_image_caption} width="100%" effect="opacity" />
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
          <SideWriter
            authors={post.coauthors}
            profiles={profiles}
            tags={post.categories_detailed}
            writerImages={writerImages}
          />
        </div>
      </CSSTransition>
      <WriterInfo
        authors={post.coauthors}
        profiles={profiles}
        onLeaveViewport={leaveWriterViewport}
        onEnterViewport={enterWriterViewport}
      />
      <Typography
        variant="body1"
        component="div"
        style={{
          marginTop: theme.spacing(2),
          lineHeight: '1.9em',
          width: '100%',
          color: theme.palette.text.primary,
        }}
      >
        <WPGBlocks blocks={post.blocks} />
      </Typography>

      <div style={{ height: theme.spacing(4) }} />
      {post.categories_detailed.filter((cat) => cat.slug === 'columns').length > 0 ? (
        <>
          <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />

          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item>
              <Avatar
                src={writerImages[post.coauthors[0].id]}
                style={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">{`About ${post.coauthors[0].display_name} - ${post.coauthors[0].nickname}`}</Typography>
              <Typography variant="body2">{post.coauthors[0].bio}</Typography>
            </Grid>
          </Grid>

          <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
        </>
      ) : null}

      <div style={{ height: theme.spacing(4) }} />

      <ReactInfoArticle />

      <div style={{ height: theme.spacing(2) }} />
      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ReactArticle slug={post.slug} />
        </Grid>
        <Grid item xs={6}>
          <ShareButton article={article} />
        </Grid>
      </Grid>

      <Divider />
      <div style={{ height: theme.spacing(4) }} />

      <CommentField slug={post.slug} />
      <LazyLoadComponent>
        <List component="div">
          {comments.map((comment) => (commentsSocialStats[comment.id] ? (
            <Comment
              commentId={comment.id}
              commenterId={comment.userId}
              key={comment.id}
              comment={comment.content}
              socialStats={{
                upvoteCount: comment.upvoteCount,
                downvoteCount: comment.downvoteCount,
                replyCount: comment.replyCount,
              }}
              slug={post.slug}
              timestamp={comment.timestamp.toDate()}
            />
          ) : null)) }
        </List>
      </LazyLoadComponent>

      <div style={{ height: theme.spacing(2) }} />

      <Divider />

      <div style={{ height: theme.spacing(8) }} />

      <LazyLoadComponent>
        <ReadMore
          relatedPosts={relatedPosts}
          onLeaveViewport={leaveWriterViewport}
          onEnterViewport={enterWriterViewport}
        />
      </LazyLoadComponent>

    </div>
  );
}
