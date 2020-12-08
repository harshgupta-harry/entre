import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';

import Nav from '../components/Nav';
import QuickChatView from '../components/QuickChatView';
import ZenDesk from '../components/ZenDesk';

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export default (Component, config = {}) => (props) => {
  const loaded = useSelector((state) => state.auth.loaded);
  const token = useSelector((state) => state.auth.token);
  const accountLoaded = useSelector((state) => state.account.loaded);
  const userLoaded = useSelector((state) => state.account.user !== null);
  const completed = useSelector((state) => state.onboarding.completed);
  const [threadId, setThreadId] = React.useState(null);
  const [singleChatView, setSingleChatView] = React.useState(false);

  useEffect(() => {
    if (token && loaded && userLoaded && !completed) {
      router.push('/onboarding');
    }
  }, [token, loaded, userLoaded, completed]);

  if (loaded && accountLoaded) {
    return (
      <>
        { !config.hideNav && <Nav />}
        <Component
          setThreadId={setThreadId}
          setSingleChatView={setSingleChatView}
          {...props}
        />
        <ZenDesk />
        { token && !config.hideChat ? (
          <QuickChatView
            initialThreadId={threadId}
            initialSingleChatView={singleChatView}
          />
        ) : null}
      </>
    );
  }
  return <div style={loaderStyle}><CircularProgress /></div>;
};
