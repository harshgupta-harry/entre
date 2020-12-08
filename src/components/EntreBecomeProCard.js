import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EntreButton from './EntreButton';
import ProModal from './ProModal';

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
    minWidth: 75,
  },
  logo: {
    maxWidth: '60%',
  },
}));

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function EntreTickets() {
  const classes = useStyles();
  const [open = false, setOpen] = React.useState();

  return (
    <Card className={classes.card}>
      <ProModal onClose={() => setOpen(false)} visible={open} />
      <CardContent className={classes.cardContent}>
        <Box>
          <Box mb={1}>
            <img alt="entre" className={classes.logo} src="/images/shortcuts_pro.png" />
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography className={classes.accessDescription}>
              Become Entre Pro member and join all our events for free
              + 20k in discounts from our partners.
            </Typography>
            <Typography className={classes.accessPrice}>
              {formatter.format(12.99)}
              <span style={{ fontSize: 12 }}>/mo</span>
            </Typography>
          </Box>
        </Box>
        <Box align="center" mt={1}>
          <EntreButton variant="contained" size="small" fullWidth onClick={() => setOpen(true)}>
            Join Entre Pro
          </EntreButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EntreTickets;
