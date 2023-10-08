"use client";
import { useAppContext } from "@/app/context/appContext";
import PostsList from "../PostsList";
import { useEffect, useState } from "react";
import { IUser } from "@/app/typings/interfaces";

interface IUserInfoProps {
  titleUser: string;
}

const UserInfo = ({ titleUser }: IUserInfoProps) => {
  const [friends, setFriends] = useState<string[]>([]);
  const { user, isAuthenticated } = useAppContext();

  useEffect(() => {
    if (user) {
      const friendsList = user?.friends;
      setFriends(friendsList);
    }
  }, [isAuthenticated, user]);

  const isOwnInfoPage = () => {
    if (titleUser === user?.username) return true;
    if (titleUser !== user?.username) return false;
  };

  const addFriendButton = () => {
    if (isAuthenticated) return !user?.friends.includes(titleUser);
    // Check if the user is not friends with titleUser
  };

  const addFriend = () => {
    if (!user) {
      return;
    }

    // Add the friend to local state
    const updatedFriends = [...friends, titleUser];
    setFriends(updatedFriends);

    // Update the session user's friends list in local storage
    user.friends = updatedFriends;

    // Find the session user's index in the users list in local storage
    const usersListJSON = localStorage.getItem("userAccounts");
    if (usersListJSON) {
      const usersList = JSON.parse(usersListJSON);
      const sessionUserIndex = usersList.findIndex(
        (u: IUser) => u.username === user.username
      );

      if (sessionUserIndex !== -1) {
        // Update the user's data in the users list in local storage
        usersList[sessionUserIndex] = user;
        localStorage.setItem("userAccounts", JSON.stringify(usersList));
      }
    }

    const updatedUser = { ...user, friends: updatedFriends };
    // Update the session user in session storage
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const removeFriend = () => {
    if (!user) {
      return;
    }

    // Remove the friend from local state
    const updatedFriends = friends.filter((friend) => friend !== titleUser);
    setFriends(updatedFriends);

    // Update the session user's friends list in local storage
    user.friends = updatedFriends;

    // Find the session user's index in the users list in local storage
    const usersListJSON = localStorage.getItem("userAccounts");
    if (usersListJSON) {
      const usersList = JSON.parse(usersListJSON);
      const sessionUserIndex = usersList.findIndex(
        (u: IUser) => u.username === user.username
      );

      if (sessionUserIndex !== -1) {
        // Update the user's data in the users list in local storage
        usersList[sessionUserIndex] = user;
        localStorage.setItem("userAccounts", JSON.stringify(usersList));
      }
    }

    const updatedUser = { ...user, friends: updatedFriends };
    // Update the session user in session storage
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  return (
    <div>
      <PostsList
        type={isOwnInfoPage() ? "myPosts" : "userPosts"}
        titleUser={titleUser}
      />
      <p>
        If this user is not the one logged in, have [add] or [remove friend]
        button to perform that action
      </p>

      {isOwnInfoPage() ? (
        <></>
      ) : (
        <button onClick={addFriendButton() ? addFriend : removeFriend}>
          {addFriendButton() ? "Add Friend" : "Remove Friend"}
        </button>
      )}
    </div>
  );
};

export default UserInfo;
