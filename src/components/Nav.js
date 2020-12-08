/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';
import router from 'next/router';
import Link from 'next/link';
import Img from 'react-cool-img';
import NotificationsComponent from './NotificationsComponent';
import theme from '../theme';
import { logOut, setFilters } from '../../common/data/actions';

const useStyles = makeStyles(() => ({
  main: {
    position: 'fixed',
    height: '55px',
    // top: 41,
    top: 0,
    left: '0px',
    right: '0px',
    background: '#FFFFFF',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    zIndex: 2,
  },
  // topRibbon: {
  //   position: 'fixed',
  //   top: 0,
  //   backgroundColor: '#00C4FF',
  //   textAlign: 'center',
  //   padding: 10,
  //   width: '100%',
  //   zIndex: 2,
  // },
  container: {
    maxWidth: 1280,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    margin: '0px auto',
  },
  menuButton: {
    marginLeft: 20,
  },
  menuAndLogo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  logoContainer: {
    padding: '10px 0 10px 0',
    height: '100%',
    cursor: 'pointer',
  },
  logo: {
    height: '100%',
  },
  logoDrawer: {
    width: '100px',
    margin: '30px auto',
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    width: '70vw',
  },
  buttonDrawer: {
    borderBottom: '1px solid #00000033',
    padding: 20,
  },
  hr: {
    backgroundImage: 'url(/images/gradient.png)',
    width: '100%',
    height: '5px',
    backgroundRepeatX: 'no-repeat',
    backgroundSize: 'cover',
  },
  button: {
    // margin: '0px 5px',
    textAlign: 'center',
  },
  actions: {
    marginRight: 20,
  },
  profileImageContainer: {
    position: 'relative',
    width: 170,
    margin: '0 auto',
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: '12.5%',
    objectFit: 'cover',
    background: '#CCC',
  },
  profileContainer: {
    textAlign: 'center',
    padding: 20,
    background: '#2A2E43',
    color: '#FFF',
    position: 'relative',
  },
  profileName: {
    margin: '10px 0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileDropdown: {
    position: 'absolute',
    right: -5,
    bottom: -5,
  },
  profileButtonDrawer: {
    position: 'absolute',
    right: '0px',
    bottom: '0px',
  },
  proBadgeSmall: {
    fontSize: 8,
    backgroundColor: '#0B3593',
    borderRadius: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'absolute',
    padding: '1px 5px',
    bottom: 0,
    fontStyle: 'italic',
    left: 0,
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
  },
  proBadgeDrawer: {
    right: 10,
    top: 10,
    padding: '3px 10px',
    bottom: 'auto',
    left: 'auto',
  },
  avatarLarge: {
    width: 40,
    height: 40,
    borderRadius: '12.5%',
  },
  searchBar: {
    width: '35%',
    maxWidth: '458px',
    marginLeft: 200,
  },
  searchIcon: {
    color: '#00C4FF',
  },
  buttonAuth: {
    marginRight: 20,
  },
  newContentButton: {
    margin: -2,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
  },
  newBtnText: {
    fontSize: '13px',
    lineHeight: '13px',
    textTransform: 'capitalize',
    fontWeight: 'normal',
    marginTop: '2px',
  },
}));

