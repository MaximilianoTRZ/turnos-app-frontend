// components/Nav.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        const res = await fetch("/api/get-jwt");
        const data = await res.json();
        setJwtToken(data.token);
        document.cookie = `jwt=${data.token}; path=/; HttpOnly`;
      }
    };

    checkSession();
  }, [status]);

  const handleSignIn = async () => {
    await signIn();
    // Sign-in process handled by next-auth
    // JWT will be fetched automatically if session is authenticated
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    document.cookie = "jwt=; Max-Age=0; path=/; HttpOnly";
    setJwtToken(null);
  };

  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">Home</Link>
      </div>
      <div className="flex justify-between space-x-4 text-default-text">
        {session ? (
          <button
            className="bg-page rounded-md py-1 px-1 hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-page rounded-md py-1 px-1 hover:bg-green-400"
            onClick={handleSignIn}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
