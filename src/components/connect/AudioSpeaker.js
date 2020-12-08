/* eslint-disable consistent-return, jsx-a11y/media-has-caption */

import React, { useRef, useContext, useEffect } from 'react';
import MeetingSessionContext from './MeetingSessionContext';

function AudioSpeaker() {
  const { session } = useContext(MeetingSessionContext);
  const audioElementRef = useRef(null);

  useEffect(() => {
    console.debug('session', session);
    if (!session || session.error || !process.browser) return;
    const bindAudio = async () => {
      const audioElement = audioElementRef.current;
      try {
        console.debug('Attaching audio playback control.', audioElement);
        await session.audioVideo.bindAudioElement(audioElement);
      } catch (err) {
        console.debug('failed to bindAudioElement', err.message);
      }
    };
    bindAudio();
    const observer = {
      audioOutputsChanged: async (outputDevices) => {
        console.debug('Audio outputs updated: ', outputDevices);
        try {
          await session.audioVideo.chooseAudioOutputDevice('default');
          bindAudio();
        } catch (e) {
          console.debug('failed to chooseAudioOutputDevice', e);
        }
      },
    };
    session.audioVideo.addDeviceChangeObserver(observer);
    return () => {
      session.audioVideo.unbindAudioElement();
      session.audioVideo.removeDeviceChangeObserver(observer);
    };
  }, [session]);

  return <audio ref={audioElementRef} />;
}

export default AudioSpeaker;
