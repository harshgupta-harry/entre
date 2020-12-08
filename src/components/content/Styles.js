import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 75,
    marginBottom: 100,
  },
  title: {
    fontSize: 21,
    fontWeight: 600,
  },
  card: {
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
    borderRadius: '20px',
    marginBottom: '30px',
  },
  cardContent: {
    padding: '30px',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: '12.5%',
    objectFit: 'cover',
  },
  generals: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '60px 1fr',
    gridTemplateAreas: '"image info"',
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
    color: '#9F9F9F',
    marginLeft: 6,
    marginTop: 0,
    marginBottom: 0,
  },
  name: {
    gridArea: 'name',
    fontSize: 28,
    fontWeight: 600,
    marginBottom: '10px',
  },
  userName: {
    gridArea: 'userName',
    color: '#9F9F9F',
    fontSize: 22,
    marginBottom: '20px',
  },
  centerContent: {
    width: 170,
    textAlign: 'center',
  },
  connections: {
    marginTop: 20,
    fontSize: 22,
  },
  connectionsLabel: {
    fontSize: 16,
    color: '#9F9F9F',
  },
  bioInput: {
    width: '100%',
    marginTop: 10,
    fontSize: '16px',
    fontFamily: 'Roboto',
    padding: '10px',
  },
  saveEditBar: {
    textAlign: 'right',
    gridArea: 'saveEditBar',
  },
  topGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 0',
    gridTemplateAreas: '"name saveEditBar"\n "userName saveEditBar"',
  },
  locationContainer: {
    margin: '5px',
    backgroundColor: '#D7DAF0',
    position: 'absolute',
    padding: '10px 20px',
    borderRadius: '10px',
    zIndex: 5,
  },
  locationSuggestion: {
    cursor: 'pointer',
    margin: '10px 0px',
  },
  locationSuggestionActive: {
    backgroundColor: 'green',
  },
  check: {
    margin: '0 5px',
    color: 'green',
  },
  taken: {
    margin: '0 5px',
    color: 'red',
  },
  link: {
    color: '#00C4FF',
    textDecoration: 'none',
  },
}));
