import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
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
import EntreButton from '../components/EntreButton';
import {
  loadAccount,
  createStripeCustomer,
  createStripeSubscription,
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

function StripeForm(props) {
  const { membership, onClose } = props;
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.account.user);

  const defaultEmail = token ? user.email : null;
  const [email = defaultEmail, setEmail] = useState();
  const [loading = false, setLoading] = useState();
  let checkForUpgradeInterval;

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

  async function fetchAccount() {
    const resp = await dispatch(loadAccount(user.id));
    if (resp.data.data) {
      const u = resp.data.data[0];
      if (u.isPro) {
        clearInterval(checkForUpgradeInterval);
        onClose(email);
      }
    }
  }

  function onSubscriptionComplete(result) {
    if (result.subscription.status === 'active') {
      window.gtag('event', 'entre_pro', {
        currency: 'USD',
        value: membership === 'annual' ? 119 : 12.99,
        items: [
          {
            id: membership,
            name: membership,
            quantity: 1,
            price: membership === 'annual' ? 119 : 12.99,
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
      if (token) {
        checkForUpgradeInterval = setInterval(fetchAccount, 1000);
      } else {
        onClose(email);
      }
    }
  }

  function handlePaymentThatRequiresCustomerAction({
    subscription,
    invoice,
    priceId,
    paymentMethodId,
    isRetry,
  }) {
    console.log('handlePaymentThatRequiresCustomerAction');
    if (subscription && subscription.status === 'active') {
    // Subscription is active, no customer actions required.
      return { subscription, priceId, paymentMethodId };
    }

    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    // eslint-disable-next-line max-len
    console.log(subscription);
    const paymentIntent = invoice
      ? invoice.payment_intent : subscription.latest_invoice.payment_intent;

    if (
      paymentIntent.status === 'requires_action'
    || (isRetry === true && paymentIntent.status === 'requires_payment_method')
    ) {
      return stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: paymentMethodId,
      })
        .then((result) => {
          if (result.error) {
          // Start code flow to handle updating the payment details.
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc).
            throw result;
          } else if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer.
          // There's a risk of the customer closing the window before the callback.
          // We recommend setting up webhook endpoints later in this guide.
            return {
              priceId,
              subscription,
              invoice,
              paymentMethodId,
            };
          }
          return null;
        })
        .catch((error) => {
          displayError(error.message);
        });
    }
    // No customer action needed.
    return { subscription, priceId, paymentMethodId };
  }

  function handleRequiresPaymentMethod({
    subscription,
    paymentMethodId,
    priceId,
  }) {
    console.log('handleRequiresPaymentMethod');
    if (subscription.status === 'active') {
    // subscription is active, no customer actions required.
      return { subscription, priceId, paymentMethodId };
    } if (
      subscription.latest_invoice.payment_intent.status === 'requires_payment_method'
    ) {
    // Using localStorage to manage the state of the retry here,
    // feel free to replace with what you prefer.
    // Store the latest invoice ID and status.
      localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
      localStorage.setItem(
        'latestInvoicePaymentIntentStatus',
        subscription.latest_invoice.payment_intent.status,
      );
      displayError('Your card was declined.');
      return null;
    }
    return { subscription, priceId, paymentMethodId };
  }

  async function createSubscription({ customerId, paymentMethodId, priceId }) {
    return (
      createStripeSubscription(customerId, paymentMethodId, priceId)
      // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.data.error) {
          // The card had an error when trying to attach it to a customer.
            throw result;
          }
          return result.data;
        })
      // Normalize the result to contain the object returned by Stripe.
      // Add the additional details we need.
        .then((result) => ({
          paymentMethodId,
          priceId,
          subscription: result,
        }))
      // Some payment methods require a customer to be on session
      // to complete the payment process. Check the status of the
      // payment intent to handle these actions.
        .then(handlePaymentThatRequiresCustomerAction)
      // If attaching this card to a Customer object succeeds,
      // but attempts to charge the customer fail, you
      // get a requires_payment_method error.
        .then(handleRequiresPaymentMethod)
      // No more actions required. Provision your service for the user.
        .then(onSubscriptionComplete)
        .catch((error) => {
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
          displayError(error.message);
        })
    );
  }


  function retryInvoiceWithNewPaymentMethod({
    customerId,
    paymentMethodId,
    invoiceId,
    priceId,
  }) {
    return (
      fetch('/retry-invoice', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          paymentMethodId,
          invoiceId,
        }),
      })
        .then((response) => response.json())
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.data.error) {
            // The card had an error when trying to attach it to a customer.
            throw result;
          }
          return result.data;
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((result) => ({
          // Use the Stripe 'object' property on the
          // returned result to understand what object is returned.
          invoice: result,
          paymentMethodId,
          priceId,
          isRetry: true,
        }))
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(handlePaymentThatRequiresCustomerAction)
        // No more actions required. Provision your service for the user.
        .then(onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          displayError(error.message);
        })
    );
  }

  const processPayment = async () => {
    const metadata = {};
    if (token) {
      metadata.userId = user.id;
    }
    const r = await createStripeCustomer(email, metadata);
    if (r && r.data && r.data.customer) {
      const customerId = r.data.customer.id;
      const priceId = membership === 'monthly'
        ? process.env.STRIPE_MONTHLY_PLAN : process.env.STRIPE_ANNUAL_PLAN;

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);
      // If a previous payment was attempted, get the latest invoice
      const latestInvoicePaymentIntentStatus = localStorage.getItem(
        'latestInvoicePaymentIntentStatus',
      );
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      setLoading(true);
      if (error) {
        displayError(error.message);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        const paymentMethodId = paymentMethod.id;
        if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
          // Update the payment method and retry invoice payment
          const invoiceId = localStorage.getItem('latestInvoiceId');
          retryInvoiceWithNewPaymentMethod({
            customerId,
            paymentMethodId,
            invoiceId,
            priceId,
          });
        } else {
          // Create the subscription
          createSubscription({ customerId, paymentMethodId, priceId });
        }
      }
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
              ) : (
                <>
                  <Box mb={2}>
                    <Typography variant="h6">Selected Plan</Typography>
                    <Typography variant="subtitle2" style={{ textTransform: 'capitalize' }}>
                      Pro
                      {' '}
                      { membership }
                      {' - '}
                      { membership === 'annual' ? '$119' : '$12.99' }
                    </Typography>
                  </Box>
                  <Box mt={2} mb={2}>
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      disabled={token}
                      label="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </Box>
                  <Box mt={2} mb={2}>
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
                  <Box textAlign="left" mt={4}>
                    <EntreButton
                      variant="outlined"
                      size="small"
                      onClick={() => onClose()}
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
                </>
              ) }
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

StripeForm.propTypes = {
  membership: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

StripeForm.defaultProps = {
  onClose: () => {},
};


export default StripeForm;
