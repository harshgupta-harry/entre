/* eslint-disable jsx-a11y/anchor-is-valid */
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  container: {
    fontSize: 14,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  link: {
    // margin: 20,
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>© Entre Corporation. All rights reserved</div>
      <div className={classes.links}>
        <span className={classes.link}><Link href="/terms"><a>Terms of Use</a></Link></span>
        <span className={classes.link}><Link href="/privacy"><a>Privacy Policy</a></Link></span>
        <span className={classes.link}><Link href="/cookies"><a>Cookie Policy</a></Link></span>
      </div>
    </div>
  );
}

export default Footer;
