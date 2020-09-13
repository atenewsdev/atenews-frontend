import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  selector: {
    position: 'absolute',
    animation: '$showSelector 0.5s',
    top: 0,
    left: 0,
    background: '#195EA9',
    height: 65,
    width: '15vw',
    zIndex: -1
  },
  menu: {
    display: 'flex',
    position: 'relative',
    width: '15vw',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    touchAction: 'manipulation',
    userSelect: 'none',
    textDecoration: 'none'
  },
  menuLabel: {
    zIndex: 0,
    color: 'white'
  },
  '@keyframes showSelector': {
    '0%': {
      transform: 'translatex(-100%)'
    },
    '100%': {
      transform: 'translatex(0px)'
    }
  },
});

export default function Menu({color, children, label, active, onClick}) {
  const classes = useStyles();

  const [submenu, setSubmenu] = React.useState(false);

  const handleHover = () => {
    setSubmenu(true);
  }

  const handleClose = () => {
    setSubmenu(false);
  };

  return (
    <div className={classes.menu} onMouseOver={handleHover} onMouseLeave={handleClose}>
      <CardActionArea onClick={onClick} style={{ height: 65 }}>
        { active ? 
          <div className={classes.selector} style={{ background: color }} />
        : null }
        <div className={classes.menuLabel} style={{ color: active ? 'white' : '#195EA9' }}>
          {label}
        </div>
      </CardActionArea>
      {submenu ? children : null}
    </div>
  );
}