/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Img from 'react-cool-img';
import { useSnackbar } from 'notistack';
import router from 'next/router';

import MomentUtils from '@date-io/moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AppsIcon from '@material-ui/icons/Apps';
import CloseIcon from '@material-ui/icons/Close';

import EntreButton from '../EntreButton';
import EntreCardHeader from '../EntreCardHeader';
import SlimCardContent from '../SlimCardContent';
import IndustriesTags from '../content/IndustriesTags';
import LocationModal from './LocationModal';
import IndustryModal from './IndustryModal';
import api from '../../../common/api';
import { discover } from '../../../common/data/otherConstant';

export

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 40,
    marginBottom: 100,
    width: '100%',
  },
  createPost: {
    width: '100%',
    maxWidth: 912,
    margin: 'auto',
    padding: 20,
    marginTop: 162,
  },
  createPostBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    marginLeft: 20,
  },
  createPostTextField: {
    marginTop: 10,
  },
  createPostButton: {
    color: '#00C4FF',
  },
  image: {
    maxWidth: '100%',
    width: 550,
    borderRadius: '15px',
    maxHeight: 550,
    objectFit: 'cover',
  },
  checkItem: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '10px',
  },
  closeIcon: {
    position: 'absolute',
    color: '#fff',
    top: '7px',
    right: '20px',
    fontSize: '22px',
    cursor: 'pointer',
    background: '#00C4FF',
    borderRadius: '10px',
  },
}));

const createEvent = async (id, description, industry, event, location, postImage) => {
  let imageUrl = '';
  if (postImage && !postImage.startsWith('http')) {
    const base64String = postImage.split(',')[1];
    const resp = await api.post('upload', { base64String });
    if (resp.data.errorMessage) {
      return { error: resp.data.errorMessage };
    }
    imageUrl = resp.data.data;
  } else if (postImage.startsWith('http')) {
    imageUrl = postImage;
  }

  const newEventInfo = {
    title: event.title,
    description,
    industry,
    image: imageUrl,
    startDate: event.startDateTime,
    endDate: event.endDateTime,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    address: '',
    location,
    isPaid: false,
    price: 0,
    isOnline: event.isOnline,
    registrationUrl: event.registrationUrl,
    eventUrl: event.eventUrl,
    eventType: event.eventType,
  };
  if (id) {
    return api.put(`event/${id}`, newEventInfo);
  }
  return api.post('event', newEventInfo);
};

