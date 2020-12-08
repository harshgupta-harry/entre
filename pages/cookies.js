/* eslint-disable no-param-reassign */
import React from 'react';
import forAllUsers from '../src/helpers/forAllUsers';
import Cookies from '../src/components/settings/Cookies';

function CookiesScreen() {
  return (
    <Cookies />
  );
}

export default forAllUsers(CookiesScreen);
