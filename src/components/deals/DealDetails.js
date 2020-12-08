import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Img from 'react-cool-img';
import Linkify from 'linkifyjs/react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

import EntreButton from '../EntreButton';
import EntreTypography from '../EntreTypography';
import { loadDeals } from '../../../common/data/actions';

const useStyles = makeStyles(() => ({
  head: {
    marginBottom: 40,
  },
  offer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 40,
    marginTop: 20,
  },
  listItem: {
    display: 'flex',
    marginBottom: '10px',
  },
  listIcon: {
    fontSize: 24,
    color: '#00C4FF',
  },
  listItemText: {
    fontSize: 20,
    marginLeft: 16,
    marginTop: 0,
    marginBottom: 0,
  },
  image: {
    maxWidth: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  secondary: {
    color: 'grey',
  },
  subhead: {
    fontSize: 30,
  },
}));

function DealDetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.list);
  const data = deals.find((d) => d.id === props.id);

  useEffect(() => {
    if (deals.length === 0) {
      dispatch(loadDeals());
    }
  }, []);

  const redeemDeal = () => {
    if (data.redeem.type === 'link') {
      window.analytics.track('Deal Redeem', {
        deal: data.title,
        link: data.redeem.content,
      });
      window.open(data.redeem.content, '_blank');
    }
  };

  if (!data) return null;
  return (
    <Card>
      <CardContent>
        <Grid container className={classes.head}>
          <Grid item>
            <Img
              className={classes.image}
              src={data.image}
              alt="Some alt"
            />
          </Grid>
          <Grid item className={classes.offer}>
            <Typography variant="h2">{data.deal}</Typography>
            <Typography color="body1" className={classes.secondary}><Linkify>{data.subtitle}</Linkify></Typography>
          </Grid>
          { data.requirements
            ? (
              <Grid item className={classes.offer}>
                <EntreTypography variant="h3" className={classes.subhead}>Requirements</EntreTypography>
                <EntreTypography variant="body1">
                  {data.requirements}
                </EntreTypography>
              </Grid>
            ) : null }
          { data.benefits.length
            ? (
              <Grid item className={classes.offer}>
                <EntreTypography variant="h3" className={classes.subhead}>Benefits</EntreTypography>
                <div>
                  {data.benefits.map((description) => (
                    <div className={classes.listItem} key={description}>
                      <CheckIcon className={classes.listIcon} />
                      <span className={classes.listItemText}>{description}</span>
                    </div>
                  ))}
                </div>
              </Grid>
            ) : null }
        </Grid>

        <div style={{ textAlign: 'center' }}>
          <EntreButton
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            onClick={redeemDeal}
          >
            Redeem
          </EntreButton>
        </div>
      </CardContent>
    </Card>
  );
}

DealDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DealDetails;
