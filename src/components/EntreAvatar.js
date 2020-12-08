import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

function EntreAvatar(props) {
  const {
    fullName, avatar, isPro, size,
  } = props;

  const useStyles = makeStyles(() => ({
    profileImageContainer: {
      position: 'relative',
    },
    proBadgeSmall: {
      fontSize: 9,
      backgroundColor: '#0B3593',
      borderRadius: 9,
      color: '#FFFFFF',
      fontWeight: 'bold',
      position: 'absolute',
      padding: '3px 9px',
      bottom: -8,
      left: -8,
      fontStyle: 'italic',
      boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    },
    proBadgeTiny: {
      fontSize: 7,
      borderRadius: 7,
      padding: '3px 7px',
      bottom: -6,
      left: -6,
    },
    avatar: {
      width: size,
      height: size,
      borderRadius: '12.5%',
      objectFit: 'cover',
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.profileImageContainer}>
      <Avatar
        alt={fullName}
        src={avatar ? avatar.replace('.com/', '.com/150x150/') : null}
        className={classes.avatar}
      />
      {isPro ? (
        <div
          className={clsx(classes.proBadgeSmall, size < 50 && classes.proBadgeTiny)}
        >
          PRO
        </div>
      ) : null}
    </div>
  );
}

EntreAvatar.propTypes = {
  fullName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isPro: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

EntreAvatar.defaultProps = {
  size: 60,
};

export default EntreAvatar;
