'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleLogout = async () => {
    signOut({ callbackUrl: 'http://localhost:3000/sign-in' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-4">See you soon!</h2>
        <p className="text-gray-500 text-center mb-6">
          You&apos;re about to go out. Are you sure about this?
        </p>
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-error-500 text-white rounded-lg font-medium hover:bg-error-600 transition-colors duration-200"
          >
            Confirm logout
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
