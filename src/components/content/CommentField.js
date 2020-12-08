import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import {
  addComment,
  pushComment,
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
    window.analytics.track('Comment', {
      postId: props.postId,
    });
    await dispatch(addComment(props.postId, newComent));
    setComment('');
    dispatch(pushComment({
      ...newComent,
      author,
    }));
    window.scrollTo(0, 0);
  };

  const handleTextFieldKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        sendComment();
        event.preventDefault();
        break;
      case 'Escape':
        setComment('');
        break;
      default: break;
    }
  };

  const handleTextFieldKeyUp = (e) => {
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
            label="Comment the Post"
            value={comment}
            onKeyDown={handleTextFieldKeyDown}
            onKeyUp={handleTextFieldKeyUp}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
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
