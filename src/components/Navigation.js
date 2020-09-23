import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Menu from './Menu';
import SubMenu from './SubMenu';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    zIndex: 1500
  },
  logo: {
    backgroundImage: 'url("/logo.png")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '80%',
    width: 65,
    height: 65,
    margin: 'auto',
  },
  submenu: {
    position: 'absolute',
    right: '-15vw',
    top: 0,
    width: '15vw',
    minHeight: 65
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const router = useRouter();

  const [activeMenu, setActiveMenu] = React.useState('/');

  const baseUrlMenu = (url) => {
    return url !== '/' ? `${url.split('/').slice(0, 2).join('/')}` : '/';
  }

  React.useEffect(() => {
    setActiveMenu(baseUrlMenu(router.pathname));
  }, [router.pathname])

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <div className={classes.container}>
      <Menu
        color='#195EA9'
        label={<div className={classes.logo} style={{ backgroundImage: activeMenu === '/' ? 'url("/logo.png")' : 'url("/logo-blue.png")' }} />}
        active={activeMenu === '/'}
        onClick={() => handleClick('/')}
      >
        
      </Menu>

      <Menu
        color='#263E8E'
        label={<Typography variant='body1'>News</Typography>}
        active={activeMenu === '/news'}
      >
        <div className={classes.submenu}>
          <SubMenu label={<Typography variant='body1'>University</Typography>} color='#263E8E' onClick={() => handleClick('/news/university')}/>
          <SubMenu label={<Typography variant='body1'>Local</Typography>} color='#263E8E' onClick={() => handleClick('/news/local')}/>
          <SubMenu label={<Typography variant='body1'>National</Typography>} color='#263E8E' onClick={() => handleClick('/news/national')}/>
          <SubMenu label={<Typography variant='body1'>Sports</Typography>} color='#263E8E' onClick={() => handleClick('/news/sports')}/>
        </div>
      </Menu>

      <Menu
        color='#fab417'
        label={<Typography variant='body1'>Features</Typography>}
        active={activeMenu === '/features'}
      >
        <div className={classes.submenu}>
          <SubMenu label={<Typography variant='body1'>Features</Typography>} color='#fab417' onClick={() => handleClick('/features')}/>
          <SubMenu label={<Typography variant='body1'>Montage</Typography>} color='#fab417' onClick={() => handleClick('/features/montage')}/>
          <SubMenu label={<Typography variant='body1'>Artists</Typography>} color='#fab417' onClick={() => handleClick('/features/artists')}/>
        </div>
      </Menu>

      <Menu
        color='#972e34'
        label={<Typography variant='body1'>Opinion</Typography>}
        active={activeMenu === '/opinion'}
      >
        <div className={classes.submenu}>
          <SubMenu label={<Typography variant='body1'>Column</Typography>} color='#972e34' onClick={() => handleClick('/opinion/column')}/>
          <SubMenu label={<Typography variant='body1'>Editorial</Typography>} color='#972e34' onClick={() => handleClick('/opinion/editorial')}/>
          <SubMenu label={<Typography variant='body1'>Blueblood</Typography>} color='#972e34' onClick={() => handleClick('/opinion/blueblood')}/>
        </div>
      </Menu>

      <Menu
        color='#f9761d'
        label={<Typography variant='body1'>Photos</Typography>}
        active={activeMenu === '/photos'}
      >
        <div className={classes.submenu}>
          <SubMenu label={<Typography variant='body1'>Featured Photos</Typography>} color='#f9761d' onClick={() => handleClick('/photos/featured')}/>
        </div>
      </Menu>
    </div>
  );
}