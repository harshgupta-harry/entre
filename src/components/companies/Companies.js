/* eslint-disable prefer-spread */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filters from '../Filters';
import { loadIndustries, setFilters } from '../../../common/data/actions';
import PostList from './PostList';
import ContentThreeColumns from '../ContentThreeColumns';

function Companies() {
  const dispatch = useDispatch();
  const industries = useSelector((state) => state.account.industries);

  const mergedIndustries = [
    'All',
    ...(industries.map((i) => i.name)),
  ];

  const filters = [
    {
      title: 'Industry',
      name: 'industries',
      options: mergedIndustries,
    },
    {
      title: 'Location',
      name: 'location',
      options: [],
    },
  ];

  useEffect(() => {
    if (industries.length === 0) {
      dispatch(loadIndustries());
    }
  }, []);

  const applyFilter = (selection) => {
    if (selection.name === 'industries') {
      dispatch(setFilters({
        industry: selection.value,
      }));
    }
    if (selection.name === 'location') {
      dispatch(setFilters({
        section: 'events',
        location: selection.value,
      }));
    }
  };

  return (
    <ContentThreeColumns
      left={<Filters items={filters} onChange={applyFilter} />}
      center={<PostList />}
    />
  );
}

export default Companies;
