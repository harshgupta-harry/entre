import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import UnblockUserCard from './UnblockUserCard';

import {
  loadBlockedUsers,
} from '../../../common/data/actions';

const BlockedUsers = () => {
  const dispatch = useDispatch();
  const blockedUsers = useSelector((state) => state.people.blocked);
  const loadingBlockedUsers = useSelector((state) => state.people.loadingBlockedUsers);

  useEffect(() => {
    dispatch(loadBlockedUsers());
  }, []);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const renderHeader = () => (
    <Head>
      <title>Entre: Blocked users settings</title>
    </Head>
  );

  const renderLoader = () => (
    <div style={loaderStyle}>
      {renderHeader()}
      <CircularProgress />
    </div>
  );
  if (blockedUsers.length === 0 && loadingBlockedUsers) return renderLoader();
  if (blockedUsers.length === 0 && !loadingBlockedUsers) {
    return (
      <>
        {renderHeader()}
        <div>No blocked users</div>
      </>
    );
  }
  return (
    <>
      {renderHeader()}
      {blockedUsers.map((post) => (
        <UnblockUserCard key={post.id} post={post} />
      ))}
      { loadingBlockedUsers ? renderLoader() : null }
    </>
  );
};

export default BlockedUsers;
