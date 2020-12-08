/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';

import SlimCardContent from './SlimCardContent';
import EntreAvatar from './EntreAvatar';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    lineHeight: '30px',
    marginTop: 3,
    marginBottom: 3,
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  logo: {
    width: 150,
    margin: '20px 0px',
  },
}));

function ShortCutsCard() {
  const classes = useStyles();
  const user = useSelector((state) => state.account.user);
  return (
    <Card>
      <SlimCardContent>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Box ml={-1} mr={-1}>
            <CardHeader
              avatar={(
                <EntreAvatar
                  fullName={user.fullName}
                  avatar={user.avatar}
                  isPro={user.isPro}
                />
              )}
              title={user.fullName}
              subheader={(
                <Link href="/profile/[username]" as={`/profile/${user.username}`}>
                  <a className={classes.link} style={{ fontSize: 15 }}>View Profile</a>
                </Link>
              )}
            />
          </Box>
          <Link href="/new/post">
            <a className={classes.link}>Create a post</a>
          </Link>
          <Link href="/search?section=people">
            <a className={classes.link}>Search people</a>
          </Link>
          <Link href="/search?section=jobs">
            <a className={classes.link}>Find Jobs/Gigs</a>
          </Link>
          <Link href="/inbox?section=connection">
            <a className={classes.link}>Connection requests</a>
          </Link>
          <Link href="/inbox?section=notification">
            <a className={classes.link}>Notifications</a>
          </Link>
          <Link href="/inbox?section=messages">
            <a className={classes.link}>Messages</a>
          </Link>
          <img alt="entre" className={classes.logo} src="/images/shortcuts_pro.png" />
          <Link href="/search?section=deals">
            <a className={classes.link}>Deals/Discounts</a>
          </Link>
          <Link href="/search?section=events">
            <a className={classes.link}>Upcoming events</a>
          </Link>
        </Box>
      </SlimCardContent>
    </Card>
  );
}

export default ShortCutsCard;
