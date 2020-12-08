import React, { useState } from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { setFilters } from '../../../common/data/actions';
import IndustryModal from '../new/IndustryModal';


const useStyles = makeStyles(() => ({
  listItem: {
    display: 'flex',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  listItemText: {
    fontSize: 16,
    lineHeight: '35px',
    backgroundColor: '#F3F5F9',
    height: '35px',
    borderRadius: '20px',
    padding: '0 20px',
    textAlign: 'center',
    marginRight: '10px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  },
}));

function IndustriesTags(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { industry, onSelect, editMode } = props;
  const [showIndustryModal = false, setShowIndustryModal] = useState();

  if (!industry) return null;

  const handleIndustryChange = (ind) => {
    onSelect(ind);
    setShowIndustryModal(false);
  };

  const industryOnClick = (event, title) => {
    event.stopPropagation();
    if (editMode) {
      setShowIndustryModal(true);
    } else {
      dispatch(setFilters({
        section: 'posts',
        industry: title,
      }));
      if (window.location.pathname !== '/search') {
        router.push('/search');
      }
    }
  };

  const renderAddButton = () => {
    if (industry.length === 0 && editMode) {
      return (
        <div
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          onClick={() => setShowIndustryModal(true)}
          className={classes.listItemText}
        >
          <AddIcon fontSize="small" style={{ color: '#00C4FF', marginRight: 5, height: 35 }} />
          Add
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={classes.listItem}>
        { renderAddButton() }
        {industry.map((i) => (
          <div
            key={i}
            onKeyPress={() => {}}
            role="button"
            tabIndex="0"
            onClick={(e) => industryOnClick(e, i)}
            className={classes.listItemText}
          >
            {i}
          </div>
        ))}
      </div>
      { editMode
        ? (
          <IndustryModal
            open={showIndustryModal}
            onClose={() => setShowIndustryModal(false)}
            onSelect={handleIndustryChange}
          />
        ) : null }
    </>
  );
}

IndustriesTags.propTypes = {
  industry: PropTypes.array.isRequired,
  editMode: PropTypes.bool,
  onSelect: PropTypes.func,
};

IndustriesTags.defaultProps = {
  editMode: false,
  onSelect: () => {},
};

export default IndustriesTags;