// eslint-disable-next-line react/prop-types
export default function NewEvent({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef(null);
  const classes = useStyles();
  const author = useSelector((state) => state.account.user);
  const [posting = false, setPosting] = useState();
  const [event = {
    startDateTime: null,
    endDateTime: null,
    isOnline: false,
  }, setEvent] = useState();
  const [error = null, setError] = useState();
  const [content, setContent] = useState();
  const [location, setLocation] = useState();
  const [industry = [], setIndustry] = useState();
  const [image, setImage] = useState();
  const [showLocationModal = false, setShowLocationModal] = useState();
  const [showIndustryModal = false, setShowIndustryModal] = useState();
  const [loadingPost = id !== null, setLoadingPost] = useState();

  useEffect(() => {
    const fetchEventData = async (eventId) => {
      const resp = await api.get(`event/${eventId}`, {});
      // eslint-disable-next-line no-console
      console.log('datos', resp);
      if (resp.data.data) {
        const eventData = resp.data.data;
        eventData.endDateTime = moment(eventData.endDateTime);
        eventData.startDateTime = moment(eventData.startDateTime);
        setEvent(eventData);
        setContent(eventData.description);
        setLocation(eventData.location);
        setIndustry(eventData.industry);
        setImage(eventData.image);
        setLoadingPost(false);
      }
    };

    if (id) {
      fetchEventData(id);
    }
  }, [id]);

  useEffect(() => {
    setError(null);
  }, [event.title, event.startDateTime, content, image]);

  const onTextInputKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onTextInputKeyUp = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;

    if (e.key.length === 1) {
      const m = e.target.value;
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const c = m.split('\n').map((s) => s.charAt(0).toUpperCase() + s.substr(1)).join('\n');
      e.target.value = c;
      e.target.selectionStart = start;
      e.target.selectionEnd = end;
    }
  };

  const handleLocationChange = (loc) => {
    setLocation(loc);
    setShowLocationModal(false);
  };

  const handleIndustryChange = (ind) => {
    setIndustry(ind);
    setShowIndustryModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
      }, false);
      reader.readAsDataURL(file);
    }
  };

  const clearImgData = () => {
    setImage('');
    inputRef.current.value = null;
  };

  const submitPost = async () => {
    const err = [];
    if (!content || content === '') err.push('description');
    if (!event || !event.title || event.title === '') err.push('title');
    if (!event || !event.startDateTime) err.push('startDateTime');
    if (!event || !event.eventType) err.push('eventType');
    if (!image) err.push('image');
    if (event.endDateTime && event.endDateTime.isSameOrBefore(event.startDateTime)) err.push('endDateTime');
    if (err.length > 0) {
      enqueueSnackbar('Event name, type, start date, description and image are required.', {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      setError(err);
      return;
    }
    setError(null);
    setPosting(true);
    const resp = await createEvent(id, content, industry, event, location, image);

    // eslint-disable-next-line no-console
    console.log('resp', resp);
    setPosting(false);
    if (resp.error) {
      enqueueSnackbar('There was an error creating the event', {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } else {
      let message = 'Event created successfully';
      if (id) {
        message = 'Event updated successfully';
      }
      enqueueSnackbar(message, {
      // enqueueSnackbar('Event created successfully', {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      router.push('/search?section=events');
    }
  };

  const getError = (field) => {
    const errors = {
      title: 'Event name is required',
      description: 'Description is required',
      startDateTime: 'Start date name is required',
      endDateTime: 'End date must be greater than start date',
      image: 'Image is required',
      eventType: 'Event type is required',
    };

    if (error !== null) {
      if (error.indexOf(field) !== -1) {
        return errors[field];
      }
    }

    return false;
  };
  if (loadingPost) return null;
  return (
    <Card>
      <EntreCardHeader author={author} />
      <SlimCardContent>
        <FormControl component="fieldset" error={error !== null && error.length > 0}>
          <Grid container spacing={1}>
            <Grid item sm={12}>
              <TextField
                autoFocus
                error={getError('title') !== false}
                helperText={getError('title')}
                label="Event name"
                value={event.title}
                onChange={(e) => {
                  const m = e.target.value;
                  const title = m.split('\n').map((s) => s.charAt(0).toUpperCase() + s.substr(1)).join('\n');
                  setEvent({ ...event, title });
                }}
                fullWidth
                className={classes.createPostTextField}
              />
            </Grid>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid item sm={6}>
                <DateTimePicker
                  clearable
                  ampm
                  disablePast
                  fullWidth
                  error={getError('startDateTime') !== false}
                  helperText={getError('startDateTime')}
                  value={event.startDateTime}
                  onChange={(date) => setEvent({ ...event, startDateTime: date })}
                  label="Start date"
                />
              </Grid>
              <Grid item sm={6}>
                <DateTimePicker
                  clearable
                  ampm
                  disablePast
                  fullWidth
                  error={getError('endDateTime') !== false}
                  helperText={getError('endDateTime')}
                  minDate={event.startDateTime}
                  value={event.endDateTime}
                  onChange={(date) => setEvent({ ...event, endDateTime: date })}
                  label="End date"
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item sm={6}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel id="event-type-select">Event type</InputLabel>
                <Select
                  labelId="event-type-select"
                  error={getError('eventType') !== false}
                  // helperText={getError('eventType')}
                  value={event.eventType}
                  onChange={(e) => setEvent({ ...event, eventType: e.target.value })}
                >
                  { discover.map((d) => (
                    <MenuItem key={d.name} value={d.name}>{d.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} className={classes.checkItem}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={event.isOnline}
                    color="primary"
                    onChange={(e) => setEvent({ ...event, isOnline: e.target.checked })}
                    name="isOnline"
                  />
              )}
                label="Online event"
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Event URL"
                value={event.registrationUrl}
                onChange={(e) => setEvent({ ...event, registrationUrl: e.target.value })}
                fullWidth
                className={classes.createPostTextField}
              />
            </Grid>
            <Grid item sm={12}>
              { event && event.isOnline
                ? (
                  <TextField
                    label="Broadcast URL"
                    value={event.eventUrl}
                    onChange={(e) => setEvent({ ...event, eventUrl: e.target.value })}
                    fullWidth
                    className={classes.createPostTextField}
                  />
                )
                : (
                  <EntreButton
                    size="small"
                    variant="outlined"
                    style={{ margin: 0, marginTop: 29 }}
                    onClick={() => setShowLocationModal(true)}
                  >
                    <LocationOnIcon fontSize="small" />
                    { location && location.city && location.state
                      ? (
                        <>
                          {location.city}
                          {', '}
                          {location.state}
                        </>
                      )
                      : 'Add location' }
                  </EntreButton>
                )}
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Description"
                multiline
                error={getError('description') !== false}
                helperText={getError('description')}
                value={content}
                onChange={(e) => {
                  const m = e.target.value;
                  setContent(m);
                }}
                onKeyDown={onTextInputKeyDown}
                onKeyUp={onTextInputKeyUp}
                fullWidth
                className={classes.createPostTextField}
              />
            </Grid>
          </Grid>
          { image
            ? (
              <Box mt={2} align="center" style={{ position: 'relative' }}>
                <CloseIcon className={classes.closeIcon} onClick={clearImgData} />
                <Img
                  className={classes.image}
                  src={image}
                  alt="New event image"
                />
              </Box>
            ) : null }
          <Box mt={2}>
            <IndustriesTags industry={industry} />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" mt={1}>
            <Box>
              <label htmlFor="upload-post-image-input">
                <IconButton type="submit" component="span" className={classes.createPostButton}>
                  <CameraAltIcon />
                </IconButton>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-post-image-input"
                  onChange={handleImageChange}
                  type="file"
                  ref={inputRef}
                />
              </label>
              <IconButton
                className={classes.createPostButton}
                onClick={() => setShowIndustryModal(true)}
              >
                <AppsIcon />
              </IconButton>
            </Box>
            <EntreButton size="small" variant="contained" onClick={submitPost} disabled={posting}>
              { posting && <CircularProgress style={{ color: '#FFF' }} size={20} /> }
              { !posting && (id ? 'Update Event' : 'Post Event')}
            </EntreButton>
          </Box>
        </FormControl>
      </SlimCardContent>
      <LocationModal
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={handleLocationChange}
      />
      <IndustryModal
        open={showIndustryModal}
        onClose={() => setShowIndustryModal(false)}
        onSelect={handleIndustryChange}
      />
    </Card>
  );
}

NewEvent.propTypes = {
  id: PropTypes.string,
};

NewEvent.defaultProps = {
  id: null,
};
