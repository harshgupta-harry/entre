/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PostCard from './PostCard';
import QuickPostCard from './QuickPostCard';
import EntreButton from '../EntreButton';
import { leaveChat, loadChatsSuccess } from '../../../common/data/actions';
import firebase from '../../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();
const useStyles = makeStyles(() => ({
  commonHeaderMessagePad: {
    padding: '20px',
    borderBottom: '0.6px solid #E7E7E7',
  },
  chatListWrapper: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
  },
  addIconStyle: {
    fontSize: 30,
    cursor: 'pointer',
  },
  backIconStyle: {
    fontSize: 20,
    marginTop: 5,
  },
  searchBar: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    maxWidth: '458px',
    height: '55px',
    background: '#FAFAFA',
    boxSizing: 'border-box',
    borderRadius: '10px',
  },
  searchIcon: {
    position: 'absolute',
    marginLeft: 15,
    color: '#00C4FF',
    fontSize: '26px',
  },
  closeIcon: {
    position: 'absolute',
    color: '#00C4FF',
    right: '5px',
    fontSize: '22px',
    cursor: 'pointer',
  },
  searchInput: {
    position: 'absolute',
    backgroundColor: 'transparent',
    border: 0,
    width: '100%',
    height: '50px',
    fontSize: 16,
    lineHeight: '16px',
    padding: 10,
    paddingLeft: 50,
    color: '#000',
  },
  chatListingWrapper: {
    padding: '15px 15px',
    overflow: 'auto',
    flexDirection: 'row',
    width: '100%',
    minHeight: 500,
    maxHeight: 500,
    height: 'auto',
  },
  singleUserName: {
    color: '#000000',
    fontWeight: 600,
  },
  chatListingFooter: {
    padding: '15px 40px 15px',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: 20,
  },
  chatInputBarWrapper: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    maxWidth: '458px',
    height: '55px',
    background: '#fffffff',
    boxSizing: 'border-box',
    borderRadius: '10px',
  },
  chatUserImg: {
    width: '55px',
    height: '55px',
    borderRadius: 7,
  },
  sendIcon: {
    color: '#00C4FF',
    width: '28px',
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(-50%, -50%)',
  },
  attachImgIcon: {
    color: '#78849E',
    width: '28px',
    position: 'absolute',
    top: '50%',
    right: '40px',
    transform: 'translate(-50%, -50%)',
  },
  chatInput: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    border: 0,
    width: '100%',
    height: '50px',
    fontSize: 18,
    lineHeight: '18px',
    padding: 10,
    paddingRight: 85,
    color: '#000',
  },
  userMessageTextStyle: {
    fontSize: 13,
  },
  userBoxPadding: {
    padding: '10px 0',
  },
  notificationsIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    padding: '2px 6px 2px 6px',
    color: 'white',
    fontSize: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    fontWeight: 'bold',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
  },
}));

