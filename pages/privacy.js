/* eslint-disable no-param-reassign */
import React from 'react';
import forAllUsers from '../src/helpers/forAllUsers';
import Privacy from '../src/components/settings/Privacy';

function PrivacyScreen() {
  return (
    <Privacy />
  );
}

export default forAllUsers(PrivacyScreen);
