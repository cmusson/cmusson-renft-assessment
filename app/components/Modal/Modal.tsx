"use client";
import React, { useEffect, useState } from "react";
import ReactPortal from "./ReactPortal";
import { useAppContext } from "@/app/context/appContext";
import { IUser } from "@/app/typings/interfaces";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ isOpen, handleClose }: IModal) => {
  const [postContent, setPostContent] = useState("");
  const { user, setUser } = useAppContext();
  // Form to submit a post into users post in local storage
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const createPost = () => {
    if (user) {
      const newPost = {
        content: postContent,
        timestamp: new Date().toISOString(),
      };

      // Update the user's array of posts
      const updatedUser = {
        ...user,
        posts: [...user.posts, newPost],
      };

      // Update local storage
      const usersListJSON = localStorage.getItem("userAccounts");
      if (usersListJSON) {
        const usersList = JSON.parse(usersListJSON);

        const sessionUserIndex = usersList.findIndex(
          (u: IUser) => u.username === user.username
        );

        if (sessionUserIndex !== -1) {
          // Update the user's data in the users list in local storage
          usersList[sessionUserIndex] = updatedUser;
          localStorage.setItem("userAccounts", JSON.stringify(usersList));
        }
      }

      // Update session storage
      sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Clear the post content
      setPostContent("");

      // update user from context
      setUser(updatedUser);

      // Close the modal
      handleClose();
    }
  };

  return isOpen ? (
    <ReactPortal wrapperId="resume-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50"></div>
        <div className="fixed flex flex-col items-center justify-center top-0 left-0 w-screen h-screen z-50 bg-transparent">
          <div className="flex flex-col items-end rounded box-border h-auto w-fit h-fit overflow-y-auto p-2 bg-zinc-800">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="top-0 mb-1 text-center text-neutral-100 font-semibold px-2 bg-teal-600 rounded shadow hover:bg-teal-700"
            >
              (X)
            </button>
            <div>
              <h1>Create New Post</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createPost();
                }}
              >
                <textarea
                  className="text-black"
                  placeholder="type post here"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <button type="submit">post</button>
              </form>
            </div>
          </div>
        </div>
      </>
    </ReactPortal>
  ) : null;
};

export default Modal;
