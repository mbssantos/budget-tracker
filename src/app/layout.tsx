import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import "./typography.css";
import "./variables.css";

export const metadata: Metadata = {
  title: "Budget Tracker Exercise",
  description: "Budget Tracker Exercise description metadata",
  other: {
    "color-scheme": "dark light",
  },
};

type RootLayout = Readonly<{
  children: React.ReactNode;
}>;

async function RootLayout({ children }: RootLayout) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
      </Head>

      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
