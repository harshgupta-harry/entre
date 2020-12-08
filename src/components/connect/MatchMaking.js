import React, { useState, useEffect, useRef } from 'react';
import router from 'next/router';
import {
  Box,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import firebase from '../../firebase';
import newApi from '../../../common/api/newApi';

const firestore = firebase.firestore();

const addMeToQueue = async (user) => {
  const data = {
    status: 'waiting-match',
    user: {
      id: user.id,
      avatar: user.avatar,
      fullName: user.fullName,
      industry: user.industry,
      connections: user.connections.length,
      location: user.location,
      title: user.title,
      username: user.username,
      isPro: user.isPro,
    },
  };
  const res = await firestore.collection('match').add(data);
  console.debug('Add to queue: ', res.id);
  return res.id;
};


function MatchMaking() {
  const user = useSelector((s) => s.account.user);
  const [selectedMatch = null, setSelectedMatch] = useState();
  const [currentRoom = null, setCurrentRoom] = useState();
  const [queueId = null, setQueueId] = useState();
  const [qStatus = null, setQStatus] = useState();
  const [role = null, setRole] = useState();
  let queueListener;

  const qRef = useRef();

  const createRoom = async (users) => {
    console.debug('Creating room for users: ', queueId, users);
    const res = await newApi.post('connect/meetings', { meetingToken: queueId });
    if (res.data && res.data.meeting) {
      const roomsRes = await firestore.collection('rooms')
        .add({
          users,
          meeting: res.data.meeting,
          private: true,
        });
      await firestore.collection('match')
        .doc(queueId)
        .update({
          status: 'connected',
          room: roomsRes.id,
        });
      setCurrentRoom(roomsRes.id);
      setQStatus('connected');
      router.push('room/[id]', `room/${roomsRes.id}`);
    }
    console.log(res);
  };

  useEffect(() => {
    if (qStatus === 'locked' && role === 'host' && selectedMatch) {
      createRoom([{
        id: user.id,
        avatar: user.avatar,
        fullName: user.fullName,
        industry: user.industry,
        connections: user.connections.length,
        location: user.location,
        title: user.title,
        username: user.username,
        isPro: user.isPro,
      }, selectedMatch]);
    }
  }, [qStatus, role, selectedMatch]);

  useEffect(() => {
    qRef.current = queueId;
  }, [queueId]);

  // listen for changes in status
  useEffect(() => {
    if (!queueId || !qStatus || !role) return;
    if (!queueListener) {
      console.debug('listeng for queue abandonment: ', queueId);
      queueListener = firestore.collection('match')
        .doc(queueId)
        .onSnapshot((data) => {
          // if match leaves queue restart my queue
          if (!data.exists) { // match deleted the queue
            queueListener();
            console.debug('abandoned queue', queueId);
            setQStatus(null);
            setSelectedMatch(null);
            setQueueId(null);
            queueListener();
            return;
          }
          const queueData = data.data();
          if (role === 'host'
                        && qStatus !== 'locked'
                        && queueData
                        && queueData.lockedBy
                        && queueData.status === 'locked') {
            console.debug('someone locked our queue ', queueData);
            setSelectedMatch(queueData.lockedBy);
            setQStatus('locked');
          }
          if (role === 'participant') {
            setQStatus(queueData.status);
            if (queueData.status === 'connected') {
              setCurrentRoom(queueData.room);
              router.push('room/[id]', `room/${queueData.room}`);
            }
          }
        });
    }
  }, [queueId, qStatus, role]);

  useEffect(() => {
    const getWaitingRooms = async () => {
      // check if I've locked a queue
      const haveILocked = await firestore.collection('match')
        .where('lockedBy.id', '==', user.id)
        .get();
      if (!haveILocked.empty) { // Im already locking
        setQueueId(haveILocked.docs[0].id);
        setQStatus('locked');
        setSelectedMatch(haveILocked.docs[0].data().user);
        setRole('participant');
        return;
      }

      // check if im queued
      const amIQueued = await firestore.collection('match')
        .where('user.id', '==', user.id)
        .get();

      if (!amIQueued.empty) { // Im already queued
        setQueueId(amIQueued.docs[0].id);
        setQStatus(amIQueued.docs[0].data().status);
        setSelectedMatch(amIQueued.docs[0].data().lockedBy);
        setRole('host');
        return;
      }

      // check if there are users waiting in the queue
      const usersWaiting = await firestore
        .collection('match')
        .where('status', '==', 'waiting-match')
        .where('user.id', '!=', user.id)
        .limit(1)
        .get();
      if (usersWaiting.empty) { // No matches
        console.debug('No people found, waiting...');
        // we add the user to the queue ...
        const qId = await addMeToQueue(user);
        setQueueId(qId);
        setSelectedMatch(null);
        setQStatus('waiting-match');
        setRole('host');
      } else { // Match found!
        const match = usersWaiting.docs.map((d) => ({ id: d.id, ...d.data() }))[0];
        console.debug('People waiting for match found: ', match);
        setQueueId(match.id);
        setSelectedMatch(match.user);
        setQStatus('locked');
        setRole('participant');
        await firestore.collection('match').doc(match.id).update({
          status: 'locked',
          lockedBy: {
            id: user.id,
            avatar: user.avatar,
            fullName: user.fullName,
            industry: user.industry,
            connections: user.connections.length,
            location: user.location,
            title: user.title,
            username: user.username,
            isPro: user.isPro,
          },
        });
      }
    };
    if (!queueId && user && user.id) {
      getWaitingRooms();
    }

    return () => {
      if (queueListener) {
        queueListener();
      }
    };
  }, [user.id, queueId]);

  // Remove user from queue on unMount
  useEffect(() => {
    const handleBeforeUnload = (e) => { // If tab/window is closed, abandon queue
      e.preventDefault();
      if (qRef.current) {
        console.debug('Abandoning queue: ', qRef.current);
        firestore.collection('match').doc(qRef.current).delete();
      }
      e.returnValue = 'You are leaving the queue';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload, false);
    return () => { // On umount, abandon queue
      if (qRef.current) {
        console.debug('Abandoning queue: ', qRef.current);
        firestore.collection('match').doc(qRef.current).delete();
        window.removeEventListener('beforeunload', handleBeforeUnload, false);
      }
    };
  }, []);

  return (
    <Box>
      <strong>Joining Call</strong>
      <br />
      Current user id:
      {' '}
      {user.id}
      <br />
      Current queueId:
      {' '}
      {queueId}
      <br />
      Role:
      {' '}
      {role}
      <br />
      Current status:
      {' '}
      {qStatus}
      <br />
      Current room:
      {' '}
      <code><pre>{JSON.stringify(currentRoom, null, 4)}</pre></code>
      <br />
      Selected match:
      {' '}
      <code><pre>{JSON.stringify(selectedMatch, null, 4)}</pre></code>
    </Box>
  );
}

export default MatchMaking;
