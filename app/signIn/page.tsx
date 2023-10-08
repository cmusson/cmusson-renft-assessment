import UserForm from "../components/UserForm";

export default function SignIn() {
  // sign in with current username and password
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{`Sign In '/signIn'`}</h1>
      <p>Form to sign in with current username and password</p>
      <UserForm type="signIn" />
    </main>
  );
}
