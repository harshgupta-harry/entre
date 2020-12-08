/* eslint-disable no-param-reassign */
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Img from 'react-cool-img';
import { useSnackbar } from 'notistack';
import router from 'next/router';

// import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Grow from '@material-ui/core/Grow';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AppsIcon from '@material-ui/icons/Apps';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';


import EntreButton from '../EntreButton';
import EntreAvatar from '../EntreAvatar';
import SlimCardContent from '../SlimCardContent';
import CleanTextField from '../CleanTextField';
import IndustriesTags from '../content/IndustriesTags';
import UsersTags from '../content/UsersTags';
import LocationModal from './LocationModal';
import IndustryModal from './IndustryModal';
import TagUsersModal from './TagUsersModal';
// import getTextBoundingRect from '../../helpers/inputTextBounds';
import api from '../../../common/api';
import newApi from '../../../common/api/newApi';
import admins from '../../../common/data/admins';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 40,
    marginBottom: 100,
    width: '100%',
  },
  createPost: {
    width: '100%',
    maxWidth: 912,
    margin: 'auto',
    padding: 20,
    marginTop: 162,
  },
  createPostBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    marginLeft: 20,
  },
  createPostTextField: {
    marginTop: 10,
  },
  createPostButton: {
    color: '#00C4FF',
  },
  image: {
    maxWidth: '100%',
    width: 550,
    borderRadius: '15px',
    maxHeight: 550,
    objectFit: 'cover',
    marginBottom: 20,
  },
  closeIcon: {
    position: 'absolute',
    color: '#fff',
    top: '7px',
    right: '20px',
    fontSize: '22px',
    cursor: 'pointer',
    background: '#00C4FF',
    borderRadius: '10px',
  },
}));


// eslint-disable-next-line max-len
const createPost = async (description, industry, taggedUser, location, postImage, allUsersCheckbox) => {
  let imageUrl = '';
  if (postImage) {
    const base64String = postImage.split(',')[1];
    const resp = await api.post('upload', { base64String });
    if (resp.data.errorMessage) {
      return { error: resp.data.errorMessage };
    }
    imageUrl = resp.data.data;
  }
  const newPostInfo = {
    mediaType: 'Post',
    type: 'image',
    description,
    featured: false,
    courseId: '',
    postDate: new Date(),
    industry,
    taggedUser,
    location,
    imageUrl,
  };
  if (allUsersCheckbox) {
    return newApi.post(`post?allSelected=${allUsersCheckbox}`, newPostInfo);
  }
  return newApi.post('post', newPostInfo);
};

