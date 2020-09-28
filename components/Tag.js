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

  const [color, setColor] = React.useState(theme.palette.atenews.news);

  React.useEffect(() => {
    switch (type) {
      case 'News':
        setColor(theme.palette.atenews.news);
        break;
      case 'Features':
        setColor(theme.palette.atenews.features);
        break;
      case 'Opinion':
        setColor(theme.palette.atenews.highlight);
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
      <Typography variant="body2">{type}</Typography>
    </div>
  )
}

export default Tag;