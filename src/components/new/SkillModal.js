import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Card,
  CardHeader,
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import SlimCardContent from '../SlimCardContent';
import EntreButton from '../EntreButton';

import { skillsList } from '../../../common/data/jobConstant';

const useStyles = makeStyles(() => ({
  modal: {
    backgroundColor: '#00000099',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    outline: 'none',
    maxWidth: 700,
  },
  skillsList: {
    maxHeight: '360px',
    overflowX: 'auto',
  },
  skillCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    cursor: 'pointer',
    justifyContent: 'space-between',
    minHeight: 30,
  },
}));

const TagSkillsModal = (props) => {
  const classes = useStyles();
  const [skills = [], setSkills] = useState();
  const [$skillsList = skillsList, setSkillsLIst] = useState();
  const { open, onClose, onSelect } = props;
  const filterSkills = (value) => {
    const list = skillsList.filter((s) => s.name.toLowerCase().includes(value.toLowerCase()));
    setSkillsLIst(list);
  };

  const clearFilter = () => {
    setSkillsLIst(skillsList);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card className={classes.container}>
          <CardHeader
            action={(
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            )}
            title={<Typography variant="h3">Skills</Typography>}
            subheader={<Typography variant="subtitle2">Select which skills you want to tag.</Typography>}
          />
          <SlimCardContent>
            <Box mb={2}>
              <OutlinedInput
                className={classes.locationInput}
                fullWidth
                size="small"
                placeholder="Filter skills"
                onChange={(e) => filterSkills(e.target.value)}
                startAdornment={(
                  <InputAdornment position="start">
                    <SearchIcon className={classes.listIcon} style={{ color: '#00C4FF' }} />
                  </InputAdornment>
                )}
              />
            </Box>
            <div className={classes.skillsList}>
              {$skillsList.map((c) => {
                const user = skills.find((u) => u.id === c.id);
                const selected = typeof user !== 'undefined';
                return (
                  <Box
                    key={c.id}
                    className={classes.skillCard}
                    onClick={() => {
                      if (selected) {
                        setSkills(skills.filter((u) => u.id !== c.id));
                      } else {
                        setSkills([...skills, c]);
                      }
                    }}
                  >
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Typography variant="body2" style={{ fontSize: 14 }}>
                        {c.name}
                      </Typography>
                    </Box>
                    <Box mr={2}>
                      {selected ? <CheckIcon fontSize="small" style={{ color: '#00C4FF' }} /> : null}
                    </Box>
                  </Box>
                );
              })}
            </div>
            <Box mt={2} align="right">
              <EntreButton
                size="small"
                variant="contained"
                onClick={() => {
                  clearFilter();
                  onSelect(skills);
                }}
              >
                Done
              </EntreButton>
            </Box>
          </SlimCardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

TagSkillsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

TagSkillsModal.defaultProps = {
  onClose: () => {},
  onSelect: () => {},
};

export default TagSkillsModal;
