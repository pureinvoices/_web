import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
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

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      // TODO: form data to Firebase
      console.log(value);
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
                  <a className="cursor-pointer font-bold hover:underline">
                    Forgot password?
                  </a>
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
    </div>
  );
}
