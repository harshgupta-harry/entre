/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
  useStripe, useElements, CardElement,
} from '@stripe/react-stripe-js';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import EntreButton from './EntreButton';
import {
  createStripeIntent,
} from '../../common/data/actions';

const useOptions = () => {
  const options = {
    style: {
      base: {
        fontSize: 14,
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return options;
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function StripePayment(props) {
  const { ticket, onClose } = props;
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const token = useSelector((state) => state.auth.token);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.account.user);

  const defaultEmail = token ? user.email : null;
  const [email = defaultEmail, setEmail] = useState();
  const [loading = false, setLoading] = useState();

  const displayError = (error) => {
    setLoading(false);
    enqueueSnackbar(`${error}`, {
      variant: 'error',
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    });
  };

  const processPayment = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    const card = elements.getElement(CardElement);
    const metadata = {};
    if (token) {
      metadata.userId = user.id;
    }
    // eslint-disable-next-line no-underscore-dangle
    const r = await createStripeIntent(email, metadata, ticket._id);
    if (r && r.data && r.data.client_secret) {
      const result = await stripe.confirmCardPayment(r.data.client_secret, {
        payment_method: {
          card,
          billing_details: {
            email,
          },
        },
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        displayError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        onClose(email);
        setLoading(false);
        window.gtag('event', 'purchase', {
          currency: 'USD',
          value: ticket.price,
          items: [
            {
              id: ticket._id,
              name: ticket.name,
              quantity: 1,
              price: ticket.price,
            },
          ],
        });
        enqueueSnackbar('Payment has been successfully processed', {
          variant: 'success',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
      }
    } else {
      displayError('Error creating payment intent');
    }
  };


  return (
    <Grid container justify="center">
      <Grid item sm={4}>
        <Box textAlign="left" mb={5}>
          <Card>
            <CardContent>
              { loading ? (
                <Box textAlign="center">
                  <CircularProgress />
                  <Typography variant="body2">Please wait...</Typography>
                </Box>
              ) : null }
              <Box mb={2} display={loading ? 'none' : null}>
                <Typography variant="h6">
                  {ticket.name}
                  {' - '}
                  {formatter.format(ticket.price)}
                </Typography>
                <Typography variant="subtitle2" style={{ textTransform: 'capitalize' }}>
                  {ticket.description}
                </Typography>
              </Box>
              <Box mt={2} mb={2} display={loading ? 'none' : null}>
                <TextField
                  fullWidth
                  size="small"
                  id="email"
                  disabled={typeof (token) !== 'undefined'}
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Box>
              <Box mt={2} mb={2} display={loading ? 'none' : null}>
                <CardElement
                  options={options}
                  onReady={() => {
                    console.log('CardElement [ready]');
                  }}
                  onChange={(event) => {
                    console.log('CardElement [change]', event);
                  }}
                  onBlur={() => {
                    console.log('CardElement [blur]');
                  }}
                  onFocus={() => {
                    console.log('CardElement [focus]');
                  }}
                />
              </Box>
              <Box textAlign="left" mt={4} display={loading ? 'none' : null}>
                <EntreButton
                  variant="outlined"
                  size="small"
                  onClick={() => onClose(null, true)}
                >
                  Back
                </EntreButton>
                <EntreButton
                  variant="contained"
                  size="small"
                  onClick={processPayment}
                >
                  Pay
                </EntreButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

StripePayment.propTypes = {
  ticket: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

StripePayment.defaultProps = {
  onClose: () => {},
};


export default StripePayment;
