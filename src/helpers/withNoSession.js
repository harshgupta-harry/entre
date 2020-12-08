import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import router from 'next/router';
import Nav from '../components/Nav';

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export default (Component) => (props) => {
  const token = useSelector((state) => state.auth.token);
  const loaded = useSelector((state) => state.auth.loaded);
  const userLoaded = useSelector((state) => state.account.user !== null);
  const completed = useSelector((state) => state.onboarding.completed);

  useEffect(() => {
    if (token && loaded && userLoaded) {
      if (completed) {
        router.push('/feed');
      } else {
        router.push('/onboarding');
      }
    }
  }, [token, loaded, userLoaded, completed]);

  if (!token && loaded) {
    return (
      <>
        <Nav />
        <Component {...props} />
      </>
    );
  }
  return <div style={loaderStyle}><CircularProgress /></div>;
};
