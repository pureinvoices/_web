import { ReactElement, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/utils/firebase';
import { useForm } from '@tanstack/react-form';
import { businessDetails } from './validationSchema';
import SubmitButton from './SubmitButton';
import FormField from './FormField';

export default function BusinessDetails(): ReactElement {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists) {
          setUserData(docSnap.data());
        } else {
          console.log('No user document found');
        }
      }
    };
    fetchUserData();
  }, [user]);

  const form = useForm({
    defaultValues: {
      name: userData?.business_details.name ?? '',
      address: userData?.business_details.address ?? '',
      email: userData?.business_details.email ?? '',
      phone: userData?.business_details.phone ?? '',
      website: userData?.business_details.website ?? '',
    },
    onSubmit: async ({ value }) => {
      try {
        value.phone = value.phone.replace(/\D/g, '');
        const userRef = doc(db, 'users', user?.uid);
        await updateDoc(userRef, {
          business_details: value,
        });
        // TODO: ui feedback on success
        console.log('Business information updated successfully');
      } catch (error) {
        // TODO: ui feedback on error
        console.error('Error updating business information:', error);
      }
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
        <FormField
          form={form}
          name="name"
          schema={businessDetails.nameSchema}
          label="Name"
          placeholder="Business Name Inc"
        />
        <FormField
          form={form}
          name="address"
          schema={businessDetails.addressSchema}
          label="Address"
          placeholder="99 Main St, San Francisco, CA 94016"
        />
        <FormField
          form={form}
          name="email"
          type="email"
          schema={businessDetails.emailSchema}
          label="Email"
          placeholder="name@business.com"
        />
        <FormField
          form={form}
          name="phone"
          schema={businessDetails.phoneNumberSchema}
          label="Phone Number"
          placeholder="(555) 123-4567"
        />
        <FormField
          form={form}
          name="website"
          type="url"
          schema={businessDetails.websiteSchema}
          label="Website"
          placeholder="www.business.com"
        />
        <SubmitButton
          form={form}
          title="Update"
          submittingTitle="Updating..."
        />
      </form>
    </div>
  );
}
