import { useState } from "react";
import API from "../api/api";

function TaskForm({ loadTasks }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitTask = async () => {

    await API.post("/tasks", {
      title,
      description
    });

    loadTasks();
  };

  return (
    <div>
      <h3>Create Task</h3>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={submitTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;