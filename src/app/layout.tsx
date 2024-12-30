import type { Metadata } from "next";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import App from "@/components/app";
import Head from "next/head";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: {
    template: "%s | DeFiScan",
    default: "DeFiScan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* You can also specify other sizes or formats if needed */}
        <link rel="icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" sizes="16x16" href="/favicon.ico" />
      </Head>
      <body
        className={cn(
          "min-h-screen w-full max-w-screen antialiased flex flex-col"
        )}
      >
        <App>{children}</App>
      </body>
    </html>
  );
}
