import React from 'react';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

function FacebookSvg() {
  const loginWithFacebook = async () => {
    try {
      await signIn('facebook', { callbackUrl: '/admin' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    }
  };
  return (
    <div role="button" tabIndex={0} aria-label="Svg" onKeyDown={() => console.log('pressed')} onClick={loginWithFacebook}>
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
          fill="#1877F2"
        />
        <path
          d="M13.829 18.9998V12.8778H15.842L16.134 10.5108H13.829V9.02181C13.829 8.27381 14.05 7.76081 15.106 7.76081H16.209V5.64981C15.5764 5.58181 14.9404 5.54881 14.304 5.55081C12.424 5.55081 11.153 6.68681 11.153 8.78581V10.5108H9.15295V12.8778H11.153V18.9998H13.829Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default FacebookSvg;
