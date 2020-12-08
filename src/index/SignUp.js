import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  checkForUsername,
  emailSignup,
  clearErrors,
  signupFail,
} from '../../common/data/actions';
import EntreButton from '../components/EntreButton';
import PasswordTextfield from './PasswordTextfield';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  paper: {
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
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, [0, 2]),
    color: '#fff',
    '&:hover': {
      background: '#0297c4',
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  check: {
    margin: '0 5px',
    color: 'green',
  },
  taken: {
    margin: '0 5px',
    color: 'red',
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { email: initialEmail, redirect } = props;

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [email = initialEmail, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validUsername = null, setValidUsername] = useState();
  const [usernameError = null, setUsernameError] = useState();
  const reduxState = useSelector((state) => state.auth);

  const checkUsername = async () => {
    if (!username) {
      setValidUsername(false);
      setUsernameError('Username is required');
    } else {
      const isTaken = await dispatch(checkForUsername(username));
      setValidUsername(!isTaken);
      // console.log(isTaken);
    }
  };

  useEffect(() => {
    setValidUsername(null);
    setUsernameError(null);
  }, [username]);

  useEffect(() => {
    dispatch(clearErrors());
  }, [username, password, email]);
  const renderValidCheck = () => {
    switch (validUsername) {
      case true:
        return <CheckCircleOutlineIcon className={classes.check} />;
      case false:
        return <CancelOutlinedIcon className={classes.taken} />;
      default:
        return null;
    }
  };

  const getError = () => {
    if (!reduxState.error) return null;
    const errMsgs = {
      DUPLICATED_EMAIL: 'Sorry, email already exists, please try to sign in instead.',
      WEAK_PASSWORD: 'Password is to weak, please try a new password.',
      ALL_FIELDS_REQUIRED: 'All fields are required to sign up',
      'auth/invalid-email': 'The email address is badly formatted.',
      'auth/argument-error': 'All fields are required to sign up',
      INVALID_USERNAME: 'Username is not valid, please try another username',
    };
    return errMsgs[reduxState.error] || `Unknown error (${reduxState.error})`;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || firstName === '' || lastName === '') {
      dispatch(signupFail('ALL_FIELDS_REQUIRED'));
      return;
    }
    if (!validUsername) {
      dispatch(signupFail('INVALID_USERNAME'));
      return;
    }
    const fullName = `${firstName} ${lastName}`;
    const newUser = {
      email,
      password,
      displayName: fullName,
      fullName,
      username,
    };
    dispatch(emailSignup(newUser, redirect));
  };

  const usernameRegexValidate = (e) => {
    const regex = new RegExp('^[a-zA-Z0-9]+$');
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!regex.test(str)) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSignUp} noValidate>
          <FormControl component="fieldset" error={reduxState.error != null}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.row}>
                  <TextField
                    error={usernameError != null}
                    helperText={usernameError}
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={checkUsername}
                    autoComplete="username"
                    onKeyPress={usernameRegexValidate}
                  />
                  {renderValidCheck()}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  disabled={initialEmail !== null}
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordTextfield
                  className={classes.row}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <FormHelperText>{getError()}</FormHelperText>
            <EntreButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </EntreButton>
          </FormControl>
        </form>
      </div>
    </Container>
  );
};

SignUp.propTypes = {
  email: PropTypes.string,
  redirect: PropTypes.any,
};

SignUp.defaultProps = {
  email: null,
  redirect: false,
};

export default SignUp;
