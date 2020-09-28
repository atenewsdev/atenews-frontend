import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  selector: {
    position: 'absolute',
    animation: '$showSelector 0.5s',
    top: 0,
    left: '-15vw',
    background: '#195EA9',
    height: 65,
    width: '30vw',
    zIndex: -1,
    borderRadius: 40,
    overflow: 'hidden'
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
    textDecoration: 'none',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40
  },
  menuLabel: {
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
  arrowLeft: {
    width: 0,
    height: 0,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: `10px solid ${theme.palette.primary.main}`,
    position: 'absolute',
    top: 20
  }
}));

export default function Menu({color, children, label, active, onClick}) {
  const classes = useStyles();

  const [submenu, setSubmenu] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState(color);

  let timer = null;

  const handleHover = () => {
    clearTimeout(timer);
    setSubmenu(true);
    setCurrentColor('#195EA9');
  }

  const handleClose = () => {
    timer = setTimeout(() => {
      setSubmenu(false);
      setCurrentColor(color);
    }, 50);
  };

  return (
    <div className={classes.menu} onMouseOver={handleHover} onMouseLeave={handleClose} onClick={handleClose}>
      <CardActionArea onClick={onClick} style={{ height: 65, borderTopRightRadius: 40, borderBottomRightRadius: 40 }}>
        { active ? 
          <div className={classes.selector} style={{ background: currentColor }} />
        : null }
        <div className={classes.menuLabel} style={{ color: active ? 'white' : '#195EA9' }}>
          {label}
        </div>
      </CardActionArea>
      <div style={{ visibility: submenu ? 'visible' : 'hidden', borderRadius: 10, overflow: 'hidden' }}>
        { children ? <div className={classes.arrowLeft} /> : null }
        {children}
      </div>
    </div>
  );
}