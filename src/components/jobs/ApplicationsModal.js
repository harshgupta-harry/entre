import React from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
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
import EntreAvatar from '../EntreAvatar';

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
  userList: {
    maxHeight: '360px',
    overflowX: 'auto',
    padding: 8,
  },
  userCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    cursor: 'pointer',
    justifyContent: 'space-between',
  },
}));

const TagUsersModal = (props) => {
  const classes = useStyles();
  const { open, onClose, applications } = props;

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
            title={<Typography variant="h3" style={{ lineHeight: '50px' }}>Applications</Typography>}
          />
          <SlimCardContent>
            <div className={classes.userList}>
              {applications.map((applicant) => (
                <Box
                  className={classes.userCard}
                  onClick={() => router.push('/profile/[username]', `/profile/${applicant.username}`)}
                >
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <EntreAvatar
                      fullName={applicant.fullName}
                      avatar={applicant.avatar}
                      isPro={applicant.isPro}
                    />
                    <Box ml={1}>
                      <Typography variant="h3">{applicant.fullName}</Typography>
                      <Typography variant="body2" style={{ fontSize: 14 }}>
                        @
                        {applicant.username}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </div>
          </SlimCardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

TagUsersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  applications: PropTypes.array.isRequired,
  onClose: PropTypes.func,
};

TagUsersModal.defaultProps = {
  onClose: () => {},
};

export default TagUsersModal;
