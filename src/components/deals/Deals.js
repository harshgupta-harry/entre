/* eslint-disable prefer-spread */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DealBox from './DealBox';
import Filters from '../Filters';
import { loadDeals } from '../../../common/data/actions';
import ContentThreeColumns from '../ContentThreeColumns';
import SignInCard from '../SignInCard';

function Deals() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const token = useSelector((state) => state.auth.token);
  const isPro = user && user.isPro;
  const deals = useSelector((state) => state.deals.list);
  const search = useSelector((state) => state.search);

  const [list = deals, setList] = useState();
  const industries = deals.map((d) => d.industries);
  const filters = [
    {
      title: 'Industry',
      name: 'industries',
      options: Array.from(new Set([].concat.apply([], industries))),
    },
  ];

  useEffect(() => {
    dispatch(loadDeals(search));
  }, [search]);

  const applyFilter = (selection) => {
    const { value } = selection;
    if (value === 'All') {
      setList(deals);
    } else {
      setList(deals.filter((d) => d.industries.indexOf(value) !== -1));
    }
  };

  return (
    <>
      <Head>
        <title>
          Entre: Search deals
        </title>
      </Head>
      <ContentThreeColumns
        left={<Filters items={filters} onChange={applyFilter} />}
        center={list.map((deal) => (
          <Grid key={deal.id} container item xs={6}>
            <DealBox
              deal={deal}
              isUser={typeof (token) !== 'undefined'}
              isPro={isPro}
            />
          </Grid>
        ))}
        right={token ? null : <SignInCard />}
      />
    </>
  );
}

export default Deals;
