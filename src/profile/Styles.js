import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginTop: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: 600,
  },
  profileImageContainer: {
    position: 'relative',
    width: 130,
    // margin: '0 auto',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: '12.5%',
    objectFit: 'cover',
    background: '#CCC',
  },
  proBadgeSmall: {
    fontSize: 15,
    lineHeight: '15px',
    backgroundColor: '#0B3593',
    borderRadius: 6,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    position: 'absolute',
    fontStyle: 'italic',
    padding: '5px 9px 4px 7px',
    left: -12,
    bottom: -12,
    boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.2)',
  },
  generals: {
    width: '100%',
    padding: '20px !important',
  },
  listItem: {
    display: 'flex',
    marginBottom: '3px',
  },
  listIcon: {
    fontSize: 18,
    color: '#00C4FF',
  },
  listItemText: {
    fontSize: 16,
    color: '#9F9F9F',
    marginLeft: 6,
    marginTop: 0,
    marginBottom: 3,
  },
  name: {
    display: 'flex',
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 5,
  },
  userName: {
    color: '#9F9F9F',
    fontSize: 15,
    marginBottom: 5,
  },
  centerContent: {
    width: 130,
    textAlign: 'center',
  },
  connections: {
    marginTop: 10,
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
  proIcon: {
    marginTop: 3,
    marginLeft: 10,
    width: 25,
    height: 25,
  },
}));
