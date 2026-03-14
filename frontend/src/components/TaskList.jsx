function TaskList({ tasks }) {

  return (
    <div>

      <h3>Tasks</h3>

      {tasks.map(task => (
        <div key={task._id}>

          <h4>{task.title}</h4>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

        </div>
      ))}

    </div>
  );
}

export default TaskList;