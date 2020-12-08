import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import withAuth from '../src/helpers/withAuth';
import MyJobs from '../src/components/jobs/MyJobs';
import MyJobApplications from '../src/components/jobs/MyJobApplications';
import EntreTabs from '../src/components/EntreTabs';
import ContentThreeColumns from '../src/components/ContentThreeColumns';

function MyJobsScreen(props) {
  const { setThreadId, setSingleChatView } = props;
  const sections = [
    { title: 'My Job Posts', component: <MyJobs /> },
    {
      title: 'My Applications',
      component: <MyJobApplications
        setThreadId={setThreadId}
        setSingleChatView={setSingleChatView}
      />,
    },
  ].filter((s) => !s.hide);

  return (
    <Container component="main" maxWidth="lg">
      <Head>
        <title>
          Entre: My Jobs
        </title>
      </Head>
      <ContentThreeColumns
        center={<EntreTabs fullWidth tabs={sections} style={{ width: '60%' }} />}
      />
    </Container>
  );
}

MyJobsScreen.propTypes = {
  setThreadId: PropTypes.func.isRequired,
  setSingleChatView: PropTypes.func.isRequired,
};


export default withAuth(MyJobsScreen);
