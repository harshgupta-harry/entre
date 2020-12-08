import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileImage } from '../../common/data/actions';
import useStyles from './Styles';
import EntreButton from '../components/EntreButton';
// import PropTypes from 'prop-types';

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentImage = useSelector((store) => store.onboarding.profile);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        dispatch(updateProfileImage(reader.result));
      }, false);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={classes.h1}>
        Add your profile picture
      </div>
      <div className={classes.instructions}>
        Or select next to skip for now
      </div>
      <div className={classes.profileContainer}>
        <img className={classes.profileImage} src={currentImage || 'user_profile.svg'} alt="profile" />
        <label htmlFor="upload-profile-input">
          <EntreButton
            type="submit"
            variant="text"
            color="primary"
            component="span"
            className={classes.submit}
          >
            <span style={{ color: '#00C4FF' }}>Change Profile Picture</span>
          </EntreButton>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-profile-input"
            onChange={handleChange}
            type="file"
          />
        </label>
      </div>
    </div>
  );
};

Profile.propTypes = {

};

export default Profile;
