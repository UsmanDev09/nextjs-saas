import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import { useToast } from "@/hooks/use-toast";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const { toast } = useToast();
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/admin" });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <Button onClick={loginWithGoogle} className='w-full'>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
