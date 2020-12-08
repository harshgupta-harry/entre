/* eslint-disable jsx-a11y/anchor-is-valid */
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 80,
    height: '93px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    margin: 10,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>© Entre Corporation. All rights reserved</div>
      <div>
        <span className={classes.link}><Link href="/terms"><a>Terms of Use</a></Link></span>
        <span className={classes.link}><Link href="/privacy"><a>Privacy Policy</a></Link></span>
        <span className={classes.link}><Link href="/cookies"><a>Cookie Policy</a></Link></span>
      </div>
    </div>
  );
}

export default Footer;
