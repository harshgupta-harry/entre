import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase';
import ActivitiesList from '../../src/notifcations/ActivitiesList';
import withAuth from '../../src/helpers/withAuth';
import MessageList from '../../src/components/messages/MessageList';
import ChatView from '../../src/components/messages/ChatView';
import SearchUsers from '../../src/components/messages/SearchUsers';

import 'firebase/firestore';

const firestore = firebase.firestore();

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
  notificationsIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    padding: '2px 6px 2px 6px',
    color: 'white',
    fontSize: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    fontWeight: 'bold',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
  },
}));

const resetObj = {
  messages: ['messages'],
  notification: ['job_application', 'post_tags', 'post_upvote', 'post_comment', 'post_comment_comment', 'post_mentions', 'event_atendee', 'event_upvote', 'event_comment', 'event_comment_comment'],
  connection: ['connection_request', 'connection_accepted'],
};

const resetNotifications = async (userId, section) => {
  if (section === 'messages') {
    return true;
  }
  const changes = {};
  resetObj[section].map(async (key) => {
    changes[key] = 0;
  });
  await firestore
    .collection('notifications')
    .doc(userId)
    .update(changes);
  return true;
};


function Inbox() {
  const classes = useStyles();
  const [singleChatView, setSingleChatView] = React.useState(false);
  const [toggleSearchWidget, setToggleSearchWidget] = React.useState(false);
  const [threadId, setThreadId] = React.useState(null);
  const user = useSelector((state) => state.account.user);

  const [counter = {
    messages: 0,
    notification: 0,
    connection: 0,
  }, setCounter] = useState();
  useEffect(() => {
    const unsubscribe = firestore
      .collection('notifications')
      .doc(user.id)
      .onSnapshot((snapshot) => {
        const unread = {
          messages: 0,
          notification: 0,
          connection: 0,
        };
        if (snapshot.empty) {
          return;
        }
        const content = snapshot.data();
        if (content) {
          const keys = Object.keys(content);
          for (let i = 0; i < keys.length; i += 1) {
            if (resetObj.messages.indexOf(keys[i]) !== -1) {
              unread.messages += Object.keys(content[keys[i]]).length;
            }
            if (resetObj.notification.indexOf(keys[i]) !== -1) {
              unread.notification += content[keys[i]];
            }
            if (resetObj.connection.indexOf(keys[i]) !== -1) {
              unread.connection += content[keys[i]];
            }
          }
          setCounter(unread);
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);


  const type = router.query.section || 'messages';

  const goToSection = async (section) => {
    router.push({
      pathname: '/inbox',
      query: { section },
    }, undefined, { shallow: true });
    const changed = {};
    changed.settings = user.settings;
    if (!changed.settings.unreadNotifications) {
      changed.settings.unreadNotifications = {};
    }
    resetObj[section].map((key) => {
      changed.settings.unreadNotifications[key] = 0;
      return false;
    });
    await resetNotifications(user.id, section);
  };

  const renderMessages = () => {
    if (type !== 'messages') return null;
    if (singleChatView && threadId) {
      return (
        <Grid item xs={11} sm={11}>
          <ChatView
            threadId={threadId}
            setSingleChatView={setSingleChatView}
            setToggleSearchWidget={setToggleSearchWidget}
          />
        </Grid>
      );
    }
    return (
      <Grid item xs={12} sm={11}>
        {!toggleSearchWidget ? (
          <MessageList
            type={type}
            setSingleChatView={setSingleChatView}
            setToggleSearchWidget={setToggleSearchWidget}
            setThreadId={setThreadId}
          />
        ) : (
          <SearchUsers
            type={type}
            setSingleChatView={setSingleChatView}
            setToggleSearchWidget={setToggleSearchWidget}
            setThreadId={setThreadId}
          />
        )}
      </Grid>
    );
  };

  return (
    <Container component="main" maxWidth="lg">
      <>
        <Head>
          { type === 'notification' ? <title>Entre: Inbox - Notifications</title> : null }
          { type === 'connection' ? <title>Entre: Inbox - Connection requests</title> : null }
          { type === 'messages' ? <title>Entre: Inbox - Messages</title> : null }
        </Head>
      </>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} sm={2} md={3}>
          <Paper className={classes.paper}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem
                button
                selected={type === 'messages'}
                onClick={() => goToSection('messages')}
              >
                <ListItemIcon>
                  <MessageRoundedIcon style={{ color: type === 'messages' ? '#62CAFA' : null }} />
                </ListItemIcon>
                <ListItemText primary="Messages" />
                <div className={classes.notificationsIcon} style={{ display: counter.messages > 0 ? 'block' : 'none' }}>
                  {counter.messages}
                </div>
              </ListItem>
              <ListItem
                button
                selected={type === 'notification'}
                onClick={() => goToSection('notification')}
              >
                <ListItemIcon>
                  <FavoriteBorderIcon style={{ color: type === 'notification' ? '#62CAFA' : null }} />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
                <div className={classes.notificationsIcon} style={{ display: counter.notification > 0 ? 'block' : 'none' }}>
                  {counter.notification}
                </div>
              </ListItem>
              <ListItem
                button
                selected={type === 'connection'}
                onClick={() => goToSection('connection')}
              >
                <ListItemIcon>
                  <PersonOutlineIcon style={{ color: type === 'connection' ? '#62CAFA' : null }} />
                </ListItemIcon>
                <ListItemText primary="Connections" />
                <div className={classes.notificationsIcon} style={{ display: counter.connection > 0 ? 'block' : 'none' }}>
                  {counter.connection}
                </div>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid container item xs={12} sm={8} md={type !== 'messages' ? 6 : 7} justify="center">
          <Grid item xs={11}>
            { type !== 'messages' ? (
              <ActivitiesList type={type} />
            ) : null}
            { renderMessages() }
          </Grid>
        </Grid>
        <Grid item sm={2} md={type !== 'messages' ? 3 : 2} />
      </Grid>
    </Container>
  );
}

export default withAuth(Inbox);
