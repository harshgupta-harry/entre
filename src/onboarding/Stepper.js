import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Grid } from '@material-ui/core';

import { updateStep, submitOnboarding } from '../../common/data/actions';

import Welcome from './Welcome';
import Occupation from './Occupation';
import Industry from './Industry';
import Interests from './Interests';
import Profile from './Profile';
import Location from './Location';
import EntreButton from '../components/EntreButton';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '10px',
  },
  button: {
    marginRight: theme.spacing(1),
    fontWeight: 'normal',
    '&:hover': {
      // borderColor: '#00c4ff',
      // color: '#fff',
      boxShadow: 'none',
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  main: {
    display: 'flex',
    alignItems: 'space-between',
  },
  loader: {
    margin: '160px 48%',
  },
  stepper: {
    maxWidth: 700,
    marginTop: 40,
    margin: '0px auto',
    textAlign: 'center',
  },
}));

function getSteps() {
  return ['Welcome', 'Title', 'Industry', 'Interests', 'Profile', 'Location'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Welcome />;
    case 1:
      return <Occupation />;
    case 2:
      return <Industry />;
    case 3:
      return <Location />;
    case 4:
      return <Profile />;
    case 5:
      return <Interests />;
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const initialStep = useSelector((store) => store.onboarding.step);
  const selectedTitles = useSelector((store) => store.onboarding.titles);
  const selectedIndustries = useSelector((store) => store.onboarding.industries);
  const selectedInterests = useSelector((store) => store.onboarding.interests);
  const selectedLocation = useSelector((store) => store.onboarding.location);
  const loading = useSelector((store) => store.onboarding.loading);
  const [activeStep = initialStep, setActiveStep] = React.useState();
  const steps = getSteps();

  const submitData = () => {
    dispatch(submitOnboarding());
  };

  const handleNext = () => {
    if (activeStep === (steps.length - 1)) {
      submitData();
    } else {
      setActiveStep(activeStep + 1);
      dispatch(updateStep(activeStep + 1));
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    dispatch(updateStep(activeStep - 1));
  };

  const isNextDisabled = () => {
    switch (activeStep) {
      case 1:
        return !(selectedTitles && selectedTitles.length > 0);
      case 2:
        return !(selectedIndustries && selectedIndustries.length > 0);
      case 3:
        return !(
          selectedLocation
          && selectedLocation.city
          && selectedLocation.state
          && selectedLocation.country
        );
      case 5:
        return !(selectedInterests && selectedInterests.length > 0);
      default:
        return false;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid className={classes.stepper}>
          { !loading
            ? (
              <>
                {getStepContent(activeStep)}
                <Box mt={5}>
                  <EntreButton
                    variant="contained"
                    color="secondary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </EntreButton>
                  <EntreButton
                    variant="contained"
                    color="primary"
                    disabled={isNextDisabled()}
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </EntreButton>
                </Box>
              </>
            ) : <CircularProgress className={classes.loader} /> }
        </Grid>
      </Grid>
    </div>
  );
}
