import React from 'react';
import Grid from '@material-ui/core/Grid';
import Linkify from 'linkifyjs/react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import SlimCardContent from '../SlimCardContent';
import EntreButton from '../EntreButton';
import SmallCard from './SmallCard';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    padding: 20,
    cursor: 'pointer',
  },
  detail: {
    cursor: 'auto',
  },
  profileImageContainer: {
    position: 'relative',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: '12.5%',
    objectFit: 'cover',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    margin: '15px 0',
    width: '100%',
    height: 1,
  },
  jobLevelIcon: {
    width: 15,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  jobTypeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  locationIcon: {
    width: 15,
    height: 20,
    marginRight: 10,
    verticalAlign: 'text-top',
  },
  teamIconBox: {
    width: '100%',
    display: 'block',
  },
  teamIconWrapper: {
    width: 30,
    height: 30,
    display: 'inline-block',
  },
  teamIcon: {
    width: '100%',
    height: '100%',
    padding: 2,
    verticalAlign: 'text-top',
  },
  bodyText: {
    fontSize: '16px',
    color: '#000',
  },
  listItem: {
    display: 'flex',
    margin: '5px 0px',
  },
  wrapperSpacing: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  gridPadding1: {
    padding: '0 12px 0 0',
  },
  gridPadding2: {
    padding: '0 0 0 12px',
  },
  updatedH6Style: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
}));

const PostDetailCard = (props) => {
  const classes = useStyles();
  const { post, detail } = props;
  return (
    <Card className={clsx(classes.root, detail && classes.detail)}>
      <CardHeader
        avatar={(
          <div className={classes.profileImageContainer}>
            <Avatar
              alt={post.name}
              src={post.avatar}
              className={classes.avatar}
            />
          </div>
        )}
        action={null}
        title={(<div className={classes.jobTitle}>{post.name}</div>)}
        subheader={(
          <>
            <div className={classes.listItem}>
              <EntreButton
                variant="contained"
                color="primary"
                size="large"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(post.website, '_blank');
                }}
                tabIndex="-1"
              >
                Website
              </EntreButton>
              <EntreButton
                variant="contained"
                color="primary"
                size="large"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`mailto:${post.email}`, '_blank');
                }}
                tabIndex="-1"
              >
                Contact
              </EntreButton>
            </div>
          </>
        )}
      />
    </Card>
  );
};

PostDetailCard.propTypes = {
  post: PropTypes.object,
  detail: PropTypes.bool,
};

PostDetailCard.defaultProps = {
  post: {},
  detail: false,
};

export default React.memo(PostDetailCard);
