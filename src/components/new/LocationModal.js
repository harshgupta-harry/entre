import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Card,
  CardHeader,
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import SlimCardContent from '../SlimCardContent';
import EntreButton from '../EntreButton';

const useStyles = makeStyles(() => ({
  modal: {
    backgroundColor: '#00000099',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    outline: 'none',
  },
  locationInput: {
    fontSize: '16px',
    marginBottom: 20,
  },
  locationContainer: {
  },
  locationSuggestion: {
    cursor: 'pointer',
    margin: '0px 10px 20px 10px',
    fontSize: '16px',
  },
  locationSuggestionActive: {
    backgroundColor: 'green',
  },
}));

const LocationModal = (props) => {
  const classes = useStyles();
  const [place, setPlace] = useState();
  const { open, onClose, onSelect } = props;

  const getUserPlace = (data) => {
    if (data && data.terms) {
      const [{ value: city }, { value: state }, { value: country }] = data.terms;
      const locResult = { city, state, country };
      setPlace(locResult);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card className={classes.container}>
          <CardHeader
            action={(
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            )}
            title={<Typography variant="h3">Search Location</Typography>}
            subheader={<Typography variant="subtitle2">Enter your city or state to show relevant results</Typography>}
          />
          <SlimCardContent>
            <GooglePlacesAutocomplete
              renderInput={(inputProps) => (
                <OutlinedInput
                  className={classes.locationInput}
                  fullWidth
                  {...inputProps}
                  startAdornment={(
                    <InputAdornment position="start">
                      <SearchIcon className={classes.listIcon} style={{ color: '#00C4FF' }} />
                    </InputAdornment>
                  )}
                />
              )}
              inputClassName={classes.locationInput}
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
            <Box align="right">
              <EntreButton
                size="small"
                variant="contained"
                onClick={() => onSelect(place)}
              >
                Done
              </EntreButton>
            </Box>
          </SlimCardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

LocationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

LocationModal.defaultProps = {
  onClose: () => {},
  onSelect: () => {},
};

export default LocationModal;
