import React from 'react';
import {
  Grid, makeStyles, Typography, Box,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  gridItem: {
    background: 'rgba(93, 197, 241, 0.05)',
    padding: 20,
    borderRadius: 10,
    minHeight: 342,
  },
  star: {
    fontSize: '35px',
    color: '#ed9421',
    style: 'normal',
    weight: '600',

  },
  date: {
    fontFamily: 'Roboto',
    color: '#636366',
    fontSize: ' 13px',
    fontWeight: '600',
    margin: '15px 0',
    style: 'normal',
  },
  title: {
    fontFamily: 'Roboto',
    color: '#1d1d1f',
    style: 'normal',
    fontSize: ' 14px',
    fontWeight: '500',
    lineHeight: '18px',

  },
  text: {
    fontFamily: 'Roboto',
    color: '#1d1d1f',
    style: 'normal',
    fontSize: ' 14px',
    fontWeight: '380',
    lineHeight: '18px',
    margin: '10px 0',
  },

}));

function Reviews() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <Box className={classes.gridItem}>
            <Box display="flex">
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
            </Box>
            <Typography variant="body1" color="initial" className={classes.date}>
              Radar37, 09/30/2020
            </Typography>
            <div className={classes.title}>Best Networking On the planet </div>
            <Typography variant="body2" color="initial" className={classes.text}>
              ENTRE - has forged entrepreneurs from around the globe into one community.
              Built an incredible networking system where we can specify the niche we are
              looking to connect with. Virtual meetings throughout the month for all
              types of venues.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box className={classes.gridItem}>
            <Box display="flex">
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
            </Box>
            <Typography variant="body1" color="initial" className={classes.date}>
              Volva yet, 08/31/2020
            </Typography>
            <div className={classes.title}>App keeps getting better!!!</div>
            <Typography variant="body2" color="initial" className={classes.text}>
              Network and search for other entrepreneurs, investors, and freelancers
              (all for free); find events; get major discounts and special access
              through their low cost premium package... already a big
              value and they just got started.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box className={classes.gridItem}>
            <Box display="flex">
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
            </Box>
            <Typography variant="body1" color="initial" className={classes.date}>
              revoll23 , 09/25/2020
            </Typography>
            <div className={classes.title}>Great for connecting with entrepreneurs!</div>
            <Typography variant="body2" color="initial" className={classes.text}>
              Great app for networking with entrepreneurs and business
              minded people. It has features that easily enable you to filter potential
              connections by industry, title, location etc for free. They also host
              high quality events and offer deals and discounts for their pro members.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box className={classes.gridItem}>
            <Box display="flex">
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
            </Box>
            <Typography variant="body1" color="initial" className={classes.date}>
              pacmanwvu, 09/24/2020
            </Typography>
            <div className={classes.title}>Entrepreneurs need to check out this app</div>
            <Typography variant="body2" color="initial" className={classes.text}>
              Entre helps aspiring entrepreneurs to search for and engage cofounders,
              mentors, subject matter experts and contractors. With the rapidly growing
              popularity of entrepreneurs across the world, there&apos;s a real need to
              aggregate all these types of activities and Entre is being built to
              eventually make that happen!
            </Typography>
          </Box>
        </Grid>


      </Grid>
    </>
  );
}

export default Reviews;
