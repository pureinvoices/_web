import { ReactElement } from 'react';
import { Link } from '@tanstack/react-router';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profile' },
  { name: 'Clients', path: '/clients' },
  { name: 'Items', path: '/items' },
  { name: 'Invoices', path: '/invoices' },
];

function NavMenu(): ReactElement {
  return (
    <nav className="flex gap-3" aria-label="Main navigation">
      {routes.map(({ name, path }) => (
        <Link
          key={name}
          to={path}
          className="[&.active]:font-bold"
          aria-current={window.location.pathname === path ? 'page' : undefined}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}

export default NavMenu;
