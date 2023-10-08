import PostsList from "../components/PostsList";

interface IUsernameProps {
  params: { username: string };
}

const page = ({ params }: IUsernameProps) => {
  // List of posts from this user sorted by date
  // If this user isn't the one logged in have [add] or [remove friend] button to perform that action
  return (
    <div>
      <h1>{params.username}</h1>
      <p>List of posts from this user sorted by date</p>
      <PostsList type="myPosts" />
      <p>
        If this user is not the one logged in have [add] or [remove friend]
        button to perform that action
      </p>
    </div>
  );
};

export default page;
