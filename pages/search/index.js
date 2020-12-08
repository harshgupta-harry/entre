import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import forAllUsers from '../../src/helpers/forAllUsers';
import Posts from '../../src/components/content/Posts';
import People from '../../src/components/people/People';
import Deals from '../../src/components/deals/Deals';
import Events from '../../src/components/events/Events';
import Jobs from '../../src/components/jobs/Jobs';
import Companies from '../../src/components/companies/Companies';
import EntreTabs from '../../src/components/EntreTabs';

const sections = [
  { title: 'Content', component: <Posts />, public: false },
  { title: 'People', component: <People />, public: false },
  { title: 'Events', component: <Events />, public: true },
  {
    title: 'Jobs', component: <Jobs />, hide: false, public: false,
  },
  {
    title: 'Companies', component: <Companies />, hide: true, public: false,
  },
  { title: 'Deals', component: <Deals />, public: true },
].filter((s) => !s.hide);

function SearchScreen() {
  const { token, loaded } = useSelector((state) => state.auth);
  const accountLoaded = useSelector((state) => state.account.loaded);
  let sectionsToRender = sections;
  if (loaded && accountLoaded && !token) {
    sectionsToRender = sections.filter((s) => s.public);
  }
  return (
    <Container component="main" maxWidth="lg">
      <EntreTabs tabs={sectionsToRender} />
    </Container>
  );
}

export default forAllUsers(SearchScreen);
