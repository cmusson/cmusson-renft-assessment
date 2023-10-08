"use client";

import { useAppContext } from "@/app/context/appContext";
import Link from "next/link";

const Navbar = () => {
  // if non logged in - Sign In, Sign Up
  // if logged in - Feed, Friends, Profile, Sign Out
  const { isAuthenticated, user } = useAppContext();

  const navItems = isAuthenticated
    ? [
        { title: "ƒ", href: "/" },
        { title: "[My Feed]", href: "/feed" },
        { title: "[My Friends]", href: "/friends" },
        { title: "[My Profile]", href: `/${user ? user.username : ""}` },
        { title: "[Sign Out]", href: "/signOut" },
      ]
    : [
        { title: "ƒ", href: "/" },
        { title: "[Sign In]", href: "/signIn" },
        { title: "[Sign Up]", href: "/signUp" },
      ];

  return (
    <div className="flex items-center gap-2 p-4 border">
      {navItems.map((item, index) => (
        <Link
          key={index}
          className="p-2 hover:bg-white hover:text-black"
          href={item.href}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
