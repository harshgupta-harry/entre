import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  GiftedChat,
  Bubble,
  SystemMessage,
  Composer,
  Send,
  InputToolbar,
} from 'react-web-gifted-chat';
import {
  getChatUsers, initLoadingChat,
  loadChatSuccess,
  sendMessage,
  updateLastRead,
} from '../../../common/data/actions';
import HeaderTitle from './HeaderTitle';
import firebase from '../../firebase';
import 'firebase/firestore';
import { colors } from '../../../common/data/otherConstant';
import EntreAvatar from '../EntreAvatar';
import EntreLink from '../EntreLink';

const firestore = firebase.firestore();

const useStyles = makeStyles(() => ({
  chatListWrapper: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
  },
  chatListingWrapper: {
    padding: '15px 0 15px 0',
    // overflow: 'auto',
    flexDirection: 'row',
    width: '100%',
    minHeight: 500,
    maxHeight: 500,
    height: 'auto',
  },
  msgHeaderSec: {
    backgroundColor: '#0B3593',
    minHeight: 50,
    padding: '0 20px',
    borderRadius: '10px 10px 0 0',
    cursor: 'pointer',
  },
  messageIcon: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 10,
  },
  headerTitle: {
    color: '#ffffff',
    padding: '0 10px',
  },
  AddIcon: {
    color: '#ffffff',
    fontSize: 24,
    marginTop: 10,
  },
  sendIcon: {
    color: '#00C4FF',
    width: '26px',
  },
  singleUserName: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
}));

