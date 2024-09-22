"use client"
import { Dashboard } from "@/components/admin/dashboard";
import withAuth from "@/hooks/withAuth";
import React, { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner, or some placeholder
  }

  return <Dashboard />;
};

export default withAuth(AdminDashboardPage) ;