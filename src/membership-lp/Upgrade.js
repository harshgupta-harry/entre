import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Grid,
  Typography,
  Box,
  makeStyles,
  Button,
  Switch,
  Modal,
  Card,
  CardContent,
  Backdrop,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import SignIn from '../index/SignIn';
import SignUp from '../index/SignUp';

import StripeForm from '../pro/StripeForm';
import {
  checkEmail,
} from '../../common/data/actions';

const stripePromise = loadStripe(`${process.env.STRIPE_PK}`);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  itemLogo: {
    display: 'flex',
    justifyContent: 'center',
  },
  img: {
    maxWidth: '80%',
    maxHeight: 60,
    '@media (max-width:600px)': {
      maxWidth: '60%',
    },
  },
  itemArt1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemTitle: {
    fontFamily: 'Roboto',
    fontSize: '50px',
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: '59px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#003399',
    maxWidth: 500,
    '@media (max-width:600px)': {
      fontSize: '32px',
      lineHeight: '40px',
    },
    '@media (max-width:1280px) and (min-width:600px)': {
      fontSize: '36px',
      lineHeight: '45px',
    },
  },
  imgArt: {
    maxWidth: '90%',
    width: '700px',
  },
  itemCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.25)',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },
  cardHeader: {
  },
  cardHeaderTitle: {
    fontFamily: 'Poppins',
    fontSize: '17px',
    fontStyle: 'normal',
    fontHeight: '600',
    lineHeight: '28px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#00C4FF',
  },
  cardNumber: {
    width: '230px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '55px',
    textAlign: 'center',
    color: '#272044',
  },
  icon: {
    height: '15px',
    // width: '19px',
    padding: '0',
    marginLeft: '17px',
    marginRight: '17px',
  },
  cardText: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  button: {
    width: '205px',
    height: '48px',
    background: '#00C4FF',
    boxShadow: '0px 10px 15px rgba(30, 38, 109, 0.1)',
    borderRadius: '100px',
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#FFFFFF',
  },
  footerText: {
    fontFamily: 'Roboto',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '28px',
    letterSpacing: '0em',
    '@media (max-width:600px)': {
      fontSize: '19px',
      lineHeight: '24px',
      textAlign: 'center',
    },
  },
  smallPrice: {
    fontSize: '24px',
    verticalAlign: 'top',
    lineHeight: '60px',
  },
  membershipText: {
    fontSize: '20px',
    lineHeight: '38px',
    color: '#00C4FF',
    fontWeight: 'bold',
  },
  freeVersion: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  close: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
}));

