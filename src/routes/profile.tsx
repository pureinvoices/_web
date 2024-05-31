import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  beforeLoad: ({ context }) => {
    if (!context.authUser) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: Profile,
});

function Profile() {
  return (
    <div className="p-2">
      <h3>Profile Page</h3>
    </div>
  );
}
