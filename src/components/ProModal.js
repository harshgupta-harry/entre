import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';

import Pricing from '../pro/Pricing';

const useStyles = makeStyles(() => ({
  modal: {
    backgroundColor: '#00000099',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    textAlign: 'right',
    overflowX: 'auto',
    backgroundColor: '#FFFFFF',
    maxHeight: '100%',
    padding: 10,
    outline: 'none',
  },
  close: {
    position: 'fixed',
    transform: 'translateX(-100%)',
  },
}));

function ProModal(props) {
  const classes = useStyles();
  const { onClose, visible } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={visible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible}>
          <div className={classes.container}>
            <Button
              className={classes.close}
              onClick={handleClose}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Pricing modal onClose={onClose} />
          </div>
        </Fade>
      </Modal>
    </>
  );
}

ProModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ProModal;
