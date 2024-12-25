'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface EmailVerificationClientProps {
  userId: string;
  token: string;
}

export default function EmailVerification({
  userId,
  token,
}: EmailVerificationClientProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');
  useEffect(() => {
    const verifyEmail = async () => {
      if (!userId || !token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }
      try {
        const response = await fetch('/api/confirm/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, token }),
        });
        const data = await response.json();

        if (response.ok) {
          toast.success('Email verified');
        } else {
          toast.error(data.error || 'Failed to verify email');
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'An error occurred while verifying your email'
        );
      }
    };

    verifyEmail();
  }, [userId, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {status === 'loading' && (
            <p className="text-center text-indigo-600">
              Verifying your email...
            </p>
          )}
          {status === 'success' && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
