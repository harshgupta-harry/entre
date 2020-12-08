import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import EntreLink from '../EntreLink';
import EntreButton from '../EntreButton';
import { unblockUser } from '../../../common/data/actions';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  detail: {
    cursor: 'auto',
  },
  profileImageContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: '12.5%',
    objectFit: 'cover',
  },
  proBadgeSmall: {
    fontSize: 10,
    backgroundColor: '#0B3593',
    borderRadius: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'absolute',
    fontStyle: 'italic',
    padding: '3px 10px',
    bottom: -3,
    left: -3,
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
  },
  listItem: {
    display: 'flex',
    margin: '3px 0px',
  },
  listIcon: {
    fontSize: 22,
    color: '#00C4FF',
  },
  listItemText: {
    fontSize: 16,
    color: '#9F9F9F',
    marginLeft: 6,
    marginTop: 0,
    marginBottom: 0,
  },
  submit: {
    marginTop: 28,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
}));

const PeopleCard = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { post } = props;

  const handleUnblockUser = async () => {
    const action = dispatch(unblockUser(post.id));
    const res = await action.payload;
    enqueueSnackbar(res.message, {
      variant: 'success',
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    });
  };

  const renderUnblockButton = () => (
    <EntreButton
      type="submit"
      size="large"
      variant="contained"
      color="primary"
      onClick={handleUnblockUser}
      className={classes.submit}
    >
      Unblock
    </EntreButton>
  );

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        avatar={(
          <EntreLink href={`/profile/${post.username}`}>
            <div className={classes.profileImageContainer}>
              <Avatar
                alt={post.fullName}
                src={post.avatar ? post.avatar.replace('.com/', '.com/150x150/') : null}
                className={classes.avatar}
              />
              {post.isPro ? <div className={classes.proBadgeSmall}>PRO</div> : null}
            </div>
          </EntreLink>
        )}
        action={renderUnblockButton()}
        title={<div className={classes.fullName}>{post.fullName}</div>}
        subheader={(
          <>
            <div className={classes.listItem}>
              <div className={classes.listItemText}>
                @
                {post.username}
              </div>
            </div>
          </>
        )}
      />
    </Card>
  );
};

PeopleCard.propTypes = {
  post: PropTypes.object,
};

PeopleCard.defaultProps = {
  post: {},
};

export default React.memo(PeopleCard);
