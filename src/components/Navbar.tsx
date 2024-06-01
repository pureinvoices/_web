import { ReactElement } from 'react';
import { Link } from '@tanstack/react-router';
import { auth } from '@/utils/firebase';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import NavMenu from './NavMenu';
import Alert from './Alert';
import logo from '../assets/inline-black.png';

function Navbar(): ReactElement {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const handleSignOut = async () => {
    try {
      const success = await signOut();
      if (success) {
        console.log('logged out');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-2 py-4">
        <div className="flex items-center gap-10">
          <Link to="/">
            <img src={logo} alt="Pure Invoices logo" className="h-8" />
          </Link>
          {user && <NavMenu />}
        </div>

        <div className="flex gap-4">
          {user ? (
            <>
              <p>current user: {user.email}</p>
              <button className="font-bold" onClick={handleSignOut}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="font-bold">
              Login
            </Link>
          )}
        </div>
      </div>
      {user && !user.emailVerified && <Alert message="email_verification" />}
    </>
  );
}

export default Navbar;
