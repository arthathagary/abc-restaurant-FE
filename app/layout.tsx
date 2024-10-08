import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
      {/* <header className='bg-primary text-primary-foreground py-4 px-6'>
        <div className='container mx-auto flex justify-between items-center'>
          <Link href='/user' className='text-2xl font-bold' prefetch={false}>
            ABC Restaurant
          </Link>
          <nav>
            <ul className='flex space-x-4'>
              <li>
                <Link href='/user/reservation' prefetch={false}>
                  Reservation
                </Link>
              </li>
              <li>
                <Link href='/user/order' prefetch={false}>
                  Orders
                </Link>
              </li>
              <li>
                <Link href='/user/query' prefetch={false}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='/user/query/all' prefetch={false}>
                  Query
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header> */}
      <main>
        {children}
        </main>
        </body>
    </html>
  );
}
