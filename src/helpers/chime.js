import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';
import newApi from '../../common/api/newApi';

let CHIME_LOGGER;
let CHIME_DEVICE_CONTROLLER;
if (process.browser) {
  try {
    CHIME_LOGGER = new ConsoleLogger('Chime Logs', LogLevel.OFF);
    CHIME_DEVICE_CONTROLLER = new DefaultDeviceController(CHIME_LOGGER);
  } catch (err) {
    console.log(err.message);
  }
}

export async function connectToSession(meeting, ticket) {
  const meetingConfiguration = new MeetingSessionConfiguration(meeting, ticket);
  meetingConfiguration.attendeePresenceTimeoutMs = 15000;
  const meetingSession = new DefaultMeetingSession(
    meetingConfiguration,
    CHIME_LOGGER,
    CHIME_DEVICE_CONTROLLER,
  );

  return meetingSession;
}

export async function getParticipantJoinTicket(meetingId, userId) {
  const apiRes = await newApi.post('connect/sessions/join', {
    meetingid: meetingId,
    userid: userId,
  });
  if (apiRes && apiRes.data) {
    if (apiRes.data.error) {
      // handle this...
      return { err: 'Room has expired' };
    }
    return apiRes.data;
  }
  console.error('sessions/join reponse fail');
  return { err: 'No response joining session' };
}

/* function getSupportedMediaRegions() {
  const supportedMediaRegions = [
    'us-east-1',
    'ap-northeast-1',
    'ap-southeast-1',
    'af-south-1',
    'eu-south-1',
    'ap-south-1',
    'ap-northeast-2',
    'ap-southeast-2',
    'ca-central-1',
    'eu-central-1',
    'eu-north-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'sa-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
  ];
  return supportedMediaRegions;
}

async function getNearestMediaRegion() {
  const nearestMediaRegionResponse = await fetch('https://nearest-media-region.l.chime.aws', {
    method: 'GET',
  });
  const nearestMediaRegionJSON = await nearestMediaRegionResponse.json();
  const nearestMediaRegion = nearestMediaRegionJSON.region;
  return nearestMediaRegion;
} */
