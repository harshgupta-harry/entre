import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  commonSigleMessageChatHeaderPad: {
    padding: '15px 40px 15px',
    borderBottom: '0.6px solid #E7E7E7',
    opacity: 0.7,
  },
  backIconStyle: {
    minHeight: '22px',
    minWidth: '22px',
  },
  singleUserName: {
    color: '#000000',
    fontWeight: 600,
  },
}));

const HeaderTitle = (props) => {
  const classes = useStyles();
  const {
    setSingleChatView,
    thread,
    updatedHeaderTitle,
    setToggleSearchWidget,
  } = props;
  const userAuth = useSelector((state) => state.auth.userAuth);
  let displayCounter = 0;
  if (thread.id === undefined) { return null; }
  return (
    <Grid container spacing={0} className={[classes.commonSigleMessageChatHeaderPad, updatedHeaderTitle]} alignItems="center">
      <Grid item xs={1} sm={1} alignItems="center">
        <Button
          size="large"
          className={classes.backIconStyle}
          startIcon={<ArrowBackIosIcon className={classes.backIconStyle} />}
          onClick={() => {
            setSingleChatView(false);
            setToggleSearchWidget(false);
          }}
        />
      </Grid>
      <Grid item xs={10} sm={10}>
        {thread.participantsInfo.map((participant, idx) => {
          if (userAuth.uid !== participant.id && idx < 3) {
            // eslint-disable-next-line no-plusplus
            displayCounter++;
            return (
              <Typography variant="inherit" component="span" className={classes.singleUserName}>
                {`${displayCounter > 1 ? ', ' : ''}${participant.fullName}`}
              </Typography>
            );
          } return null;
        })}
      </Grid>
      <Grid item xs={1} sm={1} alignItems="center">
        {thread.participantsInfo.length > 4 && (
          <Typography
            variant="body2"
            component="p"
            style={{
              height: 25,
              width: 25,
              borderRadius: 10,
              fontSize: '16px',
              backgroundColor: '#ddd',
              textAlign: 'center',
              lineHeight: '25px',
            }}
          >
            {`+${thread.participantsInfo.length - 4}`}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

HeaderTitle.propTypes = {
  thread: PropTypes.object.isRequired,
  setSingleChatView: PropTypes.func.isRequired,
  setToggleSearchWidget: PropTypes.func.isRequired,
  updatedHeaderTitle: PropTypes.any,
};

HeaderTitle.defaultProps = {
  updatedHeaderTitle: null,
};
export default HeaderTitle;
