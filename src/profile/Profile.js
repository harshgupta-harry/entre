/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-extraneous-dependencies
// import 'regenerator-runtime/runtime';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Linkify from 'linkifyjs/react';

import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import LinkIcon from '@material-ui/icons/Link';
import RoomIcon from '@material-ui/icons/Room';

import {
  Container,
  TextField,
  InputAdornment,
  Card,
  Avatar,
  Grid,
  Box,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import EntreButton from '../components/EntreButton';
import api from '../../common/api/newApi';
import useStyles from './Styles';
import {
  updateAccount,
  loadTitles,
  loadIndustries,
  checkForUsername, createChat,
  updateUserConnection,
} from '../../common/data/actions';
import AboutSection from './AboutSection';
import ContentSection from './ContentSection';
import EntreTabs from '../components/EntreTabs';
import SignInCard from '../components/SignInCard';
import SlimCardContent from '../components/SlimCardContent';

const Profile = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { loadUsername, setThreadId, setSingleChatView } = props;
  const updating = useSelector((state) => state.account.updating);
  const industries = useSelector((state) => state.account.industries);
  const titles = useSelector((state) => state.account.titles);
  const account = useSelector((state) => state.account.user);
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(false);

  const user = useSelector((state) => state.account.user) || {};

  const {
    id,
    fullName,
    username,
    location,
    avatar,
    title,
    bio,
    industry,
    lookingFor,
    url,
    connections,
    isPro,
    connectionStatus,
  } = user;

  const [editMode = false, setEditMode] = useState();
  const [validUsername = true, setValidUsername] = useState();
  const [$avatar = avatar, setAvatar] = useState();
  const [$username = username, setUserName] = useState();
  const [$fullName = fullName, setFullName] = useState();
  const [$location = location, setLocation] = useState();
  const [$url = url, setUrl] = useState();
  const [$bio = bio, setBio] = useState();
  const [$title = title, setTitle] = useState();
  const [$industry = industry, setIndustry] = useState();
  const [$lookingFor = lookingFor, setLookingFor] = useState();
  const initialConnections = typeof connections === 'object' ? connections.length : connections;
  const [$connections = initialConnections, setConnections] = useState();
  const [$connectionStatus = connectionStatus, setConnectionStatus] = useState();
  const [$isPro = isPro, setIsPro] = useState();
  const isMyProfile = loadUsername === username;
  const [loading = !isMyProfile, setLoading] = useState();
  // const isConnection = connectionStatus === 'Connected';

  async function fetchUserProfile() {
    let apiURL = `user/username/${loadUsername}`;
    if (!token) {
      apiURL = `public/${apiURL}`;
    }
    const resp = await api.get(apiURL, {});
    if (resp.data) {
      const rawProfile = resp.data;
      setProfile(rawProfile);
      setAvatar(rawProfile.avatar);
      setUserName(rawProfile.username);
      setFullName(rawProfile.fullName);
      setLocation(rawProfile.location);
      setUrl(rawProfile.url);
      setBio(rawProfile.bio);
      setTitle(rawProfile.title);
      setIndustry(rawProfile.industry);
      setLookingFor(rawProfile.lookingFor);
      setConnections(rawProfile.connections);
      setIsPro(rawProfile.isPro);
      setLoading(false);
      setConnectionStatus(rawProfile.connectionStatus);
    }
  }

  useEffect(() => {
    if (token && titles.length === 0) {
      dispatch(loadTitles());
    }
    if (token && industries.length === 0) {
      dispatch(loadIndustries());
    }
    if (!isMyProfile && loadUsername !== null) {
      fetchUserProfile(loadUsername);
    }
  }, [loadUsername]);

  useEffect(() => {
    setValidUsername(null);
  }, [$username]);

  let locationText = '';
  if ($location && $location.city && $location.state && $location.country) {
    locationText = `${$location.city}, ${$location.state}, ${$location.country}`;
  }

  const checkUsername = async () => {
    if ($username !== username) {
      if (!$username) {
        setValidUsername(false);
        return false;
      }
      const isTaken = await dispatch(checkForUsername($username));
      setValidUsername(!isTaken);
      return !isTaken;
    }
    setValidUsername(true);
    return true;
  };

  const submitChanges = async () => {
    if ($fullName === '') {
      enqueueSnackbar('Your name cannot be empty', {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      return;
    }
    if (!await checkUsername()) {
      enqueueSnackbar('Username is already taken or invalid, please choose another one', {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      return;
    }
    if ($title.length === 0 || $industry.length === 0 || $lookingFor.length === 0) {
      enqueueSnackbar('You need to select at least one option', {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      return;
    }
    const changed = {};
    if ($fullName !== fullName) {
      changed.fullName = $fullName;
    }
    if ($avatar !== avatar) {
      changed.avatar = $avatar;
    }
    if ($username !== username) {
      changed.username = $username;
    }
    if ($url !== url) {
      changed.url = $url;
    }
    if ($bio !== bio) {
      changed.bio = $bio;
    }
    if (JSON.stringify($location) !== JSON.stringify(location)) {
      changed.location = $location;
    }
    if (JSON.stringify($title) !== JSON.stringify(title)) {
      changed.title = $title;
    }
    if (JSON.stringify($industry) !== JSON.stringify(industry)) {
      changed.industry = $industry;
    }
    if (JSON.stringify($lookingFor) !== JSON.stringify(lookingFor)) {
      changed.lookingFor = $lookingFor;
    }
    if (Object.keys(changed).length !== 0) {
      await dispatch(updateAccount(changed));
    }
    setEditMode(!editMode);
  };

  const changeProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setAvatar(reader.result);
      }, false);
      reader.readAsDataURL(file);
    }
  };

  const getUserPlace = (data) => {
    if (data && data.terms) {
      const [{ value: city }, { value: state }, { value: country }] = data.terms;
      const locResult = { city, state, country };
      setLocation(locResult);
    }
  };

  const cancelOrEdit = () => {
    if (editMode) {
      setAvatar(avatar);
      setFullName(fullName);
      setUserName(username);
      setTitle(title);
      setLocation(location);
      setUrl(url);
      setBio(bio);
      setIndustry(industry);
      setLookingFor(lookingFor);
    }
    setEditMode(!editMode);
  };

  const onTitlesChange = (e, items) => {
    const limit = 3;
    if (items.length <= limit) {
      setTitle(items);
    } else {
      const message = `There is a limit of ${limit} options`;
      enqueueSnackbar(message, {
        variant: 'warning',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const isUsernameValid = () => {
    if (validUsername === true) {
      return <InputAdornment position="end"><CheckCircleOutlineIcon className={classes.check} /></InputAdornment>;
    }
    if (validUsername === false) {
      return <InputAdornment position="end"><CancelOutlinedIcon className={classes.taken} /></InputAdornment>;
    }
    return null;
  };

  const renderUrlComopnent = () => {
    if (editMode) {
      return (
        <TextField
          fullWidth
          name="url"
          value={$url}
          onChange={(e) => setUrl(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LinkIcon className={classes.listIcon} /></InputAdornment>,
          }}
        />
      );
    }
    if ($url !== '') {
      return (
        <div className={classes.listItem}>
          <LinkIcon className={classes.listIcon} />
          &nbsp;
          <Linkify options={{ className: classes.link }}>
            {$url}
          </Linkify>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  async function handleCreateChat() {
    if (profile && profile.id) {
      await setThreadId(null);
      await setSingleChatView(false);
      const selectedUsers = [profile];
      selectedUsers.push(account);
      const chatId = await dispatch(createChat(selectedUsers));
      await setThreadId(chatId);
      await setSingleChatView(true);
    }
  }

  const updateConnection = async () => {
    const action = dispatch(updateUserConnection(profile.id, $connectionStatus));
    const res = await action.payload;
    setConnectionStatus(res.sucessStatus);
    enqueueSnackbar(res.message, {
      variant: 'success',
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    });
  };

  const sections = [
    {
      title: 'About',
      component: <AboutSection
        loading={loading}
        editMode={editMode}
        bio={$bio}
        industry={$industry}
        lookingFor={$lookingFor}
        setBio={setBio}
        setIndustry={setIndustry}
        setLookingFor={setLookingFor}
      />,
    },
    { title: 'Content', component: <ContentSection userId={isMyProfile ? id : profile.id} />, hide: !token },
  ].filter((s) => !s.hide);

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <Head>
        <title>
          Entre: Profile
          {' - '}
          {$fullName}
        </title>
      </Head>
      <Grid container spacing={2} justify="center">
        <Grid item sm={3} />
        <Grid item sm={6}>
          <Card style={{ marginBottom: 0 }}>
            <SlimCardContent className={classes.generals}>
              <Grid container>
                <Grid container item sm={12}>
                  <Grid item xs={3}>
                    <div className={classes.profileImageContainer}>
                      <Avatar
                        alt={$fullName}
                        src={$avatar}
                        className={classes.profileImage}
                      />
                      { $isPro ? <div className={classes.proBadgeSmall}>PRO</div> : null }
                    </div>
                    <Box className={classes.centerContent} mt={1}>
                      { editMode
                        ? (
                          <label htmlFor="upload-profile-input">
                            <EntreButton
                              fullWidth
                              type="submit"
                              variant="text"
                              color="primary"
                              component="span"
                              className={classes.submit}
                            >
                              <span style={{ color: '#00C4FF' }}>Upload</span>
                            </EntreButton>
                            <input
                              accept="image/*"
                              style={{ display: 'none' }}
                              id="upload-profile-input"
                              onChange={changeProfileImage}
                              type="file"
                            />
                          </label>
                        ) : null }
                    </Box>
                  </Grid>
                  <Grid item xs={9}>
                    <Box ml={2}>
                      <Grid container>
                        <Grid item xs={12}>
                          <div className={classes.name}>
                            {editMode ? (
                              <TextField
                                fullWidth
                                name="fullName"
                                value={$fullName}
                                onChange={(e) => setFullName(e.target.value)}
                              />
                            ) : (
                              <>
                                {$fullName}
                              </>
                            )}
                          </div>
                          <div className={classes.userName}>
                            {editMode ? (
                              <TextField
                                fullWidth
                                name="username"
                                value={$username}
                                onChange={(e) => setUserName(e.target.value)}
                                onBlur={checkUsername}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                                  endAdornment: isUsernameValid(),
                                }}
                              />
                            ) : `@${$username}`}
                          </div>
                        </Grid>
                      </Grid>
                      <div className={classes.listItem}>
                        { editMode
                          ? (
                            <Autocomplete
                              multiple
                              fullWidth
                              options={titles}
                              onChange={onTitlesChange}
                              value={$title}
                              renderInput={(inputProps) => (
                                <TextField
                                  {...inputProps}
                                />
                              )}
                            />
                          ) : (
                            <>
                              <WorkOutlineIcon className={classes.listIcon} />
                              <div className={classes.listItemText}>{$title ? $title.join(' | ') : ''}</div>
                            </>
                          ) }
                      </div>
                      <div className={classes.listItem}>
                        { editMode ? (
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
                                }}
                                {...inputProps}
                              />
                            )}
                          />
                        ) : (
                          locationText ? (
                            <>
                              <RoomIcon className={classes.listIcon} />
                              <div className={classes.listItemText}>
                                {locationText}
                              </div>
                            </>
                          ) : null
                        ) }
                      </div>
                      { renderUrlComopnent() }
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item sm={12}>
                  <Grid item xs={3}>
                    <div className={classes.centerContent}>
                      <div className={classes.connections}>{$connections}</div>
                      <div className={classes.connectionsLabel}>Connections</div>
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div className={classes.listItem} style={{ marginTop: 5, justifyContent: 'flex-end' }}>
                      { !isMyProfile && token ? (
                        <EntreButton
                          type="submit"
                          size="large"
                          variant="contained"
                          color="primary"
                          onClick={updateConnection}
                          className={classes.submit}
                          style={{ marginRight: 20 }}
                        >
                          {$connectionStatus}
                        </EntreButton>
                      ) : null}
                      { !isMyProfile && ($connectionStatus === 'Connected')
                        ? (
                          <EntreButton
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleCreateChat}
                            tabIndex="-1"
                          >
                            Message
                          </EntreButton>
                        ) : null }
                      <div className={classes.saveEditBar}>
                        { isMyProfile
                          ? (
                            <EntreButton
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled={updating}
                              onClick={cancelOrEdit}
                              tabIndex="-1"
                            >
                              {editMode ? 'Cancel' : 'Edit'}
                            </EntreButton>
                          ) : null }
                        { editMode
                          ? (
                            <EntreButton
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled={updating}
                              onClick={submitChanges}
                              tabIndex="-1"
                            >
                              { updating ? 'Updating...' : 'Save' }
                            </EntreButton>
                          ) : null }
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </SlimCardContent>
          </Card>
          <EntreTabs fullWidth hideTabs={!token} tabs={sections} style={{ width: '60%', margin: '0 auto' }} />
        </Grid>
        <Grid item sm={3}>
          { token ? null : <SignInCard /> }
        </Grid>
      </Grid>
    </Container>
  );
};

Profile.propTypes = {
  loadUsername: PropTypes.string,
  setThreadId: PropTypes.func.isRequired,
  setSingleChatView: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  loadUsername: null,
};

export default React.memo(Profile);
