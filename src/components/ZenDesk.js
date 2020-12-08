/* eslint-disable react/no-danger */

import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

export default () => {
  const user = useSelector((state) => state.account.user);
  const token = useSelector((state) => state.auth.token);
  if (token && user && user.isPro) {
    return (
      <Head>
        <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=83c149ba-dc10-41e6-990b-19ca07dcee9a" />
      </Head>
    );
  } return null;
};
