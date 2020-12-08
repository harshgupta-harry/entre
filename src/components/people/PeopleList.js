import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Card, Box, Button, Typography,
} from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import PeopleCard from './PeopleCard';
import {
  loadPeople,
  resetPeople,
  setFilters,
} from '../../../common/data/actions';

const PeopleList = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);
  const loadingPeople = useSelector((state) => state.people.loadingPeople);
  const hasMorePeople = useSelector((state) => state.people.hasMorePeople);
  const search = useSelector((state) => state.search);
  const pageSize = 10;

  useEffect(() => {
    dispatch(resetPeople());
    dispatch(loadPeople(pageSize, 0, search));
  }, [search]);

  const fetchPeople = useCallback((p) => {
    dispatch(loadPeople(pageSize, (p - 1) * pageSize, search));
  }, [search]);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  };

  const setFilter = (peopleFilter) => {
    dispatch(setFilters({
      section: 'people',
      peopleFilter,
    }));
  };

  const renderFilters = () => (
    <Card style={{ width: '100%', marginBottom: 10, height: 48 }}>
      <Box flex={1} margin="5px">
        <Button onClick={() => setFilter('popular')}>
          <WhatshotIcon style={{ color: search.peopleFilter === 'popular' ? '#51caf9' : '#BDBDBD', marginRight: 10 }} />
          <Typography
            variant="body2"
            style={{
              textTransform: 'capitalize',
              color: search.peopleFilter === 'popular' ? '#51caf9' : '#BDBDBD',
            }}
          >
            Popular
          </Typography>
        </Button>
        <Button onClick={() => setFilter('newest')}>
          <NewReleasesIcon style={{ color: search.peopleFilter === 'newest' ? '#51caf9' : '#BDBDBD', marginRight: 10 }} />
          <Typography
            variant="body2"
            style={{
              textTransform: 'capitalize',
              color: search.peopleFilter === 'newest' ? '#51caf9' : '#BDBDBD',
            }}
          >
            Newest
          </Typography>
        </Button>
      </Box>
    </Card>
  );

  const renderLoader = () => (
    <>
      { renderFilters() }
      <div style={loaderStyle}><CircularProgress /></div>
    </>
  );

  if (people.length === 0 && loadingPeople) return renderLoader();
  if (people.length === 0 && !loadingPeople) return <div>No people</div>;
  return (
    <>
      { renderFilters() }
      <InfiniteScroll
        style={{ width: '100%' }}
        pageStart={1}
        loadMore={fetchPeople}
        hasMore={hasMorePeople && !loadingPeople}
      >
        {people.map((post) => (
          <PeopleCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      { loadingPeople ? <div style={loaderStyle}><CircularProgress /></div> : null }
    </>
  );
};

export default PeopleList;
