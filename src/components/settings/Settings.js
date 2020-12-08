import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import PasswordTextfield from '../../index/PasswordTextfield';
import EntreButton from '../EntreButton';

import {
  updateEmailOrPassword,
  deleteAccount,
} from '../../../common/data/actions';

const Settings = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.account.user);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [currentPassword, setCurrentPassword] = useState();

  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const r = await dispatch(updateEmailOrPassword(email, password, user.email, currentPassword));
    if (r.message) {
      enqueueSnackbar(r.message, {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      setEditEmail(false);
      setEditPassword(false);
    } else if (r.error) {
      enqueueSnackbar(r.error, {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const r = await dispatch(deleteAccount(user.email, currentPassword));
    if (r.message) {
      enqueueSnackbar(r.message, {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      setConfirmDeleteAccount(false);
    } else if (r.error) {
      enqueueSnackbar(r.error, {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };


  if (editEmail) {
    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSignIn} noValidate>
            <Box mt={1}>
              <Typography variant="h6">Change email</Typography>
              <PasswordTextfield
                label="Current password"
                autoFocus
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="New email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <Box>
                <EntreButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    setEditEmail(false);
                  }}
                >
                  Cancel
                </EntreButton>
                <EntreButton
                  type="submit"
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Save
                </EntreButton>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (editPassword) {
    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSignIn} noValidate>
            <Box mt={1}>
              <Typography variant="h6">Change password</Typography>
              <PasswordTextfield
                label="Current password"
                autoFocus
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <PasswordTextfield
                label="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box mt={1}>
                <EntreButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    setEditPassword(false);
                  }}
                >
                  Cancel
                </EntreButton>
                <EntreButton
                  type="submit"
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Save
                </EntreButton>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (confirmDeleteAccount) {
    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSignIn} noValidate>
            <Box mt={1}>
              <Typography variant="h6">Delete account</Typography>
              <Typography>Enter your current password to confirm</Typography>
              <PasswordTextfield
                label="Current password"
                autoFocus
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Box mt={1}>
                <EntreButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    setConfirmDeleteAccount(false);
                  }}
                >
                  Cancel
                </EntreButton>
                <EntreButton
                  onClick={handleDeleteAccount}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Delete account
                </EntreButton>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSignIn} noValidate>
          <Typography variant="h6">Account settings:</Typography>
          <Box mt={1} display="flex">
            <Typography>
              <strong>Email:</strong>
              {' '}
              { email}
            </Typography>
            <EntreButton
              size="small"
              color="primary"
              onClick={() => {
                setEditEmail(true);
              }}
            >
              Change email
            </EntreButton>
          </Box>
          <Box mt={1} display="flex">
            <Typography>
              <strong>Password:</strong>
              {' '}
              ****
            </Typography>
            <EntreButton
              size="small"
              color="primary"
              onClick={() => {
                setEditPassword(true);
              }}
            >
              Change Password
            </EntreButton>
          </Box>
          <hr />
          <Box mt={1} display="flex">
            <Typography>
              <strong>Delete account</strong>
            </Typography>
            <EntreButton
              size="small"
              color="primary"
              onClick={() => {
                setConfirmDeleteAccount(true);
              }}
            >
              Delete your account
            </EntreButton>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default Settings;
