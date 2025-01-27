import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/api/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );

      console.log(response);

      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="button-container">
        <button className="editar" onClick={() => setShowModal(true)}>
          EDITAR
        </button>
        <button className="delete" onClick={deleteItem}>
          BORRAR
        </button>
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
