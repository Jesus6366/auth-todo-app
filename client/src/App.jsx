import { useState, useEffect } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
  const userEmail = "jesus@test.com";

  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/api/todos/${userEmail}`
      );

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(tasks);

  // Sort by date

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      <ListHeader getData={getData} listName={" 🗒️  Lista de Tareas "} />
      {sortedTasks?.map((task) => (
        <ListItem getData={getData} key={task.id} task={task} />
      ))}
    </div>
  );
};

export default App;
