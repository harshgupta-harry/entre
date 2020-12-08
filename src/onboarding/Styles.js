import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  h1: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '30px',
    lineHeight: '35px',
    marginBottom: '30px',
  },
  instructions: {
    fontFamily: 'Roboto',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    marginBottom: 20,
    width: 260,
    height: 260,
    borderRadius: '12.5%',
    objectFit: 'cover',
  },
  loader: {
    margin: '100px 50%',
  },
  locationInput: {
    padding: '20px',
    fontSize: '18px',
    margin: '20px 0px',
    width: '400px',
    textAlign: 'center',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  locationContainer: {
    width: '400px',
    backgroundColor: '#3049BA33',
    padding: '10px 20px',
    borderRadius: '10px',
  },
  locationSuggestion: {
    cursor: 'pointer',
    margin: '10px 0px',
  },
  locationSuggestionActive: {
    backgroundColor: 'green',
  },
}));

export default useStyles;
