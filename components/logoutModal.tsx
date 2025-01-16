'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-8 max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            See you soon!
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            You're about to go out. Are you sure about this?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 space-y-3">
          <div className="flex flex-col w-full justify-center items-center gap-2">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
