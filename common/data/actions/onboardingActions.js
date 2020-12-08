import { getStore } from '../../../store';
import { ONBOARDING } from './types';
import api from '../../api';
import { loadAccount } from './accountActions';

export const submitOnboarding = () => async (dispatch) => {
  dispatch({
    type: ONBOARDING.SUBMIT,
  });
  const { onboarding, auth } = getStore().getState();
  const updateInfo = {
    industry: onboarding.industries,
    location: onboarding.location,
    lookingFor: onboarding.interests,
    title: onboarding.titles,
    onboardingComplete: true,
  };

  if (onboarding.profile && !onboarding.profile.startsWith('http') && onboarding.profile !== '') { // only if image was changed...
    const base64String = onboarding.profile.split(',')[1];
    const fileUploadResponse = await api.post('upload', { base64String });
    if (fileUploadResponse.data.errorMessage) {
      // console.log(fileUploadResponse.data.errorMessage);
      return;
    }
    updateInfo.avatar = fileUploadResponse.data.data;
  }

  const response = await api.put('user', updateInfo);
  if (response.data.error) {
    // console.log(response.data.error);
  } else {
    dispatch(loadAccount(auth.userAuth.uid));
    dispatch({
      type: ONBOARDING.COMPLETED,
    });
  }
};

export const updateLocation = (location) => async (dispatch) => {
  dispatch({
    type: ONBOARDING.UPDATE_LOCATION,
    location,
  });
};

export const getClientLocation = () => async (dispatch) => {
  const { onboarding } = getStore().getState();
  const selectedLocation = onboarding.location;
  if (
    onboarding.fetchingLocation === false && !(
      selectedLocation
      && selectedLocation.city
      && selectedLocation.state
      && selectedLocation.country
    )) {
    dispatch({ type: ONBOARDING.FETCHING_LOCATION });
    try {
      const geoResponse = await api.axiosOther.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_MAPS_KEY}`);
      if (geoResponse.status === 200) {
        const { location } = geoResponse.data;
        const geoCodeResponse = await api.axiosOther.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&result_type=locality|administrative_area_level_3&key=${process.env.GOOGLE_MAPS_KEY}`);
        const { data: { results } } = geoCodeResponse;
        if (results.length > 0) {
          const [{ address_components: addressComponents }] = results;
          const locResult = {};
          for (let i = 0; i < addressComponents.length; i += 1) {
            const component = addressComponents[i];
            const types = new Set(component.types);
            if (types.has('country')) {
              locResult.country = component.short_name;
            }
            if (types.has('administrative_area_level_1')) {
              locResult.state = component.short_name;
            }
            if (
              types.has('locality')
              || types.has('sublocality_level_1')
              || types.has('administrative_area_level_3')) {
              locResult.city = component.short_name;
            }
          }
          if (locResult.country && locResult.state && locResult.city) {
            dispatch(updateLocation(locResult));
          }
        }
      }
    } finally {
      dispatch({ type: ONBOARDING.FETCHING_LOCATION_COMPLETE });
    }
  }
};

export const updateProfileImage = (profile) => async (dispatch) => {
  dispatch({
    type: ONBOARDING.UPDATE_PROFILE,
    profile,
  });
};

export const updateStep = (step) => async (dispatch) => {
  dispatch({
    type: ONBOARDING.UPDATE_STEP,
    step,
  });
};

export const updateTitles = (titles) => async (dispatch) => {
  dispatch({
    type: ONBOARDING.UPDATE_TITLES,
    titles,
  });
};

export const updateIndustries = (industries) => async (dispatch) => {
  dispatch({
    type: ONBOARDING.UPDATE_INDUSTRIES,
    industries,
  });
};

export const updateInterests = (interests) => async (dispatch) => {
  dispatch({
    type: ONBOARDING.UPDATE_INTERESTS,
    interests,
  });
};
