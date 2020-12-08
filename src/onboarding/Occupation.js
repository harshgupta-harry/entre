import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadTitles, updateTitles } from '../../common/data/actions';
import useStyles from './Styles';
import MultiSelector from '../components/MultiSelector';
// import PropTypes from 'prop-types';

const Occupation = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const titles = useSelector((state) => state.account.titles);
  const storeTitles = useSelector((state) => state.onboarding.titles);

  useEffect(() => {
    if (titles.length === 0) {
      dispatch(loadTitles());
    }
  });

  const onSelectionChange = (items) => {
    dispatch(updateTitles(items));
  };

  return (
    <div>
      <div className={classes.h1}>
        How would you best describe yourself currently?
      </div>
      <div className={classes.instructions}>
        Select up to 3 options
      </div>
      {titles.length
        ? (
          <MultiSelector
            items={titles}
            max={3}
            value={storeTitles}
            onChange={onSelectionChange}
          />
        )
        : <CircularProgress className={classes.loader} />}
    </div>
  );
};

Occupation.propTypes = {

};

export default Occupation;
