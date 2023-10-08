import UserForm from "../components/UserForm";

export default function SignUp() {
  // Form to sign up and login
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
      <h1>{`Sign Up`}</h1>
      <p>Enter a valid username and password to sign up</p>
      <div className="flex flex-col  text-xs">
        <p>
          * Username must only contain alphanumeric characters and underscores.
        </p>
        <p>
          * Password must not contain the same character more than twice and any
          character must have two different characters before being allowed to
          occur again.
        </p>
      </div>

      <UserForm type="signUp" />
    </main>
  );
}
