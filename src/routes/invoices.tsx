import { createFileRoute, redirect } from '@tanstack/react-router';

const Invoices: React.FC = () => {
  return (
    <div className="p-2">
      <h3>Invoices Page</h3>
    </div>
  );
};

export const Route = createFileRoute('/invoices')({
  beforeLoad: ({ context }) => {
    if (!context.authUser) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: Invoices,
});
