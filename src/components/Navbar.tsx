import { Link } from '@tanstack/react-router';
import logo from '../assets/inline-black.png';
import { auth } from '@/utils/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';

const routes = ['Home', 'Profile', 'Clients', 'Items', 'Invoices'];

interface NavbarProps {
  user: User | null;
}

function Navbar({ user }: NavbarProps) {
  const [signOut] = useSignOut(auth);

  return (
    <div className="flex items-center justify-between gap-2 px-2 py-5">
      <div className="flex items-center gap-10">
        <Link to="/">
          <img src={logo} alt="Pure invoices logo" className="h-8" />
        </Link>
        <div className="flex gap-3">
          {routes.map((route) => (
            <Link
              key={route}
              to={route === 'Home' ? '/' : `/${route.toLowerCase()}`}
              className="[&.active]:font-bold"
            >
              {route}
            </Link>
          ))}
        </div>
      </div>

      <div>
        {user && (
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
        )}
      </div>
    </div>
  );
}

export default Navbar;
