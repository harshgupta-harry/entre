import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FullWidthTabs from '../src/index/Tab';
import withNoSession from '../src/helpers/withNoSession';
import Footer from '../src/components/Footer';
import theme from '../src/theme';

const useStyles = makeStyles(() => ({
  root: {
    margin: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeButton: {
    width: '80%',
    maxWidth: 200,
  },
  gridItem: {
    width: '100%',
  },
}));

function IndexScreen() {
  const classes = useStyles(theme);

  return (
    <Container className={classes.root}>
      <Box mt={[4, 4, 6, 6, 10]}>
        <Grid container>
          <Grid className={classes.gridItem} item sm>
            <Box
              mr={[2, 2, 2, 6, 6]}
              ml={[2, 2, 2, 8, 8]}
            >
              <Box mb={1}>
                <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: 41 }}>
                  Social network for the future of work.
                </Typography>
              </Box>
              <Box mt={2} className={classes.center}>
                <img
                  style={{ width: '100%' }}
                  src="/home_image.png"
                  alt="Entre Logo"
                />
              </Box>
              <Box
                mt={[2, 2, 4, 4, 4]}
              >
                <Grid container>
                  <Grid item xs={6}>
                    <a
                      className={classes.center}
                      href="http://entre.link/homepage"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        className={classes.storeButton}
                        src="/google-play-badge.png"
                        alt="Entre Logo"
                      />
                    </a>
                  </Grid>
                  <Grid item xs={6}>
                    <a
                      className={classes.center}
                      href="http://entre.link/homepage"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        className={classes.storeButton}
                        src="/app-store-badge.png"
                        alt="Entre Logo"
                      />
                    </a>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid className={classes.gridItem} item sm>
            <Box
              mt={[2, 0]}
              ml={[2, 2, 2, 6, 6]}
              mr={[2, 2, 2, 8, 8]}
            >
              <Card>
                <CardContent>
                  <FullWidthTabs />
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
}

export default withNoSession(IndexScreen);
