"use client";

import { useEffect, useState } from "react";
import SideNav from "@/components/staff/SideNav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';



export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <html lang='en'>
      <body>
        <header className='bg-primary text-primary-foreground py-4 px-6'>
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
              <li>
                <Link href='/user/gallery' prefetch={false}>
                  Gallery
                </Link>
              </li>
              <li>
                <span className="cursor-pointer" onClick={()=>{
                  localStorage.clear();
                  router.replace('/');
                  router.refresh();
                }} >
                  <LogOut />
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
        <main>{children}</main>
      </body>
    </html>
  );
}