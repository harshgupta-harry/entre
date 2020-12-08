import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
  deleteJobPost,
} from '../../../common/data/actions';
import admins from '../../../common/data/admins';

const JobMenu = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { author, postId } = props;
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

  const handleOpenBlock = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setBlockOpen(true);
  };

  const handleCloseBlock = (event) => {
    handleClose(event);
    setBlockOpen(false);
  };

  const handleBlockUser = (event) => {
    dispatch(blockUser(author.id));
    handleClose(event);
    setBlockOpen(false);
  };

  const handleFlag = () => {
    // console.log('Flag post not implemented');
    setFlagOpen(false);
  };

  const handleOpenFlag = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setFlagOpen(true);
  };

  const handleCloseFlag = (event) => {
    handleClose(event);
    setFlagOpen(false);
  };

  const handleDeletePost = (event) => {
    dispatch(deleteJobPost(postId));
    handleClose(event);
  };

  const handleOpenDelete = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setDeleteOpen(true);
  };

  const handleCloseDelete = (event) => {
    handleClose(event);
    setDeleteOpen(false);
  };

  const handleEditPost = (event) => {
    // dispatch(EditJobPost(postId));
    router.push('edit/job/[id]', `edit/job/${postId}`);
    handleClose(event);
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
            <MenuItem onClick={handleEditPost}>Edit</MenuItem>
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
              ? <MenuItem onClick={handleOpenDelete}>Delete</MenuItem>
              : null }
            <MenuItem onClick={handleOpenBlock}>
              Block @
              {author.username}
            </MenuItem>
            <MenuItem onClick={handleOpenFlag}>Flag this Job post</MenuItem>
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
            You will no longer see the user&apos;s posts and comments on your feed
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
        <DialogTitle id="alert-dialog-title">Do you want to report the job post?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The job post will be reported to admin to evaluate if it violates any community policy
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
        <DialogTitle id="alert-dialog-title">Do you want to delete the job post?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The job post will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

JobMenu.propTypes = {
  author: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default JobMenu;
