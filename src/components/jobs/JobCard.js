import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import SlimCardContent from '../SlimCardContent';
import EntreLink from '../EntreLink';
import EntreCardHeader from '../EntreCardHeader';
import JobMenu from './JobMenu';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    cursor: 'pointer',
    marginBottom: 10,
  },
  media: {
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    width: 550,
    borderRadius: '15px',
    maxHeight: 550,
    objectFit: 'cover',
  },
  imageDetail: {
    width: 'unset',
    maxHeight: 'none',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 15,
    width: '90%',
    height: 1,
  },
  button: {
    color: '#78849E',
  },
  buttons: {
    marginLeft: 'auto',
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
  timerIcon: {
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
  wrapperSpacing: {
    // padding: '10px 0px',
    marginTop: 10,
  },
  gridPadding: {
    padding: '5px 12px',
  },
}));

const JobCard = (props) => {
  const classes = useStyles();
  const { post } = props;

  return (
    <Card className={clsx(classes.root)}>
      <EntreLink href="/job/[id]" as={`/job/${post.id}`}>
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
          action={(
            <JobMenu author={post.author} postId={post.id} />
          )}
        />
        <SlimCardContent>
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
        </SlimCardContent>
      </EntreLink>
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
