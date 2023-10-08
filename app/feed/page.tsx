import PostsList from "../components/PostsList";

export default function Feed() {
  // List of all friends posts on platform sorted by date
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>{`My Feed`}</h1>
      <p>All your friends posts</p>
      <PostsList type="friends" />
    </main>
  );
}
