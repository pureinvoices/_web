import { Link } from '@tanstack/react-router';

const routes = ['Home', 'Profile', 'Clients', 'Items', 'Invoices'];

function NavMenu() {
  return (
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
  );
}

export default NavMenu;
