import React from 'react';

import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  link: {
    cursor: 'pointer',
    touchAction: 'manipulation',
    userSelect: 'none',
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
}));


const LinkCustom = ({ children, href, color }) => {
  const classes = useStyles();

  return (
    <Link href={href} passHref>
      <a className={classes.link} style={{ color }}>
        {children}
      </a>
    </Link>
  )
}

export default LinkCustom;