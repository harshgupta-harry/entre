/* eslint-disable consistent-return, jsx-a11y/media-has-caption */
import { useContext, useEffect } from 'react';
import MeetingSessionContext from './MeetingSessionContext';

function AudioInputDevice() {
  const { session } = useContext(MeetingSessionContext);

  useEffect(() => {
    if (!session || session.error) return;

    // :: TODO implement audio device selection
    session.audioVideo
      .listAudioInputDevices()
      .then((devices) => {
        if (devices.length === 0) {
          console.warn('No audio input devices detected.');
          return;
        }

        console.log('Registering audio input device:', devices[0]);
        const { deviceId } = devices[0];
        return session.audioVideo.chooseAudioInputDevice(deviceId);
      })
      .catch((err) => {
        console.error(
          'Error occurred attempting to list audio/video devices.',
          err,
        );
      });
    const observer = {
      audioInputsChanged: async (inputDevices) => {
        console.debug('Audio inputs updated: ', inputDevices);
        try {
          await session.audioVideo.chooseAudioInputDevice('default');
        } catch (e) {
          console.debug('failed to chooseAudioInputDevice', e);
        }
      },
    };
    session.audioVideo.addDeviceChangeObserver(observer);
    return () => {
      session.audioVideo.removeDeviceChangeObserver(observer);
    };
  }, [session]);

  return null;
}

export default AudioInputDevice;
