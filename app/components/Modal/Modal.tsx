"use client";
import React, { useEffect } from "react";
import ReactPortal from "./ReactPortal";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ isOpen, handleClose }: IModal) => {
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

  return isOpen ? (
    <ReactPortal wrapperId="resume-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50"></div>
        <div
          onClick={handleClose}
          className="fixed flex flex-col items-center justify-center top-0 left-0 w-screen h-screen z-50 bg-transparent"
        >
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
              <form>
                <input placeholder="type post here" />
              </form>
              <button>post</button>
            </div>
          </div>
        </div>
      </>
    </ReactPortal>
  ) : null;
};

export default Modal;
