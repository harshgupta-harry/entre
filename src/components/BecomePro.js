import React from 'react';
// import { useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
// import theme from '../theme';
import ProModal from './ProModal';
// import EntreButton from './EntreButton';

// const useStyles = makeStyles(() => ({
//   root: {
//     backgroundColor: 'white',
//     border: '0 solid #000',
//     boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
//     borderRadius: '20px',
//     marginBottom: '20px',
//     padding: 10,
//   },
//   center: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   subtitle: {
//     fontFamily: 'Roboto',
//     fontStyle: 'normal',
//     fontWeight: 'normal',
//     fontSize: 15,
//     textAlign: 'center',
//     color: '#242134',
//     marginTop: 5,
//     marginBottom: 0,
//   },
// }));

// const BecomePro = () => {
//   const classes = useStyles(theme);
//   const { isPro } = useSelector((state) => state.account.user);
//   const [open = false, setOpen] = React.useState();
//   if (isPro) return null;
//   return (
//     <Card className={classes.root}>
//       <ProModal onClose={() => setOpen(false)} visible={open} />
//       <Box mt={1} mb={1} className={classes.subtitle}>
//         Become an Entre Pro Member and get free tickets to all our events,
//         exclusive deals with our partners, and much more.
//       </Box>
//       <Box align="center">
//         <EntreButton
//           type="submit"
//           size="small"
//           variant="contained"
//           color="primary"
//           onClick={() => setOpen(true)}
//         >
//           Upgrade to PRO
//         </EntreButton>
//       </Box>
//     </Card>
//   );
// };

// export default BecomePro;

const BecomePro = () => {
  const [open = false, setOpen] = React.useState();
  return (
    <>
      <ProModal onClose={() => setOpen(false)} visible={open} />
      <Box mb={0} mt={0} style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
        <img
          width="280px"
          src="/images/pro_membership_banner.png"
          alt="Entre Mobile Banner"
        />
      </Box>
    </>
  );
};

export default BecomePro;
