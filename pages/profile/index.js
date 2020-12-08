import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import withAuth from '../../src/helpers/withAuth';

function ProfileScreen() {
  const router = useRouter();
  const user = useSelector((state) => state.account.user);
  if (typeof window !== 'undefined' && user) {
    router.push('/profile/[username]', `/profile/${user.username}`);
  }
  return null;
}

export default withAuth(ProfileScreen);
