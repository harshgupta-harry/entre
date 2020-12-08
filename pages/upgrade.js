import Container from '@material-ui/core/Container';
import forAllUsers from '../src/helpers/forAllUsers';
import Upgrade from '../src/membership-lp/Upgrade';
import Save from '../src/membership-lp/Save';
import Entrepreneurs from '../src/membership-lp/Entrepreneurs';


const Membership = () => (
  <Container>
    <Upgrade />
    <Save />
    <Entrepreneurs />
  </Container>
);

export default forAllUsers(Membership, { hideNav: true, hideChat: true });
