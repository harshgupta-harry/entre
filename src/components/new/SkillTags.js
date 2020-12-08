import React, { useState } from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { setFilters } from '../../../common/data/actions';
import SkillModal from './SkillModal';

const useStyles = makeStyles(() => ({
  listItem: {
    display: 'flex',
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

function SkillTags(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { skill, onSelect, editMode } = props;
  const [showSkillsModal = false, setShowSkillsModal] = useState();

  if (!skill) return null;

  const handleSkillChange = (ind) => {
    onSelect(ind.map((s) => s.name));
    setShowSkillsModal(false);
  };

  const skillOnClick = (event, title) => {
    event.stopPropagation();
    if (editMode) {
      setShowSkillsModal(true);
    } else {
      dispatch(setFilters({
        section: 'posts',
        skill: title,
      }));
      if (window.location.pathname !== '/search') {
        router.push('/search');
      }
    }
  };

  const renderAddButton = () => {
    if (skill.length === 0 && editMode) {
      return (
        <div
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          onClick={() => setShowSkillsModal(true)}
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
        {skill.map((i) => (
          <div
            key={i}
            onKeyPress={() => {}}
            role="button"
            tabIndex="0"
            onClick={(e) => skillOnClick(e, i)}
            className={classes.listItemText}
          >
            {i}
          </div>
        ))}
      </div>
      { editMode
        ? (
          <SkillModal
            open={showSkillsModal}
            onClose={() => setShowSkillsModal(false)}
            onSelect={handleSkillChange}
          />
        ) : null }
    </>
  );
}

SkillTags.propTypes = {
  skill: PropTypes.array.isRequired,
  editMode: PropTypes.bool,
  onSelect: PropTypes.func,
};

SkillTags.defaultProps = {
  editMode: false,
  onSelect: () => {},
};

export default SkillTags;
