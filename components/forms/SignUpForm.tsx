'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { getProviders, signIn } from 'next-auth/react';
// import LinkedInSvg from '../svgs/linkedInSvg';
// import GoogleSvg from '../svgs/googleSvg';
// import FacebookSvg from '../svgs/facebookSvg';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [providers, setProviders] = useState();

  async function initProviders() {
    const p = await getProviders();
    setProviders(p);
  }

  useEffect(() => {
    initProviders();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('/api/sign-up', {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
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
        <h1 className="text-3xl font-bold text-center mb-2">Get Started</h1>
        <p className="text-gray-500 text-center mb-8">
          Ready to skill up? SaaS awaits.
          <br />
          Lets make awesome things!
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
              // name="password"
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
          <div className="relative">
            <LockClosedIcon className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              {...formik.getFieldProps('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-400" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-400" />
              )}
            </button>
            {formik.touched.confirmPassword
              && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300"
          >
            Sign up
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          By signing up, I agree to the
          {' '}
          <Link
            href="/privacy-policy"
            className="text-purple-500 hover:underline"
          >
            Privacy Policy
          </Link>
          {' '}
          and
          {' '}
          <Link href="/terms" className="text-purple-500 hover:underline">
            Terms and Conditions
          </Link>
        </p>
        {/* <div className="flex justify-center space-x-4 mt-6">
          <button type="button"
          className="w-12 h-12
          flex items-center justify-center rounded-xl border border-gray-300
          hover:bg-gray-50 transition duration-300">
            <LinkedInSvg />
          </button>
          <button type="button"
          className="w-12 h-12 flex
          items-center justify-center
          rounded-xl border border-gray-300 hover:bg-gray-50 transition duration-300">
            <GoogleSvg />
          </button>
          <button type="button"
          className="w-12 h-12 flex
          items-center justify-center
          rounded-xl border border-gray-300 hover:bg-gray-50 transition duration-300">
            <FacebookSvg />
          </button>
        </div> */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Have an account?
          <Link
            href="/sign-in"
            className="text-purple-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button type="button" onClick={() => signIn(provider.id)}>
            Sign in with
            {' '}
            {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
