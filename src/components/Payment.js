import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';


import { loadStripe } from '@stripe/stripe-js';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from '../index/SignIn';
import SignUp from '../index/SignUp';

import StripePayment from './StripePayment';
import {
  checkEmail,
} from '../../common/data/actions';

const stripePromise = loadStripe(`${process.env.STRIPE_PK}`);

const useStyles = makeStyles(() => ({
  modal: {

  },
}));

const Payment = (props) => {
  const { ticket, open, onClose } = props;
  const classes = useStyles();
  const free = ticket.price === 0;
  const [step = free ? 2 : 0, setStep] = useState();
  const [email, setEmail] = useState();

  // const user = useSelector((state) => state.account.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      onClose();
    }
  }, [token]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open && step === 0}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
      >
        <>
          <Elements stripe={stripePromise}>
            <StripePayment
              ticket={ticket}
              onClose={async (purchaseEmail, back = false) => {
                if (!token && purchaseEmail) {
                  const exists = await checkEmail(purchaseEmail);
                  setStep(exists ? 1 : 2);
                  setEmail(purchaseEmail);
                } else {
                  setStep(0);
                  onClose(null, back);
                }
              }}
            />
          </Elements>
        </>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open && (step === 1 || step === 2)}
        onClose={() => {
          if (free) {
            onClose(null, true);
          }
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
      >
        <Card>
          <CardContent>
            <Box maxWidth={380}>
              <Box mb={1}>
                <Typography variant="h6" align="center">
                  { step === 1 ? 'Log In' : 'Sign Up' }
                </Typography>
              </Box>
              <Typography variant="body2">
                { step === 1 && 'A user already exists with the email used to purchase the ticket, please login with that account to continue.' }
                { step === 2 && !free && 'Please create an account with the email used to purchase the membership to create your Entre account to continue.' }
                { step === 2 && free && 'Please create an account to get access to this event for free. You will be redirected to this page after Sign Up.' }
              </Typography>
              { free && (
              <Box mt={1}>
                <Typography variant="body2" align="right">
                  { step === 2 ? 'Already have an account? ' : 'Don\'t have an account? ' }
                  <span
                    role="link"
                    onKeyPress={() => {}}
                    tabIndex="-1"
                    style={{ cursor: 'pointer', fontWeight: 'bold', color: '#62CAFA' }}
                    onClick={() => {
                      setStep(step === 2 ? 1 : 2);
                    }}
                  >
                    { step === 2 ? 'Log In' : 'Sign Up' }
                  </span>
                </Typography>
              </Box>
              )}
              { step === 1
                ? <SignIn email={email} redirect={window.location.pathname} />
                : <SignUp email={email} redirect={window.location.pathname} /> }
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

Payment.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
};

Payment.defaultProps = {
  open: false,
};

export default Payment;
