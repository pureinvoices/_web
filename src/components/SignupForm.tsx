import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email address' });
const passwordSchema = z
  .string()
  .min(8, { message: 'At least 8 characters' })
  .regex(/[A-Z]/, { message: 'At least one uppercase letter' })
  .regex(/[a-z]/, { message: 'At least one lowercase letter' })
  .regex(/[0-9]/, { message: 'At least one number' })
  .regex(/[#?!@$%^&*-]/, { message: 'At least one special character' });

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
    },
    onSubmit: async ({ value }) => {
      if (value.password === value.password_confirm) {
        createUserWithEmailAndPassword(value.email, value.password);
      }
    },
  });

  return (
    <div className="mx-auto flex w-1/3 flex-col gap-4">
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
        </div>
        <div className="mb-3 flex flex-col">
          <form.Field
            name="password"
            validatorAdapter={zodValidator}
            validators={{ onChange: passwordSchema }}
            children={(field) => (
              <>
                <span className="flex justify-between">
                  <label htmlFor="password">Create Password</label>
                  <label>
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />{' '}
                    Show Password
                  </label>
                </span>

                <input
                  type={showPassword ? 'text' : 'password'}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border bg-gray-50 p-2"
                  placeholder="••••••••"
                />

                {field.state.meta.errors ? (
                  <em role="alert" className="text-orange-800">
                    {field.state.meta.errors.join(', ')}
                  </em>
                ) : null}
              </>
            )}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <form.Field
            name="password_confirm"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue('password')) {
                  return 'Passwords do not match';
                }
                return undefined;
              },
            }}
            children={(field) => (
              <>
                <label htmlFor="password_confirm">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border bg-gray-50 p-2"
                  placeholder="••••••••"
                />
                {field.state.meta.errors ? (
                  <em role="alert" className="text-orange-800">
                    {field.state.meta.errors.join(', ')}
                  </em>
                ) : null}
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full bg-gray-200 py-2 ${isSubmitting ? '' : 'hover:bg-gray-300'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        />
      </form>
      {error && (
        <div>
          <em className="text-orange-800">
            {error.message.includes('auth/email-already-in-use')
              ? 'This email is already in use. Please try logging in instead.'
              : `Error: ${error.message}`}
          </em>
        </div>
      )}
    </div>
  );
}
