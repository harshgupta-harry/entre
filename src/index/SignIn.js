import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import theme from '../theme';
import { emailLogin, clearErrors } from '../../common/data/actions';
import EntreButton from '../components/EntreButton';
import PasswordTextfield from './PasswordTextfield';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundcolor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      background: '#0297c4',
    },
  },
}));

const SignIn = (props) => {
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const { email: initialEmail, redirect } = props;

  const [email = initialEmail, setEmail] = useState();
  const [password, setPassword] = useState();
  const reduxState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearErrors());
  }, [email, password]);

  const getError = () => {
    if (!reduxState.error) return null;
    const errMsgs = {
      WRONG_USER_OR_PASS: 'Wrong username or password',
      REQUIRED_USER_AND_PASS: 'Email and password are required fields',
    };
    return errMsgs[reduxState.error] || `Unknown error (${reduxState.error})`;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(emailLogin(email, password, redirect));
  };

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSignIn} noValidate>
          <FormControl className={classes.form} component="fieldset" error={reduxState.error != null}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              disabled={initialEmail !== null}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <PasswordTextfield
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText>{getError()}</FormHelperText>
            <Grid
              container
              alignItems="center"
              justify="center"
            >
              <Grid item xs>
                <Link href="/recover" variant="body2" fontSize="14">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <EntreButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </EntreButton>
              </Grid>
            </Grid>
          </FormControl>

        </form>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  email: PropTypes.string,
  redirect: PropTypes.any,
};

SignIn.defaultProps = {
  email: null,
  redirect: false,
};

export default SignIn;
