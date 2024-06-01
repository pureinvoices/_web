import { createFileRoute, redirect } from '@tanstack/react-router';

const Items: React.FC = () => {
  return (
    <div className="p-2">
      <h3>Items Page</h3>
    </div>
  );
};

export const Route = createFileRoute('/items')({
  beforeLoad: ({ context }) => {
    if (!context.authUser) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: Items,
});
