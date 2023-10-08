"use client";

import { useAppContext } from "@/app/context/appContext";
import { IUser } from "@/app/typings/interfaces";
import { useEffect, useState } from "react";

const FriendsList = () => {
  // List of friends for current user with each friend having an unfriend button
  const [friends, setFriends] = useState<string[]>([]);
  const { user, isAuthenticated } = useAppContext();

  useEffect(() => {
    if (user) {
      const friendsList = user?.friends;
      setFriends(friendsList);
    }
  }, [isAuthenticated, user]);

  const removeFriend = (friendToRemove: string) => {
    if (!user) {
      return;
    }

    // Remove the friend from local state
    const updatedFriends = friends.filter(
      (friend) => friend !== friendToRemove
    );
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
      {friends.map((friend, i) => (
        <div key={i}>
          <div> {friend}</div>
          <button onClick={() => removeFriend(friend)}>Remove friend</button>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
