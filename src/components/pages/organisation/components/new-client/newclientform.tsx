'use client';

import React, { useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import { Button } from 'src/components/custom/button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from 'src/components/base/Input';
import { Select } from 'src/components/base/select';
import clientActions from 'src/redux/modules/clients/clientActions';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'src/redux/modules/auth/authSelectors';
import organisationActions from 'src/redux/modules/organisations/organisationActions';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { UserState } from 'src/redux/modules/users/userReducer';
import { selectUsers } from 'src/redux/modules/users/userSelector';
import userAction from 'src/redux/modules/users/userAction';
import { Textarea } from 'src/components/ui/textarea';

interface NewClientFormProps extends HTMLAttributes<HTMLDivElement> {}

const validationSchema = yup.object().shape({
  type: yup.string().required('Type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string().required('name is required'),
  telephone: yup.string().required('telephone number is required'),
  longitude: yup.string().required('Registration date is required'),
  latitude: yup.string().required('Company name is required'),
  address: yup.string().required('Individual name is required'),
  openHours: yup.string().required('Identity card number is required'),
  closingHours: yup.string().required('Citizenship is required'),
});

interface FormProps {
  userId:string;
  type: string;
  email: string;
  name: string;
  telephone: string;
  longitude: string;
  latitude: string;
  address: string;
  openHours: string;
  closingHours: string;
  description:string;
}

export function NewClientForm({ className, ...props }: NewClientFormProps) {
  
  const initialValues: FormProps = {
    type: "",
      email: "",
      name: "",
      telephone: "",
      longitude: "",
      latitude: "",
      address: "",
      openHours: "",
      closingHours: "",
      userId:"",
      description:"",
  };
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router= useRouter()
  const users: typeof UserState.users = useAppSelector(selectUsers);

  console.log({users})

  const options = users?.data.map((item:any) => ({
    label: item.username,  
    value: item.id 
  }));

  useEffect(() => {
    dispatch(userAction.getUsers());
  }, []);

  const handleSubmit = async (data: FormProps) => {
    setIsSubmitting(true);
    console.log(data)
    dispatch(organisationActions.createOrganisation(data) as any).then((action:any) => {
      let res = action.payload
      console.log(res)
      if(res?.success){
        alert(res.message)
        setIsSubmitting(false);
        router.push('/admin/organisations');
      }else{        
        alert("Failed to create organisation. Verify that existing user with this username or email doesn't exist")
        setIsSubmitting(false);
      }
      setIsSubmitting(false);
    });
  };
  const formik = useFormik<FormProps>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { submitForm, values, errors, touched, handleBlur, handleChange, setFieldValue } = formik;

  return (
    <div className={className} {...props}>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      <Select
          name='userId'
          label='Owner'
          placeholder='Select Owner'
          options={options }
          defaultValue={values.userId}
          onValueChange={(e: any) => setFieldValue('userId', e)}
        />
      <Select
          name='type'
          label='Type'
          placeholder='Select Type'
          options={[
            { value: "PHARMACY", label: "PHARMACY" },
              { value: "HOSPITAL", label: "HOSPITAL" },
              { value: "HEALTHCENTER", label: "HEALTHCENTER" },
          ]}
          defaultValue={values.type}
          onValueChange={(e: any) => setFieldValue('type', e)}
        />
          <Input
          id='name'
          name='name'
          label='Company Name'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          placeholder='Organisation name'
        />
        <Input
          id='email'
          name='email'
          label='Email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          placeholder='Email address'
        />
        <Input
          id='telephone'
          name='telephone'
          label='Telephone Number'
          value={values.telephone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.telephone && errors.telephone}
          placeholder='Telephone number'
        />
         <Input
          id='address'
          name='address'
          label='address'
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address && errors.address}
          placeholder='address'
        />
        <Input
          id='longitude'
          name='longitude'
          label='longitude'
          value={values.longitude}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.longitude && errors.longitude}
          placeholder='longitude'
        />
      
        <Input
          id='latitude'
          name='latitude'
          label='latitude'
          value={values.latitude}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.latitude && errors.latitude}
          placeholder='latitude'
        />
       
        <Input
          id='openHours'
          name='openHours'
          label='openHours'
          value={values.openHours}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.openHours && errors.openHours}
          placeholder='open Hours'
        />
        <Input
          id='closingHours'
          name='closingHours'
          label='Closing Hours'
          value={values.closingHours}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.closingHours && errors.closingHours}
          placeholder='closing Hours'
        />
        <div>
        <p className='text-sm my-3'>Organisation Description</p>
        <Textarea
          id='description'
          name='description'
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='description'
          // className='sm:col-span-2'
        />
        </div>

      </div>{' '}
      <Button disabled={isSubmitting} type='submit' className='w-full sm:w-auto mt-4 text-white py-2 px-4 rounded' onClick={submitForm}>
        {isSubmitting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null} {/* Render loader conditionally */}
        Create Organisation
      </Button>
    </div>
  );
}
