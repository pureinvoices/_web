import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-2">
      {isLogin ? <LoginForm /> : <SignupForm />}
      <div className="mx-auto flex w-1/3">
        <p className="font-light text-gray-500">
          {isLogin ? "Don't have an account yet?" : 'Already have an account?'}{' '}
          <button
            type="button"
            className="font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
