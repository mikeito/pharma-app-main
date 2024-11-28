'use client';

import Link from 'next/link';
import { LoginForm } from './components/user-auth-form';

export default function Login() {
  return (
    <div className='w-full md:grid md:grid-cols-2 lg:grid-cols-3 min-h-screen'>
      <div className='flex items-center justify-center py-12  my-auto h-screen'>
        <div className='mx-auto grid lg:w-[350px] gap-6'>
          <div className='grid gap-2'>
            <h1 className='text-4xl font-bold'>Welcome Back!</h1>
            <p className='text-balance text-muted-foreground'>Enter your email below to login to your account</p>
          </div>
          <LoginForm />
          {/* <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='#' className='underline'>
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
      <div className='hidden bg-muted md:block lg:col-span-2 bg-blue-300'>
          <img src='/female.jpg' alt='Image' className='object-cover h-screen w-full dark:brightness-[0.2] dark:grayscale items-center z-10 ' />
        {/* <div className='flex justify-center items-center  my-auto h-screen mx-5'>
        </div> */}
      </div>
    </div>
  );
}
