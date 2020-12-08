// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Linkify from 'linkifyjs/react';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import LinkIcon from '@material-ui/icons/Link';
import RoomIcon from '@material-ui/icons/Room';
import EmailIcon from '@material-ui/icons/Email';
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import {
  TextareaAutosize,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
} from '@material-ui/core';

import Box from '@material-ui/core/Box';
import MultiSelector from '../../MultiSelector';
import EntreButton from '../../EntreButton';
import interests from '../../../../common/data/interests';
import api from '../../../../common/api';
import useStyles from '../../../profile/Styles';
import {
  updateAccount,
  loadIndustries,
  checkForUsername,
  loadCompanyPost,
} from '../../../../common/data/actions';

import EntreSearchTabs from '../../EntreSearchTabs';
import EntreSearchTab from '../../EntreSearchTab';

import AccountPostTab from './AccountPostTab';
import AccountJobsTab from './AccountJobsTab';
import AccountEventsTab from './AccountEventsTab';


function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `search-tab-${index}`,
    'aria-controls': `search-tabpanel-${index}`,
  };
}

const Profile = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { loadUsername, companyId } = props;

  const updating = useSelector((state) => state.account.updating);
  const industries = useSelector((state) => state.account.industries);
  const currentUserId = useSelector((state) => state.account.user.id);

  const post = useSelector((state) => state.companies.post);

  const [loading = !post.id, setLoading] = useState();

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    // id,
    name,
    userName,
    location,
    avatar,
    bio,
    industry,
    lookingFor = [],
    website,
    connections = [],
    userId,
    isPro = false,
  } = useSelector((state) => state.companies.post);

  const [editMode, setEditMode] = useState();
  const [validUsername = true, setValidUsername] = useState();
  const [$avatar = avatar, setAvatar] = useState();
  const [$username = userName, setUserName] = useState();
  const [$fullName = name, setFullName] = useState();
  const [$location = location, setLocation] = useState();
  const [$url = website, setUrl] = useState();
  const [$bio = bio, setBio] = useState();
  const [$industry = industry, setIndustry] = useState();
  const [$lookingFor = lookingFor, setLookingFor] = useState();
  const [$connections = connections, setConnections] = useState();
  const [$isPro = isPro, setIsPro] = useState();
  // const [$userId = userId, setUserId] = useState();
  const isMyProfile = userId === currentUserId;
  const [value, setValue] = React.useState(0);

  async function fetchUserProfile() {
    const resp = await api.get(`company/${companyId}`, {});
    if (resp.data.data && resp.data.data.length) {
      const profile = resp.data.data[0];
      setAvatar(profile.avatar);
      setUserName(profile.userName);
      setFullName(profile.name);
      setLocation(profile.location);
      setUrl(profile.website);
      setBio(profile.bio);
      setIndustry(profile.industry);
      setLookingFor(profile.lookingFor);
      setConnections(profile.connections !== undefined ? profile.connections : []);
      setIsPro(profile.isPro);
      // setUserId(profile.userId);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (industries.length === 0) {
      dispatch(loadIndustries());
    }
    if (!isMyProfile && companyId !== null) {
      fetchUserProfile(companyId);
    }
  }, [companyId]);

  useEffect(() => {
    setValidUsername(null);
  }, [$username]);

  useEffect(() => {
    if (companyId) {
      dispatch(loadCompanyPost(companyId));
    }
  }, [companyId]);

  let locationText = '';
  if ($location && $location.city && $location.state && $location.country) {
    locationText = `${$location.city}, ${$location.state}, ${$location.country}`;
  } else if ($location && $location.city && $location.state) {
    locationText = `${$location.city}, ${$location.state}`;
  }

  const checkUsername = async () => {
    if ($username !== userName) {
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
    // if ($title.length === 0 || $industry.length === 0 || $lookingFor.length === 0) {
    //   enqueueSnackbar('You need to select at least one option', {
    //     variant: 'error',
    //     preventDuplicate: true,
    //     anchorOrigin: {
    //       vertical: 'bottom',
    //       horizontal: 'center',
    //     },
    //   });
    //   return;
    // }
    const changed = {};
    if ($fullName !== name) {
      changed.name = $fullName;
    }
    if ($avatar !== avatar) {
      changed.avatar = $avatar;
    }
    if ($username !== userName) {
      changed.userName = $username;
    }
    if ($url !== website) {
      changed.website = $url;
    }
    if ($bio !== bio) {
      changed.bio = $bio;
    }
    if (JSON.stringify($location) !== JSON.stringify(location)) {
      changed.location = $location;
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
      setFullName(name);
      setUserName(userName);
      setLocation(location);
      setUrl(website);
      setBio(bio);
      setIndustry(industry);
      setLookingFor(lookingFor);
    }
    setEditMode(!editMode);
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
          name="website"
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardContent className={`${classes.generals}`}>
          <div style={{ gridArea: 'image' }}>
            <div className={classes.profileImageContainer}>
              <Avatar
                alt={$fullName}
                src={$avatar}
                className={classes.profileImage}
              />
              { $isPro ? <div className={classes.proBadgeSmall}>PRO</div> : null }
            </div>
            { editMode
              ? (
                <label htmlFor="upload-profile-input">
                  <EntreButton
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
            <div className={classes.centerContent}>
              <div className={classes.connections}>{$connections.length}</div>
              <div className={classes.connectionsLabel}>Connections</div>
            </div>
          </div>
          <div style={{ gridArea: 'info' }}>
            <div className={classes.topGrid}>
              <div className={classes.name}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="name"
                    value={$fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                ) : (
                  <>
                    {$fullName}
                    { $isPro ? <img src="/icons/pro.svg" alt="Pro" className={classes.proIcon} /> : null }
                  </>
                )}
              </div>
              <div className={classes.userName}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="userName"
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
              <div className={classes.saveEditBar}>
                { editMode
                  ? (
                    <EntreButton
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={updating}
                      onClick={submitChanges}
                      tabIndex="-1"
                    >
                      { updating ? 'Updating...' : 'Save' }
                    </EntreButton>
                  ) : null }
                { isMyProfile
                  ? (
                    <EntreButton
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={updating}
                      onClick={cancelOrEdit}
                      tabIndex="-1"
                    >
                      {editMode ? 'Cancel' : 'Edit'}
                    </EntreButton>
                  ) : null }
              </div>
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
                <>
                  <RoomIcon className={classes.listIcon} />
                  <div className={classes.listItemText}>
                    {locationText}
                  </div>
                </>
              ) }
            </div>
            { renderUrlComopnent() }
            <div className={classes.listItem}>
              <EntreButton
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  console.log('test');
                }}
                tabIndex="-1"
              >
                Follow
              </EntreButton>
              <EntreButton
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  console.log('test');
                }}
                tabIndex="-1"
              >
                <EmailIcon className={[classes.emailIcon, { color: '#FFF' }]} />
              </EntreButton>
            </div>
          </div>
        </CardContent>
      </Card>

      <EntreSearchTabs value={value} onChange={handleChange}>
        <EntreSearchTab label="About" {...a11yProps(0)} />
        <EntreSearchTab label="Content" {...a11yProps(1)} />
        <EntreSearchTab label="Jobs" {...a11yProps(2)} />
        <EntreSearchTab label="Events" {...a11yProps(3)} />
      </EntreSearchTabs>

      <TabPanel value={value} index={0}>
        <Card>
          <CardContent>
            <div className={classes.title}>
              Bio
            </div>
            <div>
              {editMode
                ? (
                  <TextareaAutosize
                    className={classes.bioInput}
                    value={$bio}
                    onChange={(e) => setBio(e.target.value)}
                    rowsMin={5}
                  />
                )
                : <p>{$bio}</p>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className={classes.title}>
              Industries
            </div>
            <MultiSelector
              items={industries.map((i) => i.name)}
              max={3}
              readonly={!editMode}
              value={$industry}
              onChange={setIndustry}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className={classes.title}>
              Looking for
            </div>
            <MultiSelector
              items={interests.map((t) => t.name)}
              max={3}
              readonly={!editMode}
              value={$lookingFor}
              onChange={setLookingFor}
            />
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <AccountPostTab loadUsername={loadUsername} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <AccountJobsTab companyId={companyId} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <AccountEventsTab loadUsername={loadUsername} />
      </TabPanel>
    </div>
  );
};

Profile.propTypes = {
  loadUsername: PropTypes.string,
  companyId: PropTypes.string,
};

Profile.defaultProps = {
  loadUsername: null,
  companyId: null,
};

export default Profile;
