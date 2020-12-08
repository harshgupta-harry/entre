import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Linkify from 'linkifyjs/react';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import SlimCardContent from '../SlimCardContent';
import MultiSelector from '../MultiSelector';
import EntreButton from '../EntreButton';
import EntreCardHeader from '../EntreCardHeader';
import { setSignUpAnJob } from '../../../common/data/actions';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    padding: 20,
    cursor: 'pointer',
  },
  payRangeText: {
    // color: '#00C4FF',
    fontSize: '16px',
  },
  detail: {
    cursor: 'auto',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    margin: '15px 0',
    width: '95%',
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
    height: 20,
    marginRight: 15,
    verticalAlign: 'text-top',
  },
  jobTypeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  locationIcon: {
    width: 15,
    height: 20,
    marginRight: 15,
    verticalAlign: 'text-top',
  },
  bodyText: {
    fontSize: '16px',
    color: '#000',
    whiteSpace: 'pre-line',
  },
  listItem: {
    display: 'flex',
    margin: '5px 0px',
  },
  item: {
    backgroundColor: '#F3F5F9',
    color: '#000',
    height: '30px',
    borderRadius: '20px',
    lineHeight: '30px',
    padding: '0 15px',
    textAlign: 'center',
    display: 'inline-block',
    marginRight: '5px',
    marginBottom: '10px',
    fontSize: '14px',
    cursor: 'default',
  },
  wrapperSpacing: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  updatedH6Style: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  locationLink: {
    background: 'none',
    border: 'none',
    fontSize: 15,
    padding: 0,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  applied: {
    color: '#00C4FF',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: '50px',
  },
}));

const JobCard = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { post, detail } = props;
  const user = useSelector((state) => state.account.user);
  const [appliedStatus, setAppliedStatus] = useState(post.isApplied === 1);
  const applyJob = async (e, content) => {
    e.stopPropagation();
    if (content.id && !appliedStatus) {
      const action = dispatch(setSignUpAnJob(content.id));
      const res = await action.payload;
      if (res) {
        setAppliedStatus(true);
        enqueueSnackbar(res.message, {
          variant: 'success',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
      }
    }
  };

  const renderItems = (displayItems) => displayItems.map((item) => (
    <div
      key={item}
      className={classes.item}
    >
      {item}
    </div>
  ));

  const renderActionButtons = () => {
    if (post.author.id === user.id) return null;
    if (appliedStatus) {
      return (
        <div className={classes.applied}>
          Applied
        </div>
      );
    }
    return (
      <EntreButton
        variant="contained"
        color="primary"
        size="large"
        onClick={(e) => applyJob(e, post)}
        tabIndex="-1"
      >
        Apply
      </EntreButton>
    );
  };

  return (
    <Card className={clsx(classes.root, detail && classes.detail)}>
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
        action={renderActionButtons()}
      />
      <Divider className={classes.divider} />
      <SlimCardContent>
        <Grid spacing={3} container>
          <Grid item xs={12}>
            <Typography variant="h6" align="left" color="textPrimary" style={{ fontWeight: 'bold', fontSize: 23 }}>
              Job Title:
              {' '}
              {post.jobTitle}
            </Typography>
            { post.companyName && (
              <Box mt={1}>
                <Typography variant="body2" align="left" color="textPrimary">
                  <strong>Company:</strong>
                  {' '}
                  {post.companyName}
                </Typography>
              </Box>
            )}
            { post.website && (
              <Box mt={1}>
                <Typography variant="body2" align="left" color="textPrimary">
                  <strong>Website:</strong>
                  {' '}
                  <Linkify>{post.website}</Linkify>
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="left" color="textPrimary" className={classes.updatedH6Style}>
              Info
            </Typography>
            <div className={classes.wrapperSpacing}>
              <Box>
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
              <Box mt={1}>
                <Typography variant="body2" className={classes.bodyText}>
                  <Img
                    src="/icons/job_type.png"
                    alt="calender"
                    className={classes.jobTypeIcon}
                  />
                  {post.contract}
                </Typography>
              </Box>
              <Box mt={1}>
                <Typography variant="body2" className={classes.bodyText}>
                  <Img
                    src="/icons/job_level.png"
                    alt="calender"
                    className={classes.jobLevelIcon}
                  />
                  {post.exprience}
                </Typography>
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="left" color="textPrimary" className={classes.updatedH6Style}>
              Industry
            </Typography>
            <div className={classes.wrapperSpacing}>
              {post.industry !== null && post.industry.length > 0 ? (
                <MultiSelector
                  max={3}
                  readonly
                  value={post.industry}
                  readOnlyComponent={renderItems}
                />
              )
                : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="left" color="textPrimary" className={classes.updatedH6Style}>
              Pay Range:
            </Typography>
            <div className={classes.wrapperSpacing}>
              <Box>
                <Typography variant="body2" className={classes.bodyText}>
                  { post.allowAmount
                    ? (
                      <>
                        <strong>Salary:</strong>
                        <span className={classes.payRangeText}>
                          {' $'}
                          {post.amount.min.replace('.00', '')}
                          {' '}
                          -
                          {' $'}
                          {post.amount.max.replace('.00', '')}
                        </span>
                      </>
                    ) : 'No Salary' }
                </Typography>
              </Box>
              <Box mt={1}>
                <Typography variant="body2" className={classes.bodyText}>
                  { post.allowEquity
                    ? (
                      <>
                        <strong>Equity:</strong>
                        <span className={classes.payRangeText}>
                          {' '}
                          {post.equity.min}
                          {' '}
                          -
                          {' '}
                          {post.equity.max}
                        </span>
                      </>
                    ) : 'No equity' }
                </Typography>
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="left" color="textPrimary" className={classes.updatedH6Style}>
              Skills
            </Typography>
            <div className={classes.wrapperSpacing}>
              {post.skills !== null && post.skills.length > 0 ? (
                <MultiSelector
                  max={3}
                  readonly
                  value={post.skills}
                  readOnlyComponent={renderItems}
                />
              ) : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" align="left" color="textPrimary" className={classes.updatedH6Style}>
              Description
            </Typography>
            <div className={classes.wrapperSpacing}>
              <Typography variant="body2" className={classes.bodyText}>
                <Linkify>{post.description}</Linkify>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </SlimCardContent>
    </Card>
  );
};

JobCard.propTypes = {
  post: PropTypes.object,
  detail: PropTypes.bool,
};

JobCard.defaultProps = {
  post: {},
  detail: false,
};

export default React.memo(JobCard);
