import React from 'react';
import Container from '@material-ui/core/Container';
import withAuth from '../src/helpers/withAuth';
import Account from '../src/components/settings/Account';
import Terms from '../src/components/settings/Terms';
import Privacy from '../src/components/settings/Privacy';
import Cookies from '../src/components/settings/Cookies';
import EntreTabs from '../src/components/EntreTabs';

const sections = [
  { title: 'Account', component: <Account /> },
  { title: 'Terms and conditions', component: <Terms /> },
  { title: 'Privacy', component: <Privacy /> },
  { title: 'Cookies', component: <Cookies /> },
].filter((s) => !s.hide);

function SettingsScreen() {
  return (
    <Container component="main" maxWidth="lg">
      <EntreTabs tabs={sections} />
    </Container>
  );
}

export default withAuth(SettingsScreen);
