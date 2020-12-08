/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';
import EntreButton from '../components/EntreButton';
import SignIn from '../index/SignIn';
import SignUp from '../index/SignUp';

import StripeForm from './StripeForm';
import {
  checkEmail,
} from '../../common/data/actions';

const stripePromise = loadStripe(`${process.env.STRIPE_PK}`);

const useStyles = makeStyles((theme) => ({
  discount: {
    backgroundColor: '#00C4FF',
    borderRadius: '20px',
    padding: '3px 15px',
    color: 'white',
    fontWeight: 'bold',
  },
  secondHeader: {
    marginTop: 20,
    marginLeft: '15%',
    marginRight: '15%',
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(1),
  },
  proIcon: {
    textAlign: 'center',
    margin: 0,
  },
  buttons: {
    margin: '0px 20px',
  },
  listItemText: {
    fontSize: 16,
    display: 'inline-block',
    margin: '8px 3px',
    textAlign: 'left',
  },
  listIcon: {
    color: '#0B3593',
    fontSize: 22,
    display: 'inline-block',
    margin: 3,
  },
  listItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
}));

const monthlyDescriptions = [
  'Free tickets to all events',
  'Deals/Discounts with Partners',
  'Monthly Investor Office Hours',
];

const annualDescriptions = [
  ...monthlyDescriptions,
  'Access to Entre Beta Group',
];
const Pricing = () => {
  const classes = useStyles();
  const [step = 0, setStep] = useState();
  const [membership, setMembership] = useState();
  const [email, setEmail] = useState();

  const user = useSelector((state) => state.account.user);
  const token = useSelector((state) => state.auth.token);

  if (user && user.isPro) {
    router.push('/entre-pro-account');
  }

  const renderHead = () => (
    <>
      <a id="pricing" />
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Get Started with your Membership
      </Typography>
      <Divider />
      <Typography variant="body1" align="center" color="textSecondary" component="p" className={classes.secondHeader}>
        Meet and Connect with entrepreneurs, investors, advisors, freelancers,
        business owners, and other innovators every month.
      </Typography>
    </>
  );

  return (
    <Box mt={[2, 2]} mb={[1, 8]}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={step === 1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
      >
        <Elements stripe={stripePromise}>
          <StripeForm
            membership={membership}
            onClose={async (purchaseEmail) => {
              if (!token && purchaseEmail) {
                const exists = await checkEmail(purchaseEmail);
                setStep(exists ? 2 : 3);
                setEmail(purchaseEmail);
              } else {
                setStep(0);
                setMembership(null);
              }
            }}
          />
        </Elements>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={step === 2 || step === 3}
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
              <Typography variant="h6" align="center">
                { step === 2 ? 'Log In' : 'Sign Up' }
              </Typography>
              <Typography variant="body2" color="textSecondary">
                { step === 2
                  ? 'A user already exists with the email used to purchase the membership, please login with that account to continue.'
                  : 'Please create an account with the email used to purchase the membership to create your Entre account to continue.' }
              </Typography>
              { step === 2
                ? <SignIn email={email} />
                : <SignUp email={email} redirect={window.location.pathname} /> }
            </Box>
          </CardContent>
        </Card>
      </Modal>
      { renderHead() }
      <Grid container spacing={0} style={{ marginTop: 30, marginBottom: 45 }} justify="center">
        <Grid item xs={10} sm={8} md={4}>
          <Card style={{ marginTop: 40 }}>
            <CardContent>
              {/* <div className={classes.proIcon}>
                <Img
                  src="pro/upgrade-blue.png"
                  alt="profile"
                />
              </div> */}
              <Box mt={1} mb={1}>
                <Typography variant="h6" align="center" color="textPrimary" style={{ textTransform: 'uppercase' }}>
                  Monthly
                </Typography>
              </Box>
              <Box className={classes.cardPricing}>
                <Typography variant="h5" color="textSecondary">
                  $
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  12.99
                </Typography>
                <Typography variant="h7" color="textSecondary" style={{ placeSelf: 'flex-start', marginTop: 5, marginLeft: 3 }}>
                  /mo
                </Typography>
              </Box>
              <div>
                {monthlyDescriptions.map((description) => (
                  <div className={classes.listItem} key={description}>
                    <CheckCircleIcon className={classes.listIcon} />
                    <span className={classes.listItemText}>{description}</span>
                  </div>
                ))}
              </div>
              <Box textAlign="center" mt={2}>
                <EntreButton
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setStep(1);
                    setMembership('monthly');
                  }}
                >
                  Get Started
                </EntreButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10} sm={8} md={4}>
          <Card style={{ marginBottom: 0 }}>
            <CardContent>
              <Box justifyContent="center" display="flex" mb={2}>
                <Box className={classes.discount}>
                  23% Discount
                </Box>
              </Box>
              {/* <div className={classes.proIcon}>
                <Img
                  src="pro/upgrade-blue.png"
                  alt="profile"
                />
              </div> */}
              <Box mt={1} mb={1}>
                <Typography variant="h6" align="center" color="textPrimary" style={{ textTransform: 'uppercase' }}>
                  Annual
                </Typography>
              </Box>
              <Box className={classes.cardPricing}>
                <Typography variant="h5" color="textSecondary">
                  $
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  119
                </Typography>
                <Typography variant="h7" color="textSecondary" style={{ placeSelf: 'flex-start', marginTop: 5, marginLeft: 3 }}>
                  /year
                </Typography>
              </Box>
              <div>
                {annualDescriptions.map((description) => (
                  <div className={classes.listItem} key={description}>
                    <CheckCircleIcon className={classes.listIcon} />
                    <span className={classes.listItemText}>{description}</span>
                  </div>
                ))}
              </div>
              <Box textAlign="center" mt={2}>
                <EntreButton
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => {
                    setStep(1);
                    setMembership('annual');
                  }}
                >
                  Get Started
                </EntreButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pricing;
