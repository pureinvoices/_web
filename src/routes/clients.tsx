import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/clients')({
  component: Clients,
});

function Clients() {
  return (
    <div className="p-2">
      <h3>Clients Page</h3>
    </div>
  );
}
