import { combineReducers } from 'redux';

import auth from './authReducers';
import account from './accountReducers';
import onboarding from './onboardingReducers';
import main from './mainReducers';
import home from './homeReducers';
import people from './peopleReducers';
import deals from './dealsReducers';
import search from './searchReducers';
import events from './eventReducers';
import jobs from './jobReducers';
import activity from './activityReducers';
import companies from './companyReducers';
import chat from './chatReducers';
import tickets from './ticketReducers';

export default combineReducers({
  auth,
  account,
  onboarding,
  main,
  home,
  deals,
  tickets,
  search,
  events,
  jobs,
  people,
  activity,
  companies,
  chat,
});
