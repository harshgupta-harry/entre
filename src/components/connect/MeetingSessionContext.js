/* eslint-disable consistent-return, jsx-a11y/media-has-caption */
import React, {
  createContext, useState, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { DefaultActiveSpeakerPolicy, DefaultModality, MeetingSessionStatusCode } from 'amazon-chime-sdk-js';
import Router from 'next/router';
import { getParticipantJoinTicket, connectToSession } from '../../helpers/chime';

const MeetingSessionContext = createContext(null);

export const MeetingSessionContextProvider = ({ meeting, children }) => {
  const user = useSelector((s) => s.account.user);
  const [session, setSession] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!meeting) return;
    if (!user.id) return;
    let attendeePresenceHandler;
    let activeSpeakerCallback;
    let sess;
    getParticipantJoinTicket(meeting.MeetingId, user.id).then(async (ticket) => {
      if (ticket.err) {
        enqueueSnackbar(ticket.err, {
          variant: 'error',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
        Router.push('/connect');
        return;
      }
      try {
        // Connecto to chime meeting
        sess = await connectToSession(meeting, ticket);
        setSession(sess);
        sess.audioVideo.addObserver({
          audioVideoDidStop: (status) => {
            let message = `Session stopped with status: ${status.statusCode()}. Reloading...`;
            if (status.statusCode() === MeetingSessionStatusCode.AudioCallEnded) {
              message = 'Meeting has ended!';
              enqueueSnackbar(message, {
                variant: 'info',
                preventDuplicate: true,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
              });
            } else if (status.statusCode() === MeetingSessionStatusCode.Left) {
              message = 'Leaving meeting...';
              enqueueSnackbar(message, {
                variant: 'info',
                preventDuplicate: true,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
              });
            } else {
              enqueueSnackbar(message, {
                variant: 'warning',
                preventDuplicate: true,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
              });
              Router.reload();
            }
            console.debug(message);
            setSession(null);
          },
        });
        // Start session
        sess.audioVideo.start();

        // Meeting Presence Listener
        attendeePresenceHandler = (attendeeId, present, externalUserId, dropped) => {
          console.debug(`${attendeeId} present = ${present} dropped = ${dropped} (${externalUserId})`);
          const isContentAttendee = new DefaultModality(attendeeId)
            .hasModality(DefaultModality.MODALITY_CONTENT); // Is Content ( ScreenShare )
          const isSelfAttendee = new DefaultModality(attendeeId).base()
            === sess.configuration.credentials.attendeeId; // Is Me ...
          const attendee = {
            attendeeId,
            present,
            externalUserId,
            isContentAttendee,
            isSelfAttendee,
          };
          if (!present) {
            setAttendees((att) => att.filter((a) => a.attendeeId !== attendeeId));
          } else {
            setAttendees((att) => {
              if (att.find((a) => a.attendeeId === attendeeId)) { // avoid duplicates
                return att;
              }
              sess.audioVideo.realtimeSubscribeToVolumeIndicator(
                attendeeId,
                (attId, volume, muted, signalStrength) => {
                  setAttendees((at) => {
                    console.debug('attendee changed');
                    const a = at.find((o) => o.attendeeId === attId);
                    if (a) {
                      if (volume !== null) a.volume = volume;
                      if (muted !== null) a.muted = muted;
                      if (signalStrength !== null) a.signalStrength = signalStrength;
                      const arr = at.filter((o) => o.attendeeId !== attId);
                      return [...arr, a];
                    }
                    return at;
                  });
                },
              );
              return [...att, attendee];
            });
          }
        };
        console.debug('Subscribe to realtimeSubscribeToAttendeeIdPresence');
        sess.audioVideo.realtimeSubscribeToAttendeeIdPresence(attendeePresenceHandler);

        activeSpeakerCallback = (attendeeIds) => {
          if (attendeeIds.length) {
            const attId = attendeeIds[0];
            setAttendees((at) => at
              .map((o) => {
                const mostActive = o.attendeeId === attId;
                return { ...o, mostActive };
              }));
            console.log(`${attendeeIds[0]} is the most active speaker`);
          }
        };
        sess.audioVideo.subscribeToActiveSpeakerDetector(
          new DefaultActiveSpeakerPolicy(),
          activeSpeakerCallback,
        );
      } catch (err) {
        setSession({ error: 'Error connecting to meeting.', msg: err.message });
      }
    });
    return () => {
      if (sess) {
        sess.audioVideo.realtimeUnsubscribeFromVolumeIndicator();
        sess.audioVideo.realtimeUnsubscribeToAttendeeIdPresence(attendeePresenceHandler);
        sess.audioVideo.unsubscribeFromActiveSpeakerDetector(activeSpeakerCallback);
        sess.audioVideo.stop();
      }
    };
  }, [meeting, user.id]);

  return (
    <MeetingSessionContext.Provider value={{ session, attendees }}>
      {children}
    </MeetingSessionContext.Provider>
  );
};

MeetingSessionContextProvider.propTypes = {
  meeting: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default MeetingSessionContext;
