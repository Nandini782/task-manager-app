import { useEffect, useState } from "react";
import API from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>

      <h1>Task Dashboard</h1>

      <TaskForm loadTasks={loadTasks} />

      <TaskList tasks={tasks} />

    </div>
  );
}

export default Dashboard;