export default function NewPost() {
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef(null);
  const classes = useStyles();
  const {
    fullName,
    avatar,
    isPro,
    id: userId,
  } = useSelector((state) => state.account.user);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [postType = 'Post', setPostType] = useState();
  const [posting = false, setPosting] = useState();
  const [content, setContent] = useState();
  const [location, setLocation] = useState();
  const [industry, setIndustry] = useState();
  const [taggedUsers = [], setTaggedUsers] = useState();
  const [image, setImage] = useState();
  // const [showUserMention = false, setShowUserMention] = useState();
  const [showLocationModal = false, setShowLocationModal] = useState();
  const [showIndustryModal = false, setShowIndustryModal] = useState();
  const [showTagUsersModal = false, setShowTagUsersModal] = useState();
  const [allUsersCheckbox = false, setAllUsersCheckbox] = useState();

  // const handleChange = (event) => {
  //   setPostType(event.target.value);
  // };

  // const onTextInputKeyPress = (event) => {
  //   const { selectionStart, selectionEnd, value } = event.target;
  //   setAnchorEl(getTextBoundingRect(event.target, selectionStart, selectionEnd, false));
  //   if (event.key === '@') {
  //     if (
  //       selectionStart === 0
  //       || value.charAt(selectionStart - 1) === ' ') {
  //       setShowUserMention(true);
  //     }
  //   } else {
  //     setShowUserMention(false);
  //   }
  // };

  const onTextInputKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onTextInputKeyUp = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;

    if (e.key.length === 1) {
      const m = e.target.value;
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const c = m.split('\n').map((s) => s.charAt(0).toUpperCase() + s.substr(1)).join('\n');
      e.target.value = c;
      e.target.selectionStart = start;
      e.target.selectionEnd = end;
    }
  };

  // const renderUserMentionMenu = () => (
  //   <Popper
  //     open={showUserMention}
  //     anchorEl={anchorEl}
  //     role={undefined}
  //     transition
  //     disablePortal
  //   >
  //     {({ TransitionProps, placement }) => (
  //       <Grow
  //         {...TransitionProps}
  //         style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
  //       >
  //         <Paper>
  //           <ClickAwayListener onClickAway={() => setShowUserMention(false)}>
  //             <MenuList id="menu-list-grow">
  //               <MenuItem
  //                 key={1}
  //                 // onClick={() => openLink(section)}
  //                 color="inherit"
  //                 className={classes.button}
  //               >
  //                 {/* {section.label} */}
  //                 asd
  //               </MenuItem>
  //             </MenuList>
  //           </ClickAwayListener>
  //         </Paper>
  //       </Grow>
  //     )}
  //   </Popper>
  // );

  const handleLocationChange = (loc) => {
    setLocation(loc);
    setShowLocationModal(false);
  };

  const handleIndustryChange = (ind) => {
    setIndustry(ind);
    setShowIndustryModal(false);
  };

  const handleTaggedUsersChange = (ind) => {
    setTaggedUsers(ind);
    setShowTagUsersModal(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
      }, false);
      reader.readAsDataURL(file);
    }
  };

  const clearImgData = () => {
    setImage('');
    inputRef.current.value = null;
  };

  // let locationText = '';
  // if (location && location.city && location.state && location.country) {
  //   locationText = `${location.city}, ${location.state}, ${location.country}`;
  // }

  const submitPost = async () => {
    if (!content || content === '') {
      enqueueSnackbar('Post content cannot be empty', {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      return;
    }
    setPosting(true);
    const tagged = taggedUsers.map((u) => u.id);
    const resp = await createPost(content, industry, tagged, location, image, allUsersCheckbox);
    setPosting(false);
    if (resp.data.errorMessage) {
      enqueueSnackbar(resp.data.errorMessage, {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } else {
      enqueueSnackbar(resp.data.data, {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      router.push('/feed');
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={(
          <EntreAvatar
            fullName={fullName}
            avatar={avatar}
            isPro={isPro}
          />
        )}
        title={fullName}
        subheader={(
          <>
            <EntreButton
              size="small"
              variant="outlined"
              style={{ margin: 0, marginTop: 8 }}
              onClick={() => setShowLocationModal(true)}
            >
              <LocationOnIcon fontSize="small" />
              { location && location.city && location.state
                ? (
                  <>
                    {location.city}
                    {', '}
                    {location.state}
                  </>
                )
                : 'Add location' }
            </EntreButton>
          </>
        )}
        action={(
          <>

          </>
        )}
      />
      <SlimCardContent>
        <Box className={classes.createPostBox}>
          <CleanTextField
            label={content && content.length > 0 ? '' : "What's on your mind?"}
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
            // onKeyPress={onTextInputKeyPress}
            onKeyDown={onTextInputKeyDown}
            onKeyUp={onTextInputKeyUp}
            fullWidth
            className={classes.createPostTextField}
          />
          {/* { showUserMention ? renderUserMentionMenu() : null } */}
        </Box>
        { image
          ? (
            <Box align="center" style={{ position: 'relative' }}>
              <CloseIcon className={classes.closeIcon} onClick={clearImgData} />
              <Img
                className={classes.image}
                src={image}
                alt="New post image"
              />
            </Box>
          ) : null }
        <Box>
          <IndustriesTags industry={industry} />
          <UsersTags users={taggedUsers} />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between" mt={1}>
          <Box>
            <label htmlFor="upload-post-image-input">
              <IconButton type="submit" component="span" className={classes.createPostButton}>
                <CameraAltIcon />
              </IconButton>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-post-image-input"
                onChange={handleImageChange}
                type="file"
                ref={inputRef}
              />
            </label>
            <IconButton
              className={classes.createPostButton}
              onClick={() => setShowIndustryModal(true)}
            >
              <AppsIcon />
            </IconButton>
            <IconButton
              className={classes.createPostButton}
              onClick={() => setShowTagUsersModal(true)}
            >
              <PersonAddIcon />
            </IconButton>
            <IconButton
              disableRipple
              disableFocusRipple
            >
              {admins.includes(userId) && (
                <FormControlLabel
                  control={
                    (
                      <Checkbox
                        color="primary"
                        checked={allUsersCheckbox}
                        onChange={(event) => setAllUsersCheckbox(event.target.checked)}
                      />
                    )
                  }
                  label="Notify all users"
                />

              )}
            </IconButton>
          </Box>
          <EntreButton size="small" variant="contained" onClick={submitPost} disabled={posting}>
            { posting ? <CircularProgress style={{ color: '#FFF' }} size={20} /> : 'Post' }
          </EntreButton>
        </Box>
      </SlimCardContent>
      <LocationModal
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={handleLocationChange}
      />
      <IndustryModal
        open={showIndustryModal}
        onClose={() => setShowIndustryModal(false)}
        onSelect={handleIndustryChange}
      />
      <TagUsersModal
        open={showTagUsersModal}
        onClose={() => setShowTagUsersModal(false)}
        onSelect={handleTaggedUsersChange}
      />
    </Card>
  );
}
