'use client';

import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ForgotPasswordForm() {
  const router = useRouter();
  interface SignInFormValues {
    email: string;
  }
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const handleSubmit = async (
    values: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>
  ) => {
    try {
      await axios.post('/api/password/forgot', {
        email: values.email,
      });

      toast.success('Successfully sent email!');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'An error occurred');
      } else if (error instanceof Error) {
        toast.error(error.message || 'An unexpected error occurred');
      } else {
        toast.error('An unknown error occurred');
      }
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
          Forgot Password
        </h1>
        <p className="text-gray-500 text-[12px] text-center mb-8">
          Please enter your email to reset your password
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
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary-700 text-white py-3 rounded-md font-semibold hover:bg-primary-800 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <Link
            href="/sign-in"
            className="text-primary-700 hover:underline text-sm"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
