import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInterests } from '../../common/data/actions';
import useStyles from './Styles';
import MultiSelector from '../components/MultiSelector';
// import PropTypes from 'prop-types';

import interests from '../../common/data/interests';

const Interests = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const storeInterests = useSelector((state) => state.onboarding.interests);

  const onSelectionChange = (items) => {
    dispatch(updateInterests(items));
  };

  return (
    <div>
      <div className={classes.h1}>
        What are you looking for?
      </div>
      <div className={classes.instructions}>
        Select up to 3 options
      </div>
      <MultiSelector
        items={interests.map((t) => t.name)}
        max={3}
        value={storeInterests}
        onChange={onSelectionChange}
      />
    </div>
  );
};

Interests.propTypes = {

};

export default Interests;
