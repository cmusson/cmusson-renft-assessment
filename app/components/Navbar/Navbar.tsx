"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  // if non logged in - Sign In, Sign Up
  // if logged in - Feed, Friends, Profile, Sign Out
  const [isAuthenticated, setIsAuthenticated] = useState("");

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-2 p-4 border">
          <Link href="/">f</Link>
          <Link href="/feed">[My Feed]</Link>
          <Link href="/friends">[My Friends]</Link>
          <Link href={`/${"test"}`}>[My Profile]</Link>
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
