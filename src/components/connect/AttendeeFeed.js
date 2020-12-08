/* eslint-disable consistent-return, jsx-a11y/media-has-caption */
import React, { useContext } from 'react';
import MeetingSessionContext from './MeetingSessionContext';

function AttendeeFeed() {
  const { attendees } = useContext(MeetingSessionContext);

  return (
    <div className="w-full p-4 grid grid-cols-4 gap-3 grid-flow-row-dense">
      {attendees.map((attendee) => (
        <div key={attendee.attendeeId}>{JSON.stringify(attendee, null, 4)}</div>
      ))}
    </div>
  );
}

export default AttendeeFeed;
