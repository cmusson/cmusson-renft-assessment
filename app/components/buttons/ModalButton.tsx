"use client";

import { useAppContext } from "@/app/context/appContext";
import { useCallback, useState } from "react";
import Modal from "../Modal";

const ModalButton = () => {
  const { isAuthenticated } = useAppContext();
  const [modalOpen, setModal] = useState(false);

  const openCloseModal = useCallback(() => {
    setModal((prevState) => !prevState);
  }, []);

  return isAuthenticated ? (
    <div className="w-full h-20 p-2 flex justify-end">
      <button
        onClick={openCloseModal}
        className="border rounded p-4 text-x hover:bg-white hover:text-black"
      >
        {"(+)"}
      </button>
      {modalOpen ? (
        <Modal isOpen={modalOpen as boolean} handleClose={openCloseModal} />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="w-full h-20 p-2"></div>
  );
};

export default ModalButton;
