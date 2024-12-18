import EmailVerification from '@/components/emailVerification';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
const confirmEmail = ({ searchParams }: PageProps) => {
  const { userId } = searchParams;
  const { token } = searchParams;
  return (
    <div>
      {userId && token ? (
        <EmailVerification userId={userId as string} token={token as string} />
      ) : (
        <p>Invalid or missing parameters.</p>
      )}
    </div>
  );
};
export default confirmEmail;
