
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Providers from "./providers";
import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>


      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
        <Providers>
        {children}
        </Providers>


          </body>
      </html>


    </ClerkProvider>
  );
}
