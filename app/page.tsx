import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full h-full relative top-52">
      <h1 className="font-semibold text-[30px] text-center">
        Welcome to SaaS!
      </h1>
      <Link
        className="w-[30%] bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300 text-center"
        href="/sign-in"
      >
        Go to sign in page
      </Link>
      <Link
        className="w-[30%] bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300 text-center"
        href="/sign-up"
      >
        Go to sign up page
      </Link>
      <Link
        className="w-[30%] bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300 text-center"
        href="/onboarding-form"
      >
        Go to onboarding steps page
      </Link>
      <Link
        className="w-[30%] bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300 text-center"
        href="/stripe"
      >
        Go to Stripe page
      </Link>
      <Link
        className="w-[30%] bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300 text-center"
        href="/refund"
      >
        Go to Refund page
      </Link>
      <Link
        className="w-[30%] bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition duration-300 text-center"
        href="/admin"
      >
        Go to Home page
      </Link>
    </div>
  );
}
