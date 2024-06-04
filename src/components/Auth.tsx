import { useState, ReactElement } from 'react';
import Login from '../components/forms/Login';
import Signup from '../components/forms/Signup';

function Auth(): ReactElement {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (): void => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      {isLogin ? <Login /> : <Signup />}
      <div className="mx-auto flex w-1/3">
        <p className="font-light text-gray-500">
          {isLogin ? "Don't have an account yet?" : 'Already have an account?'}{' '}
          <button
            type="button"
            className="font-semibold hover:underline"
            onClick={toggleForm}
            aria-label={isLogin ? 'Switch to sign up' : 'Switch to login'}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
