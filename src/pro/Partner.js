import React, { useEffect } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import Img from 'react-cool-img';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { loadDeals } from '../../common/data/actions';
import EntreButton from '../components/EntreButton';
import SlimCardContent from '../components/SlimCardContent';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  media: {
    maxHeight: '80%',
    maxWidth: '80%',
  },
  cardContent: {
    marginBottom: 0,
    paddingBottom: '0 !important',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  imageContainer: {
    marginTop: 15,
    textAlign: 'center',
    height: 75,
    position: 'relative',
    zIndex: 1,
    marginBottom: 15,
  },
  image: {
    height: '75px',
    minWidth: '150px',
    width: '150px',
    objectFit: 'contain',
    // border: '1px solid gray',
    // boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.2)',
    borderRadius: '12.5%',
    padding: 5,
  },
}));


const Partner = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const deals = useSelector((state) => state.deals.list);
  const featuredDeals = deals.filter((d) => d.featured);
  useEffect(() => {
    dispatch(loadDeals());
  }, []);

  return (
    <Box mt={[2, 8]} mb={[1, 2]}>
      <Container>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Deals & Discounts with our Partners
        </Typography>
      </Container>
      <Divider />
      <Container className={classes.cardGrid}>
        <Grid container spacing={4} align="center">
          {featuredDeals.map((deal) => (
            <Grid item key={deal.title} xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <SlimCardContent className={classes.cardContent}>
                  <Box className={classes.imageContainer}>
                    <Img
                      className={classes.image}
                      src={deal.image}
                      alt={deal.title}
                    />
                  </Box>
                  <Typography>
                    {deal.deal}
                  </Typography>
                </SlimCardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={3}>
          <EntreButton
            variant="contained"
            color="primary"
            variation="outlined"
            onClick={() => router.push('/search?section=deals')}
          >
            See all deals
          </EntreButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Partner;