const MessageList = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const chats = useSelector((state) => state.chat.chats);
  const userAuth = useSelector((state) => state.auth.userAuth);
  const user = useSelector((state) => state.account.user);
  const [isFetchingChats, setIsFetchingChats] = useState(true);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [query, setQuery] = useState('');
  const [markedForDel, setMarkedForDel] = useState(undefined);
  const [notifications, setNotifications] = useState({});

  const {
    type,
    setSingleChatView,
    setThreadId,
    updatedSearchPadding,
    cardStyle,
    updatedTimeStyle,
    updatedTitleStyle,
    updatedLoaderStyle,
    setToggleSearchWidget,
    quickViewMode,
  } = props;

  if (type !== 'messages') {
    return null;
  }

  const cleanChats = chats.filter((chat) => {
    if (chat.lastMessage && chat.lastMessage.createdAt) {
      return chat;
    } return false;
  });

  let orderedChats = _.orderBy(
    cleanChats,
    (e) => e.lastMessage.createdAt.seconds,
    ['desc'],
  );

  orderedChats = orderedChats.filter((item) => {
    if (item.leftChat) {
      return item.leftChat.indexOf(userAuth.uid) === -1;
    } return item;
  });

  useEffect(() => {
    let didCancel = false;
    if (!isFetchingChats) {
      return;
    }

    const unsubscribe = firestore
      .collection('chats')
      .where('participants', 'array-contains', userAuth.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setIsFetchingChats(false);
          return;
        }
        const chatsInfo = snapshot && snapshot.docs.map((doc) => doc.data());
        if (chatsInfo) {
          dispatch(loadChatsSuccess(chatsInfo));
        }

        if (!didCancel) {
          setIsFetchingChats(false);
        }
      });

    const unsubscribeNotifications = firestore
      .collection('notifications')
      .doc(user.id)
      .onSnapshot((snapshot) => {
        const content = snapshot.data();
        if (!content) {
          firestore
            .collection('notifications')
            .doc(user.id)
            .set({ messages: {} });
        } else {
          setNotifications(content.messages);
        }
      });

    // eslint-disable-next-line consistent-return
    return () => {
      unsubscribe();
      unsubscribeNotifications();
      didCancel = true;
    };
  }, []);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 450,
  };

  const renderLoader = () => (
    <div style={loaderStyle}><CircularProgress className={updatedLoaderStyle} /></div>
  );
  if (isFetchingChats) { return renderLoader(); }

  const goToPost = async (e, threadId) => {
    await setThreadId(threadId);
    await setSingleChatView(true);
  };

  const triggerSearch = async (e) => {
    e.stopPropagation();
    setToggleSearchWidget(true);
  };

  const handleSetQuery = async (text) => {
    await setQuery(text);
  };

  const handleTextFieldKeyDown = async (event) => {
    switch (event.key) {
      case 'Enter':
        await handleSetQuery(query);
        break;
      case 'Escape':
        await handleSetQuery('');
        break;
      default: break;
    }
  };

  const handleCloseDelete = (event) => {
    event.stopPropagation();
    setDeleteOpen(false);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setDeleteOpen(false);
  };

  const handleDeletePost = (event) => {
    if (markedForDel && userAuth.uid) {
      dispatch(leaveChat(markedForDel, userAuth.uid));
    }
    handleClose(event);
  };

  if (query && orderedChats.length > 0) {
    orderedChats = orderedChats.filter((item) => {
      let flagCheck = false;
      let loopBreak = false;
      if (item.participantsInfo.length > 0) {
        item.participantsInfo.forEach((participant) => {
          const lowerCaseName = participant.fullName.toLowerCase();
          const lowerCaseQuery = query.toLowerCase();
          if (!loopBreak) {
            flagCheck = lowerCaseName.includes(lowerCaseQuery);
            loopBreak = flagCheck === true;
          }
        });
      }
      return flagCheck === true;
    });
  }
  return (
    <>
      <Grid container spacing={0} className={classes.chatListWrapper}>
        <Grid
          container
          spacing={0}
          className={clsx(classes.commonHeaderMessagePad, updatedSearchPadding)}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={quickViewMode ? 12 : 8}
            style={{ padding: quickViewMode ? 0 : 10 }}
          >
            <Box
              className={classes.searchBar}
              display={['flex', 'flex', 'flex', 'flex', 'flex']}
              style={{ height: quickViewMode ? '35px' : '55px' }}
            >
              <input
                className={classes.searchInput}
                style={{
                  height: quickViewMode ? '35px' : '50px',
                  fontSize: quickViewMode ? '14px' : '16px',
                }}
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => handleSetQuery(e.target.value)}
                onKeyDown={handleTextFieldKeyDown}
              />
              <SearchIcon
                className={classes.searchIcon}
                style={{ fontSize: quickViewMode ? '20px' : '26px' }}
              />
              {query && <CloseIcon className={classes.closeIcon} onClick={() => handleSetQuery('')} />}
            </Box>
          </Grid>
          {!quickViewMode && (
            <Grid item xs={12} sm={4}>
              <EntreButton
                variant="outlined"
                color="primary"
                size="small"
                onClick={(e) => triggerSearch(e)}
                tabIndex="-1"
              >
                New Message
                <AddIcon className={classes.addIconStyle} />
              </EntreButton>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={12} className={clsx(classes.chatListingWrapper, cardStyle)}>
          {!isFetchingChats && orderedChats.length > 0
            ? (orderedChats.map((chat) => (
              quickViewMode ? (
                <QuickPostCard
                  key={`chatCard_${chat.id}`}
                  thread={chat}
                  goToPost={goToPost}
                  cardStyle={cardStyle}
                  updatedTimeStyle={updatedTimeStyle}
                  userMessageTextStyle={quickViewMode ? classes.userMessageTextStyle : null}
                  userBoxPadding={quickViewMode ? classes.userBoxPadding : null}
                  setDeleteOpen={setDeleteOpen}
                  unreadMessages={notifications[chat.id]}
                  setMarkedForDel={setMarkedForDel}
                />
              ) : (
                <PostCard
                  key={`chatCard_${chat.id}`}
                  thread={chat}
                  goToPost={goToPost}
                  cardStyle={cardStyle}
                  updatedTimeStyle={updatedTimeStyle}
                  updatedTitleStyle={updatedTitleStyle}
                  userMessageTextStyle={quickViewMode ? classes.userMessageTextStyle : null}
                  userBoxPadding={quickViewMode ? classes.userBoxPadding : null}
                  setDeleteOpen={setDeleteOpen}
                  unreadMessages={notifications[chat.id]}
                  setMarkedForDel={setMarkedForDel}
                />

              )
            ))
            ) : (<div>No Chats</div>)}
        </Grid>
        <Dialog
          open={deleteOpen}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Do you want to leave this chat?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The chat will be deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeletePost} color="primary" autoFocus>
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

MessageList.propTypes = {
  type: PropTypes.string,
  setSingleChatView: PropTypes.func.isRequired,
  setToggleSearchWidget: PropTypes.func.isRequired,
  setThreadId: PropTypes.func.isRequired,
  updatedSearchPadding: PropTypes.any,
  cardStyle: PropTypes.any,
  updatedTimeStyle: PropTypes.any,
  updatedTitleStyle: PropTypes.any,
  updatedLoaderStyle: PropTypes.any,
  quickViewMode: PropTypes.bool,
};

MessageList.defaultProps = {
  type: null,
  updatedSearchPadding: null,
  cardStyle: null,
  updatedTimeStyle: null,
  updatedTitleStyle: null,
  updatedLoaderStyle: null,
  quickViewMode: false,
};

export default MessageList;
