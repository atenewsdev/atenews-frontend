import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  tag: {
    width: 'max-content',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    height: 20,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden'
  }
}));


const Tag = ({ type }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [text, setText] = React.useState('');
  const [color, setColor] = React.useState(theme.palette.atenews.news);

  React.useEffect(() => {
    switch (type.term_id) {
      case 3:
        setColor(theme.palette.atenews.news);
        setText('News');
        break;
      case 4:
        setColor(theme.palette.atenews.features);
        setText('Features');
        break;
      case 13:
        setColor(theme.palette.atenews.highlight);
        setText('Opinion');
        break;
      case 'Montage':
        setColor(theme.palette.atenews.montage);
        break;
      case 'Diversions':
        setColor(theme.palette.atenews.diversions);
        break;
    }
  }, [type])

  return (
    <div className={classes.tag} style={{ backgroundColor: color }}>
      <Typography variant="body2">{text}</Typography>
    </div>
  )
}

export default Tag;