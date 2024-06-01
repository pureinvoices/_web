import { createFileRoute, redirect } from '@tanstack/react-router';

const Clients: React.FC = () => {
  return (
    <div className="p-2">
      <h3>Clients Page</h3>
    </div>
  );
};

export const Route = createFileRoute('/clients')({
  beforeLoad: ({ context }) => {
    if (!context.authUser) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: Clients,
});
