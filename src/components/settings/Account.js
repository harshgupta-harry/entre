import React, { useState } from 'react';
import router from 'next/router';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import SettingsIcon from '@material-ui/icons/Settings';
import BlockIcon from '@material-ui/icons/Block';
import { makeStyles } from '@material-ui/core/styles';

// import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BlockedUsers from './BlockedUsers';
import Notifications from './Notifications';
import Settings from './Settings';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    marginBottom: '30px',
    cursor: 'pointer',
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const Account = () => {
  const [type, setType] = useState(router.query.subsection || 'settings');
  const goToSection = (subsection) => {
    router.push({
      pathname: '/settings',
      query: { ...router.query, subsection },
    }, undefined, { shallow: true });
    setType(subsection);
  };

  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Entre: Account settings</title>
      </Head>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={2} md={3}>
          <Paper className={classes.paper}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem
                button
                selected={type === 'settings'}
                onClick={() => goToSection('settings')}
              >
                <ListItemIcon>
                  <SettingsIcon style={{ color: '#62CAFA' }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem
                button
                selected={type === 'notifications'}
                onClick={() => goToSection('notifications')}
              >
                <ListItemIcon>
                  <NotificationImportantIcon style={{ color: '#62CAFA' }} />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem
                button
                selected={type === 'blocked'}
                onClick={() => goToSection('blocked')}
              >
                <ListItemIcon>
                  <BlockIcon style={{ color: '#62CAFA' }} />
                </ListItemIcon>
                <ListItemText primary="Blocked users" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          { type === 'settings' ? <Settings /> : null }
          { type === 'blocked' ? <BlockedUsers /> : null }
          { type === 'notifications' ? <Notifications /> : null }
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
