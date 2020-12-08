import React from 'react';
import Grid from '@material-ui/core/Grid';
import router from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.112)',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  jobLevelIcon: {
    width: 11,
    height: 11,
    marginRight: 4,
    verticalAlign: 'text-top',
  },
  jobTypeIcon: {
    width: 11,
    height: 11,
    marginRight: 4,
    verticalAlign: 'text-top',
  },
  timerIcon: {
    width: 11,
    height: 11,
    marginRight: 4,
    verticalAlign: 'text-top',
  },
  locationIcon: {
    width: 8,
    height: 12,
    marginRight: 4,
    verticalAlign: 'text-top',
  },
  wrapperSpacing: {
    padding: '12px 0',
  },
  gridPadding: {
    padding: '0px 10px !important',
  },
  bodyText: {
    fontSize: 11,
    color: '#7E7E7E',
  },
  jobTitle: {
    fontSize: 16,
    color: '#7E7E7E',
    marginBottom: '10px',
  },
}));

const SmallCard = (props) => {
  const classes = useStyles();
  const { post } = props;

  const goToPost = (e) => {
    if (!(e && e.target.tagName === 'A')) {
      router.push('/job/[id]', `/job/${post.id}`);
    }
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        avatar={null}
        action={null}
        title={(<div className={classes.jobTitle}>{post.jobTitle}</div>)}
        subheader={(
          <>
            <div>
              <Grid container spacing={3} className={classes.wrapperSpacing}>
                <Grid item xs={12} sm={4} className={classes.gridPadding}>
                  <Typography variant="body2" className={classes.bodyText}>
                    <Img
                      src="/icons/location_new.png"
                      alt="calender"
                      className={classes.locationIcon}
                    />
                    {post.location !== null && post.location.city && post.location.state
                      ? (
                        <>
                          {post.location.city}
                          {', '}
                          {post.location.state}
                        </>
                      )
                      : 'N/A' }
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridPadding}>
                  <Typography variant="body2" className={classes.bodyText}>
                    <Img
                      src="/icons/job_level.png"
                      alt="calender"
                      className={classes.jobLevelIcon}
                    />
                    {post.exprience}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.gridPadding}>
                  <Typography variant="body2" className={classes.bodyText}>
                    <Img
                      src="/icons/job_type.png"
                      alt="calender"
                      className={classes.jobTypeIcon}
                    />
                    {post.contract}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3} className={classes.wrapperSpacing}>
                <Grid item xs={12} sm={4} className={classes.gridPadding}>
                  <Typography variant="body2" className={classes.bodyText}>
                    <Img
                      src="/icons/time_icon.png"
                      alt="calender"
                      className={classes.timerIcon}
                    />
                    {post.time}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </>
        )}
        onClick={goToPost}
      />
    </Card>
  );
};

SmallCard.propTypes = {
  post: PropTypes.object,
};

SmallCard.defaultProps = {
  post: {},
};

export default React.memo(SmallCard);
