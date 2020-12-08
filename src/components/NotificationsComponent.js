import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import { useSelector } from 'react-redux';
import theme from '../theme';

import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();


const useStyles = makeStyles(() => ({
  notificationsIcon: {
    position: 'absolute',
    top: '6px',
    right: '0px',
    padding: '2px 5px 2px 5px',
    backgroundColor: 'red',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '11px',
    borderRadius: '50%',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
  },
}));

const NotificationsComponent = () => {
  const classes = useStyles(theme);
  const [counter = 0, setCounter] = useState();
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('notifications')
      .doc(user.id)
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        const content = snapshot.data();
        if (content) {
          let totalUnread = 0;
          const keys = Object.keys(content);
          for (let i = 0; i < keys.length; i += 1) {
            if (keys[i] === 'messages') {
              totalUnread += Object.keys(content[keys[i]]).length;
            } else {
              totalUnread += content[keys[i]];
            }
          }
          setCounter(totalUnread);
        }
      });
    return () => {
      unsubscribe();
    };
  }, [user.id]);

  return (
    <>
      <span
        className={classes.notificationsIcon}
        style={{ display: counter ? '' : 'none' }}
      >
        {counter}
      </span>
      <MailIcon
        fontSize="small"
        style={{
          color: window.location.pathname === '/inbox' ? '#00C4FF' : '#B3B3B3',
        }}
      />
    </>
  );
};

export default NotificationsComponent;
