import { createAction } from 'redux-actions';
import api from '../../api';

export const loadDealsComplete = createAction('LOAD_DEALS_SUCCESS');
export const loadDeals = (filter = null) => createAction('LOAD_DEALS', async (dispatch) => {
  const resp = await api.axiosOther.get(`https://entre-assets.s3.us-east-2.amazonaws.com/perks/perks_${process.env.ENV}.json`, {});
  let deals = resp.data.sort((a, b) => ((a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1));
  if (filter && filter.searchQuery) {
    deals = deals.filter((deal) => (
      [
        deal.title,
        deal.deal,
        deal.subtitle,
        deal.requirements,
        deal.benefits.join(' '),
      ].join(' ')
        .toLowerCase()
        .includes(filter.searchQuery.toLowerCase())
    ));
  }
  if (resp && resp.data) {
    dispatch(loadDealsComplete(deals));
  } else {
    // dispatch(loadDealsFailed(resp.data.error));
  }
});
