import { SignOutButton } from "../components/buttons";

export default function SignOut() {
  // clear session storage and display a message when signed out

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{`Sign Out '/signOut'`}</h1>
      <p>Clear session storage and display a message when signed out</p>
      <SignOutButton />
    </main>
  );
}
