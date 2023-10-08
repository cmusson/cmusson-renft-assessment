"use client";
import { useAppContext } from "@/app/context/appContext";

interface IPostsListProps {
  type: "all" | "friends" | "myPosts";
}

const PostsList = ({ type }: IPostsListProps) => {
  // list of posts with either all users for homepage
  // list of posts of a users friends if logged in
  // sorted most recent first

  const { users, isAuthenticated, user } = useAppContext();

  const userPostsArray = user
    ? user.posts.map((post) => ({ username: user.username, ...post }))
    : [];

  const allPostsArray = users.reduce((accumulator, user) => {
    const userPosts = user.posts.map((post) => ({
      content: post.content,
      timestamp: post.timestamp,
      username: user.username,
    })) as { content: string; timestamp: string; username: string }[];
    return accumulator.concat(userPosts);
  }, [] as { content: string; timestamp: string; username: string }[]);

  const formatTimeStamp = (timestamp: string) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}: ${formattedTime}`;
  };

  const postArray =
    type === "all" ? allPostsArray : "friends" ? allPostsArray : userPostsArray;

  return (
    <div>
      <div>
        {postArray
          .sort((a, b) => {
            const timestampA = new Date(a.timestamp).getTime();
            const timestampB = new Date(b.timestamp).getTime();
            return timestampA - timestampB;
          })
          .map((post, i) => (
            <div key={i} className="border">
              {type !== "myPosts" ? <div>{post.username}</div> : <></>}
              <div>{formatTimeStamp(post.timestamp)}</div>
              <div>{post.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostsList;
