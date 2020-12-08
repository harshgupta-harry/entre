import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {
  updateAccount,
} from '../../../common/data/actions';
import newApi from '../../../common/api/newApi';

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) { return pair[1]; }
  }
  return (false);
}

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = [
    { section: 'Connections' },
    {
      key: 'connection_request', title: 'Connection requests', email: true, mobile: true,
    },
    {
      key: 'connection_accepted', title: 'Connection accepted', email: true, mobile: true,
    },
    { section: 'Jobs' },
    {
      key: 'job_application', title: 'Applications for your job', email: false, mobile: true,
    },
    { section: 'Posts' },
    {
      key: 'post_tags', title: 'Tags', email: true, mobile: true,
    },
    {
      key: 'post_upvote', title: 'Upvotes', email: true, mobile: true,
    },
    {
      key: 'post_comment', title: 'Comments', email: true, mobile: true,
    },
    {
      key: 'post_comment_comment', title: 'Replies', email: true, mobile: true,
    },
    {
      key: 'post_mentions', title: 'Mentions', email: true, mobile: false,
    },
    { section: 'Events' },
    {
      key: 'event_atendee', title: 'Atendees', email: true, mobile: true,
    },
    {
      key: 'event_upvote', title: 'Upvotes', email: true, mobile: true,
    },
    {
      key: 'event_comment', title: 'Comments', email: true, mobile: true,
    },
    {
      key: 'event_comment_comment', title: 'Replies', email: true, mobile: true,
    },
    { section: 'Chat' },
    {
      key: 'message_new', title: 'Messages', email: false, mobile: false,
    },
  ];


  let user = useSelector((state) => state.account.user);
  const initialEmailNotifications = {};
  const initialMobileNotifications = {};
  notifications.forEach((n) => {
    initialEmailNotifications[n.key] = true;
    initialMobileNotifications[n.key] = true;
  });
  if (user && user.settings && user.settings.emailUnsubscribes) {
    user.settings.emailUnsubscribes.forEach((eu) => {
      initialEmailNotifications[eu] = false;
    });
  }
  if (user && user.settings && user.settings.mobileUnsubscribes) {
    user.settings.mobileUnsubscribes.forEach((eu) => {
      initialMobileNotifications[eu] = false;
    });
  }

  const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications);
  const [mobileNotifications, setMobileNotifications] = useState(initialMobileNotifications);

  useEffect(() => {
    if (!user) {
      newApi.post('notifications/change-subscriptions', {
        token: getQueryVariable('token'),
        getInfo: true,
      }).then((resp) => {
        user = resp.data;
        const getEmailNotifications = {};
        const getMobileNotifications = {};
        notifications.forEach((n) => {
          getEmailNotifications[n.key] = true;
          getMobileNotifications[n.key] = true;
        });
        if (user && user.settings && user.settings.emailUnsubscribes) {
          user.settings.emailUnsubscribes.forEach((eu) => {
            getEmailNotifications[eu] = false;
          });
        }
        if (user && user.settings && user.settings.mobileUnsubscribes) {
          user.settings.mobileUnsubscribes.forEach((eu) => {
            getMobileNotifications[eu] = false;
          });
        }
        setEmailNotifications(getEmailNotifications);
        setMobileNotifications(getMobileNotifications);
      });
    }
  }, []);


  useEffect(() => {
    const emailUnsubscribes = Object.keys(emailNotifications).filter(
      (key) => emailNotifications[key] === false,
    );
    const mobileUnsubscribes = Object.keys(mobileNotifications).filter(
      (key) => mobileNotifications[key] === false,
    );
    let emailToken = null;

    if (user && user.settings && user.settings.token) {
      emailToken = user.settings.token;
    }

    if (getQueryVariable('token')) {
      emailToken = getQueryVariable('token');
    }

    if (user && user.settings) {
      dispatch(updateAccount({
        settings: { ...user.settings, mobileUnsubscribes, emailUnsubscribes },
      }));
    } else if (emailToken) {
      newApi.post('notifications/change-subscriptions', {
        token: emailToken,
        emailUnsubscribes,
        mobileUnsubscribes,
      });
    }
  }, [emailNotifications, mobileNotifications]);

  const handleChange = (event) => {
    setEmailNotifications((eN) => ({ ...eN, [event.target.name]: event.target.checked }));
  };

  const handleMobileChange = (event) => {
    setMobileNotifications((mN) => ({ ...mN, [event.target.name]: event.target.checked }));
  };

  return (
    <>
      <Head>
        <title>Entre: Notification settings</title>
      </Head>
      <Card>
        <CardContent style={{ paddingLeft: 100, paddingRight: 100 }}>
          <Box mb={2}>
            <Grid item container xs={12} style={{ alignItems: 'flex-end' }}>
              <Grid item xs={8}>
                <Typography variant="h6">Notification settings</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography style={{ fontSize: 18 }}>Email</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography style={{ fontSize: 18 }}>Mobile</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container>
              {notifications.map((noti) => (
                noti.section ? (
                  <Box mt={1}>
                    <Typography variant="body2"><strong>{noti.section}</strong></Typography>
                  </Box>
                ) : (
                  <Grid item container xs={12}>
                    <Grid item xs={8}>
                      <Typography variant="subtitle2">{noti.title}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Switch disabled={!noti.email} checked={emailNotifications[noti.key]} onChange={handleChange} name={noti.key} color="primary" />
                    </Grid>
                    <Grid item xs={2}>
                      <Switch disabled={!noti.mobile} checked={mobileNotifications[noti.key]} onChange={handleMobileChange} name={noti.key} color="primary" />
                    </Grid>
                  </Grid>
                )
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Notifications;
