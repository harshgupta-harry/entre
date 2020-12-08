import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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
import CheckIcon from '@material-ui/icons/Check';

import InfiniteScroll from 'react-infinite-scroller';
import SlimCardContent from '../SlimCardContent';
import EntreButton from '../EntreButton';
import EntreAvatar from '../EntreAvatar';
import admins from '../../../common/data/admins';
import api from '../../../common/api/newApi';

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
    height: '360px',
    overflowX: 'auto',
  },
  userCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    cursor: 'pointer',
    justifyContent: 'space-between',
  },
  // locationInput: {
  //   fontSize: '16px',
  //   marginBottom: 20,
  // },
}));

const TagUsersModal = (props) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.account.user);
  const [connections = [], setConnections] = useState();
  const [loadingPosts = false, setLoadingPosts] = useState();
  const [hasMorePosts = false, setHasMorePosts] = useState();
  const pageSize = 5;
  const [users = [], setUsers] = useState();
  const { open, onClose, onSelect } = props;

  async function fetchUserPosts(limit = pageSize, offset = 0) {
    setLoadingPosts(true);
    const resp = await api.get(`user/connections?limit=${limit}&offset=${offset}`, {});
    const { data } = resp;
    if (data && data.length) {
      setConnections([...connections, ...data]);
      setHasMorePosts(data.length === pageSize);
    } else {
      setHasMorePosts(false);
    }
    setLoadingPosts(false);
  }

  useEffect(() => {
    fetchUserPosts();
  }, []);


  const fetchConnections = useCallback((p) => {
    fetchUserPosts(pageSize, (p - 1) * pageSize);
  }, [connections]);

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
            title={<Typography variant="h3">Tag users</Typography>}
            subheader={<Typography variant="subtitle2">Select which connections you want to tag.</Typography>}
          />
          <Box m="0px 20px 20px 10px">
            {admins.includes(currentUser.id) ? (
              <EntreButton
                size="small"
                fullWidth
                variant="contained"
                onClick={() => {
                  setUsers(connections);
                }}
              >
                Select all
              </EntreButton>
            ) : null}
          </Box>
          <SlimCardContent>
            <div className={classes.userList}>
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
              <InfiniteScroll
                style={{ width: '100%' }}
                pageStart={1}
                hasMore={hasMorePosts && !loadingPosts}
                loadMore={fetchConnections}
                useWindow={false}
              >
                {connections.map((c) => {
                  const user = users.find((u) => u.id === c.id);
                  const selected = typeof user !== 'undefined';
                  return (
                    <Box
                      className={classes.userCard}
                      onClick={() => {
                        if (selected) {
                          setUsers(users.filter((u) => u.id !== c.id));
                        } else {
                          setUsers([...users, c]);
                        }
                      }}
                    >
                      <Box display="flex" flexDirection="row" alignItems="center">
                        <EntreAvatar fullName={c.fullName} avatar={c.avatar} isPro={c.isPro} />
                        <Box ml={1}>
                          <Typography variant="h3">{c.fullName}</Typography>
                          <Typography variant="body2" style={{ fontSize: 14 }}>
                            @
                            {c.username}
                          </Typography>
                        </Box>
                      </Box>
                      <Box mr={2}>
                        {selected ? <CheckIcon style={{ color: '#00C4FF' }} /> : null}
                      </Box>
                    </Box>
                  );
                })}
              </InfiniteScroll>
            </div>
            <Box align="right">
              <EntreButton
                size="small"
                variant="contained"
                onClick={() => onSelect(users)}
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

TagUsersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

TagUsersModal.defaultProps = {
  onClose: () => {},
  onSelect: () => {},
};

export default TagUsersModal;