const ChatView = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.chat);
  const chatParticipants = useSelector((state) => state.chat.chatParticipants);
  const user = useSelector((state) => state.account.user);
  const userAuth = useSelector((state) => state.auth.userAuth);
  const loadingChat = useSelector((state) => state.chat.loadingChat);
  const [isFetchingChat, setIsFetchingChat] = useState(true);
  const {
    threadId,
    setSingleChatView,
    setToggleSearchWidget,
    updatedChatListingWrapper,
    updatedHeaderTitle,
    quickViewMode,
    toggleHeaderShow,
    updatedLoaderStyle,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);

  let displayCounter = 0;

  useEffect(() => {
    let didCancel = false;
    if (!isFetchingChat) {
      return;
    }
    dispatch(initLoadingChat());
    firestore.collection('notifications')
      .doc(user.id)
      .update({
        [`messages.${threadId}`]: firebase.firestore.FieldValue.delete(),
      });

    const unsubscribe = firestore
      .collection('chatsContent')
      .doc(threadId)
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setIsFetchingChat(false);
          return;
        }
        const content = snapshot.data();
        firestore.collection('notifications')
          .doc(user.id)
          .update({
            [`messages.${threadId}`]: firebase.firestore.FieldValue.delete(),
          });
        if (content) {
          // eslint-disable-next-line no-return-assign
          content.messages = content.messages
            .filter((element) => element.createdAt !== undefined)
            // eslint-disable-next-line no-return-assign,no-param-reassign
            .map((message) => ({
              ...message,
              createdAt: message.createdAt.seconds * 1000,
            }))
            .sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : -1));
          dispatch(loadChatSuccess(content));
          dispatch(getChatUsers(content.participants));
        }
        const getLastMessage = content.messages[content.messages.length - 1];
        if (getLastMessage !== undefined) {
          dispatch(
            updateLastRead(
              threadId,
              user.id,
              getLastMessage,
            ),
          );
        }

        if (!didCancel) {
          setIsFetchingChat(false);
        }
      });

    // eslint-disable-next-line consistent-return
    return () => {
      unsubscribe();
      didCancel = true;
    };
  }, []);

  const onLoadEarlier = () => {
    setStep(step + 1);
  };

  const onSend = (newMessage = []) => {
    if (newMessage[0].text && newMessage[0].text.trim()) {
      dispatch(
        sendMessage(
          threadId,
          newMessage[0],
          user,
          chatParticipants,
        ),
      );
      setMessages(GiftedChat.append(messages, newMessage));
    } else {
      // alert('test')
    }
  };

  const parsePatterns = (_linkStyle = null) => [
    {
      pattern: /#(\w+)/,
      style: [{ textDecorationLine: 'underline', color: 'darkorange' }, _linkStyle],
      onPress: () => window.openURL(''),
    },
  ];

  const renderAvatar = (avatrProps) => (
    <EntreLink href="/profile/[username]" as={`/profile/${avatrProps.currentMessage.user.username}`}>
      <EntreAvatar
        size={40}
        user={avatrProps.currentMessage.user}
        avatar={avatrProps.currentMessage.user.avatar}
        fullName={avatrProps.currentMessage.user.fullName}
        isPro={avatrProps.currentMessage.user.isPro}
      />
    </EntreLink>
  );

  const renderBubble = (bubbleProps) => (
    <Bubble
      {...bubbleProps}
      textStyle={{
        left: {
          color: colors.primaryText,
          fontSize: 14,
        },
        right: {
          color: 'white',
          fontSize: 14,
        },
      }}
      timeTextStyle={{
        left: {
          color: colors.primaryText,
          fontSize: 10,
        },
        right: {
          color: 'white',
          fontSize: 10,
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: colors.lightGrey,
        },
        right: {
          backgroundColor: colors.cerulean,
        },
      }}
    />
  );

  const renderSystemMessage = (SystemProps) => (
    <SystemMessage
      {...SystemProps}
      containerStyle={{
        marginBottom: 15,
      }}
      textStyle={{
        fontSize: 14,
        color: 'red',
      }}
    />
  );

  const renderComposer = (ComposerProps) => (
    <Composer
      {...ComposerProps}
      placeholder="Type your message here.."
      textInputStyle={{
        fontSize: 15,
        lineHeight: '120%',
        fontFamily: 'inherit',
        fontWeight: '300',
        color: '#242134',
        // margin: '10px',
        // padding: '10px',
      }}
      c
    />
  );

  const renderInputToolbar = (InputToolbarProps) => (
    <InputToolbar
      {...InputToolbarProps}
      containerStyle={{
        marginTop: 2,
      }}
    />
  );

  const renderSend = (sendProps) => (
    <Send
      {...sendProps}
      containerStyle={{
        cursor: 'pointer',
        width: 35,
        height: 35,
        marginLeft: 10,
      }}
    >
      <SendIcon
        className={classes.sendIcon}
        style={{ width: quickViewMode ? '20px' : '26px' }}
      />
    </Send>
  );

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

  const onTextInputKeyUp = (e) => {
    if (e.key.length === 1) {
      const m = e.target.value;
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const c = m.split('\n').map((s) => s.charAt(0).toUpperCase() + s.substr(1)).join('\n');
      e.target.value = c;
      e.target.selectionStart = start;
      e.target.selectionEnd = end;
    }
  };

  if (chat.id === undefined || loadingChat) return renderLoader();
  const filterChat = chat.messages.filter((element) => element.createdAt !== undefined);
  return (
    <>
      <Grid container spacing={0} className={classes.chatListWrapper}>
        {!quickViewMode ? (
          <HeaderTitle
            setSingleChatView={setSingleChatView}
            setToggleSearchWidget={setToggleSearchWidget}
            thread={chat}
            updatedHeaderTitle={updatedHeaderTitle}
          />
        ) : (
          <Grid
            container
            className={classes.msgHeaderSec}
            alignItems="center"
            onClick={toggleHeaderShow}
          >
            <Grid item xs={1}>
              <ArrowBackIosIcon
                className={classes.AddIcon}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSingleChatView(false);
                  setToggleSearchWidget(false);
                }}
              />
            </Grid>
            <Grid item xs={9} className={classes.headerTitle}>
              {chat.participantsInfo.map((participant, idx) => {
                if (userAuth.uid !== participant.id && idx < 3) {
                  // eslint-disable-next-line no-plusplus
                  displayCounter++;
                  return (
                    <Typography key={participant.id} variant="inherit" component="span" className={classes.singleUserName}>
                      {`${displayCounter > 1 ? ', ' : ''}`}
                      <Link
                        href="/profile/[username]"
                        as={`/profile/${participant.username}`}
                      >
                        <span style={{ color: 'white', textDecoration: 'underline' }}>{participant.fullName}</span>
                      </Link>
                    </Typography>
                  );
                } return null;
              })}
            </Grid>
            <Grid item xs={1} sm={1} align="center">
              {chat.participantsInfo.length > 4 && (
                <Typography
                  variant="body2"
                  component="p"
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    fontSize: '14px',
                    textAlign: 'center',
                    lineHeight: '24px',
                    marginBottom: '5px',
                  }}
                >
                  {`+${chat.participantsInfo.length - 4}`}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1} align="right">
              <DoubleArrowIcon
                className={classes.AddIcon}
                onClick={toggleHeaderShow}
                style={{ transform: 'rotate(90deg)' }}
              />
            </Grid>
          </Grid>
        )}
        <Grid className={clsx(classes.chatListingWrapper, updatedChatListingWrapper)}>
          <GiftedChat
            textInputProps={{
              onKeyUp: onTextInputKeyUp,
            }}
            messages={filterChat}
            onSend={(rawMessages) => onSend(rawMessages)}
            loadEarlier={false}
            onLoadEarlier={onLoadEarlier}
            isLoadingEarlier={isLoadingEarlier}
            parsePatterns={parsePatterns}
            user={{ ...user, name: user.fullName }}
            scrollToBottom
            // onLongPressAvatar={(rawUser) => console.log(JSON.stringify(rawUser))}
            // onPressAvatar={() => console.log('short press')}
            keyboardShouldPersistTaps="never"
            renderAvatar={renderAvatar}
            renderBubble={renderBubble}
            renderSystemMessage={renderSystemMessage}
            inverted
            timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
            isTyping={isTyping}
            // minComposerHeight={80}
            // maxComposerHeight={80}
            renderComposer={renderComposer}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
          />
        </Grid>
      </Grid>

    </>
  );
};

ChatView.propTypes = {
  threadId: PropTypes.string.isRequired,
  setSingleChatView: PropTypes.func.isRequired,
  setToggleSearchWidget: PropTypes.func.isRequired,
  updatedChatListingWrapper: PropTypes.any,
  updatedHeaderTitle: PropTypes.any,
  updatedLoaderStyle: PropTypes.any,
  toggleHeaderShow: PropTypes.func.isRequired,
  quickViewMode: PropTypes.bool,
};

ChatView.defaultProps = {
  updatedChatListingWrapper: null,
  updatedHeaderTitle: null,
  updatedLoaderStyle: null,
  quickViewMode: false,
};

export default ChatView;
