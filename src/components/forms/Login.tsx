import { ReactElement, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { auth } from '../../utils/firebase';
import { emailSchema } from './validationSchema';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from 'react-firebase-hooks/auth';
import SubmitButton from './SubmitButton';
import SubmitError from './SubmitError';

const passwordSchema = z.string().min(2, { message: 'Invalid password' });

export default function Login(): ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [passEmailSent, setPassEmailSent] = useState(false);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      if (isForgotPass) {
        try {
          await sendPasswordResetEmail(value.email);
          setPassEmailSent(true);
        } catch (error) {
          console.error('Error sending password reset email:', error);
        }
      } else {
        try {
          await signInWithEmailAndPassword(value.email, value.password);
        } catch (error) {
          console.error('Error signing in:', error);
        }
      }
      form.reset();
    },
  });

  return (
    <div className="mx-auto flex flex-col gap-4 md:w-1/3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="mb-3 flex flex-col">
          <form.Field
            name="email"
            validatorAdapter={zodValidator}
            validators={{ onChange: emailSchema }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Your Email</label>
                <input
                  type={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border bg-gray-50 p-2"
                  placeholder="name@website.com"
                />
                {field.state.meta.errors ? (
                  <em role="alert" className="text-orange-800">
                    {field.state.meta.errors.join(', ')}
                  </em>
                ) : null}
              </>
            )}
          />
          {passEmailSent && isForgotPass && (
            <p className="font-semibold text-green-800">
              An email has been sent with instructions to reset your password.
              Please check your inbox.
            </p>
          )}
        </div>
        {!isForgotPass && (
          <div className="mb-3 flex flex-col">
            <form.Field
              name="password"
              validatorAdapter={zodValidator}
              validators={{ onChange: passwordSchema }}
              children={(field) => (
                <>
                  <label htmlFor="password">Your Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border bg-gray-50 p-2"
                    placeholder="••••••••"
                  />
                  <span className="flex justify-between">
                    <label>
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />{' '}
                      Show Password
                    </label>
                  </span>

                  {field.state.meta.errors ? (
                    <em role="alert" className="text-orange-800">
                      {field.state.meta.errors.join(', ')}
                    </em>
                  ) : null}
                </>
              )}
            />
          </div>
        )}
        <SubmitButton
          form={form}
          title="Login"
          submittingTitle="Submitting..."
        />
      </form>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setIsForgotPass(!isForgotPass);
            setPassEmailSent(false);
          }}
          className="font-bold hover:underline"
        >
          {isForgotPass ? 'Login' : 'Forgot password?'}
        </button>
      </div>
      <SubmitError
        error={error}
        type="auth/invalid-credential"
        errMessage="Invalid email or password. Please, try again."
      />
    </div>
  );
}
