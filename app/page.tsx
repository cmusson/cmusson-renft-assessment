import PostsList from "./components/PostsList";

export default function Home() {
  // List of all user posts on platform sorted by date
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>{`Main Feed`}</h1>
      <p>Browse every users posts and enjoy</p>
      <PostsList type="all" />
    </main>
  );
}
