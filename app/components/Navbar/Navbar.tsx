"use client";

import { useAppContext } from "@/app/context/appContext";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  // if non logged in - Sign In, Sign Up
  // if logged in - Feed, Friends, Profile, Sign Out
  const { isAuthenticated, user } = useAppContext();
  const [openMobileNav, setOpenMobileNav] = useState(false);

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

  // screen size < 500 is mobile

  const standardNavBar = (
    <div className="flex items-center gap-2 p-4 border-b">
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

  const mobileNavbar = (
    <div className="flex items-center justify-between gap-2 p-4 border-b">
      <Link href="/" className="p-2 hover:bg-white hover:text-black">
        ƒ
      </Link>
      <button
        onClick={() => setOpenMobileNav(!openMobileNav)}
        className="p-2 hover:bg-white hover:text-black"
      >
        ☰
      </button>
    </div>
  );

  const mobileNavOptions = (
    <div
      className={`fixed border-t  border-b  border-l top-0 right-0 h-full w-48 bg-zinc-800 transition-transform transform ${
        openMobileNav ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-end gap-2 p-4 ">
        <button
          onClick={() => setOpenMobileNav(!openMobileNav)}
          className="p-2 hover:bg-white hover:text-black"
        >
          ☰
        </button>
      </div>
      <ul className="p-2 bg-red flex flex-col gap-2">
        {navItems.slice(1).map((item, index) => (
          <li key={index}>
            <Link
              onClick={() => setOpenMobileNav(false)}
              className="p-2 hover:bg-white hover:text-black"
              href={item.href}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="hidden sm:block">{standardNavBar}</div>
      <div className="sm:hidden">{mobileNavbar}</div>
      {openMobileNav ? mobileNavOptions : <></>}
    </>
  );
};

export default Navbar;
