// import type { Metadata } from "next";
// import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main >
            {/* <Navbar /> */}
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
