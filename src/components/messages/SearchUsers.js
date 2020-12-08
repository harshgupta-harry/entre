import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import 'firebase/firestore';
import UserOption from './UserOption';
import { createChat } from '../../../common/data/actions';
import api from '../../../common/api/newApi';
import EntreButton from '../EntreButton';

const useStyles = makeStyles(() => ({
  commonHeaderMessagePad: {
    padding: '10px 20px',
    borderBottom: '0.6px solid #E7E7E7',
  },
  chatListWrapper: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
  },
  addIconStyle: {
    fontSize: 40,
  },
  backIconStyle: {
    fontSize: '23px',
    cursor: 'pointer',
    color: '#33CCFF',
  },
  searchBar: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    height: '55px',
    background: '#FAFAFA',
    boxSizing: 'border-box',
    borderRadius: '10px',
  },
  searchIcon: {
    position: 'absolute',
    marginLeft: 15,
    color: '#00C4FF',
    fontSize: '26px',
  },
  closeIcon: {
    position: 'absolute',
    color: '#00C4FF',
    right: '5px',
    fontSize: '22px',
    cursor: 'pointer',
  },
  searchInput: {
    position: 'absolute',
    backgroundColor: 'transparent',
    border: 0,
    width: '100%',
    height: '50px',
    fontSize: 16,
    lineHeight: '16px',
    padding: 10,
    paddingLeft: 50,
    color: '#000',
  },
  chatListingWrapper: {
    padding: '15px 15px',
    overflow: 'auto',
    flexDirection: 'row',
    width: '100%',
    height: 350,
  },
  singleUserName: {
    color: '#000000',
    fontWeight: 600,
  },
  chatListingFooter: {
    padding: '15px 40px 15px',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: 20,
  },
  chatInputBarWrapper: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    maxWidth: '458px',
    height: '55px',
    background: '#fffffff',
    boxSizing: 'border-box',
    borderRadius: '10px',
  },
  chatUserImg: {
    width: '55px',
    height: '55px',
    borderRadius: 7,
  },
  sendIcon: {
    color: '#00C4FF',
    width: '28px',
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(-50%, -50%)',
  },
  attachImgIcon: {
    color: '#78849E',
    width: '28px',
    position: 'absolute',
    top: '50%',
    right: '40px',
    transform: 'translate(-50%, -50%)',
  },
  chatInput: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    border: 0,
    width: '100%',
    height: '50px',
    fontSize: 18,
    lineHeight: '18px',
    padding: 10,
    paddingRight: 85,
    color: '#000',
  },
  smallButtonView: {
    padding: '3px 5px',
    fontSize: '12px',
    margin: 0,
    textTransform: 'capitalize',
    width: 90,
  },
}));

