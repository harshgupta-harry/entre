import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import withAuth from '../../src/helpers/withAuth';
import GoBackSection from '../../src/components/GoBackSection';
import {
  loadJobPost,
} from '../../common/data/actions';
import JobDetailCard from '../../src/components/jobs/JobDetailCard';

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
};

function JobScreen(props) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.jobs.post);
  const loadingPost = useSelector((state) => state.jobs.loadingPost);

  const { id } = props;

  useEffect(() => {
    if (id) {
      dispatch(loadJobPost(id));
    }
  }, [id]);

  if (post) {
    return (
      <Container component="main" maxWidth="md">
        <Grid container justify="center">
          <Grid item sm={8}>
            <Box mb={2}>
              <GoBackSection />
            </Box>
            { loadingPost ? <div style={loaderStyle}><CircularProgress /></div> : null }
            {post && !loadingPost && <JobDetailCard post={post} detail />}
          </Grid>
        </Grid>
      </Container>
    );
  }
  return null;
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return { props: { id: params.id } };
}

JobScreen.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withAuth(JobScreen);
