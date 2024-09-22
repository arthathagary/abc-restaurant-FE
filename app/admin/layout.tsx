"use client";

import SideNav from "@/components/staff/SideNav";
import { useEffect, useState } from "react";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
   
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <html lang='en'>
      <body>
        <aside>
          <SideNav />
        </aside>
        <main className="ml-14">{children}</main>
      </body>
    </html>
  );
}