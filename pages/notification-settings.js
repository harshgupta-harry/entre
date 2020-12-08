/* eslint-disable no-param-reassign */
import React from 'react';
import forAllUsers from '../src/helpers/forAllUsers';
import Notifications from '../src/components/settings/Notifications';

function NotificationsScreen() {
  return (
    <Notifications />
  );
}

export default forAllUsers(NotificationsScreen);
