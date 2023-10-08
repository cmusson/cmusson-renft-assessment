import { SignOutButton } from "../components/buttons";

export default function SignOut() {
  // clear session storage and display a message when signed out

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-2">
      <h1>{"Sign Out"}</h1>
      <p>Click the button below to sign out</p>
      <SignOutButton />
    </main>
  );
}
