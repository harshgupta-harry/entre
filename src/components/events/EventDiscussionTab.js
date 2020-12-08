import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
// import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import SlimCardContent from '../SlimCardContent';
import CommentField from './CommentField';
import EntreAvatar from '../EntreAvatar';
import EntreLink from '../EntreLink';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: 'white',
    boxShadow: 'none',
    marginTop: 0,
  },
  commentDescript: {
    marginLeft: 16,
    marginRight: 16,
    whiteSpace: 'pre-line',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 15,
    width: '90%',
    height: 1,
  },
  commentField: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
  },
}));

const EventDiscussionTab = (props) => {
  const classes = useStyles();
  const { comments, eventId } = props;
  return (
    <Box>
      <Card className={classes.card}>
        {comments.map((comment, index) => (
          <Box index={index}>
            <CardHeader
              titleTypographyProps={{ variant: 'body2' }}
              avatar={(
                <EntreLink href="/profile/[username]" as={`/profile/${comment.author.username}`}>
                  <EntreAvatar
                    fullName={comment.author.fullName}
                    avatar={comment.author.avatar}
                    isPro={comment.author.isPro}
                  />
                </EntreLink>
              )}
              action={null}
              title={comment.author.fullName}
              subheader={(
                <>
                  <div>
                    Commented:&nbsp;
                    {moment(comment.createdAt).calendar(null, {
                      sameElse: 'MMM DD, YYYY',
                    })}
                  </div>
                </>
              )}
            />
            <Typography variant="body2" className={classes.commentDescript}>
              {comment.comment}
            </Typography>
            <CardActions disableSpacing />
            <Divider className={classes.divider} />
          </Box>
        ))}
        <SlimCardContent>
          <CommentField className={classes.commentField} postId={eventId} />
        </SlimCardContent>
      </Card>
    </Box>
  );
};

EventDiscussionTab.propTypes = {
  comments: PropTypes.array.isRequired,
  eventId: PropTypes.string.isRequired,
};

export default EventDiscussionTab;
