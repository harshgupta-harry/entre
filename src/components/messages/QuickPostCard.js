import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginBottom: 0,
  },
  profileImageContainer: {
    position: 'relative',
    maxWidth: 50,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: '12.5%',
    objectFit: 'cover',
  },
  actionWrapper: {
    marginTop: '15px',
    marginRight: 10,
    textAlign: 'center',
  },
  userMessageText: {
    fontWeight: 400,
    fontSize: 14,
    color: '#242134',
  },
  userMessageTime: {
    fontWeight: 400,
    fontSize: 12,
    color: '#9F9F9F',
  },
  userActiveStatus: {
    backgroundColor: '#00C4FF',
    width: 10,
    height: 10,
    borderRadius: 7.5,
  },
  firstRightCol: {
    marginBottom: 0,
  },
  commonMessagePad: {
    padding: '15px 0 15px',
  },
  singleUserName: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#242134',
  },
  deleteIcon: {
    color: '#00C4FF',
    fontSize: '20px',
  },
  notificationsIcon: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    padding: '2px 6px 2px 6px',
    color: 'white',
    fontSize: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    fontWeight: 'bold',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    zIndex: 1,
  },
}));

const QuickPostCard = (props) => {
  const classes = useStyles();
  const {
    thread,
    goToPost,
    updatedTimeStyle,
    userMessageTextStyle,
    userBoxPadding,
    setDeleteOpen,
    setMarkedForDel,
    unreadMessages,
  } = props;

  const userAuth = useSelector((state) => state.auth.userAuth);

  let displayAvatarCounter = 0;

  if (!thread) { return null; }

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        avatar={(
          <div className={classes.profileImageContainer}>
            <div className={classes.notificationsIcon} style={{ display: unreadMessages > 0 ? 'block' : 'none' }}>
              {unreadMessages}
            </div>
            {thread.participantsInfo.map((participant, idx) => {
              if (userAuth.uid !== participant.id && idx < 3) {
                // eslint-disable-next-line no-plusplus
                displayAvatarCounter++;
                return (
                  <Avatar
                    key={participant.id}
                    src={participant.avatar}
                    className={classes.avatar}
                    style={{
                      marginTop: displayAvatarCounter > 1 ? -30 : 0,
                      marginLeft: displayAvatarCounter > 1 ? (10 * (displayAvatarCounter - 1)) : 0,
                    }}
                  />
                );
              } return null;
            })}
          </div>
        )}
        action={null}
        title={null}
        subheader={(
          <>
            <div>
              <Grid container spacing={0} className={classes.firstRightCol} alignItems="center">
                <Grid item xs={11} sm={11}>
                  <Typography className={clsx(classes.userMessageText, userMessageTextStyle)} variant="body2" component="p">
                    {thread.lastMessage.text}
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} align="right">
                  {setDeleteOpen && setMarkedForDel && (
                    <DeleteIcon
                      className={classes.deleteIcon}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMarkedForDel(thread.id);
                        setDeleteOpen(true);
                      }}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12}>
                  <Typography className={clsx(classes.userMessageTime, updatedTimeStyle)} variant="body2" component="p">
                    {moment(
                      thread.lastMessage.createdAt.seconds * 1000,
                    ).calendar()}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </>
        )}
        onClick={(e) => goToPost(e, thread.id)}
        className={userBoxPadding}
      />
    </Card>
  );
};

QuickPostCard.propTypes = {
  thread: PropTypes.object,
  goToPost: PropTypes.func.isRequired,
  updatedTimeStyle: PropTypes.any,
  userMessageTextStyle: PropTypes.any,
  userBoxPadding: PropTypes.any,
  setDeleteOpen: PropTypes.any,
  setMarkedForDel: PropTypes.any,
  unreadMessages: PropTypes.any,
};

QuickPostCard.defaultProps = {
  thread: {},
  updatedTimeStyle: null,
  userMessageTextStyle: null,
  userBoxPadding: null,
  setDeleteOpen: null,
  setMarkedForDel: null,
  unreadMessages: null,
};

export default React.memo(QuickPostCard);
