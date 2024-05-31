import { Link } from '@tanstack/react-router';
import { auth } from '@/utils/firebase';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import NavMenu from './NavMenu';
import Alert from './Alert';
import logo from '../assets/inline-black.png';

function Navbar() {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-2 py-4">
        <div className="flex items-center gap-10">
          <Link to="/">
            <img src={logo} alt="Pure invoices logo" className="h-8" />
          </Link>
          {user && <NavMenu />}
        </div>

        <div className="flex gap-4">
          {user && (
            <>
              <p>current user: {user.email}</p>
              <button
                className="font-bold"
                onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    console.log('logged out');
                  }
                }}
              >
                logout
              </button>
            </>
          )}
        </div>
      </div>
      {user && !user?.emailVerified && <Alert message={'email_verification'} />}
    </>
  );
}

export default Navbar;
