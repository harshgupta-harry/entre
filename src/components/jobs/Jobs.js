/* eslint-disable prefer-spread */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Filters from '../Filters';
import { loadIndustries, setFilters } from '../../../common/data/actions';
import JobList from './JobList';
import { experienceList, contractList } from '../../../common/data/jobConstant';
import ContentThreeColumns from '../ContentThreeColumns';

function Jobs() {
  const dispatch = useDispatch();
  const industries = useSelector((state) => state.account.industries);

  // const mergedIndustries = [
  //   'All',
  //   ...(industries.map((i) => i.name)),
  // ];

  // const mergedContractList = [
  //   'All',
  //   ...(contractList.map((i) => i.name)),
  // ];

  // const mergedExperienceList = [
  //   'All',
  //   ...(experienceList.map((i) => i.name)),
  // ];

  const filters = [
    {
      title: 'Industry',
      name: 'industries',
      options: industries.map((i) => i.name),
    },
    {
      title: 'Location',
      name: 'location',
      options: [],
    },
    {
      title: 'Job Type',
      name: 'contract',
      options: contractList.map((i) => i.name),
    },
    {
      title: 'Exprience',
      name: 'exprience',
      options: experienceList.map((i) => i.name),
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
    if (selection.name === 'exprience') {
      dispatch(setFilters({
        section: 'events',
        exprience: selection.value,
      }));
    }
    if (selection.name === 'location') {
      dispatch(setFilters({
        section: 'events',
        location: selection.value,
      }));
    }
    if (selection.name === 'contract') {
      dispatch(setFilters({
        section: 'events',
        contract: selection.value,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>
          Entre: Search jobs
        </title>
      </Head>
      <ContentThreeColumns
        left={<Filters items={filters} onChange={applyFilter} />}
        center={<JobList />}
      />
    </>
  );
}

export default Jobs;