const SearchUsers = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector((state) => state.account.user);
  const [query, setQuery] = useState('');
  const [hasMorePosts = false, setHasMorePosts] = useState();
  const [loadingPosts = false, setLoadingPosts] = useState();
  const [connections = [], setConnections] = useState();
  const [selectedUsers = [], setSelectedUsers] = useState();

  const {
    type,
    setSingleChatView,
    setThreadId,
    updatedSearchPadding,
    cardStyle,
    updatedTitleStyle,
    setToggleSearchWidget,
    quickViewMode,
  } = props;
  const pageSize = 6;

  if (type !== 'messages') {
    return null;
  }

  async function fetchUserPosts(limit = pageSize, offset = 0, reset = false) {
    setLoadingPosts(true);
    const resp = await api.get(`user/connections?limit=${limit}&offset=${offset}&search=${query}`, {});
    const { data } = resp;
    if (data && data.length) {
      if (reset) {
        setConnections(data);
      } else {
        setConnections([...connections, ...data]);
      }
      setHasMorePosts(data.length === pageSize);
    } else {
      setHasMorePosts(false);
    }
    setLoadingPosts(false);
  }

  const fetchConnections = useCallback((p) => {
    fetchUserPosts(pageSize, (p - 1) * pageSize);
  }, [connections]);

  useEffect(() => {
    if (connections.length === 0) {
      fetchUserPosts(undefined, undefined, true);
    }
  }, [connections, query]);

  const handleSetQuery = (text) => {
    setQuery(text);
    setConnections([]);
  };

  function toggleSelection(item) {
    const selected = selectedUsers.find((u) => u.id === item.id);
    if (!selected) {
      setSelectedUsers([...selectedUsers, item]);
    } else {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== item.id));
    }
  }

  async function handleCreateChat() {
    if (selectedUsers.length > 0) {
      selectedUsers.push(user);
      const chatId = await dispatch(createChat(selectedUsers));
      await setThreadId(chatId);
      await setSingleChatView(true);
    } else {
      alert('Please select a user');
    }
  }

  const handleTextFieldKeyDown = async (event) => {
    switch (event.key) {
      case 'Enter':
        await handleSetQuery(query);
        break;
      case 'Escape':
        await handleSetQuery('');
        break;
      default: break;
    }
  };

  return (
    <>
      <Grid container spacing={0} className={classes.chatListWrapper}>
        <Grid
          container
          spacing={0}
          className={clsx(classes.commonHeaderMessagePad, updatedSearchPadding)}
          alignItems="center"
        >
          <Box display="flex" flex="1" alignItems="center" gap="10px">
            <Box>
              <ArrowBackIosIcon
                className={classes.backIconStyle}
                onClick={() => setToggleSearchWidget(false)}
                style={{ fontSize: quickViewMode ? '21px' : '23px' }}
              />
            </Box>
            <Box
              className={classes.searchBar}
              display={['flex', 'flex', 'flex', 'flex', 'flex']}
              style={{ height: quickViewMode ? '35px' : '55px' }}
            >
              <input
                className={classes.searchInput}
                style={{
                  height: quickViewMode ? '35px' : '50px',
                  fontSize: quickViewMode ? '14px' : '16px',
                }}
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleTextFieldKeyDown}
              />
              <SearchIcon
                className={classes.searchIcon}
                style={{ fontSize: quickViewMode ? '20px' : '26px' }}
              />
              {query
                && (
                  <CloseIcon
                    className={classes.closeIcon}
                    onClick={() => handleSetQuery('')}
                  />
                )}
            </Box>
            <Box ml={2}>
              <EntreButton
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleCreateChat()}
                tabIndex="-1"
                className={quickViewMode && classes.smallButtonView}
              >
                Create Chat
              </EntreButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} className={[classes.chatListingWrapper, cardStyle]}>
          { loadingPosts && connections.length === 0 && (
            <Box align="center">
              <CircularProgress />
            </Box>
          )}
          { connections.length > 0 && (
            <InfiniteScroll
              style={{ width: '100%' }}
              pageStart={1}
              hasMore={hasMorePosts && !loadingPosts}
              loadMore={fetchConnections}
              useWindow={false}
            >
              {connections.map((item) => (
                <UserOption
                  key={item.id}
                  user={item}
                  isSelected={selectedUsers.find((u) => u.id === item.id)}
                  onPress={() => toggleSelection(item)}
                  updatedTitleStyle={updatedTitleStyle}
                />
              ))}
            </InfiniteScroll>
          ) }
        </Grid>
      </Grid>
    </>
  );
};

SearchUsers.propTypes = {
  type: PropTypes.string,
  setSingleChatView: PropTypes.func.isRequired,
  setToggleSearchWidget: PropTypes.func.isRequired,
  setThreadId: PropTypes.func.isRequired,
  updatedSearchPadding: PropTypes.any,
  cardStyle: PropTypes.any,
  updatedTitleStyle: PropTypes.any,
  quickViewMode: PropTypes.bool,
};

SearchUsers.defaultProps = {
  type: null,
  updatedSearchPadding: null,
  cardStyle: null,
  updatedTitleStyle: null,
  quickViewMode: false,
};

export default SearchUsers;