function Upgrade() {
  const router = useRouter();
  const classes = useStyles();
  const { email: initialEmail } = router.query;

  const [membership = 'monthly', setMembership] = useState();
  const [step = 0, setStep] = useState();
  const [email = initialEmail, setEmail] = useState();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    if (user && user.isPro) {
      router.push('/');
    }
  }, [user]);

  return (
    <>
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
            email={email}
            onClose={async (purchaseEmail) => {
              if (!token && purchaseEmail) {
                const exists = await checkEmail(purchaseEmail);
                setStep(exists ? 2 : 3);
                setEmail(purchaseEmail);
              } else {
                setStep(0);
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
        onClose={() => {
          setStep(0);
        }}
        style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
      >
        <Card>
          <CardContent style={{ padding: 20 }}>
            <Box maxWidth={380} position="relative">
              <Button
                className={classes.close}
                onClick={() => setStep(0)}
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
              <Typography variant="h6" align="center">
                {step === 2 ? 'Log In' : 'Sign Up'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {step === 2
                  ? 'A user already exists with the email used to purchase the membership, please login with that account to continue.'
                  : 'Please create an account with the email used to purchase the membership to create your Entre account to continue.'}
              </Typography>
              {step === 2
                ? <SignIn email={email} />
                : <SignUp email={email} />}
            </Box>
          </CardContent>
        </Card>
      </Modal>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Box mt={[1]} mb={[2, 4]} className={classes.itemLogo}>
            <img src="/images/entrepro.png" alt="Enter Pro" className={classes.img} />
          </Box>
        </Grid>
        <Grid item md={8} className={classes.itemArt1}>
          <Typography variant="h1" color="initial" className={classes.itemTitle}>
            Upgrade to Entre Pro and grow your business 10X faster.
          </Typography>
          <Box mt={[2, 4]} mb={[2, 0]} align="center">
            <img src="/images/membership-lp.jpeg" alt="Enter Pro" className={classes.imgArt} />
          </Box>
          <Box
            mt={[1, 4]}
            mb={[3, 2]}
            onClick={() => { setStep(3); }}
            cursor="pointer"
            className={classes.freeVersion}
          >
            <Typography variant="body2" color="initial" className={classes.footerText}>
              Maybe Later, I just want to use the Free Version right now
            </Typography>
            <img src="/icons/arrowRigth.png" alt="Arrow right" className={classes.icon} />
          </Box>
        </Grid>
        <Grid item md={4} className={classes.itemCard}>
          <Box className={classes.card} mb={[2, 6]}>
            <Box display="flex" className={classes.cardHeader}>
              <Typography className={classes.membershipText}>Monthly</Typography>
              <Switch
                checked={membership !== 'monthly'}
                onChange={(event) => {
                  if (!event.target.checked) {
                    setMembership('monthly');
                  } else {
                    setMembership('annual');
                  }
                }}
                color="primary"
              />
              <Typography className={classes.membershipText}>Annual</Typography>
            </Box>
            <Typography variant="h1" color="initial" className={classes.cardNumber}>
              {membership === 'monthly' ? (
                <>
                  $12.99
                  <span className={classes.smallPrice}>/mo</span>
                </>
              ) : (
                <>
                  $119
                  <span className={classes.smallPrice}>/year</span>
                </>
              )}
            </Typography>
            <Box display="flex" flexDirection="column" flexWrap="wrap" mt={3}>
              <Box display="flex" className={classes.cardItem} mb={3}>
                <img src="/icons/checkmark.png" alt="Enter Pro Soldier" className={classes.icon} />
                <Typography variant="body2" color="initial" className={classes.cardText}>
                  Access to All Entre Events for Free
                </Typography>
              </Box>
              <Box display="flex" mb={3}>
                <img src="/icons/checkmark.png" alt="Enter Pro Soldier" className={classes.icon} />
                <Typography variant="body2" color="initial" className={classes.cardText}>
                  Access to All Deals & Discounts
                </Typography>
              </Box>
              <Box display="flex" mb={3}>
                <img src="/icons/checkmark.png" alt="Enter Pro Soldier" className={classes.icon} />
                <Typography variant="body2" color="initial" className={classes.cardText}>
                  Acess to Investor Database
                </Typography>
              </Box>
              <Box display="flex" mb={3}>
                <img src="/icons/checkmark.png" alt="Enter Pro Soldier" className={classes.icon} />
                <Typography variant="body2" color="initial" className={classes.cardText}>
                  Pro Members-Only Office Hours
                </Typography>
              </Box>

              <Box display="flex" mb={3}>
                <img src="/icons/checkmark.png" alt="Enter Pro Soldier" className={classes.icon} />
                <Typography variant="body2" color="initial" className={classes.cardText}>
                  Live chat support
                </Typography>
              </Box>
              <Box display="flex" mb={3}>
                <img src="/icons/checkmark.png" alt="Enter Pro Soldier" className={classes.icon} />
                <Typography variant="body2" color="initial" className={classes.cardText}>
                  Pro Badge on Profile Picture
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <form autoComplete="off">

                  <Button variant="contained" border={0} className={classes.button}>
                    <Typography
                      onClick={() => {
                        setStep(1);
                      }}
                      variant="subtitle1"
                      align="center"
                      className={classes.label}
                    >
                      Get Started
                    </Typography>
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Upgrade;
