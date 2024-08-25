"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// Define a generic type for the props
type WithAuthProps = {
  [key: string]: any;
};

// Update the HOC to use React.ComponentType and properly type the props
const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  // The component now correctly infers props types
  const AuthComponent = (props: P) => {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const router = useRouter();

    useEffect(() => {
      if (!loading && !session) {
        router.push("/login");
      }
    }, [loading, session, router]);

    if (loading || !session) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
