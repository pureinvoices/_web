import { ReactElement } from 'react';

type MessageKey = 'email_verification';

interface AlertProps {
  message: MessageKey;
}

function Alert({ message }: AlertProps): ReactElement {
  const messages: Record<MessageKey, string> = {
    email_verification:
      'A confirmation link has been sent to your email. To start sending invoices you need to confirm your email address.',
  };

  return (
    <div
      className="flex items-center justify-center gap-2 bg-yellow-400 bg-opacity-30 px-2 py-1"
      aria-live="assertive"
    >
      <p>
        <span className="font-semibold">Action Required:</span>{' '}
        {messages[message]}
      </p>
    </div>
  );
}

export default Alert;
