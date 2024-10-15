'use client'
import Link from 'next/link'
import { useState } from 'react'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import LinkedInSvg from '../svgs/linkedInSvg'
import GoogleSvg from '../svgs/googleSvg'
import FacebookSvg from '../svgs/facebookSvg'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await axios.post('/api/sign-in', values)
      console.log('Success:', response.data)
      Cookies.set('accessToken', response.data.accessToken, { expires: 7 })
      router.push('/admin');
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">
          It's time to dive back into your skill-building journey<br />
          with SaaS!
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="relative">
                <EnvelopeIcon className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="relative">
                <LockClosedIcon className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <Link href="/forgot-password" className="text-purple-500 hover:underline text-sm">
            Forgot password?
          </Link>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-50 transition duration-300">
            <LinkedInSvg/>
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-50 transition duration-300">
            <GoogleSvg/>
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-50 transition duration-300">
            <FacebookSvg/>
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-purple-500 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
