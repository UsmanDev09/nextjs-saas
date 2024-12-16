import EmailVerification from '@/components/emailVerification';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
const confirmEmail = ({ searchParams }: PageProps) => {
  const userId = searchParams.userId as string;
  const token = searchParams.token as string;
  // userid and token were hardcoded why?

  return (
    <EmailVerification
      userId={userId}
      token={token}
    />
  );
};
export default confirmEmail;
