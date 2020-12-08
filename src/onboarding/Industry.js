import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadIndustries, updateIndustries } from '../../common/data/actions';
import useStyles from './Styles';
import MultiSelector from '../components/MultiSelector';
// import PropTypes from 'prop-types';

const Industry = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const industries = useSelector((state) => state.account.industries);
  const storeIndustries = useSelector((state) => state.onboarding.industries);

  useEffect(() => {
    if (industries.length === 0) {
      dispatch(loadIndustries());
    }
  });

  const onSelectionChange = (items) => {
    dispatch(updateIndustries(items));
  };

  return (
    <div>
      <div className={classes.h1}>
        What industry are you in?
      </div>
      <div className={classes.instructions}>
        Select up to 3 options
      </div>
      {industries.length
        ? (
          <MultiSelector
            items={industries.map((i) => i.name)}
            max={3}
            value={storeIndustries}
            onChange={onSelectionChange}
          />
        )
        : <CircularProgress className={classes.loader} />}
    </div>
  );
};

Industry.propTypes = {

};

export default Industry;
