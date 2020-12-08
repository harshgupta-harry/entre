import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import withAuth from '../../src/helpers/withAuth';
import Profile from '../../src/components/companies/profile/Profile';
import {
  loadCompanyPost,
} from '../../common/data/actions';

function CompanyScreen(props) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.companies.post);
  const { id } = props;
  useEffect(() => {
    if (id) {
      dispatch(loadCompanyPost(id));
    }
  }, [id]);

  if (post) {
    return (
      <Container component="main" maxWidth="md">
        <Grid container justify="center">
          <Grid item sm={10}>
            {post.userId !== null && (
            <Profile
              loadUsername={post.userId}
              companyId={id}
            />
            ) }
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

CompanyScreen.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withAuth(CompanyScreen);
