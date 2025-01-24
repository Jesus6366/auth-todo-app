import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="editar" onClick={() => setShowModal(true)}>
          EDITAR
        </button>
        <button className="delete">BORRAR</button>
        {showModal && (
          <Modal
            setShowModal={setShowModal}
            mode={"editar"}
            task={task}
            getData={getData}
          />
        )}
      </div>
    </li>
  );
};

export default ListItem;
