import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import { useSnackbar } from 'notistack';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import withNoSession from '../src/helpers/withNoSession';
import EntreButton from '../src/components/EntreButton';
import PasswordTextfield from '../src/reset/PasswordTextfield';
import { resetPass } from '../common/data/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70vh',
  },
  image: {
    margin: 'auto',
    display: 'block',
    width: '60%',
    maxWidth: 500,
    maxHeight: '100%',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff',
  },
}));

function RecoverAccount() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [error, setError] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setError(null);
  }, [password, confirmedPassword]);

  const validatePassword = () => true;
  // TODO: actually validate the password

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = window.location.search.replace('?', '');
    if (!password) {
      setError('Password is required');
    } else if (!confirmedPassword) {
      setError('Confirming password is required');
    } else if (confirmedPassword.localeCompare(password) !== 0) {
      setError('Password is not identical to the confirming password');
    } else if (!validatePassword(password)) {
      setError('Password is too weak');
    } else {
      const response = await dispatch(resetPass(token, password));
      if (response.data.error) {
        enqueueSnackbar(response.data.error, {
          variant: 'error',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
        router.push('/recover');
      } else {
        enqueueSnackbar('Your password has been updated. You can log in with your new password now', {
          variant: 'success',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
        router.push('/');
      }
    }
  };

  return (
    <Container mx={10}>
      <Grid
        container
        component="main"
        className={classes.root}
        alignItems="center"
        justify="center"
      >
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} justify="center" alignItems="center">
          <img
            className={classes.image}
            src="/forget-password.svg"
            alt="forget-password"
          />

        </Grid>
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" marginLeft={0}>
              Change your Password
            </Typography>
            <form className={classes.form} onSubmit={handleChangePassword} noValidate>
              <FormControl className={classes.form} component="fieldset" error={error != null}>
                <PasswordTextfield
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordTextfield
                  label="Confirm Password"
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
                <FormHelperText>{error}</FormHelperText>
                <EntreButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Change your Password
                </EntreButton>
              </FormControl>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withNoSession(RecoverAccount);
