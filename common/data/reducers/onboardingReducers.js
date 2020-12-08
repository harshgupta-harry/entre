import { ONBOARDING, ACCOUNT, AUTH } from '../actions/types';

const INITIAL_STATE = {
  step: 0,
  titles: null,
  industries: null,
  interests: null,
  profile: null,
  location: null,
  completed: false,
  loading: false,
  fetchingLocation: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ONBOARDING.UPDATE_STEP:
      return {
        ...state,
        step: action.step,
      };
    case ONBOARDING.UPDATE_TITLES:
      return {
        ...state,
        titles: action.titles,
      };
    case ONBOARDING.UPDATE_INTERESTS:
      return {
        ...state,
        interests: action.interests,
      };
    case ONBOARDING.UPDATE_INDUSTRIES:
      return {
        ...state,
        industries: action.industries,
      };
    case ONBOARDING.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case ONBOARDING.UPDATE_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    case ONBOARDING.SUBMIT:
      return {
        ...state,
        loading: true,
      };
    case ONBOARDING.COMPLETED:
      return {
        ...state,
        completed: true,
        loading: false,
      };
    case ACCOUNT.LOAD_ACCOUNT_SUCCESS:
      return {
        ...state,
        titles: state.titles || action.payload.title,
        industries: state.industries || action.payload.industry,
        interests: state.interests || action.payload.lookingFor,
        location: state.location || action.payload.location,
        profile: state.profile || action.payload.avatar,
        completed: action.payload.onboardingComplete,
      };
    case AUTH.LOGOUT:
      return INITIAL_STATE;
    case ONBOARDING.FETCHING_LOCATION:
      return { ...state, fetchingLocation: true };
    case ONBOARDING.FETCHING_LOCATION_COMPLETE:
      return { ...state, fetchingLocation: false };
    default:
      return state;
  }
};
