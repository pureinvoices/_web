import { createFileRoute, redirect } from '@tanstack/react-router';
import BusinessDetails from '../components/forms/BusinessDetails';

const Profile: React.FC = () => {
  return (
    <div className="p-2">
      <h3>Profile Page</h3>
      <BusinessDetails />
    </div>
  );
};

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
