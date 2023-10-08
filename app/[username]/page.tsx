import UserInfo from "../components/UserInfo";

interface IUsernameProps {
  params: { username: string };
}

const page = ({ params }: IUsernameProps) => {
  // List of posts from this user sorted by date
  // If this user isn't the one logged in have [add] or [remove friend] button to perform that action
  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>My Posts</h1>
      <p>What amazing insights!</p>
      <UserInfo titleUser={params.username} />
    </div>
  );
};

export default page;
