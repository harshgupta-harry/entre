/* eslint-disable consistent-return */
import React, {
  useContext, useCallback, useEffect, useState,
} from 'react';

import MeetingSessionContext from './MeetingSessionContext';
import EntreButton from '../EntreButton';

function MuteButton() {
  const { session } = useContext(MeetingSessionContext);
  const [isMuted, setIsMuted] = useState(null);
  useEffect(() => {
    if (!session || session.error) return;
    const presentAttendeeId = session.configuration.credentials.attendeeId;
    session.audioVideo.realtimeSubscribeToVolumeIndicator(
      presentAttendeeId,
      (attendeeId, volume, muted, signalStrength) => { // eslint-disable-line no-unused-vars
        if (muted === null) {
          // muted state has not changed, ignore volume and signalStrength changes
          return;
        }
        setIsMuted(muted);
      },
    );
    return () => {
      session.audioVideo.realtimeUnsubscribeFromVolumeIndicator(presentAttendeeId);
    };
  }, [session]);

  const toggleMute = useCallback(() => {
    const muted = session.audioVideo.realtimeIsLocalAudioMuted();
    if (!muted) {
      // Mute
      session.audioVideo.realtimeMuteLocalAudio();
    } else {
      // Unmute
      session.audioVideo.realtimeUnmuteLocalAudio();
    }
  }, [session]);

  return session ? (
    <EntreButton onClick={toggleMute}>
      {isMuted ? 'Unmute' : 'Mute' }
    </EntreButton>
  ) : (
    <EntreButton disabled>Connecting ...</EntreButton>
  );
}

export default MuteButton;
