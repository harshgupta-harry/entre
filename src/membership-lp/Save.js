import React from 'react';
import {
  Grid, Typography, Box, makeStyles,
} from '@material-ui/core/';


const useStyles = makeStyles(() => ({

  text: {
    fonFamily: 'Roboto',
    fontSize: '35px',
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: '0em',
    color: '#272044',
    marginBottom: '25px',
    '@media (max-width:600px)': {
      fontSize: '21px',
      lineHeight: '30px',
    },
    '@media (max-width:1280px) and (min-width:600px)': {
      fontSize: '35px',
      lineHeight: '45px',
    },
  },
  textColor: {
    color: '#00C4FF',
  },

}));

function Save() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.gridItem} style={{ marginTop: '1em' }}>
          <Typography variant="body1" color="initial" className={classes.text}>
            <span className={classes.textColor}> Save 20k+ </span>
            on Software, Products, &amp; Services
          </Typography>
          <Box mb={2}>
            <img src="/images/computerInline.png" alt="Computer Inline" style={{ maxWidth: '100%' }} />
          </Box>
        </Grid>
        <Grid item container xs={12}>
          <Typography variant="body1" color="initial" className={classes.text}>
            <span className={classes.textColor}>Learn from Top Experts </span>
            with Private Office Hours &amp; Free Events
          </Typography>
          <Grid item md={6}>
            <Box mb={2}>
              <img src="/images/computerLearning.png" alt="Computer Learning" style={{ maxWidth: '100%' }} />
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box mb={2}>
              <img src="/images/pro_video_image.png" alt="Computer Learning" style={{ maxWidth: '100%' }} />
            </Box>
          </Grid>
        </Grid>
      </Grid>

    </>
  );
}

export default Save;
