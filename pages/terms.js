/* eslint-disable no-param-reassign */
import React from 'react';
import forAllUsers from '../src/helpers/forAllUsers';
import Terms from '../src/components/settings/Terms';

function TermsScreen() {
  return (
    <Terms />
  );
}

export default forAllUsers(TermsScreen);
