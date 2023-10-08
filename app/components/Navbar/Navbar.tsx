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
          <Link className="p-2 hover:bg-white hover:text-black" href="/">
            ƒ
          </Link>
          <Link className="p-2 hover:bg-white hover:text-black" href="/feed">
            [My Feed]
          </Link>
          <Link className="p-2 hover:bg-white hover:text-black" href="/friends">
            [My Friends]
          </Link>
          <Link
            className="p-2 hover:bg-white hover:text-black"
            href={`/${user ? user.username : ""}`}
          >
            [My Profile]
          </Link>
          <Link className="p-2 hover:bg-white hover:text-black" href="/signOut">
            [Sign Out]
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-4 border">
          <Link className="p-2 hover:bg-white hover:text-black" href="/">
            ƒ
          </Link>
          <Link className="p-2 hover:bg-white hover:text-black" href="/signIn">
            [Sign In]
          </Link>
          <Link className="p-2 hover:bg-white hover:text-black" href="/signUp">
            [Sign Up]
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
