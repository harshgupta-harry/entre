/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import router from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

import WorkIcon from '@material-ui/icons/Work';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AppsIcon from '@material-ui/icons/Apps';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import EntreButton from '../EntreButton';
import MultiSelector from '../MultiSelector';
import EntreCardHeader from '../EntreCardHeader';
import SlimCardContent from '../SlimCardContent';
import IndustriesTags from '../content/IndustriesTags';
import LocationModal from './LocationModal';
import api from '../../../common/api';
import { experienceList, contractList } from '../../../common/data/jobConstant';
import SkillTags from './SkillTags';

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
  bI: {
    color: '#00C4FF',
    fontSize: 18,
  },
  sectionTitle: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '18px',
    marginTop: '20px',
  },
  checkItem: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '10px',
    minHeight: 69,
  },
  fromToDivider: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'flex-end',
    paddingBottom: '6px',
  },
}));

const createJob = async (id, job, location, industry, experience, skills, contract) => {
  const newJobInfo = {
    jobTitle: job.jobTitle,
    companyName: job.companyName,
    website: job.website,
    location,
    allowRemote: job.allowRemote,
    allowAmount: job.allowAmount,
    allowEquity: job.allowEquity,
    exprience: experience[0],
    contract: contract[0],
    skills,
    industry,
    description: job.description,
    amount: {
      min: job.amountFrom,
      max: job.amountTo,
    },
    equity: {
      min: job.equityFrom,
      max: job.equityTo,
    },
  };
  if (id) {
    return api.put(`job/${id}`, newJobInfo);
  }
  return api.post('job', newJobInfo);
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function NewJob({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const author = useSelector((state) => state.account.user);
  const [posting = false, setPosting] = useState();
  const [job = {
    allowRemote: false,
    allowEquity: true,
    allowAmount: true,
  }, setJob] = useState();
  const [error = null, setError] = useState();
  const [location, setLocation] = useState();
  const [industry = [], setIndustry] = useState();
  const [experience = [], setExperience] = useState();
  const [skills = [], setSkills] = useState();
  const [contract = [], setContract] = useState();
  const [showLocationModal = false, setShowLocationModal] = useState();
  const [loadingPost = id !== null, setLoadingPost] = useState();

  useEffect(() => {
    const fetchJobData = async (jobId) => {
      const resp = await api.get(`job/${jobId}`, {});
      if (resp.data.data) {
        const jobData = resp.data.data;
        setJob(jobData);
        setLocation(jobData.location);
        setIndustry(jobData.industry);
        setExperience([jobData.exprience]);
        setSkills(jobData.skills);
        setContract([jobData.contract]);
        setLoadingPost(false);
      }
    };

    if (id) {
      fetchJobData(id);
    }
  }, [id]);

  useEffect(() => {
    setError(null);
  }, [job.jobTitle, job.startDateTime, job.description]);

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

  const submitPost = async () => {
    const err = [];
    if (!job || !job.description || job.description === '') err.push('description');
    if (!job || !job.jobTitle || job.jobTitle === '') err.push('jobTitle');
    if (job.allowAmount && !job.amountFrom) err.push('amountFrom');
    if (job.allowAmount && !job.amountTo) err.push('amountTo');
    if (job.allowEquity && !job.equityFrom) err.push('equityFrom');
    if (job.allowEquity && !job.equityTo) err.push('equityTo');
    if (!job.allowRemote && !location) err.push('location');
    if (!industry || industry.length === 0) err.push('industry');
    if (!experience || experience.length === 0) err.push('experience');
    if (!skills || skills.length === 0) err.push('skills');
    if (!contract || contract.length === 0) err.push('contract');
    if (err.length > 0) {
      enqueueSnackbar('Please fill all fields.', {
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
    const resp = await createJob(id, job, location, industry, experience, skills, contract);
    setPosting(false);
    if (resp.error) {
      enqueueSnackbar('There was an error creating the job posting', {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } else {
      let message = 'Job posting created successfully';
      if (id) {
        message = 'Job posting updated successfully';
      }
      enqueueSnackbar(message, {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      router.push('/search?section=jobs');
    }
  };

  const getError = (field) => {
    const errors = {
      jobTitle: 'Event name is required',
      description: 'Description is required',
      amountFrom: 'From amount is required',
      amountTo: 'To amount is required',
      equityFrom: 'From equity is required',
      equityTo: 'To equity is required',
    };

    if (error !== null) {
      if (error.indexOf(field) !== -1) {
        return errors[field];
      }
    }

    return false;
  };

  const onlyNumbers = (event) => {
    if (new Set([8, 9]).has(event.keyCode)) return true;
    if (event.target.value.indexOf('.') !== -1 && event.key === '.') {
      event.preventDefault();
      return false;
    }
    if (/[0-9.]/g.test(event.key)) return true;
    event.preventDefault();
    return false;
  };

  const onlyPercent = (event) => {
    if (new Set([8, 9, 38, 40]).has(event.keyCode)) return true;
    if (event.target.value.indexOf('.') !== -1 && event.key === '.') {
      event.preventDefault();
      return false;
    }
    if (parseInt(`${event.target.value}${event.key}`, 10) > 100) {
      event.preventDefault();
      return false;
    }
    if (/[0-9.]/g.test(event.key)) return true;
    event.preventDefault();
    return false;
  };

  const cFormat = (value) => formatter.format(value).replace(/[$,]/, '');

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
                error={getError('jobTitle') !== false}
                helperText={getError('jobTitle')}
                label="Job title"
                value={job.jobTitle}
                onChange={(e) => {
                  const m = e.target.value;
                  const jobTitle = m.charAt(0).toUpperCase() + m.substr(1);
                  setJob({ ...job, jobTitle });
                }}
                fullWidth
                className={classes.createPostTextField}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                autoFocus
                label="Company"
                value={job.companyName}
                onChange={(e) => {
                  const m = e.target.value;
                  const companyName = m.charAt(0).toUpperCase() + m.substr(1);
                  setJob({ ...job, companyName });
                }}
                fullWidth
                className={classes.createPostTextField}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                autoFocus
                label="Website"
                value={job.website}
                onChange={(e) => {
                  const website = e.target.value;
                  setJob({ ...job, website });
                }}
                fullWidth
                className={classes.createPostTextField}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Description"
                multiline
                error={getError('description') !== false}
                helperText={getError('description')}
                value={job.description}
                onChange={(e) => {
                  const description = e.target.value;
                  setJob({ ...job, description });
                }}
                onKeyDown={onTextInputKeyDown}
                onKeyUp={onTextInputKeyUp}
                fullWidth
                className={classes.createPostTextField}
              />
            </Grid>
            <Grid item sm={4} className={classes.checkItem}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={job.allowRemote}
                    color="primary"
                    onChange={(e) => setJob({ ...job, allowRemote: e.target.checked })}
                    name="allowRemote"
                  />
              )}
                label="Remote"
              />
            </Grid>
            <Grid item sm={8}>
              { job && job.allowRemote
                ? null
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
            <Grid item sm={4} className={classes.checkItem}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={!job.allowAmount}
                    color="primary"
                    onChange={(e) => setJob({ ...job, allowAmount: !e.target.checked })}
                    name="allowAmount"
                  />
              )}
                label="No salary"
              />
            </Grid>
            <Grid item sm={8}>
              { job && !job.allowAmount
                ? null
                : (
                  <Grid container>
                    <Grid item sm={5}>
                      <TextField
                        error={getError('amountFrom') !== false}
                        helperText={getError('amountFrom')}
                        label="From"
                        value={job.amountFrom}
                        onChange={(e) => setJob({ ...job, amountFrom: e.target.value })}
                        onBlur={(e) => setJob({ ...job, amountFrom: cFormat(e.target.value) })}
                        onKeyDown={onlyNumbers}
                        fullWidth
                        className={classes.createPostTextField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: { textAlign: 'right' },
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><Icon className={classes.bI}>$</Icon></InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item sm={2}>
                      <div className={classes.fromToDivider}>-</div>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        error={getError('amountTo') !== false}
                        helperText={getError('amountTo')}
                        label="To"
                        value={job.amountTo}
                        onChange={(e) => setJob({ ...job, amountTo: e.target.value })}
                        onBlur={(e) => setJob({ ...job, amountTo: cFormat(e.target.value) })}
                        onKeyDown={onlyNumbers}
                        fullWidth
                        className={classes.createPostTextField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: { textAlign: 'right' },
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><Icon className={classes.bI}>$</Icon></InputAdornment>,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
            </Grid>
            <Grid item sm={4} className={classes.checkItem}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={!job.allowEquity}
                    color="primary"
                    onChange={(e) => setJob({ ...job, allowEquity: !e.target.checked })}
                    name="allowEquity"
                  />
              )}
                label="No equity"
              />
            </Grid>
            <Grid item sm={8}>
              { job && !job.allowEquity
                ? null
                : (
                  <Grid container>
                    <Grid item sm={5}>
                      <TextField
                        error={getError('equityFrom') !== false}
                        helperText={getError('equityFrom')}
                        label="From"
                        value={job.equityFrom}
                        onChange={(e) => setJob({ ...job, equityFrom: e.target.value })}
                        onKeyDown={onlyPercent}
                        fullWidth
                        className={classes.createPostTextField}
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: 0,
                          max: 100,
                          style: { textAlign: 'right' },
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end"><Icon className={classes.bI}>%</Icon></InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item sm={2}>
                      <div className={classes.fromToDivider}>-</div>
                    </Grid>
                    <Grid item sm={5}>
                      <TextField
                        error={getError('equityTo') !== false}
                        helperText={getError('equityTo')}
                        label="To"
                        value={job.equityTo}
                        onChange={(e) => setJob({ ...job, equityTo: e.target.value })}
                        onKeyDown={onlyPercent}
                        fullWidth
                        className={classes.createPostTextField}
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: 0,
                          max: 100,
                          style: { textAlign: 'right' },
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end"><Icon className={classes.bI}>%</Icon></InputAdornment>,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
            </Grid>
            <Grid item sm={12}>
              <Box className={classes.sectionTitle}>
                <SignalCellularAltIcon style={{ color: '#00C4FF', marginRight: 10 }} />
                Experience
              </Box>
              <MultiSelector
                items={experienceList.map((e) => e.name)}
                max={1}
                readonly={false}
                value={experience}
                onChange={setExperience}
              />
            </Grid>
            <Grid item sm={12}>
              <Box className={classes.sectionTitle}>
                <WorkIcon style={{ color: '#00C4FF', marginRight: 10 }} />
                Job Type
              </Box>
              <MultiSelector
                items={contractList.map((c) => c.name)}
                max={1}
                readonly={false}
                value={contract}
                onChange={setContract}
              />
            </Grid>
            <Grid item sm={12}>
              <Box className={classes.sectionTitle}>
                <PlaylistAddCheckIcon style={{ color: '#00C4FF', marginRight: 10 }} />
                Skills
              </Box>
              <SkillTags editMode skill={skills} onSelect={setSkills} />
            </Grid>
            <Grid item sm={12}>
              <Box className={classes.sectionTitle}>
                <AppsIcon style={{ color: '#00C4FF', marginRight: 10 }} />
                Industries
              </Box>
              <IndustriesTags editMode industry={industry} onSelect={setIndustry} />
            </Grid>
            <Box width="100%" align="right" mt={1}>
              <EntreButton size="small" variant="contained" onClick={submitPost} disabled={posting}>
                { posting && <CircularProgress style={{ color: '#FFF' }} size={20} /> }
                { !posting && (id ? 'Update Job' : 'Post job')}
              </EntreButton>
            </Box>
          </Grid>
        </FormControl>
      </SlimCardContent>
      <LocationModal
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={handleLocationChange}
      />
    </Card>
  );
}

NewJob.propTypes = {
  id: PropTypes.string,
};

NewJob.defaultProps = {
  id: null,
};

export default NewJob;
