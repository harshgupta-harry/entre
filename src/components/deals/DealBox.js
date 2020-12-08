/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import EntreButton from '../EntreButton';
import ProModal from '../ProModal';
import trimText from '../../helpers/trimText';

const useStyles = makeStyles(() => ({
  container: {
    margin: 5,
    marginTop: 0,
    position: 'relative',
    backgroundColor: '#FFF',
    borderRadius: 10,
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    padding: 10,
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  head: {
    height: '40px',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 10,
    zIndex: 0,
  },
  content: {
    minHeight: 150,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 65,
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  image: {
    height: '65px',
    minWidth: '65px',
    width: '65px',
    objectFit: 'contain',
    // border: '1px solid gray',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.2)',
    borderRadius: '12.5%',
    padding: 5,
  },
  title: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: '20px',
  },
  deal: {
    textAlign: 'center',
    color: '#9F9F9F',
    fontSize: '14px',
    marginBottom: 10,
  },
  listItem: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 8,
    // height: 30,
  },
  listItemText: {
    fontSize: 11,
    lineHeight: '20px',
    backgroundColor: '#F3F5F9',
    borderRadius: '25px',
    padding: '0 15px',
    textAlign: 'center',
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  },
}));

function DealBox(props) {
  const {
    deal: {
      image, title, deal, id,
      industries, subtitle,
    },
    isPro,
    isUser,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const viewDealDetail = () => {
    if (isPro) {
      router.push(`/deals/${id}`);
    } else if (isUser) {
      setOpen(true);
    } else {
      router.push('/');
    }
  };

  return (
    <Box className={classes.container}>
      <ProModal onClose={() => setOpen(false)} visible={open} />
      <Box>
        <Box className={classes.imageContainer}>
          <Img
            className={classes.image}
            src={image}
            alt={title}
          />
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box ml={2}>
              <div className={classes.title}>{title}</div>
              <Box className={classes.listItem}>
                {/* {industries.map((i) => (
                  <Box className={classes.listItemText}>
                    {i}
                  </Box>
                ))} */}
                <Box className={classes.listItemText}>
                  {industries[0]}
                </Box>
              </Box>
            </Box>
            {/* <Box>
              <EntreButton
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                onClick={viewDealDetail}
              >
                { isPro ? 'View' : isUser ? 'Upgrade to PRO' : 'Log In / Sign Up' }
              </EntreButton>
            </Box> */}
          </Box>
        </Box>
        <Box mb={1}>
          <Typography variant="body2" style={{ textAlign: 'left', fontSize: 12 }}>
            {trimText(subtitle, 110)}
          </Typography>
        </Box>
      </Box>
      <Box mt={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body2"
            style={{
              textAlign: 'center', fontWeight: 'bold', flex: 1, fontSize: 14,
            }}
          >
            {deal}
          </Typography>
        </Box>
        <Box mt={1}>
          <EntreButton
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={viewDealDetail}
          >
            { isPro ? 'View' : isUser ? 'Upgrade to PRO' : 'Log In / Sign Up' }
          </EntreButton>
        </Box>
      </Box>
    </Box>
  );
}

DealBox.propTypes = {
  deal: PropTypes.object.isRequired,
  isUser: PropTypes.bool,
  isPro: PropTypes.bool,
};

DealBox.defaultProps = {
  isUser: false,
  isPro: false,
};

export default DealBox;
