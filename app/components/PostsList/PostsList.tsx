"use client";
import { useAppContext } from "@/app/context/appContext";
import { IPost } from "@/app/typings/interfaces";

interface IPostsListProps {
  type: "all" | "friends" | "myPosts";
}

const PostsList = ({ type }: IPostsListProps) => {
  // list of posts with either all users for homepage
  // list of posts of a users friends if logged in
  // sorted most recent first

  const { users, isAuthenticated, user } = useAppContext();

  const myPostsArray = user
    ? user.posts.map((post) => ({ username: user.username, ...post }))
    : [];

  const friendsPostArray = user
    ? user.friends.reduce((acc, friendName) => {
        const friend = users.find((u) => u.username === friendName);
        if (friend) {
          const friendPosts = friend.posts.map((post) => ({
            username: friend.username,
            content: post.content,
            timestamp: post.timestamp,
          })) as IPost[];
          return acc.concat(friendPosts);
        }
        return acc;
      }, [] as IPost[])
    : ([] as IPost[]);

  const allPostsArray = users.reduce((accumulator, user) => {
    const userPosts = user.posts.map((post) => ({
      content: post.content,
      timestamp: post.timestamp,
      username: user.username,
    })) as IPost[];
    return accumulator.concat(userPosts);
  }, [] as IPost[]);

  const formatTimeStamp = (timestamp: string) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}: ${formattedTime}`;
  };

  const postArray =
    type === "all"
      ? allPostsArray
      : type === "friends"
      ? friendsPostArray
      : myPostsArray;

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
