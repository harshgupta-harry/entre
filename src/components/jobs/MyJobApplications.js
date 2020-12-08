import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import newApi from '../../../common/api/newApi';
import MyJobCard from './MyApplication';

const useStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContent: {
    textAlign: 'center',
  },
}));

const ContentList = (props) => {
  const { setThreadId, setSingleChatView } = props;
  const classes = useStyles();
  const [jobApplications = [], setJobApplications] = useState();
  const [loadingJobApplications = false, setLoadingJobApplications] = useState();
  const [hasMoreApplications = false, setHasMoreApplications] = useState();
  const pageSize = 10;

  async function fetchJobApplications() {
    setLoadingJobApplications(true);
    const resp = await newApi.get('job/applied', {});
    const { data } = resp;
    if (data && data.length > 0) {
      setJobApplications([...jobApplications, ...data]);
      setHasMoreApplications(data.length === 10);
    }
    setLoadingJobApplications(false);
  }

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobs = useCallback((p) => {
    fetchJobApplications(pageSize, (p - 1) * pageSize);
  }, [jobApplications]);

  const renderLoader = () => (
    <div className={classes.loader}><CircularProgress /></div>
  );

  const renderEmptyResults = () => (
    <div className={classes.noContent}>You have not applied to any jobs yet.</div>
  );

  if (jobApplications.length === 0 && loadingJobApplications) return renderLoader();
  if (jobApplications.length === 0 && !loadingJobApplications) return renderEmptyResults();

  return (
    <>
      <InfiniteScroll
        style={{ width: '100%' }}
        pageStart={1}
        loadMore={fetchJobs}
        hasMore={hasMoreApplications && !loadingJobApplications}
      >
        {jobApplications.map((jobApplication) => (
          <MyJobCard
            key={jobApplication.id}
            post={jobApplication}
            setThreadId={setThreadId}
            setSingleChatView={setSingleChatView}
          />
        ))}
      </InfiniteScroll>
      { loadingJobApplications ? renderLoader() : null }
    </>
  );
};

ContentList.propTypes = {
  setThreadId: PropTypes.func.isRequired,
  setSingleChatView: PropTypes.func.isRequired,
};

export default ContentList;
