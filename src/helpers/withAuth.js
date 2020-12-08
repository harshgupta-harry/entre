import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import router from 'next/router';
import Nav from '../components/Nav';
import QuickChatView from '../components/QuickChatView';
import ZenDesk from '../components/ZenDesk';

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const WithAuth = (Component, config = {}) => (props) => {
  const token = useSelector((state) => state.auth.token);
  const loaded = useSelector((state) => state.auth.loaded);
  const redirect = useSelector((state) => state.auth.redirect);
  const accountLoaded = useSelector((state) => state.account.loaded);
  const completed = useSelector((state) => state.onboarding.completed);
  const [threadId, setThreadId] = React.useState(null);
  const [singleChatView, setSingleChatView] = React.useState(false);

  useEffect(() => {
    if (!loaded) return;
    if (accountLoaded && !token) {
      router.push('/');
    } else if (accountLoaded && completed) {
      if (!window.location.pathname || window.location.pathname === '/onboarding') {
        if (redirect) {
          router.push(redirect);
        } else {
          router.push('/feed');
        }
      }
    } else if (accountLoaded && !completed) {
      router.push('/onboarding');
    }
  }, [token, loaded, completed]);

  if (token && loaded && accountLoaded) {
    return (
      <>
        { !config.hideNav && <Nav />}
        <Component
          {...props}
          setThreadId={setThreadId}
          setSingleChatView={setSingleChatView}
        />
        <ZenDesk />
        { !config.hideChat ? (
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

export default WithAuth;
