'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { getProviders, signIn } from 'next-auth/react';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [providers, setProviders] = useState();
  const router = useRouter();

  async function initProviders() {
    const p = await getProviders();
    console.log('p', p);
    setProviders(p);
  }

  useEffect(() => {
    initProviders();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;

        const response = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        console.log('res', response);

        if (response?.ok) {
          toast.success('Signin successfull');
          router.push('onboarding-form');
        }
      } catch (error: unknown) {
        let errorMessage;
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.error || 'An error occurred';
        } else if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = 'An unexpected error occured';
        }

        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back!</h1>
        <p className="text-gray-500 text-center mb-8">
          Glad to see you again!
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <EnvelopeIcon className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              placeholder="Your email"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="relative">
            <LockClosedIcon className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              {...formik.getFieldProps('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-400" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          {/* <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300"
          >
            Sign in
          </button> */}
          {providers && Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button type="button" onClick={() => signIn(provider.id)}>
                Sign in with
                {' '}
                {provider.name}
              </button>
            </div>
          ))}
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          By signing in, I agree to the
          <Link
            href="/privacy-policy"
            className="text-purple-500 hover:underline"
          >
            Privacy Policy
          </Link>
          and
          <Link href="/terms" className="text-purple-500 hover:underline">
            Terms and Conditions
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?
          <Link
            href="/sign-up"
            className="text-purple-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
