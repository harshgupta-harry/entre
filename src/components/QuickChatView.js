/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import router from 'next/router';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import MessageList from './messages/MessageList';
import ChatView from './messages/ChatView';
import SearchUsers from './messages/SearchUsers';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 80,
    height: '93px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    margin: 20,
  },
  fixedBottomBar: {
    zIndex: 999,
    position: 'fixed',
    right: 10,
    bottom: 0,
    pointerEvents: 'none',
  },
  footerMessages: {
    pointerEvents: 'all',
    // backgroundColor: '#ffffff',
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // maxWidth: '360px',
  },
  msgHeaderSec: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#0B3593',
    height: 50,
    padding: '0 20px',
    borderRadius: '10px 10px 0 0',
    cursor: 'pointer',
  },
  messageIcon: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 5,
  },
  headerTitle: {
    color: '#ffffff',
    marginLeft: 10,
  },
  AddIcon: {
    color: '#ffffff',
    fontSize: 24,
  },
  AddIconBlue: {
    color: '#00C4FF',
    fontSize: 35,
    marginTop: 0,
  },
  closeIcon: {
    color: '#ffffff',
    fontSize: 24,
    marginTop: 10,
  },
  msgBodySec: {
    minHeight: 300,
    backgroundColor: '#FFFFFF',
  },
  updatedSearchPadding: {
    padding: '10px 10px 0 10px',
    border: 'none',
  },
  cardStyle: {
    padding: '10px',
    minHeight: '360px',
    maxHeight: '360px',
  },
  updatedTimeStyle: {
    fontSize: '10px',
  },
  updatedTitleStyle: {
    fontSize: '12px',
  },
  updatedLoaderStyle: {
    display: 'block',
    margin: 'auto',
  },
  updatedChatListingWrapper: {
    padding: '0 0 10px 10px',
    minHeight: '450px',
    maxHeight: '450px',
  },
  updatedHeaderTitle: {
    padding: '10px',
  },
}));

function QuickChatView(props) {
  const classes = useStyles();
  const type = 'messages';
  const { initialThreadId = null, initialSingleChatView = false } = props;
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.account.user);
  const [singleChatView, setSingleChatView] = React.useState(false);
  const [toggleMainWidget, setToggleMainWidget] = React.useState(false);
  const [toggleSearchWidget, setToggleSearchWidget] = React.useState(false);
  const [mainHeaderShow, setMainHeaderShow] = React.useState(false);
  const [threadId, setThreadId] = React.useState(null);

  useEffect(() => {
    async function loadData() {
      if (initialSingleChatView && initialThreadId) {
        await setToggleMainWidget(true);
        await setMainHeaderShow(false);
        await setThreadId(initialThreadId);
        await setSingleChatView(true);
      }
    }
    loadData();
  }, [initialThreadId, initialSingleChatView]);

  const showSearchView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setToggleSearchWidget(true);
  };

  const toggleMainView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setToggleMainWidget(!toggleMainWidget);
  };

  const chatViewHeaderShow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setToggleMainWidget(!toggleMainWidget);
    setMainHeaderShow(!mainHeaderShow);
  };

  const renderChatHeaderBar = () => (
    <Box
      className={classes.msgHeaderSec}
      onClick={() => {
        setToggleMainWidget(!toggleMainWidget);
        setMainHeaderShow(false);
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <SmsOutlinedIcon className={classes.messageIcon} />
        <Typography className={classes.headerTitle}>Messaging</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {toggleMainWidget && !toggleSearchWidget && !singleChatView && (
        <AddIcon
          className={classes.AddIcon}
          onClick={showSearchView}
          style={{ marginRight: 5 }}
        />
        )}
        {toggleMainWidget && (
        <DoubleArrowIcon
          className={classes.AddIcon}
          onClick={toggleMainView}
          style={{ transform: 'rotate(90deg)' }}
        />
        )}
      </Box>
    </Box>
  );

  const renderQuickChat = () => {
    if (router.pathname !== '/inbox'
    && router.pathname !== '/messages'
    && router.pathname !== '/onboarding'
    && router.pathname !== '/event/[id]'
    && token
    && user) {
      return (
        <Grid container spacing={2} className={classes.fixedBottomBar}>
          <Grid item xs={1} sm={7} md={9} />
          <Grid item xs={11} sm={5} md={3} className={classes.footerMessages}>
            {(!singleChatView || mainHeaderShow)
            && renderChatHeaderBar()}
            {toggleMainWidget && (
            <Grid container className={classes.msgBodySec}>
              {singleChatView && threadId ? (
                <ChatView
                  threadId={threadId}
                  setSingleChatView={setSingleChatView}
                  setToggleSearchWidget={setToggleSearchWidget}
                  toggleHeaderShow={chatViewHeaderShow}
                  updatedChatListingWrapper={classes.updatedChatListingWrapper}
                  updatedHeaderTitle={classes.updatedHeaderTitle}
                  updatedLoaderStyle={classes.updatedLoaderStyle}
                  quickViewMode
                />
              ) : (!toggleSearchWidget ? (
                <MessageList
                  type={type}
                  setSingleChatView={setSingleChatView}
                  setToggleSearchWidget={setToggleSearchWidget}
                  setThreadId={setThreadId}
                  updatedSearchPadding={classes.updatedSearchPadding}
                  cardStyle={classes.cardStyle}
                  updatedTimeStyle={classes.updatedTimeStyle}
                  updatedTitleStyle={classes.updatedTitleStyle}
                  updatedLoaderStyle={classes.updatedLoaderStyle}
                  quickViewMode
                />
              ) : (
                <SearchUsers
                  type={type}
                  setSingleChatView={setSingleChatView}
                  setToggleSearchWidget={setToggleSearchWidget}
                  setThreadId={setThreadId}
                  updatedSearchPadding={classes.updatedSearchPadding}
                  cardStyle={classes.cardStyle}
                  updatedTimeStyle={classes.updatedTimeStyle}
                  updatedTitleStyle={classes.updatedTitleStyle}
                  updatedLoaderStyle={classes.updatedLoaderStyle}
                  quickViewMode
                />
              )
              )}
            </Grid>
            )}
          </Grid>
        </Grid>
      );
    } return null;
  };
  if (router !== undefined) {
    return renderQuickChat();
  } return null;
}

export default QuickChatView;
