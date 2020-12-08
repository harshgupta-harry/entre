import React from 'react';
import PropTypes from 'prop-types';
import router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
  listItem: {
    display: 'flex',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  listItemText: {
    fontSize: 16,
    lineHeight: '35px',
    backgroundColor: '#F3F5F9',
    height: '35px',
    borderRadius: '20px',
    padding: '0 20px',
    textAlign: 'center',
    marginRight: '10px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  },
  avatar: {
    width: 25,
    height: 25,
    objectFit: 'cover',
    marginTop: '5px',
    marginRight: '5px',
  },
  listItemUsername: {
    fontSize: 14,
    lineHeight: '35px',
  },
}));

function UsersTags(props) {
  const userOnClick = (event, user) => {
    event.stopPropagation();
    router.push(`/profile/${user.username}`);
  };

  const classes = useStyles();
  const { users } = props;
  if (!users) return null;
  return (
    <div className={classes.listItem}>
      {users.map((u) => (
        <div
          key={u}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          onClick={(e) => userOnClick(e, u)}
          className={classes.listItemText}
        >
          <Avatar
            alt={u.fullName}
            src={u.avatar ? u.avatar.replace('.com/', '.com/150x150/') : null}
            className={classes.avatar}
          />
          <div className={classes.listItemUsername}>
            @
            {u.username}
          </div>
        </div>
      ))}
    </div>
  );
}

UsersTags.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersTags;
