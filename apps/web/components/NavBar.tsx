"use client";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar() {
  const { user, isLoading } = useUser();

  // While Auth0 is loading, render nothing to avoid flicker
  if (isLoading) return null;

  return (
    <nav className="w-full flex items-center justify-end p-4 border-b">
      {user ? (
        <>
          <span className="mr-4">{user.name ?? user.email}</span>
          <Link
            href="/api/auth/logout"
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Log out
          </Link>
        </>
      ) : (
        <Link
          href="/api/auth/login"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Log in
        </Link>
      )}
    </nav>
  );
}
