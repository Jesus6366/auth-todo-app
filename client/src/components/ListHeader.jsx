import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const signOut = () => {
    console.log("Signing out");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="crear" onClick={() => setShowModal(true)}>
          AGREGAR
        </button>
        <button className="signout" onClick={signOut}>
          CERRAR SESION
        </button>
      </div>
      {showModal && (
        <Modal mode={"crear"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
