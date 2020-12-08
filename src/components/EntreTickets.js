/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import EntreButton from './EntreButton';
import Payment from './Payment';
import ProBadge from './ProBadge';

import newApi from '../../common/api/newApi';

const useStyles = makeStyles(() => ({
  card: {
    marginBottom: 10,
  },
  cardContent: {
    padding: 20,
  },
  accessTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  accessDescription: {
    fontSize: 13,
  },
  accessPrice: {
    fontSize: 14,
    textAlign: 'right',
    minWidth: 60,
  },
  link: {
    cursor: 'pointer',
    fontSize: 14,
    color: '#00C4FF',
  },
  selectedPromoCode: {
    fontSize: 14,
  },
}));

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function EntreTickets(props) {
  const classes = useStyles();
  const { event } = props;
  const [open = false, setOpen] = React.useState();
  const [tickets = [], setTickets] = useState();
  const [eventData, setEventData] = useState();
  const [showPromoForm = false, setShowPromoForm] = useState();
  const [promoCode, setPromoCode] = useState();
  const [selectedPromoCode, setSelectedPromoCode] = useState();
  const [codeError, setCodeError] = useState();
  const [ticket, setTicket] = React.useState();
  const [purchased = null, setPurchased] = useState();
  const [loading = false, setLoading] = useState();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.account.user);

  const fetchEventData = async () => {
    setLoading(true);
    const urlPrefix = token ? '' : 'public/';
    const res = await newApi.get(`${urlPrefix}tickets/event?name=${event}`);
    if (!res.data.error) {
      let sortedAccess = res.data.tickets
        .map((t) => ({ ...t, price: (t.price / 100) }))
        .sort((a, b) => ((a.price > b.price) ? 1 : -1));

      if (res.data.purchased) {
        setPurchased(res.data.purchased.ticket._id);
        sortedAccess = sortedAccess.filter((t) => t._id === res.data.purchased.ticket._id);
        setTickets(sortedAccess);
        setTicket(sortedAccess[0]);
      } else if (user && user.isPro) {
        const pro = sortedAccess.filter((t) => t.pro === true);
        setTickets(pro);
        setTicket(pro[0]);
      } else {
        const nonPro = sortedAccess.filter((t) => !t.pro);
        setTickets(nonPro);
        setTicket(nonPro[0]);
      }
      setEventData(res.data);
    } else {
      console.log(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  // useEffect(() => {
  //   setProTickets(tickets.filter((t) => t.pro === true));
  //   setNonProTickets(tickets.filter((t) => !t.pro));
  // }, [tickets]);

  const getFreeTicket = async () => {
    setLoading(true);
    const res = await newApi.post('tickets/pro', { ticketId: ticket._id, code: selectedPromoCode && selectedPromoCode.code });
    if (!res.data.error) {
      fetchEventData();
    }
  };

  const validateCode = async () => {
    const urlPrefix = token ? '' : 'public/';
    const res = await newApi.post(`${urlPrefix}tickets/code`, { ticketId: ticket._id, code: promoCode.trim().toLowerCase() });
    if (res.data.message) {
      setCodeError('Sorry, that code is invalid');
    } else {
      setShowPromoForm(false);
      setSelectedPromoCode(res.data);
      if (res.data.discount === '100') {
        setTickets(tickets.map((t) => ({ ...t, price: 0 })));
        setTicket({ ...ticket, price: 0 });
      }
    }
  };

  const renderTickets = (ticketsToRender) => {
    if (loading) return null;
    return ticketsToRender.map((access, index) => (
      <Box
        key={access._id}
        style={{
          display: 'flex',
          cursor: 'pointer',
          flexDirection: 'row',
        }}
        mb={2}
        onClick={() => {
          setTicket(access);
        }}
      >
        { !purchased && ticket && ticketsToRender.length > 1
          ? (
            <Box display="flex" justifyContent="center" mr={1}>
              <Radio
                color="primary"
                checked={ticket._id === access._id}
                onChange={() => {
                  setTicket(access);
                }}
                value={index}
                size="small"
              />
            </Box>
          ) : null }
        <Box>
          <Typography className={classes.accessTitle}>
            {access.name}
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography className={classes.accessDescription}>
              {access.description}
            </Typography>
            { !purchased && !access.pro && access.price !== 0
                && (
                <Typography className={classes.accessPrice}>
                  {formatter.format(access.price)}
                </Typography>
                )}
            { access.pro && (
            <div className={classes.accessPrice}>
              <ProBadge />
            </div>
            )}
            { !access.pro && access.price === 0 && (
              <Typography className={classes.accessPrice}>
                Free
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    ));
  };

  const renderPromoCodeForm = () => {
    if (loading || purchased) return null;
    if (eventData && eventData.hasCodes) {
      if (showPromoForm) {
        return (
          <Box align="right">
            <TextField
              fullWidth
              name="website"
              value={promoCode}
              error={codeError}
              helperText={codeError}
              placeholder="Enter promo code"
              onChange={(e) => setPromoCode(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Button onClick={validateCode}>
                    Apply
                  </Button>
                ),
              }}
            />
          </Box>
        );
      }

      if (selectedPromoCode) {
        return (
          <Box align="right">
            <Typography className={classes.selectedPromoCode}>
              Code:
              {' '}
              <strong>{selectedPromoCode.code}</strong>
            </Typography>
            <Typography className={classes.selectedPromoCode}>
              {selectedPromoCode.title}
            </Typography>
          </Box>
        );
      }

      return (
        <Box align="right">
          <Typography className={classes.link} onClick={() => setShowPromoForm(true)}>
            Enter promo code
          </Typography>
        </Box>
      );
    }
    return null;
  };

  if (user && user.isPro && !purchased && tickets.length) {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box mb={1}>
            <Typography variant="h3">
              Ticket
            </Typography>
          </Box>
          { loading ? (
            <Box textAlign="center">
              <CircularProgress />
              <Typography variant="body2">Please wait...</Typography>
            </Box>
          ) : (
            <>
              { renderTickets(tickets) }
              <Box align="center" mt={1}>
                <EntreButton
                  variant="contained"
                  size="small"
                  fullWidth
                  disabled={tickets.length === 0}
                  onClick={getFreeTicket}
                >
                  Attend for free
                </EntreButton>
              </Box>
            </>
          ) }
        </CardContent>
      </Card>
    );
  }

  if (tickets.length === 0 && !loading) return null;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box mb={2}>
          <Typography variant="h3">
            { purchased ? 'My' : '' }
            {' '}
            Ticket
          </Typography>
        </Box>
        { renderTickets(tickets) }
        { purchased && (
          <Box>
            <Typography variant="body2" align="left" style={{ marginBottom: 8, fontSize: 14 }}>
              Thank you for signing up for this event!
            </Typography>
            <Typography variant="body2" align="left" style={{ marginBottom: 8, fontSize: 14 }}>
              You should have just received your ticket via email with the link to
              join the event or you can just click the button below to join.
            </Typography>
            <Typography variant="body2" align="left" style={{ marginBottom: 8, fontSize: 14 }}>
              If you have any issues feel free to email us at
              {' '}
              <a
                href="mailto:support@joinentre.com"
                rel="noreferrer"
                target="_blank"
              >
                support@joinentre.com
              </a>
            </Typography>
          </Box>
        )}
        { loading && (
          <Box textAlign="center">
            <CircularProgress />
            <Typography variant="body2">Please wait...</Typography>
          </Box>
        )}
        { !loading && purchased && eventData && eventData.url && (
          <Box align="center" mt={2}>
            <EntreButton
              variant="contained"
              size="small"
              fullWidth
              disabled={tickets.length === 0}
              onClick={() => {
                window.open(
                  eventData.url,
                  '_blank',
                );
              }}
            >
              Join Zoom
            </EntreButton>
          </Box>
        )}
        { renderPromoCodeForm() }
        { !purchased && !loading && tickets.length > 0
          ? (
            <>
              <Box align="center" mt={1}>
                <EntreButton
                  variant="contained"
                  size="small"
                  fullWidth
                  disabled={tickets.length === 0}
                  onClick={() => {
                    if (ticket.price === 0 && token) {
                      getFreeTicket();
                    } else {
                      setOpen(true);
                      setLoading(true);
                    }
                  }}
                >
                  { ticket && ticket.price === 0 ? 'Attend for free' : 'Purchase' }
                </EntreButton>
              </Box>
            </>
          ) : null }
        { ticket
        && (
        <Payment
          ticket={ticket}
          open={open}
          onClose={(email, back) => {
            setOpen(false);
            if (back) {
              setLoading(false);
            } else {
              setTimeout(() => { // Wait for stripe hoook to apply purchase
                // find a better way to do this.
                fetchEventData();
                setLoading(false);
              }, 4000);
            }
          }}
        />
        )}
      </CardContent>
    </Card>
  );
}

EntreTickets.propTypes = {
  event: PropTypes.string.isRequired,
};

export default EntreTickets;
