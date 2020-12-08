import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import SlimCardContent from '../SlimCardContent';
import EntreCardHeader from '../EntreCardHeader';
import EntreButton from '../EntreButton';
import {
  createChat,
} from '../../../common/data/actions';

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const account = useSelector((state) => state.account.user);
  const { post, setThreadId, setSingleChatView } = props;

  const handleCreateChat = async (profile) => {
    if (profile && profile.id) {
      await setThreadId(null);
      await setSingleChatView(false);
      const selectedUsers = [profile];
      selectedUsers.push(account);
      const chatId = await dispatch(createChat(selectedUsers));
      await setThreadId(chatId);
      await setSingleChatView(true);
    }
  };

  return (
    <Card>
      <EntreCardHeader
        author={post.author}
        title={post.author.title ? post.author.title.join(' | ') : ''}
        subtitle={(
          <>
            Posted:&nbsp;
            {moment(post.createdAt).calendar(null, {
              sameElse: 'MMM DD, YYYY',
            })}
          </>
          )}
      />
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
              router.push('/job/[id]', `/job/${post.id}`);
            }}
            tabIndex="-1"
          >
            View Job
          </EntreButton>
          <EntreButton
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              handleCreateChat(post.author);
            }}
            tabIndex="-1"
          >
            Message @
            {post.author.username}
          </EntreButton>
        </Box>
      </SlimCardContent>
    </Card>
  );
};

JobCard.propTypes = {
  post: PropTypes.object,
  setThreadId: PropTypes.func.isRequired,
  setSingleChatView: PropTypes.func.isRequired,
};

JobCard.defaultProps = {
  post: {},
};

export default React.memo(JobCard);
