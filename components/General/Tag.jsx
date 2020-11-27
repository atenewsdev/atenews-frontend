import React from 'react';

import { useRouter } from 'next/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Typography, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tag: {
    width: 'max-content',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    height: 20,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
}));

const Tag = ({ type, clickable }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [text, setText] = React.useState('');
  const [url, setURL] = React.useState('');
  const [color, setColor] = React.useState(theme.palette.atenews.news);

  React.useEffect(() => {
    switch (parseInt(type.term_id, 10)) {
      case 3:
      case 20:
      case 18:
      case 19:
      case 7:
        if (type.slug !== 'news') {
          setURL(`/news/${type.slug}`);
        } else {
          setURL('/news');
        }
        setColor(theme.palette.atenews.news);
        setText(type.name ? type.name : type.cat_name);
        break;
      case 4:
      case 437:
        if (type.slug !== 'features') {
          setURL(`/features/${type.slug}`);
        } else {
          setURL('/features');
        }
        setColor(theme.palette.atenews.features);
        setText(type.name ? type.name : type.cat_name);
        break;
      case 13:
      case 21:
      case 428:
      case 590:
        if (type.slug !== 'opinion') {
          setURL(`/opinion/${type.slug === 'columns' ? 'column' : type.slug}`);
        } else {
          setURL('/opinion');
        }
        setColor(theme.palette.atenews.highlight);
        setText(type.name ? type.name : type.cat_name);
        break;
      case 31:
        if (type.slug !== 'features') {
          setURL(`/features/${type.slug}`);
        } else {
          setURL('/features');
        }
        setColor(theme.palette.atenews.montage);
        setText(type.name ? type.name : type.cat_name);
        break;
      case 430:
      case 431:
        if (type.slug !== 'photos') {
          setURL(`/photos/${type.slug === 'featured-photos' ? 'featured' : type.slug}`);
        } else {
          setURL('/photos');
        }
        setColor(theme.palette.atenews.diversions);
        setText(type.name ? type.name : type.cat_name);
        break;
      default:
    }
  }, [type]);

  return (
    <CardActionArea
      disabled={!clickable}
      onClick={() => {
        router.push(url);
      }}
      className={classes.tag}
      style={{ backgroundColor: color }}
    >
      <Typography variant="body2">{text}</Typography>
    </CardActionArea>
  );
};

export default Tag;
