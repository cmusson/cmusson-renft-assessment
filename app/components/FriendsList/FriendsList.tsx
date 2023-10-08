"use client";

import { useAppContext } from "@/app/context/appContext";
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

  return (
    <div>
      {friends.map((friend, i) => (
        <div key={i}>
          <div> {friend}</div>
          <button>Remove friend</button>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
