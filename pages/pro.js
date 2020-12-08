import Container from '@material-ui/core/Container';
import forAllUsers from '../src/helpers/forAllUsers';
import Pricing from '../src/pro/Pricing';
import Partner from '../src/pro/Partner';
import Landing from '../src/pro/Landing';
import Event from '../src/pro/Event';

const ProScreen = () => (
  <Container>
    <Landing />
    <Event />
    <Partner />
    <Pricing />
  </Container>
);

export default forAllUsers(ProScreen);
