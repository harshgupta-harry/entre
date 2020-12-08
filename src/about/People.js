import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(22),
  },
  cardContent: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  position: {
    fontSize: 16,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {
    position: 'FOUNDER & CEO',
    name: 'Michael Marra',
    twitter: 'https://twitter.com/michaelwmarra',
    linkedin: 'https://www.linkedin.com/in/michaelmarra1/',
  },
  {
    position: 'HEAD OF EVENTS',
    name: 'Jimmy Douloumbakas\n',
    linkedin: 'https://www.linkedin.com/in/jimmydouloumbakas/',
  },
  {
    position: 'CTO',
    name: 'Jonathan Velasquez',
    linkedin: 'https://www.linkedin.com/in/jonathanium/',
  },
  {
    position: 'CFO',
    name: 'Colby Schaeffer',
    linkedin: 'https://www.linkedin.com/in/colby-schaeffer/',
  },
  {
    position: 'CIO/TECH ADVISOR',
    name: 'Joe Hollowood',
    linkedin: 'https://www.linkedin.com/in/jhollowood/',
  },
  {
    position: 'ADVISOR/INVESTOR',
    name: 'Scott Kallick',
    linkedin: 'https://www.linkedin.com/in/goodinc/',
  },
  {
    position: 'ADVISOR',
    name: 'Phil Compton',
    linkedin: 'https://www.linkedin.com/in/philcompton/',
  },
  {
    position: 'TECH ADVISOR',
    name: 'Joe Pulaski',
    linkedin: 'https://www.linkedin.com/in/goodinc/',
  },
  {
    position: 'LEGAL & ADVISOR',
    name: 'Michael Wieser',
    linkedin: 'https://www.linkedin.com/in/michaelwieser/',
  },
  {
    position: 'MARKETING & EVENTS MANAGER',
    name: 'Sandi Lwin',
    linkedin: 'https://www.linkedin.com/in/sandi-lwin/',
  },
  {
    position: 'SPONSORSHIPS & PARTNERSHIPS',
    name: 'Arthur Ruffin',
    linkedin: 'https://www.linkedin.com/in/aruffin23/',
  },
  {
    position: 'CONTENT MANAGER',
    name: 'Ryan Solomon',
    linkedin: 'https://www.linkedin.com/in/ryan-solomon-9472a8156/',
  },
  {
    position: 'UX/UI DESIGNER',
    name: 'Tyler Harold',
    linkedin: 'https://www.linkedin.com/in/tyler-harold-2b1349180/',
  },
  {
    position: 'COMMUNITY MANAGER',
    name: 'Rachel Vollmer',
    linkedin: 'https://www.linkedin.com/in/rachel-vollmer-21698747/',
  },
  {
    position: 'WEBSITE MANAGER',
    name: 'Gary-Alan Hopkins',
    linkedin: 'https://www.linkedin.com/in/garyalanhopkins/',
  },
  {
    position: 'EVENT HOST & ADVISOR',
    name: 'Charlie Stephens',
    linkedin: 'https://www.linkedin.com/in/charliestephens/',
  },
  {
    position: 'COMMUNITY MANAGER',
    name: 'Miriam Dorsett',
    linkedin: 'https://www.linkedin.com/in/mdorsett/',
  },
  {
    position: 'COMMUNITY MANAGER',
    name: 'Johana Fonnegra',
    linkedin: 'https://www.linkedin.com/in/jojofromchicago/',
  },
];

export default function People() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Meet the Team
            </Typography>
          </Container>
          <Divider />
        </div>
        <Container className={classes.cardGrid}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={card.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia className={classes.cardMedia}>
                    <Avatar alt={card.name} className={classes.avatar} src={`/about/people/${index}.jpg`} />
                  </CardMedia>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="body1" align="center" className={classes.position}>
                      {card.position}
                    </Typography>
                    <Typography variant="h6" align="center">
                      {card.name}
                    </Typography>
                    <Box align="center">
                      {(card.linkedin)
                        ? (
                          <a href={card.linkedin}>
                            <LinkedInIcon style={{ color: 'grey' }} />
                          </a>
                        ) : null}

                      {(card.twitter)
                        ? (
                          <a href={card.linkedin}>
                            <TwitterIcon style={{ color: 'grey' }} />
                          </a>
                        ) : null}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
