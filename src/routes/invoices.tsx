import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/invoices')({
  component: Invoices,
});

function Invoices() {
  return (
    <div className="p-2">
      <h3>Invoices Page</h3>
    </div>
  );
}
