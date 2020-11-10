import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

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

const Tag = ({ type }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [text, setText] = React.useState('');
  const [color, setColor] = React.useState(theme.palette.atenews.news);

  React.useEffect(() => {
    switch (parseInt(type.term_id, 10)) {
      case 3:
      case 20:
      case 18:
      case 19:
      case 7:
        setColor(theme.palette.atenews.news);
        setText(type.name ? type.name : type.cat_name);
        break;
      case 4:
      case 437:
        setColor(theme.palette.atenews.features);
        setText(type.name ? type.name : type.cat_name);
        break;
      case 13:
      case 21:
      case 428:
      case 590:
        setColor(theme.palette.atenews.highlight);
        setText(type.name ? type.name : type.cat_name);
        break;
      case 31:
        setColor(theme.palette.atenews.montage);
        setText(type.name ? type.name : type.cat_name);
        break;
      case 430:
      case 431:
        setColor(theme.palette.atenews.diversions);
        setText(type.name ? type.name : type.cat_name);
        break;
      default:
    }
  }, [type]);

  return (
    <div className={classes.tag} style={{ backgroundColor: color }}>
      <Typography variant="body2">{text}</Typography>
    </div>
  );
};

export default Tag;
