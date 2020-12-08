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
  upgradeUserToPro,
  deleteUser,
} from '../../../common/data/actions';
import admins from '../../../common/data/admins';

const PeopleMenu = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { account, userId } = props;
  const user = useSelector((state) => state.account.user);

  const [upgradeOpen, setUpgradeOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleCloseUpgrade = (event) => {
    setUpgradeOpen(false);
    handleClose(event);
  };

  const handleCloseDelete = (event) => {
    setDeleteOpen(false);
    handleClose(event);
  };

  const handleUpgradeUser = (event) => {
    dispatch(upgradeUserToPro([userId], !account.isPro));
    handleCloseUpgrade(event);
  };

  const handleOpenUpgrade = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setUpgradeOpen(true);
  };

  const handleOpenDelete = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setDeleteOpen(true);
  };

  const handleDeleteUser = (event) => {
    dispatch(deleteUser(userId));
    handleCloseDelete(event);
  };

  if (!admins.includes(user.id)) return null;
  return (
    <div>
      <IconButton aria-controls="icon-menu" aria-haspopup="true" onClick={handleClick}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenUpgrade}>
          {account.isPro ? 'Downgrade account' : 'Upgrade to pro'}
        </MenuItem>
        <MenuItem onClick={handleOpenDelete}>
          Delete account
        </MenuItem>
      </Menu>
      <Dialog
        open={upgradeOpen}
        onClose={handleCloseUpgrade}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to update this user membership?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The membership will be updated
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpgrade} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpgradeUser} color="primary" autoFocus>
            {account.isPro ? 'Downgrade' : 'Upgrade'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to delte this account?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The account will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PeopleMenu.propTypes = {
  userId: PropTypes.string.isRequired,
  account: PropTypes.any.isRequired,
};

export default PeopleMenu;
