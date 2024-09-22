"use client";

import { useEffect, useState } from "react";
import SideNav from "@/components/staff/SideNav";


export default function StaffLayout({
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
        <main>{children}</main>
      </body>
    </html>
  );
}