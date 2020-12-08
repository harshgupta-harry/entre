import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { updateLocation, getClientLocation } from '../../common/data/actions';

import useStyles from './Styles';
// import PropTypes from 'prop-types';

const Location = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loc = useSelector((store) => store.onboarding.location);
  let initialValue = '';

  useEffect(() => {
    dispatch(getClientLocation());
  }, []);

  if (loc && loc.city && loc.state && loc.country) {
    initialValue = `${loc.city}, ${loc.state}, ${loc.country}`;
  }

  const getUserPlace = (data) => {
    if (data && data.terms) {
      const [{ value: city }, { value: state }, { value: country }] = data.terms;
      const locResult = { city, state, country };
      dispatch(updateLocation(locResult));
    }
  };

  return (
    <div>
      <div className={classes.h1}>
        Where are you based?
      </div>
      <div className={classes.instructions}>
        Select your location
      </div>
      <div className={classes.searchContainer}>
        <GooglePlacesAutocomplete
          inputClassName={classes.locationInput}
          initialValue={initialValue}
          onSelect={getUserPlace}
          autocompletionRequest={{
            types: ['(cities)'],
          }}
          suggestionsClassNames={{
            container: classes.locationContainer,
            suggestion: classes.locationSuggestion,
            suggestionActive: classes.locationSuggestionActive,
          }}
        />
      </div>
    </div>
  );
};

Location.propTypes = {

};

export default Location;
