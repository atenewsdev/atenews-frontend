import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Menu from './Menu';
import SubMenu from './SubMenu';

const useStyles = makeStyles(() => ({
  container: {
    position: 'fixed',
    zIndex: 1500,
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
    right: 'calc(-15vw - 10px)',
    top: 0,
    width: '15vw',
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 65,
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  const [activeMenu, setActiveMenu] = React.useState('/');

  const baseUrlMenu = (url) => (url !== '/' ? `${url.split('/').slice(0, 2).join('/')}` : '/');

  React.useEffect(() => {
    setActiveMenu(baseUrlMenu(router.pathname));
  }, [router.pathname]);

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <div className={classes.container}>
      <Menu
        color={theme.palette.primary.main}
        label={
          <div
            className={classes.logo}
            style={
              {
                backgroundImage: activeMenu === '/' || activeMenu === '/profile' ? 'url("/logo.png")' : (theme.palette.type === 'dark' ? 'url("/logo.png")' : 'url("/logo-blue.png")')
              }}
          />
        }
        active={activeMenu === '/' || activeMenu === '/profile'}
        onClick={() => handleClick('/')}
      />

      <Menu
        color={theme.palette.atenews.news}
        label={<Typography variant="body1">News</Typography>}
        active={activeMenu === '/news'}
      >
        <div className={classes.submenu}>
          <SubMenu label={<Typography variant="body1">University</Typography>} color={theme.palette.atenews.news} onClick={() => handleClick('/news/university')} />
          <SubMenu label={<Typography variant="body1">Local</Typography>} color={theme.palette.atenews.news} onClick={() => handleClick('/news/local')} />
          <SubMenu label={<Typography variant="body1">National</Typography>} color={theme.palette.atenews.news} onClick={() => handleClick('/news/national')} />
          <SubMenu label={<Typography variant="body1">Sports</Typography>} color={theme.palette.atenews.news} onClick={() => handleClick('/news/sports')} />
        </div>
      </Menu>

      <Menu
        color={theme.palette.atenews.features}
        label={<Typography variant="body1">Features</Typography>}
        active={activeMenu === '/features'}
      >
        <div className={classes.submenu}>
          <SubMenu label={<Typography variant="body1">Features</Typography>} color={theme.palette.atenews.features} onClick={() => handleClick('/features')} />
          <SubMenu label={<Typography variant="body1">Montage</Typography>} color={theme.palette.atenews.features} onClick={() => handleClick('/features/montage')} />
          <SubMenu label={<Typography variant="body1">Artists</Typography>} color={theme.palette.atenews.features} onClick={() => handleClick('/features/artists')} />
        </div>
      </Menu>

      <Menu
        color={theme.palette.atenews.highlight}
        label={<Typography variant="body1">Opinion</Typography>}
        active={activeMenu === '/opinion'}
      >
        <div className={classes.submenu}>
          <SubMenu label={<Typography variant="body1">Column</Typography>} color={theme.palette.atenews.highlight} onClick={() => handleClick('/opinion/column')} />
          <SubMenu label={<Typography variant="body1">Editorial</Typography>} color={theme.palette.atenews.highlight} onClick={() => handleClick('/opinion/editorial')} />
          <SubMenu label={<Typography variant="body1">Blueblood</Typography>} color={theme.palette.atenews.highlight} onClick={() => handleClick('/opinion/blueblood')} />
        </div>
      </Menu>

      <Menu
        color={theme.palette.atenews.diversions}
        label={<Typography variant="body1">Photos</Typography>}
        active={activeMenu === '/photos'}
      >
        <div className={classes.submenu}>
          <SubMenu label={<Typography variant="body1">Featured Photos</Typography>} color={theme.palette.atenews.diversions} onClick={() => handleClick('/photos/featured')} />
        </div>
      </Menu>

      <Menu
        color={theme.palette.primary.main}
        label={<Typography variant="body1">Staff</Typography>}
        active={activeMenu === '/staff'}
        onClick={() => handleClick('/staff')}
      />
    </div>
  );
}
