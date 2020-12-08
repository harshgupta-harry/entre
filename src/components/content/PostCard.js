import React from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import Linkify from 'linkifyjs/react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Img from 'react-cool-img';
import moment from 'moment';
import SvgIcon from '@material-ui/core/SvgIcon';
import SlimCardContent from '../SlimCardContent';
import UpVote from './UpVote';
import PostMenu from './PostMenu';
import IndustriesTags from './IndustriesTags';
import UsersTags from './UsersTags';
import EntreCardHeader from '../EntreCardHeader';
import { setFilters } from '../../../common/data/actions';
import trimText from '../../helpers/trimText';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '0 solid #000',
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  detail: {
    cursor: 'auto',
  },
  media: {
    marginTop: 20,
    width: '100%',
    height: 'auto',
  },
  image: {
    width: '100%',
    maxWidth: '550px',
    maxHeight: '550px',
    borderRadius: '15px',
    objectFit: 'contain',
  },
  imageDetail: {
    width: 'unset',
    maxHeight: 'none',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 15,
    width: '90%',
    height: 1,
  },
  button: {
    color: '#78849E',
  },
  buttons: {
    marginLeft: 'auto',
  },
  upvoteIcon: {
    marginBottom: 2,
    height: 19,
    width: 16,
    marginRight: 5,
  },
  commentIcon: {
    height: 22,
    marginTop: 5,
    marginRight: -5,
  },
  locationLink: {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: 15,
    color: '#51caf9',
    padding: 0,
  },
}));

function CommentIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M0.733049 15.7901C0.63774 16.0527 0.619306 16.3371 0.679907 16.6099C0.740509 16.8826 0.877633 17.1324 1.07519 17.33C1.27276 17.5275 1.52256 17.6646 1.7953 17.7253C2.06805 17.7859 2.35241 17.7674 2.61505 17.6721L5.31505 17.0171C6.57857 17.6723 7.98282 18.0093 9.40605 17.9991C11.3529 17.9866 13.2425 17.3392 14.7879 16.1551C16.3333 14.971 17.4501 13.315 17.9687 11.4384C18.4873 9.56187 18.3793 7.56735 17.6612 5.75774C16.9431 3.94812 15.6541 2.42228 13.9899 1.4119C12.3258 0.401518 10.3773 -0.038194 8.44051 0.159533C6.5037 0.35726 4.68431 1.18163 3.25863 2.50744C1.83295 3.83326 0.878868 5.58811 0.54126 7.50549C0.203653 9.42288 0.500965 11.3981 1.38805 13.1311L0.733049 15.7901ZM3.06505 13.2131C3.11926 13.0056 3.08982 12.7851 2.98305 12.5991C2.11305 11.0473 1.83408 9.23306 2.19767 7.49156C2.56125 5.75007 3.54283 4.199 4.96105 3.12492C6.37927 2.05084 8.1383 1.52633 9.91316 1.64829C11.688 1.77025 13.3588 2.53044 14.6167 3.78841C15.8747 5.04639 16.6349 6.71714 16.7569 8.492C16.8788 10.2669 16.3543 12.0259 15.2802 13.4441C14.2062 14.8623 12.6551 15.8439 10.9136 16.2075C9.1721 16.5711 7.35786 16.2921 5.80605 15.4221C5.71444 15.3679 5.61287 15.3328 5.50739 15.3187C5.4019 15.3046 5.29466 15.3119 5.19205 15.3401L2.32805 16.0401L3.06405 13.2171L3.06505 13.2131ZM13.088 8.18111C13.305 8.18111 13.5131 8.09493 13.6665 7.94152C13.8199 7.78812 13.906 7.58006 13.906 7.36311C13.906 7.14616 13.8199 6.9381 13.6665 6.78469C13.5131 6.63129 13.305 6.54511 13.088 6.54511H5.72405C5.5071 6.54511 5.29904 6.63129 5.14564 6.78469C4.99223 6.9381 4.90605 7.14616 4.90605 7.36311C4.90605 7.58006 4.99223 7.78812 5.14564 7.94152C5.29904 8.09493 5.5071 8.18111 5.72405 8.18111H13.088ZM13.088 11.4541C13.305 11.4541 13.5131 11.3679 13.6665 11.2145C13.8199 11.0611 13.906 10.8531 13.906 10.6361C13.906 10.4192 13.8199 10.2111 13.6665 10.0577C13.5131 9.90429 13.305 9.81811 13.088 9.81811H8.17905C7.9621 9.81811 7.75404 9.90429 7.60064 10.0577C7.44723 10.2111 7.36105 10.4192 7.36105 10.6361C7.36105 10.8531 7.44723 11.0611 7.60064 11.2145C7.75404 11.3679 7.9621 11.4541 8.17905 11.4541H13.088Z" />
    </SvgIcon>
  );
}

const PostCard = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { post, detail } = props;

  const goToPost = (e) => {
    if (detail) return;
    if (!(e && e.target.tagName === 'A')) {
      router.push('/feed/[id]', `/feed/${post.id}`);
    }
  };

  const userLocationFilter = (city, state, country) => {
    const locResult = {
      city,
      state,
      country,
    };
    dispatch(setFilters({
      section: 'posts',
      location: locResult,
    }));
  };

  const locationOnClick = (event) => {
    event.stopPropagation();
    if (post) {
      userLocationFilter(
        post.location.city ? post.location.city : '',
        post.location.state ? post.location.state : '',
        post.location.country ? post.location.country : '',
      );
      if (window.location.pathname !== '/search') {
        router.push('/search');
      }
    }
  };

  if (!post.author) return null;

  return (
    <Card className={clsx(classes.root, detail && classes.detail)}>
      <EntreCardHeader
        author={post.author}
        title={post.author.title ? post.author.title.join(' | ') : ''}
        subtitle={(
          <>
            Posted:&nbsp;
            {moment(post.postDate).calendar(null, {
              sameElse: 'MMM DD, YYYY',
            })}
            { post.location && post.location.city && post.location.state
              ? (
                <>
                  {' - '}
                  <button type="button" className={classes.locationLink} onClick={locationOnClick}>
                    {post.location.city}
                    {', '}
                    {post.location.state}
                  </button>
                </>
              )
              : null }
          </>
        )}
        action={(
          detail ? null : <PostMenu author={post.author} postId={post.id} />
        )}
      />
      <SlimCardContent onClick={goToPost}>
        <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
          <Linkify>
            {!detail && trimText(post.description)}
            {detail && post.description}
          </Linkify>
        </Typography>
        {post.imageUrl ? (
          <div className={classes.media}>
            <Img
              className={clsx(classes.image, detail && classes.imageDetail)}
              src={post.imageUrl}
              alt={post.description}
            />
          </div>
        ) : null}
        { detail
          ? (
            <Box mt={2}>
              <IndustriesTags industry={post.industry} />
              <UsersTags users={post.taggedUser} />
            </Box>
          ) : null }
      </SlimCardContent>
      <Divider className={classes.divider} />
      <CardActions disableSpacing>
        <div className={classes.buttons}>
          <Button className={classes.button} onClick={goToPost}>
            <CommentIcon className={classes.commentIcon} />
            {post.commentCount}
          </Button>
          <UpVote
            isFavorite={post.isFavorite}
            postId={post.id}
            favoriteCount={post.favoriteCount}
          />
        </div>
      </CardActions>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
  detail: PropTypes.bool,
};

PostCard.defaultProps = {
  post: {},
  detail: false,
};

export default React.memo(PostCard);
