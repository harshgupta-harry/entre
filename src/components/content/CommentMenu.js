import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  blockUser,
  deleteComment,
} from '../../../common/data/actions';
import admins from '../../../common/data/admins';

const CommentMenu = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { author, postId, commentId } = props;
  const user = useSelector((state) => state.account.user);

  const [blockOpen, setBlockOpen] = React.useState(false);
  const [flagOpen, setFlagOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleCloseBlock = () => {
    setBlockOpen(false);
  };

  const handleBlockUser = (event) => {
    dispatch(blockUser(author.id));
    handleCloseBlock(event);
    handleClose(event);
  };

  const handleOpenBlock = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setBlockOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const handleDeleteComment = (event) => {
    dispatch(deleteComment(postId, commentId));
    handleCloseDelete();
    handleClose(event);
  };

  const handleOpenDelete = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setDeleteOpen(true);
  };

  const handleFlag = () => {
    setFlagOpen(false);
  };

  const handleOpenFlag = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setFlagOpen(true);
  };

  const handleCloseFlag = () => {
    setFlagOpen(false);
  };

  return (
    <div>
      <IconButton aria-controls="icon-menu" aria-haspopup="true" onClick={handleClick}>
        <ExpandMoreIcon />
      </IconButton>
      {author.username === user.username
        ? (
          <Menu
            id="post-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleOpenDelete}>Delete</MenuItem>
          </Menu>
        )
        : (
          <Menu
            id="post-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            { admins.includes(user.id)
              ? <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
              : null }
            <MenuItem onClick={handleOpenBlock}>
              Block @
              {author.username}
            </MenuItem>
            <MenuItem onClick={handleOpenFlag}>Flag this Comment</MenuItem>
          </Menu>
        )}

      <Dialog
        open={blockOpen}
        onClose={handleCloseBlock}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to block the user?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will no longer see the user&apos;s post and comment on your feed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBlock} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBlockUser} color="primary" autoFocus>
            Block
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={flagOpen}
        onClose={handleCloseFlag}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to report the post?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The post will be reported to admin to evaluate if it violates any community policy
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFlag} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFlag} color="primary" autoFocus>
            Report
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to delete the comment?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Comment will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteComment} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CommentMenu.propTypes = {
  author: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

export default CommentMenu;
