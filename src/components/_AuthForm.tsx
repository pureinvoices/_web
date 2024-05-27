import { useState } from 'react';

function AuthForm() {
  const [isNewUser, setIsNewUser] = useState(true);

  return (
    <form className="mx-auto flex w-1/3 flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border bg-gray-50 p-2"
          placeholder="name@website.com"
          required={true}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="border bg-gray-50 p-2"
          required={true}
        />
      </div>
      {isNewUser && (
        <div className="flex flex-col">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            className="border bg-gray-50 p-2"
            required={true}
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input id="remember" aria-describedby="remember" type="checkbox" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember">Remember me</label>
          </div>
        </div>
        <a>Forgot password?</a>
      </div>
      <button type="submit" className="bg-gray-200 py-2 hover:bg-gray-300">
        Sign in with email
      </button>
      <button type="submit" className="bg-yellow-200 py-2 hover:bg-yellow-300">
        Sign in with Google
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        {isNewUser ? 'Already have an account?' : "Don't have an account yet?"}{' '}
        <button
          type="button"
          className="font-bold hover:underline"
          onClick={() => setIsNewUser(!isNewUser)}
        >
          {isNewUser ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </form>
  );
}

export default AuthForm;
