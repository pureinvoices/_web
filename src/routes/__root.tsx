import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { User } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Auth from '../components/Auth';

const RootComponent = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar user={user as User | null} />
      <hr />
      {user ? <Outlet /> : <Auth />}
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
