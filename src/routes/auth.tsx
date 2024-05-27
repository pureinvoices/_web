import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: Auth,
});

function Auth() {
  return (
    <div className="p-2">
      <h3>Auth Page</h3>
    </div>
  );
}
