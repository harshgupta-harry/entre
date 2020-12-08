import React, { useContext, useCallback } from 'react';

import Router from 'next/router';
import MeetingSessionContext from './MeetingSessionContext';
import EntreButton from '../EntreButton';

function DisconnectButton() {
  const { session } = useContext(MeetingSessionContext);

  const handleDisconnect = useCallback(() => {
    session.audioVideo.stop();
    Router.push('/search?section=people');
  }, [session]);

  return session ? (
    <EntreButton onClick={handleDisconnect}>Leave</EntreButton>
  ) : (
    <EntreButton disabled>Connecting ...</EntreButton>
  );
}

export default DisconnectButton;
