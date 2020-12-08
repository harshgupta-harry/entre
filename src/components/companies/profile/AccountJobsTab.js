import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobCard from '../../jobs/JobCard';
import { loadCompanyJobs } from '../../../../common/data/actions';

const AccountPostTab = (props) => {
  const dispatch = useDispatch();
  const { companyId } = props;
  const loadingPosts = useSelector((state) => state.jobs.loadingPosts);
  const jobs = useSelector((state) => state.jobs.posts);

  useEffect(() => {
    if (companyId) {
      dispatch(loadCompanyJobs(companyId));
    }
  }, [companyId]);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const renderLoader = () => (
    <div style={loaderStyle}><CircularProgress /></div>
  );

  if (jobs.length === 0 && loadingPosts) return renderLoader();
  if (jobs.length === 0 && !loadingPosts) return <div>No posts</div>;
  return (
    <>
      {!loadingPosts && jobs.map((post) => (
        <JobCard key={post.id} post={post} />
      ))}
    </>
  );
};

AccountPostTab.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default AccountPostTab;
