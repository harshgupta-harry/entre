import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import {
  setEventVote,
  setVote,
} from '../../../common/data/actions';

const useStyles = makeStyles(() => ({
  button: {
    color: '#78849E',
  },
  upvoteIcon: {
    marginBottom: 2,
    height: 19,
    width: 16,
    marginRight: 5,
  },
}));

const UpVote = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    postId, isFavorite, favoriteCount, type,
  } = props;
  const [favorite = isFavorite, setFavorite] = useState();
  const [upvotes = favoriteCount, setUpvotes] = useState();

  const toggleVote = React.useCallback((e) => {
    e.stopPropagation();
    const isFav = favorite ? 0 : 1;
    setUpvotes(isFav ? upvotes + 1 : upvotes - 1);
    setFavorite(isFav);
    if (type !== undefined) {
      dispatch(setEventVote(postId, isFav));
    } else {
      dispatch(setVote(postId, isFav));
    }
  }, [favorite]);

  return (
    <Button onClick={toggleVote} className={classes.button}>
      {type !== undefined
        ? (
          <Img
            src={`/icons/${favorite ? 'down' : 'up'}vote.png`}
            alt="upvotUpVotee"
            className={classes.upvoteIcon}
          />
        ) : (
          <Img
            src={`/icons/${favorite ? 'down' : 'up'}vote.png`}
            alt="upvote"
            className={classes.upvoteIcon}
          />
        )}
      <div style={favorite ? { color: '#00C4FF' } : {}}>{upvotes}</div>
    </Button>
  );
};

UpVote.propTypes = {
  type: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  isFavorite: PropTypes.number.isRequired,
  favoriteCount: PropTypes.number.isRequired,
};

UpVote.defaultProps = {
};

export default React.memo(UpVote);
