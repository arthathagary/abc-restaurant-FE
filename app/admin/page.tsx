import { Login } from "@/components/admin/login";
import withAuth from "@/hooks/withAuth";
import React from "react";

const AdminPage = () => {
  return <Login />;
};

export default withAuth(AdminPage) ;
