import { createFileRoute } from '@tanstack/react-router';

const Index: React.FC = () => {
  return (
    <div className="p-2">
      <h3>Home Page</h3>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
