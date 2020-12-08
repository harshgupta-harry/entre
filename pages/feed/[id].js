import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CommentField from '../../src/components/content/CommentField';
import withAuth from '../../src/helpers/withAuth';
import PostCard from '../../src/components/content/PostCard';
import {
  loadPost,
  loadComments,
} from '../../common/data/actions';
import CommentMenu from '../../src/components/content/CommentMenu';
import GoBackSection from '../../src/components/GoBackSection';
import EntreAvatar from '../../src/components/EntreAvatar';
import EntreLink from '../../src/components/EntreLink';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: '12.5%',
  },
  commentDescript: {
    marginTop: -10,
    marginLeft: 16,
    marginRight: 16,
    whiteSpace: 'pre-line',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    height: 1,
  },
  commentField: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
  },
  fixedComment: {
    position: 'fixed',
    bottom: 0,
    width: 608,
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

function FeedScreen(props) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.home.post);
  const classes = useStyles();
  const { id } = props;

  const loadingComments = useSelector((state) => state.home.loadingComments);
  const hasMoreComments = useSelector((state) => state.home.hasMoreComments);
  const comments = useSelector((state) => state.home.comments);
  const pageSize = 10;

  async function fetchPostComments(postId, limit = pageSize, offset = 0) {
    loadComments(postId, offset, limit);
  }

  const fetchComments = useCallback((p) => {
    console.log('fetchComments');
    fetchPostComments(id, pageSize, (p - 1) * pageSize);
  }, [comments]);

  useEffect(() => {
    if (id) {
      dispatch(loadPost(id));
      fetchPostComments(id);
    }
  }, [id]);

  return (
    <Container component="main" maxWidth="md">
      <Grid container justify="center">
        <Grid item sm={8}>
          <Box mb={2}>
            <GoBackSection />
          </Box>
          { post && <PostCard post={post} detail /> }
          <Typography variant="h6">Comments</Typography>
          <Box className={classes.card}>
            <Card style={{ marginBottom: 110 }}>
              <InfiniteScroll
                style={{ width: '100%' }}
                pageStart={1}
                hasMore={hasMoreComments && !loadingComments}
                loadMore={fetchComments}
              >
                {comments.map((comment, index) => (
                  <Box key={comment.id}>
                    <CardHeader
                      titleTypographyProps={{ variant: 'body2' }}
                      avatar={(
                        <EntreLink href="/profile/[username]" as={`/profile/${comment.author.username}`}>
                          <EntreAvatar
                            size={40}
                            fullName={comment.author.fullName}
                            avatar={comment.author.avatar}
                            isPro={comment.author.isPro}
                          />
                        </EntreLink>
                    )}
                      action={(post.id && comment.id
                        ? (
                          <CommentMenu
                            author={comment.author}
                            postId={post.id}
                            commentId={comment.id}
                          />
                        )
                        : null)}
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
                    { index !== comments.length - 1
                      ? <Divider className={classes.divider} /> : null }
                  </Box>
                ))}
                { loadingComments && (
                <Box textAlign="center" my={3}>
                  <CircularProgress />
                </Box>
                )}
              </InfiniteScroll>
            </Card>
          </Box>
        </Grid>
        <Card className={classes.fixedComment}>
          <Box px={2} pt={1}>
            <CommentField className={classes.commentField} postId={id} />
          </Box>
        </Card>
      </Grid>
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

FeedScreen.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withAuth(FeedScreen);
