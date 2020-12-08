import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
  // OutlinedInput,
  // InputAdornment,
} from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import SlimCardContent from '../SlimCardContent';
import EntreButton from '../EntreButton';
import MultiSelector from '../MultiSelector';
import {
  loadIndustries,
} from '../../../common/data/actions';


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
  locationInput: {
    fontSize: '16px',
    marginBottom: 20,
  },
  googlePlaces: {
    minHeight: 300,
  },
  locationContainer: {
  },
  locationSuggestion: {
    cursor: 'pointer',
    margin: '0px 10px 20px 10px',
    fontSize: '16px',
  },
  locationSuggestionActive: {
    backgroundColor: 'green',
  },
}));

const IndustryModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const industries = useSelector((state) => state.account.industries);
  const [industry = [], setIndustry] = useState();
  const { open, onClose, onSelect } = props;

  useEffect(() => {
    if (industries.length === 0) {
      dispatch(loadIndustries());
    }
  }, []);

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
            title={<Typography variant="h3">Select Industry</Typography>}
            subheader={<Typography variant="subtitle2">What industries is your content related to?</Typography>}
          />
          <SlimCardContent>
            <div className={classes.googlePlaces}>
              {/* <OutlinedInput
                className={classes.locationInput}
                fullWidth
                value={industry}
                placeholder="Filter industries"
                onChange={(e) => setIndustry(e.target.value)}
                startAdornment={(
                  <InputAdornment position="start">
                    <SearchIcon className={classes.listIcon} style={{ color: '#00C4FF' }} />
                  </InputAdornment>
                )}
              /> */}
              {industries
                ? (
                  <MultiSelector
                    items={industries.map((i) => i.name)}
                    max={3}
                    value={industry}
                    onChange={(i) => setIndustry(i)}
                  />
                ) : null }
            </div>
            <Box align="right">
              <EntreButton
                size="small"
                variant="contained"
                onClick={() => onSelect(industry)}
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

IndustryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

IndustryModal.defaultProps = {
  onClose: () => {},
  onSelect: () => {},
};

export default IndustryModal;
