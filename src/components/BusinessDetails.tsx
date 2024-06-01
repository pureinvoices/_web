import { formatPhoneNumber } from '@/utils/helpers';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

const nameSchema = z.string().max(25, { message: 'Invalid Name' });
const addressSchema = z.string().max(80, { message: 'Invalid Addressg' });
const emailSchema = z.string().email({ message: 'Invalid Email Address' });
const websiteSchema = z.string().url();
const phoneNumberSchema = z
  .string()
  .regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: 'Invalid Phone Number' });

export default function BusinessDetails() {
  const form = useForm({
    defaultValues: {
      name: '',
      address: '',
      email: '',
      phone: '',
      website: '',
    },
    onSubmit: async ({ value }) => {
      try {
        value.phone = value.phone.replace(/\D/g, '');
        console.log(value);
        // Send form values to the firestore
        form.reset();
      } catch (error) {
        console.error('Error updating business information:', error);
      }
    },
  });

  const handleChangePhoneNumber = (value: string): void => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    form.setFieldValue('phone', formattedPhoneNumber);
  };

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
            name="name"
            validatorAdapter={zodValidator}
            validators={{ onChange: nameSchema }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Name</label>
                <input
                  type={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border bg-gray-50 p-2"
                  placeholder="Business Name Inc"
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
            name="address"
            validatorAdapter={zodValidator}
            validators={{ onChange: addressSchema }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Address</label>
                <input
                  type={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border bg-gray-50 p-2"
                  placeholder="99 Main St, San Francisco, CA 94016"
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
            name="email"
            validatorAdapter={zodValidator}
            validators={{ onChange: emailSchema }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Email</label>
                <input
                  type={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border bg-gray-50 p-2"
                  placeholder="name@business.com"
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
            name="phone"
            validatorAdapter={zodValidator}
            validators={{ onChange: phoneNumberSchema }}
            children={(field) => (
              <>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => handleChangePhoneNumber(e.target.value)}
                  className="border bg-gray-50 p-2"
                  placeholder="(555) 123-4567"
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
            name="website"
            validatorAdapter={zodValidator}
            validators={{ onChange: websiteSchema }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Website</label>
                <input
                  type={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border bg-gray-50 p-2"
                  placeholder="www.business.com"
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
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          )}
        />
      </form>
      <div className="flex justify-end"></div>
    </div>
  );
}
