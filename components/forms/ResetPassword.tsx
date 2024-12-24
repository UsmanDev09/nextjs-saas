'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  interface SignUpFormValues {
    password: string;
    confirmPassword: string;
  }
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Password required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password required'),
  });

  const handleSubmit = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      await axios.put('/api/password/reset', {
        password: values.password,
        confirmPassword: values.confirmPassword,
        token,
      });
      toast.success('Successfully reset password!');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'An error occurred');
      } else if (error instanceof Error) {
        toast.error(error.message || 'An unexpected error occurred');
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col items-center justify-center p-4">
      <div className="bg-whiteTransparent40 border-gray-80 border-2 border-white rounded-3xl p-5 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
        </div>
        <h1 className="text-[32px] font-medium leading-32 text-center mb-2">
          New Password
        </h1>
        <p className="text-gray-500 text-[12px] text-center mb-8">
          Enter your new password below
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="relative" style={{ marginBottom: '5.5%' }}>
                <LockClosedIcon className="w-6 h-6 text-primary-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-primary-700"
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
                  className="text-red-500 text-custom-small mt-1 absolute left-0 -bottom-6"
                />
              </div>
              <div className="relative" style={{ marginBottom: '5%' }}>
                <LockClosedIcon className="w-6 h-6 text-primary-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-primary-700"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="w-6 h-6 text-primary-700" />
                  ) : (
                    <EyeSlashIcon className="w-6 h-6 text-primary-700" />
                  )}
                </button>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-custom-small mt-1 absolute left-0 -bottom-6"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary-700 text-white py-3 rounded-md font-semibold hover:bg-primary-800 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm text-gray-500 mt-6">
          <Link
            href="/sign-in"
            className="text-primary-700 font-semibold hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
