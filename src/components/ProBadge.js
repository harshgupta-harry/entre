import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

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
    padding: '3px 9px',
    bottom: -8,
    left: -8,
    fontStyle: 'italic',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    display: 'inline-block',
  },
  proBadgeTiny: {
    fontSize: 7,
    borderRadius: 7,
    padding: '3px 7px',
    bottom: -6,
    left: -6,
  },
}));

function ProBadge(props) {
  const { size } = props;
  const classes = useStyles();
  const user = useSelector((state) => state.account.user);
  if (user && user.isPro) {
    return (
      <div
        className={clsx(classes.proBadgeSmall, size < 50 && classes.proBadgeTiny)}
      >
        PRO
      </div>
    );
  }
  return null;
}

ProBadge.propTypes = {
  size: PropTypes.number,
};

ProBadge.defaultProps = {
  size: 60,
};


export default ProBadge;
