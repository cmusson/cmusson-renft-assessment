"use client";
import { useAppContext } from "@/app/context/appContext";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const { logout } = useAppContext();
  const { push } = useRouter();

  const signOut = () => {
    logout();
    alert("IUser signed out");
    push("/");
  };
  return (
    <button
      className="border p-2 border rounded hover:bg-white hover:text-black"
      onClick={signOut}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
