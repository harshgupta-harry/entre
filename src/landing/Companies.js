import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexFlow: 'wrap',
  },
  img: {
    maxWidth: '190px',
    maxHeight: '65px',
    margin: '10px',
  },
  companies: {
    fontFamily: 'Roboto',
    fontSize: '30px;',
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#272044',
    width: '231px',
  },
}));

function Companies() {
  const classes = useStyles();
  return (
    <Box
      mt={2}
      display="flex"
      className={classes.root}
      justifyContent="center"
    >
      <Typography variant="h6" className={classes.companies}>
        AS SEEN IN
      </Typography>
      <img src="/images/techcrunch.png" alt="Tech crunch" className={classes.img} />
      <Box mb={1}>
        <img src="/images/wefunderLogo.png" alt="Wefounder" className={classes.img} />
      </Box>
      <img src="/images/yahoo.png" alt="Yahoo" className={classes.img} />
      <img src="/images/marketwatch.png" alt="Market watch" className={classes.img} />
      <img src="/images/financial.png" alt="Financial" className={classes.img} />
    </Box>
  );
}

export default Companies;
