import UserForm from "../components/UserForm";

export default function SignIn() {
  // sign in with current username and password
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
      <h1>{`Sign In`}</h1>
      <p>Enter your username and password to sign in</p>
      <UserForm type="signIn" />
    </main>
  );
}