const Nav = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.account.user);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const [drawerOpen = false, setDrawerOpen] = useState();
  const [profileMenuOpen = false, setProfileMenuOpen] = useState();
  const [newContentMenuOpen = false, setNewContentMenuOpen] = useState();
  const [drawerProfileMenuOpen = false, setDrawerProfileMenuOpen] = useState();
  const classes = useStyles(theme);
  const profileMenuRef = React.useRef(null);
  const newContentMenuRef = React.useRef(null);

  const profileMenuSections = [
    { label: 'My Profile', path: `/profile/${user && user.username}` },
    { label: 'Pro Account', path: '/entre-pro-account', hidden: (user && !user.isPro) },
    { label: 'Entre Pro', path: '/pro', hidden: (user && user.isPro) },
    { label: 'My Events', path: '/mytickets' },
    { label: 'My Jobs', path: '/myjobs' },
    { label: 'Learn', path: 'https://blog.joinentre.com/learn' },
    { label: 'About', path: '/about' },
    { label: 'Support', path: 'mailto:support@joinentre.com' },
    { label: 'Settings', path: '/settings' },
    { component: <hr />, hideInDrawer: true },
    { label: 'Log Out', action: logOut() },
  ].filter((s) => !s.hidden);

  const sections = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Entre Pro', path: '/pro', hidden: (user && user.isPro) },
    { label: 'Learn', path: 'https://blog.joinentre.com/learn' },
    { label: 'Login/SignUp', path: '/' },
  ].filter((s) => !s.hidden);

  const handleNewContentMenuToggle = () => {
    setNewContentMenuOpen((prevOpen) => !prevOpen);
  };

  const authSections = [
    {
      label: 'Home',
      path: '/',
      component: <HomeIcon fontSize="small" style={{ color: (window.location.pathname === '/feed') ? '#00C4FF' : '#B3B3B3' }} />,
    },
    {
      label: 'Search',
      path: '/search',
      component: <SearchIcon fontSize="small" style={{ color: (window.location.pathname === '/search') ? '#00C4FF' : '#B3B3B3' }} />,
    },
    {
      label: 'New',
      path: '/new',
      props: {
        ref: newContentMenuRef,
        'aria-controls': newContentMenuOpen ? 'menu-list-grow' : undefined,
        'aria-haspopup': 'true',
        onClick: handleNewContentMenuToggle,
      },
      component: <AddCircleIcon fontSize="large" style={{ color: '#00C4FF' }} />,
    },
    {
      label: 'Inbox',
      path: '/inbox',
      component: <NotificationsComponent />,
    },
  ].filter((s) => !s.hidden);

  const initialSections = token ? authSections : sections;
  const [drawerSections = initialSections, setDrawerSections] = useState();
  const [query = searchQuery, setQuery] = useState();

  const openLink = (section) => {
    if (section.path) {
      if (section.path.startsWith('https') || section.path.startsWith('mailto:')) {
        window.open(
          section.path,
          '_blank',
        );
      } else {
        router.push(section.path);
      }
    } else if (section.action !== null) {
      dispatch(section.action);
    }
    dispatch(setFilters({
      searchQuery: '',
    }));
    setProfileMenuOpen(false);
    setNewContentMenuOpen(false);
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen((prevOpen) => !prevOpen);
  };

  const handleProfileMenuClose = (event) => {
    if (profileMenuRef.current && profileMenuRef.current.contains(event.target)) {
      return;
    }
    setProfileMenuOpen(false);
  };

  const handleNewContentMenuClose = (event) => {
    if (newContentMenuRef.current && newContentMenuRef.current.contains(event.target)) {
      return;
    }
    setNewContentMenuOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setProfileMenuOpen(false);
    }
  }

  const toggleSettings = () => {
    if (!drawerProfileMenuOpen) {
      setDrawerSections(profileMenuSections.filter((s) => !s.hideInDrawer));
      setDrawerProfileMenuOpen(true);
    } else {
      setDrawerSections(token ? authSections : sections);
      setDrawerProfileMenuOpen(false);
    }
  };

  const applyQueryFilter = () => {
    if (window.location.pathname !== '/search') {
      router.push('/search');
    }
    dispatch(setFilters({
      searchQuery: query,
    }));
  };

  const handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        applyQueryFilter();
        break;
      case 'Escape':
        setQuery('');
        break;
      default: break;
    }
  };

  const renderDrawerHeader = () => {
    if (!token) {
      return (
        <Img
          className={classes.logoDrawer}
          src={user && user.isPro ? '/images/shortcuts_pro.png' : '/logo.png'}
          alt="entre"
        />
      );
    }
    if (user) {
      const {
        avatar, fullName, username, isPro,
      } = user;
      return (
        <div className={classes.profileContainer}>
          <div className={classes.profileImageContainer}>
            <Avatar
              alt={fullName}
              src={avatar}
              className={classes.profileImage}
            />
            { isPro ? <div className={`${classes.proBadgeSmall} ${classes.proBadgeDrawer}`}>PRO</div> : null }
          </div>
          <div className={classes.profileName}>{fullName}</div>
          <div className={classes.profileUsername}>
            @
            {username}
          </div>
          <IconButton
            className={classes.profileButtonDrawer}
            onClick={toggleSettings}
            style={drawerProfileMenuOpen ? { left: 0 } : { right: 0 }}
          >
            { drawerProfileMenuOpen
              ? <ArrowBackIcon style={{ color: '#FFF' }} />
              : <SettingsIcon style={{ color: '#FFF' }} /> }
          </IconButton>
        </div>
      );
    }
    return null;
  };

  const renderNewContentMenu = () => (
    <Popper
      open={newContentMenuOpen}
      anchorEl={newContentMenuRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleNewContentMenuClose}>
              <Box>
                <Button
                  onClick={() => openLink({ path: '/new/post' })}
                  className={classes.newContentButton}
                >
                  <Box>
                    <Img
                      src="/images/new_post.png"
                      alt="new post"
                      width="21px"
                    />
                    <div className={classes.newBtnText}>post</div>
                  </Box>
                </Button>
                <Button
                  onClick={() => openLink({ path: '/new/event' })}
                  className={classes.newContentButton}
                >
                  <Box>
                    <Img
                      src="/images/new_event.png"
                      alt="new event"
                      width="21px"
                    />
                    <div className={classes.newBtnText}>event</div>
                  </Box>
                </Button>
                <Button
                  onClick={() => openLink({ path: '/new/job' })}
                  className={classes.newContentButton}
                >
                  <Box>
                    <Img
                      src="/images/new_job.png"
                      alt="new job"
                      width="21px"
                    />
                    <div className={classes.newBtnText}>job</div>
                  </Box>
                </Button>
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  const renderUserProfileMenu = () => (
    <Popper
      open={profileMenuOpen}
      anchorEl={profileMenuRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleProfileMenuClose}>
              <Box mt={2}>
                <MenuList autoFocusItem={profileMenuOpen} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  { profileMenuSections.map((section) => section.component || (
                  <MenuItem
                    key={section.label}
                    onClick={() => openLink(section)}
                    color="inherit"
                    className={classes.button}
                  >
                    {section.label}
                  </MenuItem>
                  ))}
                </MenuList>
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  const clearQuery = () => {
    setQuery('');
    dispatch(setFilters({
      searchQuery: '',
    }));
  };

  const renderClearButton = () => {
    if (!searchQuery) return null;
    return (
      <IconButton className={classes.iconButton} onClick={clearQuery}>
        <ClearIcon fontSize="small" />
      </IconButton>
    );
  };

  return (
    <>
      <div style={{ height: 65 /* + 41 */ }} />
      {/* <Box className={classes.topRibbon}>
        <Link href="https://www.producthunt.com/posts/entre">
          <a style={{ color: 'white', fontWeight: 'bold' }}
            target="_blank">We&apos;re live on Product Hunt</a>
        </Link>
      </Box> */}
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.menuAndLogo}>
            <Box display={['block', 'block', 'none', 'none', 'none']}>
              <IconButton onClick={() => setDrawerOpen(true)} className={classes.menuButton}>
                <img alt="" src="/menu.png" />
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(!drawerOpen)}>
                <div className={classes.drawer}>
                  { renderDrawerHeader() }
                  <div className={classes.hr} />
                  { drawerSections.map((section) => (
                    <Button
                      key={section.label}
                      onClick={() => openLink(section)}
                      color="inherit"
                      className={classes.buttonDrawer}
                    >
                      {section.label}
                    </Button>
                  ))}
                </div>
              </Drawer>
            </Box>
            <Box ml={[3, 3, 6, 6, 6]} className={classes.logoContainer}>
              <Link href="/">
                <img alt="entre" className={classes.logo} src={user && user.isPro ? '/images/shortcuts_pro.png' : '/logo.png'} />
              </Link>
            </Box>
          </div>
          {(token || (window.location.pathname === '/search' && window.location.search === '?section=deals'))
            ? (
              <Box className={classes.searchBar} display={['none', 'none', 'flex', 'flex', 'flex']}>
                <TextField
                  fullWidth
                  value={query}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleTextFieldKeyDown}
                  placeholder="Search"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon className={classes.searchIcon} /></InputAdornment>,
                    endAdornment: renderClearButton(),
                  }}
                />
              </Box>
            ) : null }
          <Box display={['none', 'none', 'block', 'block', 'block']}>
            <div className={classes.actions}>
              { token
                ? authSections.map((section) => (
                  <IconButton
                    key={section.label}
                    onClick={() => openLink(section)}
                    color="inherit"
                    className={clsx(classes.button, classes.buttonAuth)}
                    {...section.props}
                  >
                    {section.component}
                  </IconButton>
                )) : sections.map((section) => (
                  <Button
                    key={section.label}
                    onClick={() => openLink(section)}
                    color="inherit"
                    className={classes.button}
                  >
                    {section.label}
                  </Button>
                ))}
              { token && user
                ? (
                  <>
                    <Button
                      ref={profileMenuRef}
                      aria-controls={profileMenuOpen ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={handleProfileMenuToggle}
                    >
                      <Avatar
                        alt={user.fullName}
                        src={user.avatar}
                        className={classes.avatarLarge}
                      />
                      { user.isPro ? <div className={classes.proBadgeSmall}>PRO</div> : null }
                      <ArrowDropDownIcon className={classes.profileDropdown} fontSize="small" />
                    </Button>
                  </>
                ) : null }
              { renderUserProfileMenu() }
              { renderNewContentMenu() }
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Nav;
