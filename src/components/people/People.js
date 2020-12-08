import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Filters from '../Filters';
import { loadIndustries, loadTitles, setFilters } from '../../../common/data/actions';
import PeopleList from './PeopleList';
import ContentThreeColumns from '../ContentThreeColumns';

function People() {
  const dispatch = useDispatch();
  const industries = useSelector((state) => state.account.industries);
  const titles = useSelector((state) => state.account.titles);

  const filters = [
    {
      title: 'Title',
      name: 'title',
      options: titles,
    },
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
    if (titles.length === 0) {
      dispatch(loadTitles());
    }
  }, []);

  const applyFilter = (selection) => {
    if (selection.name === 'industry') {
      dispatch(setFilters({
        section: 'people',
        industry: selection.value,
      }));
    }
    if (selection.name === 'location') {
      dispatch(setFilters({
        section: 'people',
        location: selection.value,
      }));
    }
    if (selection.name === 'title') {
      dispatch(setFilters({
        section: 'people',
        title: selection.value,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>
          Entre: Search people
        </title>
      </Head>
      <ContentThreeColumns
        left={<Filters items={filters} onChange={applyFilter} />}
        center={<PeopleList />}
      />
    </>
  );
}

export default People;
