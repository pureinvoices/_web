import { ReactElement, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { collection, addDoc } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { auth, db } from '../../utils/firebase';
import { emailSchema, passwordSchema } from './validationSchema';
import SubmitError from './SubmitError';
import SubmitButton from './SubmitButton';

export default function Signup(): ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const actionCodeSettings = {
    url: import.meta.env.VITE_EMAIL_CONFIRMED,
    handleCodeInApp: true,
  };

  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth, {
      sendEmailVerification: true,
      emailVerificationOptions: actionCodeSettings,
    });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
    },
    onSubmit: async ({ value }) => {
      if (value.password === value.password_confirm) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            value.email,
            value.password,
          );
          const user = userCredential?.user;

          await addDoc(collection(db, 'users'), {
            owner: {
              uid: user?.uid,
              email: user?.email,
              plan: 'free',
            },
            business_details: {
              name: '',
              address: '',
              email: '',
              phone: '',
              website: '',
            },
            invoices: [],
          });
          form.reset();
        } catch (error) {
          console.error('Error creating new account:', error);
        }
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
        <SubmitButton
          form={form}
          title="Create Account"
          submittingTitle="Submitting..."
        />
      </form>
      <SubmitError
        error={error}
        type="auth/email-already-in-use"
        errMessage="This email is already in use. Please try logging in instead."
      />
    </div>
  );
}
