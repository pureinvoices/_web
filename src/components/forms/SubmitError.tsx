import { AuthError } from 'firebase/auth';
import { ReactElement } from 'react';

interface SubmitErrorProps {
  error?: AuthError;
  type: string;
  errMessage: string;
}

export default function SubmitError({
  error,
  type,
  errMessage,
}: SubmitErrorProps): ReactElement {
  return (
    <>
      {error && (
        <div>
          <em className="text-orange-800">
            {error.message.includes(type)
              ? errMessage
              : `Error: ${error.message}`}
          </em>
        </div>
      )}
    </>
  );
}
