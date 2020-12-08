import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import RoomIcon from '@material-ui/icons/Room';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginTop: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: 700,
  },
  locationContainer: {
    margin: '5px',
    backgroundColor: '#D7DAF0',
    position: 'absolute',
    padding: '10px 20px',
    borderRadius: '10px',
    zIndex: 5,
  },
  locationSuggestion: {
    cursor: 'pointer',
    margin: '10px 0px',
    fontSize: 12,
  },
  locationSuggestionActive: {
    backgroundColor: 'green',
  },
  listIcon: {
    width: 22,
    height: 22,
    color: '#00C4FF',
  },
  locationInput: {
    fontSize: 12,
  },
  searchBar: {
    flexDirection: 'column',
  },
  iconButton: {
    padding: 0,
    position: 'absolute',
    right: -25,
  },
  filterItem: {
    position: 'relative',
    cursor: 'pointer',
    fontSize: 16,
    padding: '3px 5px',
  },
  filterItemSelected: {
    borderLeft: '4px solid #00C4FF',
    marginLeft: '-4px',
    outline: 'none',
  },
}));

function Filters(props) {
  const classes = useStyles();
  const { items } = props;
  const search = useSelector((state) => state.search);
  const initialLocation = search.location;
  const [location = initialLocation, setLocation] = useState();
  const [currentFilter = search, setCurrentFilter] = useState();
  const getUserPlace = (data) => {
    if (data && data.terms) {
      const [{ value: city }, { value: state }, { value: country }] = data.terms;
      const locResult = {
        city,
        state,
        country,
      };
      setLocation(locResult);
      props.onChange({
        name: 'location',
        value: locResult,
      });
    }
  };

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  let locationText = '';
  if (location && location.city && location.state && location.country) {
    locationText = `${location.city}, ${location.state}, ${location.country}`;
  }

  const clearLocation = () => {
    setLocation(null);
    props.onChange({
      name: 'location',
      value: 'All',
    });
  };

  const renderClearButton = () => {
    if (!location) return null;
    return (
      <IconButton className={classes.iconButton} onClick={clearLocation}>
        <ClearIcon fontSize="small" />
      </IconButton>
    );
  };

  const setSelection = (item, option, selected) => {
    setCurrentFilter({ ...currentFilter, [`${item.name}`]: selected ? null : option });
    props.onChange({
      name: item.name,
      value: option,
    });
  };

  const renderFilters = () => items.map((item) => (
    <ExpansionPanel key={item.title}>
      <ExpansionPanelSummary expandIcon={
        <ExpandMoreIcon style={{ color: '#FFF', height: 24 }} />
      }
      >
        <div className={classes.heading}>{item.title}</div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {item.name === 'location' ? (
          <Box className={classes.searchBar} display={['none', 'none', 'flex', 'flex', 'flex']}>
            <GooglePlacesAutocomplete
              inputClassName={classes.locationInput}
              initialValue={locationText}
              onSelect={getUserPlace}
              autocompletionRequest={{
                types: ['(cities)'],
              }}
              suggestionsClassNames={{
                container: classes.locationContainer,
                suggestion: classes.locationSuggestion,
                suggestionActive: classes.locationSuggestionActive,
              }}
              renderInput={(inputProps) => (
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: <RoomIcon className={classes.listIcon} />,
                    endAdornment: renderClearButton(),
                  }}
                  {...inputProps}
                />
              )}
            />
          </Box>
        ) : (
          <Box>
            {item.options.map((option) => {
              const selected = (currentFilter[item.name] === option);
              return (
                <div
                  role="menuitem"
                  key={option}
                  onKeyPress={() => {}}
                  tabIndex={0}
                  className={clsx(classes.filterItem, selected && classes.filterItemSelected)}
                  onClick={() => { if (!selected) { setSelection(item, option, selected); } }}
                >
                  {option}
                  { selected ? (
                    <IconButton className={classes.iconButton} onClick={() => setSelection(item, 'All', true)}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ) : null }
                </div>
              );
            })}
          </Box>
        ) }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));

  return (
    <div className={classes.root}>
      { renderFilters() }
    </div>
  );
}

Filters.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

Filters.defaultProps = {
  onChange: () => {},
};

export default Filters;
