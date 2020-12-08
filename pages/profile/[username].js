import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import forAllUsers from '../../src/helpers/forAllUsers';
import Profile from '../../src/profile/Profile';

function ProfileScreen(props) {
  const { username, setThreadId, setSingleChatView } = props;
  return (
    <Container component="main" maxWidth="lg">
      <Profile
        loadUsername={username}
        setThreadId={setThreadId}
        setSingleChatView={setSingleChatView}
      />
    </Container>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return { props: { username: params.username } };
}

ProfileScreen.propTypes = {
  username: PropTypes.string,
  setThreadId: PropTypes.func.isRequired,
  setSingleChatView: PropTypes.func.isRequired,
};

ProfileScreen.defaultProps = {
  username: null,
};

export default forAllUsers(ProfileScreen);
