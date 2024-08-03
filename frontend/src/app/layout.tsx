import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppStates } from "@/contexts/States";
import Loader from "@/components/Loading";
import Background from "@/components/Background";
import AlertWrapper from "@/components/AlertWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Planted",
  description: "Planted AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppStates>
      <html lang="en">
        <body className={inter.className}>
          <Background />
          <AlertWrapper />
          <Loader />
          <Navbar />
          {children}
        </body>
      </html>
    </AppStates>
  );
}
