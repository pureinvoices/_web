import { createFileRoute, redirect } from '@tanstack/react-router';

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

function Items() {
  return (
    <div className="p-2">
      <h3>Items Page</h3>
    </div>
  );
}
