import React, { useState } from 'react';
import clsx from 'clsx';
import router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import SlimCardContent from '../SlimCardContent';
import EntreButton from '../EntreButton';
import ApplicationsModal from './ApplicationsModal';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
  },
  jobLevelIcon: {
    width: 15,
    height: 16,
    marginRight: 5,
    verticalAlign: 'text-top',
  },
  jobTypeIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    verticalAlign: 'text-top',
  },
  locationIcon: {
    // width: 15,
    height: 16,
    marginRight: 5,
    verticalAlign: 'text-top',
  },
}));

const JobCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState();
  const { post } = props;

  return (
    <Card>
      <SlimCardContent className={clsx(classes.root)}>
        <Box>
          <Typography variant="h6" align="left" color="textPrimary">
            {post.jobTitle}
          </Typography>
          { post.companyName && (
            <Typography variant="body2" align="left" color="textPrimary">
              Company:
              {' '}
              {post.companyName}
            </Typography>
          )}
          <Box display="flex" mt={1}>
            <Box mr={3}>
              <Typography variant="body2">
                <Img
                  src="/icons/location_new.png"
                  alt="calender"
                  className={classes.locationIcon}
                />
                {!post.allowRemote
                  && post.location !== null && post.location.city && post.location.state
                  ? (
                    <>
                      {post.location.city}
                      {', '}
                      {post.location.state}
                    </>
                  )
                  : 'Remote' }
              </Typography>
            </Box>
            <Box mr={3}>
              <Typography variant="body2">
                <Img
                  src="/icons/job_type.png"
                  alt="calender"
                  className={classes.jobTypeIcon}
                />
                {post.contract}
              </Typography>
            </Box>
            <Box mr={3}>
              <Typography variant="body2">
                <Img
                  src="/icons/job_level.png"
                  alt="calender"
                  className={classes.jobLevelIcon}
                />
                {post.exprience}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box mt={1}>
          <EntreButton
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              router.push('/edit/job/[id]', `/edit/job/${post.id}`);
            }}
            tabIndex="-1"
          >
            Edit Job
          </EntreButton>
          <EntreButton
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              router.push('/job/[id]', `/job/${post.id}`);
            }}
            tabIndex="-1"
          >
            View Job
          </EntreButton>
          { post.userDetails && post.userDetails.length > 0 && (
            <EntreButton
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setOpen(true);
              }}
              tabIndex="-1"
            >
              View applications (
              {post.userDetails.length}
              )
            </EntreButton>
          )}
        </Box>
        <ApplicationsModal
          open={open}
          onClose={() => setOpen(false)}
          applications={post.userDetails}
        />
      </SlimCardContent>
    </Card>
  );
};

JobCard.propTypes = {
  post: PropTypes.object,
};

JobCard.defaultProps = {
  post: {},
};

export default React.memo(JobCard);
