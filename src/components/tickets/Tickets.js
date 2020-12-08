/* eslint-disable prefer-spread */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, CircularProgress } from '@material-ui/core';
import TicketBox from './TicketBox';
import { loadTickets } from '../../../common/data/actions';
import ContentThreeColumns from '../ContentThreeColumns';

function Tickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.list);
  const loadingTickets = useSelector((state) => state.tickets.loading);

  useEffect(() => {
    dispatch(loadTickets());
  }, []);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  };

  const renderLoader = () => (
    <div style={loaderStyle}><CircularProgress /></div>
  );


  const renderList = () => {
    if (tickets.length === 0 && loadingTickets) return renderLoader();
    if (tickets.length === 0 && !loadingTickets) return <Typography align="center">You have not bought any tickets yet</Typography>;
    return (
      <ContentThreeColumns
        center={tickets.map((ticket) => (
          <TicketBox ticket={ticket} />
        ))}
      />
    );
  };

  return (
    <>
      <Head>
        <title>
          Entre: My Events
        </title>
      </Head>
      { renderList() }
    </>
  );
}

export default Tickets;
