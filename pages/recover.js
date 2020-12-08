import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useSnackbar } from 'notistack';
import router from 'next/router';
import withNoSession from '../src/helpers/withNoSession';
import EntreButton from '../src/components/EntreButton';
import { recoverPass } from '../common/data/actions';


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
  const [email, setEmail] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setError(null);
  }, [email]);

  const validateEmail = (e) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required');
    } else if (!validateEmail(email)) {
      setError('Wrong email address format');
    } else {
      dispatch(recoverPass(encodeURIComponent(email)));
      enqueueSnackbar('If the information entered is associated with an Entre account we have sent you an email with password reset instructions', {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      router.push('/');
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
            src="/images/recover.svg"
            alt="Recover"
          />

        </Grid>
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" marginLeft={0}>
              Recover your account
            </Typography>
            <form className={classes.form} onSubmit={handleSignIn} noValidate>
              <FormControl className={classes.form} component="fieldset" error={error != null}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Your email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <FormHelperText>{error}</FormHelperText>
                <EntreButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Request Password Reset
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
