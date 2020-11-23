import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import ShareIcon from '@material-ui/icons/ShareOutlined';

import Comment from '@/components/Social/Comment';
// import CommentField from '@/components/Social/CommentField';
import SideWriter from '@/components/ArticlePage/SideWriter';

import ReactArticle from '@/components/Social/ReactArticle';
import ReactInfoArticle from '@/components/Social/ReactInfoArticle';

import WPGBlocks from 'react-gutenberg';

import { format } from 'date-fns';

import { CSSTransition } from 'react-transition-group';

import imageGenerator from '@/utils/imageGenerator';
import useFirestore from '@/utils/hooks/useFirestore';
import { useCache } from '@/utils/hooks/useCache';
import useFirebaseDatabase from '@/utils/hooks/useFirebaseDatabase';

import {
  Typography,
  Paper,
  Grid,
  Button as DefaultButton,
  Divider,
  List,
  Hidden,
  Avatar,
} from '@material-ui/core';

import ReadMore from '@/components/ArticlePage/ReadMore';
import WriterInfo from '@/components/ArticlePage/WriterInfo';
import Error404 from '@/components/404';

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
  const { firebase } = useFirestore();
  const { getDocument } = useFirebaseDatabase();

  const [showSideWriterBlock, setShowSideWriterBlock] = React.useState(false);

  const [comments, setComments] = React.useState([]);
  const { users: [users, setUsers] } = useCache();
  const [article, setArticle] = React.useState(null);
  const [writerImages, setWriterImages] = React.useState({});

  if (post === null) {
    return <Error404 />;
  }

  React.useEffect(() => {
    const unsubscribe = firebase.firestore().collection('comments')
      .where('articleSlug', '==', post.slug)
      .orderBy('socialScore', 'desc')
      .onSnapshot(async (snapshot) => {
        const tempComments = [];
        await Promise.all(snapshot.docs.map(async (doc) => {
          if (!users[doc.data().userId]) {
            const user = await firebase.firestore().collection('users').doc(doc.data().userId).get();
            setUsers((prevState) => ({
              ...prevState,
              [user.id]: user.data(),
            }));
          }
          tempComments.push({ id: doc.id, ...doc.data() });
        }));
        setComments(tempComments);
      });

    const unsubscribeStats = getDocument(`articles/${post.slug}`, (data) => {
      setArticle(data);
    });

    return () => {
      unsubscribe();
      unsubscribeStats.off();
    };
  }, [post]);

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
        <img src={imageGenerator(post.featured_image_src, 800)} alt={post.featured_image_caption} width="100%" />
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
            tags={post.categories_detailed}
            writerImages={writerImages}
          />
        </div>
      </CSSTransition>
      <WriterInfo
        authors={post.coauthors}
        setWriterImages={setWriterImages}
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

      <ReactInfoArticle socialStats={article} />

      <div style={{ height: theme.spacing(2) }} />
      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ReactArticle />
        </Grid>
        <Grid item xs={6}>
          <DefaultButton aria-label="Share article" variant="text" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="large" fullWidth style={{ height: '100%' }}>
            <ShareIcon style={{ marginRight: theme.spacing(1) }} />
            {article ? article.shareCount || 0 : 0}
          </DefaultButton>
        </Grid>
      </Grid>

      <Divider />
      <div style={{ height: theme.spacing(4) }} />

      <List component="div">
        {comments.map((comment, i) => (
          <Comment
            key={`comment${i}`}
            user={{
              name: users[comment.userId].displayName,
              avatar: users[comment.userId].photoURL,
              staff: users[comment.userId].staff,
            }}
            comment={comment.content}
            socialStats={{
              upvoteCount: comment.upvoteCount,
              downvoteCount: comment.downvoteCount,
            }}
          />
        )) }
        { /*
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
        </Comment> */ }

      </List>

      <div style={{ height: theme.spacing(2) }} />

      <Divider />

      <div style={{ height: theme.spacing(8) }} />

      <ReadMore
        relatedPosts={relatedPosts}
        onLeaveViewport={leaveWriterViewport}
        onEnterViewport={enterWriterViewport}
      />

    </div>
  );
}
