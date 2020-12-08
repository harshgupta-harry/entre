import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import router from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import moment from 'moment';
import EntreLink from '../EntreLink';
import { setCompanyVote } from '../../../common/data/actions';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  profileImageContainer: {
    position: 'relative',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: '12.5%',
    objectFit: 'cover',
  },
  teamIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  jobTypeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  timerIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  locationIcon: {
    width: 15,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  wrapperSpacing: {
    padding: '10px 0px',
  },
  zeroPadding: {
    padding: '0px',
  },
  gridPadding: {
    padding: '5px 12px',
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  actionWrapper: {
    marginTop: '15px',
    marginRight: 10,
    textAlign: 'center',
  },
  companyUpVoteIcon: {
    width: 30,
    height: 41,
  },
  buttonBlock: {
    display: 'block',
  },
}));

const PostCard = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { post } = props;
  const postId = post.id;
  if (!postId) return null;
  const [favorite, setFavorite] = useState(post.isLiked);
  const [upvotes, setUpvotes] = useState(post.likes);

  const goToPost = (e) => {
    if (!(e && e.target.tagName === 'A')) {
      router.push(`/company/${post.id}`);
    }
  };

  const upVoteClick = React.useCallback((e) => {
    e.stopPropagation();
    const isFav = favorite === 1 ? 0 : 1;
    const newVal = isFav ? upvotes + 1 : upvotes - 1;
    if (newVal >= 0) {
      setUpvotes(newVal);
      setFavorite(isFav);
      dispatch(setCompanyVote(postId, isFav));
    }
  }, [favorite]);

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        avatar={(
          <EntreLink href={`/company/${post.id}`}>
            <div className={classes.profileImageContainer}>
              <Avatar
                alt={post.name}
                src={post.avatar}
                className={classes.avatar}
              />
            </div>
          </EntreLink>
        )}
        action={(
          <div className={classes.actionWrapper}>
            <Button onClick={upVoteClick} className={classes.buttonBlock}>
              <Img
                src={`/icons/${favorite ? 'down' : 'up'}vote.png`}
                alt="calender"
                className={classes.companyUpVoteIcon}
              />
              <div style={favorite ? { color: '#00C4FF' } : {}}>{upvotes}</div>
            </Button>
          </div>
        )}
        title={(<div className={classes.jobTitle}>{post.name}</div>)}
        subheader={(
          <>
            <div>
              <Grid container spacing={0} className={classes.zeroPadding}>
                <Grid item xs={12} sm={6} className={classes.gridPadding}>
                  <Typography variant="body2">
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
                <Grid item xs={12} sm={6} className={classes.gridPadding}>
                  <Typography variant="body2">
                    <Img
                      src="/icons/teamIcon.png"
                      alt="calender"
                      className={classes.teamIcon}
                    />
                    {post.noOfEmployee}
                    {' '}
                    team
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={0} className={classes.zeroPadding}>
                <Grid item xs={12} sm={6} className={classes.gridPadding}>
                  <Typography variant="body2">
                    <Img
                      src="/icons/time_icon.png"
                      alt="calender"
                      className={classes.timerIcon}
                    />
                    Est:
                    {' '}
                    {moment(post.createdAt).calendar(null, {
                      sameElse: 'YYYY',
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.gridPadding}>
                  <Typography variant="body2">
                    <Img
                      src="/icons/job_type.png"
                      alt="calender"
                      className={classes.jobTypeIcon}
                    />
                    {post.jobs}
                    {' '}
                    positions open
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

PostCard.propTypes = {
  post: PropTypes.object,
};

PostCard.defaultProps = {
  post: {},
};

export default React.memo(PostCard);
