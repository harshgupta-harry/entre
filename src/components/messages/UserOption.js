import React from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginBottom: 0,
  },
  profileImageContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '12.5%',
    objectFit: 'cover',
  },
  zeroPadding: {
    padding: '0px',
  },
  gridPadding: {
    padding: '5px 12px',
  },
  firstRightCol: {
    marginBottom: 10,
  },
  commonMessagePad: {
    padding: '15px 0 15px',
  },
  checkmark: {
    width: 15,
    height: 15,
  },
}));

const UserOption = (props) => {
  const classes = useStyles();
  const {
    user, isSelected, onPress, updatedTitleStyle,
  } = props;
  if (!user) { return null; }
  const handleSelected = (e) => {
    e.stopPropagation();
    onPress();
  };
  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        avatar={(
          <div className={classes.profileImageContainer}>
            <Avatar
              alt={user.fullName}
              src={user.avatar}
              className={classes.avatar}
            />
          </div>
        )}
        action={null}
        title={null}
        subheader={(
          <div>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={10}>
                <Typography className={[classes.singleUserName, updatedTitleStyle]} variant="body2" component="p">
                  {user.fullName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} align="right">
                <Img
                  src="/icons/checkmark.png"
                  alt="checkmark"
                  className={classes.checkmark}
                  style={{ filter: `grayscale(${isSelected ? '0%' : '100%'})` }}
                />
              </Grid>
            </Grid>
          </div>
        )}
        onClick={(e) => handleSelected(e)}
        style={{ alignItems: 'center', borderBottom: '1px solid #eee', padding: '10px 16px' }}
      />
    </Card>
  );
};

UserOption.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  updatedTitleStyle: PropTypes.any,
  isSelected: PropTypes.bool.isRequired,
};

UserOption.defaultProps = {
  user: {},
  updatedTitleStyle: null,
};

export default React.memo(UserOption);
