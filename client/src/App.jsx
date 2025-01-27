import { useState, useEffect } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
const App = () => {
  const [cookies, setCookies, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
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
    if (authToken) {
      getData();
    }
  }, []);

  console.log(tasks);

  // Sort by date

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader getData={getData} listName={" 🗒️ Lista de Tareas "} />
          <p className="user-email">Welcome Back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem getData={getData} key={task.id} task={task} />
          ))}
        </>
      )}
      <p className="copyright">©️ Creative Coding LLC</p>
    </div>
  );
};

export default App;
