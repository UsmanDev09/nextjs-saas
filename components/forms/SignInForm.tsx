/* eslint-disable react/button-has-type */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import {
  Formik, Form, Field, ErrorMessage, FormikHelpers,
} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import LinkedInSvg from '../svgs/linkedInSvg';
import GoogleSvg from '../svgs/googleSvg';
import FacebookSvg from '../svgs/facebookSvg';

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  interface SignInFormValues {
    email: string;
    password: string;
  }
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (
    values: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>,
  ) => {
    try {
      const response = await axios.post('/api/sign-in', values);
      if (
        Cookies.set('accessToken', response.data.accessToken, { expires: 7 })
      ) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col items-center justify-center p-4">
      <div className="bg-whiteTransparent40 border-2 border-white rounded-3xl p-5 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
        </div>
        <h1 className="text-[32px] font-medium leading-32 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-[12px] text-center mb-8">
          It&apos;s time to dive back into your skill-building journey
          <br />
          with SaaS!
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="relative" style={{ marginBottom: '5%' }}>
                <EnvelopeIcon className="w-6 h-6 text-primary-700 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-700 hover:border-primary-700"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-custom-small mt-1 absolute left-0 -bottom-6"
                />
              </div>
              <div className="relative" style={{ marginBottom: '2%' }}>
                <LockClosedIcon className="w-6 h-6 text-primary-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-700 hover:border hover:border-primary-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="w-6 h-6 text-primary-700" />
                  ) : (
                    <EyeSlashIcon className="w-6 h-6 text-primary-700" />
                  )}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1 absolute left-0 -bottom-6"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary-700 text-white py-3 rounded-md font-semibold hover:bg-primary-800 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <Link
            href="/forgot-password"
            className="text-primary-700 hover:underline text-sm"
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex justify-between space-x-4 mt-6">
          <button className="w-12 h-12 flex items-center justify-center px-[15%] py-[7%] rounded-md border bg-gray-50 border-gray-300 hover:border-primary-700 transition duration-300">
            <LinkedInSvg />
          </button>
          <button className="w-12 h-12 flex items-center justify-center px-[15%] py-[7%] rounded-md border bg-gray-50 border-gray-300 hover:border-primary-700 transition duration-300">
            <GoogleSvg />
          </button>
          <button className="w-12 h-12 flex items-center justify-center px-[15%] py-[7%] rounded-md border bg-gray-50 border-gray-300 hover:border-primary-700 transition duration-300">
            <FacebookSvg />
          </button>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?
        {' '}
        <Link
          href="/sign-up"
          className="text-primary-700 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
