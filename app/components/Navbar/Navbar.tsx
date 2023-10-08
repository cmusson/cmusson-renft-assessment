"use client";

import { useAppContext } from "@/app/context/appContext";
import Link from "next/link";

const Navbar = () => {
  // if non logged in - Sign In, Sign Up
  // if logged in - Feed, Friends, Profile, Sign Out
  const { isAuthenticated, user } = useAppContext();

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-2 p-4 border">
          <Link href="/">f</Link>
          <Link href="/feed">[My Feed]</Link>
          <Link href="/friends">[My Friends]</Link>
          <Link href={`/${user ? user.username : ""}`}>[My Profile]</Link>
          <Link href="/signOut">[Sign Out]</Link>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-4 border">
          <Link href="/">f</Link>
          <Link href="/signIn">[Sign In]</Link>
          <Link href="/signUp">[Sign Up]</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;