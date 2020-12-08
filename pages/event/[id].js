import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import forAllUsers from '../../src/helpers/forAllUsers';
import EventCard from '../../src/components/events/EventCard';
import {
  loadEventPost, clearEventPost,
  // loadEventComments, loadEventAttendees,
} from '../../common/data/actions';

import ContentThreeColumns from '../../src/components/ContentThreeColumns';
import EntreTabs from '../../src/components/EntreTabs';
import EventAboutTab from '../../src/components/events/EventAboutTab';
import EventDiscussionTab from '../../src/components/events/EventDiscussionTab';
import EventAttendeesTab from '../../src/components/events/EventAttendeesTab';
import GoBackSection from '../../src/components/GoBackSection';
import EntreTickets from '../../src/components/EntreTickets';
import GetTicketMobile from '../../src/components/GetTicketMobile';
import EntreBecomeProCard from '../../src/components/EntreBecomeProCard';

const useStyles = makeStyles(() => ({
  close: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  ticketsModal: {
    backgroundColor: '#FFF',
    height: '100%',
    padding: 10,
  },
  sponsorImage: {
    height: '65px',
    minWidth: '65px',
    width: '65px',
    objectFit: 'contain',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.2)',
    borderRadius: '12.5%',
    padding: 5,
  },
  sponsorTitle: {
    textAlign: 'left',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    lineHeight: '20px',
  },
}));

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
};

function EventScreen(props) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.events.post);
  const loadingPost = useSelector((state) => state.events.loadingPost);
  const comments = useSelector((state) => state.events.comments);
  const attendees = useSelector((state) => state.events.attendees);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.account.user);
  const [open = false, setOpen] = useState();
  const classes = useStyles();
  const ticketing = (post && post.ticketing);
  const { id } = props;

  const sections = [
    { title: 'About', component: <EventAboutTab post={post} /> },
    { title: 'Atendees', component: <EventAttendeesTab attendees={attendees} eventId={id} />, hide: ticketing || !token },
    { title: 'Discussion', component: <EventDiscussionTab comments={comments} eventId={id} />, hide: !token },
  ].filter((s) => !s.hide);

  useEffect(() => {
    if (id) {
      dispatch(loadEventPost(id));
      if (token) {
        // dispatch(loadEventComments(id));
        // dispatch(loadEventAttendees(id));
      }
    }
    return () => {
      dispatch(clearEventPost());
    };
  }, [id]);

  const renderTicketing = () => {
    if (!post || !ticketing || loadingPost) return null;
    return <EntreTickets event={ticketing} />;
  };

  const renderBecomeAPro = () => {
    if (!post || !ticketing || loadingPost) return null;
    return (token && user && user.isPro ? null : (
      <EntreBecomeProCard />
    ));
  };

  const renderSponsors = () => {
    if (!post || !post.sponsors) return null;
    const sortedSponsors = post.sponsors;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box mb={1}>
            <Typography variant="h3">Sponsored by</Typography>
          </Box>
          {sortedSponsors.map(({ title, logo }) => (
            <Box display="flex" flexDirection="row" alignItems="center">
              <Img
                className={classes.sponsorImage}
                src={logo}
                alt={title}
              />
              <Typography className={classes.sponsorTitle}>
                {title}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderEvent = () => (
    <Box mb={[8, 0]} mt={[-3, 0]}>
      { token && post && !loadingPost ? (
        <Box mb={[1, 2]} width="100%">
          <GoBackSection />
        </Box>
      ) : null }
      { loadingPost ? <div style={loaderStyle}><CircularProgress /></div> : null }
      { post && !loadingPost
        && (
          <Card style={{ width: '100%', marginBottom: 0 }}>
            <EventCard post={post} detail />
            <EntreTabs fullWidth={!ticketing} tabs={sections} />
          </Card>
        )}
    </Box>
  );

  return (
    <Container component="main" maxWidth="lg">
      <ContentThreeColumns
        center={renderEvent()}
        right={(
          <Hidden smDown>
            <Box mt={token ? 7 : 0}>
              {renderTicketing()}
              {renderBecomeAPro()}
              {renderSponsors()}
            </Box>
          </Hidden>
        )}
      />
      <Hidden mdUp>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Box className={classes.ticketsModal}>
            <Button
              className={classes.close}
              onClick={() => setOpen(false)}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Box mb={1} ml={1}>
              <Typography variant="h3">
                Purchase tickets
              </Typography>
              { post && (
                <>
                  <Typography variant="h6" align="left" color="textPrimary">
                    {post.title}
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      {post.startDateTime !== null ? `${moment(post.startDateTime)
                        .format('MMMM Do')} at ${moment(post.startDateTime)
                        .format('hh:mm a')}` : 'N/A'}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            {renderTicketing()}
            {renderBecomeAPro()}
            {renderSponsors()}
          </Box>
        </Modal>
        <GetTicketMobile onClick={() => {
          setOpen(true);
        }}
        />
      </Hidden>
    </Container>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return { props: { id: params.id } };
}

EventScreen.propTypes = {
  id: PropTypes.string.isRequired,
};

export default forAllUsers(EventScreen);
