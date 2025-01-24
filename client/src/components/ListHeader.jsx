import React, { useState } from "react";
import Modal from "./Modal";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("Signing out");
  };
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="crear" onClick={() => setShowModal(true)}>
          AGREGAR
        </button>
        <button className="signout" onClick={signOut}>
          REGISTRAR
        </button>
      </div>
      {showModal && (
        <Modal mode={"crear"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
