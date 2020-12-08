import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import {
  addEventComment,
  pushEventComment,
} from '../../../common/data/actions';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    dislay: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const CommentField = (props) => {
  const dispatch = useDispatch();
  const [comment = '', setComment] = useState();
  const author = useSelector((state) => state.account.user);
  const classes = useStyles();

  const sendComment = async () => {
    if (comment === '') return;
    const newComent = {
      comment,
      type: 'Comment',
      parentCommentId: '',
    };
    await dispatch(addEventComment(props.postId, newComent));
    dispatch(pushEventComment({
      ...newComent,
      author,
    }));
    setComment('');
  };

  const handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        sendComment();
        break;
      case 'Escape':
        setComment('');
        break;
      default: break;
    }
  };

  const renderSendButton = () => (
    <Button onClick={sendComment}>
      <SendIcon color="primary" />
    </Button>
  );

  return (
    <div className={classes.margin}>
      <div item className={classes.textField}>
        <div>
          <TextField
            id="comment"
            label="Comment on the event"
            value={comment}
            onKeyDown={handleTextFieldKeyDown}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: renderSendButton(),
            }}
          />
        </div>
      </div>
    </div>
  );
};

CommentField.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentField;
