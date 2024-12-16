'use client';

import './globals.css';
import Provider from '@/components/Provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>
            {/* <Navbar /> */}
            {children}
          </main>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
