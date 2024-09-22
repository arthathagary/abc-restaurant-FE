"use client";
import React, { ComponentType } from 'react';
import useAuth from './useAuth';

type WithAuthProps = {
  // Define any additional props if needed
};

const withAuth = <P extends WithAuthProps>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
      return <div>Loading...</div>; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;