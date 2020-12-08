/* eslint-disable prefer-spread */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import PostList from './PostList';
import Filters from '../Filters';
import ContentThreeColumns from '../ContentThreeColumns';

import { loadIndustries, setFilters } from '../../../common/data/actions';

function Posts() {
  const dispatch = useDispatch();
  const industries = useSelector((state) => state.account.industries);

  const filters = [
    {
      title: 'Industry',
      name: 'industry',
      options: industries.map((i) => i.name),
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
    if (selection.name === 'industry') {
      dispatch(setFilters({
        section: 'posts',
        industry: selection.value,
      }));
    }
    if (selection.name === 'location') {
      dispatch(setFilters({
        section: 'posts',
        location: selection.value,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>
          Entre: Search content
        </title>
      </Head>
      <ContentThreeColumns
        left={<Filters items={filters} onChange={applyFilter} />}
        center={<PostList />}
      />
    </>
  );
}

export default Posts;
