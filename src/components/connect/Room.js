import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import Router from 'next/router';
import firebase from '../../firebase';
import { MeetingSessionContextProvider } from './MeetingSessionContext';
import AudioSpeaker from './AudioSpeaker';
import AudioInputDevice from './AudioInputDevice';
import DisconnectButton from './DisconnectButton';
import AttendeeFeed from './AttendeeFeed';
import MuteButton from './MuteButton';

const firestore = firebase.firestore();

function Room({ id }) {
  const user = useSelector((s) => s.account.user);
  const [room = null, setRoom] = useState();
  const { enqueueSnackbar } = useSnackbar();

  // Remove user from queue on unMount
  useEffect(() => {
    const loadRoom = async () => {
      const res = await firestore.collection('rooms').doc(id).get();
      if (!res.exists) {
        enqueueSnackbar('The room has expired', {
          variant: 'error',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
        Router.push('/connect');
      } else {
        const roomData = res.data();
        if (!roomData.private || roomData.users.find((u) => u.id === user.id)) {
          setRoom(roomData);
        } else {
          enqueueSnackbar('This is a private room.', {
            variant: 'error',
            preventDuplicate: true,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          });
          Router.push('/');
        }
      }
    };
    if (user && user.id && id) loadRoom();
  }, [user.id, id]);

  if (!room) return null;

  return (
    <MeetingSessionContextProvider meeting={room.meeting}>
      <AttendeeFeed />
      <AudioInputDevice />
      <AudioSpeaker />
      <Box>
        <strong>Joining Room</strong>
        <br />
        Current user id:
        {' '}
        {user.id}
        <br />
        Current roomId:
        {' '}
        {id}
      </Box>
      <DisconnectButton />
      <MuteButton />
    </MeetingSessionContextProvider>
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Room;
