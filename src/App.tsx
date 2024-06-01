import { RouterProvider } from '@tanstack/react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';
import { User } from 'firebase/auth';
import { router } from './router';

export default function App() {
  const [user] = useAuthState(auth);

  const routerContext = {
    authUser: user ? (user as User) : null,
  };

  return <RouterProvider router={router} context={routerContext} />;
}
