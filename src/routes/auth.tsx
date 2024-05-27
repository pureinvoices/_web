import LoginForm from '@/components/LoginForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: Auth,
});

function Auth() {
  return (
    <div className="flex p-2">
      <LoginForm />
    </div>
  );
}
