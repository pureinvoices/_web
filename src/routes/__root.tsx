import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { User } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Auth from '../components/Auth';

interface RouterContext {
  authUser: User | null;
}

const RootComponent = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />
      {user ? <Outlet /> : <Auth />}

      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
