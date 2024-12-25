import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  loggedInUser: string;
}

export function ProfileModal({
  isOpen,
  onClose,
  loggedInUser,
}: ProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            {/* <Avatar className="h-24 w-24">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${loggedInUser}`}
                alt={loggedInUser}
              />
              <AvatarFallback>{loggedInUser.toUpperCase()}</AvatarFallback>
            </Avatar> */}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{loggedInUser}</h2>
            <p className="text-sm text-muted-foreground">Level 1 • 0 XP</p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <Button
              className="w-full bg-primary-700 text-white py-3 rounded-md font-semibold hover:bg-primary-800 transition"
              variant="outline"
            >
              Settings
            </Button>
            <Button
              className="w-full bg-gray-200 text-error-400 py-3 rounded-md font-semibold hover:bg-gray-400 hover:text-error-600 transition"
              variant="outline"
            >
              Change Password
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
