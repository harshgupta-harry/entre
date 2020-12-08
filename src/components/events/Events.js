/* eslint-disable prefer-spread */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import SignInCard from '../SignInCard';
import EventList from './EventList';
import Filters from '../Filters';
import ContentThreeColumns from '../ContentThreeColumns';

import { loadIndustries, setFilters } from '../../../common/data/actions';
import { discover, lookingFor } from '../../../common/data/otherConstant';

function Events() {
  const dispatch = useDispatch();
  const industries = useSelector((state) => state.account.industries);
  const token = useSelector((state) => state.auth.token);

  const filters = [
    {
      title: 'Industry',
      name: 'industries',
      options: lookingFor.map((i) => i.name),
    },
    {
      title: 'Location',
      name: 'location',
      options: [],
    },
    {
      title: 'Type',
      name: 'eventType',
      options: discover.map((i) => i.name),
    },
  ];

  useEffect(() => {
    if (industries.length === 0) {
      dispatch(loadIndustries());
    }
    // if (titles.length === 0) {
    //   dispatch(loadTitles());
    // }
  }, []);

  const applyFilter = (selection) => {
    if (selection.name === 'industries') {
      dispatch(setFilters({
        industry: selection.value,
      }));
    }
    if (selection.name === 'eventType') {
      dispatch(setFilters({
        section: 'events',
        eventType: selection.value,
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
    <>
      <Head>
        <title>
          Entre: Search events
        </title>
      </Head>
      <ContentThreeColumns
        left={<Filters items={filters} onChange={applyFilter} />}
        center={<EventList />}
        right={token ? null : <SignInCard />}
      />
    </>
  );
}

export default Events;
