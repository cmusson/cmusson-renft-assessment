"use client";
import { useAppContext } from "@/app/context/appContext";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const { logout } = useAppContext();
  const { push } = useRouter();

  const signOut = () => {
    logout();
    alert("User signed out");
    push("/");
  };
  return <button onClick={signOut}>Sign Out</button>;
};

export default SignOutButton;
