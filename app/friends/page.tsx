import FriendsList from "../components/FriendsList";

export default function Friends() {
  // List of friends for current user with each friend having an unfriend button

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-2">
      <h1>{`My Friends'`}</h1>
      <p>Look at all your friends!</p>
      <FriendsList />
    </main>
  );
}
