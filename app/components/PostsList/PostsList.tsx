"use client";
import { useAppContext } from "@/app/context/appContext";
import { IPost } from "@/app/typings/interfaces";
import Link from "next/link";

interface IPostsListProps {
  type: "all" | "friends" | "myPosts" | "userPosts";
  titleUser?: string;
}

const PostsList = ({ type, titleUser }: IPostsListProps) => {
  // list of posts with either all users for homepage
  // list of posts of a users friends if logged in
  // sorted most recent first

  const { users, user } = useAppContext();

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

  const userPostsArray = users
    .filter((u) => u.username === titleUser)
    .flatMap((user) =>
      user.posts.map((post) => ({
        content: post.content,
        timestamp: post.timestamp,
        username: user.username,
      }))
    );

  const postArray =
    type === "all"
      ? allPostsArray
      : type === "friends"
      ? friendsPostArray
      : type === "userPosts"
      ? userPostsArray
      : myPostsArray;

  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      {postArray
        .sort((a, b) => {
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          return timestampA - timestampB;
        })
        .map((post, i) => (
          <div key={i} className="border p-1">
            {type !== "myPosts" ? (
              <Link
                className="hover:underline"
                href={`/${post.username}`}
              >{`${post.username}:`}</Link>
            ) : (
              <></>
            )}
            <div>{post.content}</div>
            <div className="text-xs">{formatTimeStamp(post.timestamp)}</div>
          </div>
        ))}
    </div>
  );
};

export default PostsList;
