import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Derivatives Trader",
  description: "Professional crypto derivatives trading platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gray-900 text-white min-h-screen`}
      >
        <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-400">
              Crypto Derivatives Trader
            </h1>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
              <Link
                href="/trade"
                className="hover:text-blue-400 transition-colors"
              >
                New Trade
              </Link>
              <Link
                href="/calculator"
                className="hover:text-blue-400 transition-colors"
              >
                Margin Calculator
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
