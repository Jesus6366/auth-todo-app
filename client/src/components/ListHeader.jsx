import React from "react";

const ListHeader = ({ listName }) => {
  const signOut = () => {
    console.log("Signing out");
  };
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create">AGREGAR</button>
        <button className="signout" onClick={signOut}>
          REGISTRAR
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
