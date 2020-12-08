import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import router from 'next/router';
import Img from 'react-cool-img';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import EntreLink from '../EntreLink';
import EntreAvatar from '../EntreAvatar';
import SlimCardContent from '../SlimCardContent';
import { approveConnection, rejectConnection } from '../../../common/data/actions';
import trimText from '../../helpers/trimText';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    marginBottom: '30px',
    cursor: 'pointer',
  },
  media: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '120px',
    borderRadius: '12.5%',
    maxHeight: '120px',
    objectFit: 'cover',
  },
  imageDetail: {
    width: 'unset',
    maxHeight: 'none',
  },
  profileImageContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: '12.5%',
    objectFit: 'cover',
  },
  proBadgeSmall: {
    fontSize: 10,
    backgroundColor: '#0B3593',
    borderRadius: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'absolute',
    fontStyle: 'italic',
    padding: '3px 10px',
    bottom: -3,
    left: -3,
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
  },
  tagText: {
    fontWeight: 'normal',
  },
  yesIcon: {
    color: '#00C4FF',
  },
  noIcon: {
    color: '#FF4B4B',
  },
}));

const ActivityCard = (props) => {
  const classes = useStyles();
  const { post, detail } = props;

  const [$connectionStatus = post.type, setConnectionStatus] = useState();
  const dispatch = useDispatch();

  const handleAcceptConnection = async () => {
    dispatch(approveConnection(post.id));
    // const res = await action.playload;
    setConnectionStatus('connection_accepted');
  };

  const handleRejectConnection = async () => {
    dispatch(rejectConnection(post.id));
    // const res = await action.playload;
    setConnectionStatus('connection_rejected');
  };

  const goToPost = (e) => {
    if (!(e && e.target.tagName === 'A')) {
      router.push('/feed/[id]', `/feed/${post.post.id}`);
    }
  };

  const goToEvent = (e) => {
    if (!(e && e.target.tagName === 'A')) {
      router.push('/event/[id]', `/event/${post.event.id}`);
    }
  };

  return (
    <Card className={clsx(classes.root, detail && classes.detail)}>
      <CardHeader
        avatar={(
          <EntreLink href="/profile/[username]" as={`/profile/${post.username}`}>
            <EntreAvatar
              fullName={post.fullName}
              avatar={post.avatar}
              isPro={post.isPro}
            />
          </EntreLink>
        )}
        action={(
           $connectionStatus === 'connection_pending'
          && (
          <>
            <IconButton className={classes.noIcon} onClick={handleRejectConnection}><CancelOutlinedIcon fontSize="large" /></IconButton>
            <IconButton className={classes.yesIcon} onClick={handleAcceptConnection}><CheckCircleOutlineOutlinedIcon fontSize="large" /></IconButton>
          </>
          )
        )}
        title={(
          <Box maxWidth="400px">
            <span className={classes.tagText}>
              {
                {
                  connection_requested: 'Your connection with ',
                  connection_rejected: 'You declined your connection with ',
                }[$connectionStatus]
              }
            </span>
            <span>{post.fullName}</span>
            <span className={classes.tagText}>
              {
                {
                  connection_accepted: ' is now a connection',
                  connection_pending: ' wants to connect',
                  connection_approved: ' is a connection',
                  connection_requested: ' is pending approval',
                  post_tagged_request: ' tagged you in a post',
                  liked_post: ' liked your post',
                  liked_event: ' liked your event',
                  comment_post: ' commented on your post',
                  comment_event: ' commented on your event',
                  comment_post_commented: ' commented on a post you commented',
                  comment_event_commented: ' commented on an event you commented',
                  attend_event: ' is attending your event',
                }[$connectionStatus]
              }
            </span>
          </Box>
        )}
        subheader={`${post.time} ago`}
      />
      { post.post
        ? (
          <>
            <SlimCardContent onClick={goToPost}>
              <Grid container>
                <Grid item md={9}>
                  <Typography variant="body2">
                    {trimText(post.post.description, 200, 4)}
                  </Typography>
                </Grid>
                <Grid item md={3}>
                  {post.post.imageUrl ? (
                    <div className={classes.media}>
                      <Img
                        className={clsx(classes.image, detail && classes.imageDetail)}
                        src={post.post.imageUrl}
                        alt={post.post.description}
                      />
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </SlimCardContent>
          </>
        ) : null }
      { post.event
        ? (
          <>
            <SlimCardContent onClick={goToEvent}>
              <Grid container>
                <Grid item md={9}>
                  <Typography variant="body2">
                    {trimText(post.event.description, 200, 4)}
                  </Typography>
                </Grid>
                <Grid item md={3}>
                  {post.event.image ? (
                    <div className={classes.media}>
                      <Img
                        className={clsx(classes.image, detail && classes.imageDetail)}
                        src={post.event.image}
                        alt={post.event.description}
                      />
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </SlimCardContent>
          </>
        ) : null }
    </Card>
  );
};

ActivityCard.propTypes = {
  post: PropTypes.object,
  detail: PropTypes.bool,
};

ActivityCard.defaultProps = {
  post: {},
  detail: false,
};

export default React.memo(ActivityCard);
