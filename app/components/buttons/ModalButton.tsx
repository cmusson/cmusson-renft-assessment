"use client";

import { useAppContext } from "@/app/context/appContext";
import { useCallback, useState } from "react";
import Modal from "../Modal";

const ModalButton = () => {
  const { isAuthenticated } = useAppContext();
  const [modalOpen, setModal] = useState(false);

  const openCloseModal = useCallback(() => {
    console.log("fired");
    setModal((prevState) => !prevState);
  }, []);

  return isAuthenticated ? (
    <>
      <button onClick={openCloseModal} className="border">
        {"(+)"}
      </button>
      {modalOpen ? (
        <Modal isOpen={modalOpen as boolean} handleClose={openCloseModal} />
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
};

export default ModalButton;
