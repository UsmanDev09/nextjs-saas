import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import { useToast } from "@/hooks/use-toast";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface FacebookSignInButtonProps {
  children: ReactNode;
}

const FacebookSignInButton: FC<FacebookSignInButtonProps> = ({ children }) => {
  const { toast } = useToast();
  const router = useRouter();

  const loginWithFacebook = async () => {
    try {
      await signIn("facebook", { callbackUrl: "/admin" });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
      console.error("Facebook Sign-In Error:", error);
    }
  };

  return (
    <Button onClick={loginWithFacebook} className='w-full'>
      {children}
    </Button>
  );
};

export default FacebookSignInButton;
