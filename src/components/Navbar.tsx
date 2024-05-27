import { Link } from '@tanstack/react-router';
import logo from '../assets/inline-black.png';

const routes = ['Home', 'Profile', 'Clients', 'Items', 'Invoices'];

function Navbar() {
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
        <Link to="/auth" className="[&.active]:font-bold">
          <button>login</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
