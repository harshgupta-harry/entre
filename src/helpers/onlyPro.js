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
  const accountLoaded = useSelector((state) => state.account.loaded);
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    if (token && loaded && accountLoaded && !user.isPro) {
      router.push('/pro');
    }
  }, [token, loaded, accountLoaded]);

  if (token && loaded && accountLoaded && user.isPro) {
    return (
      <>
        <Nav />
        <Component {...props} />
      </>
    );
  }
  return <div style={loaderStyle}><CircularProgress /></div>;
};
