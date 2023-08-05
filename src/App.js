import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Faire les courses" },
    { id: 2, text: "Apprendre React" },
    { id: 3, text: "Marcher pendant 30 minutes" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState({});

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: Date.now(),
        text: newTask.trim(),
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleUpdateTask = () => {
    if (editTask.text.trim() !== "") {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask.id ? { ...task, text: editTask.text.trim() } : task
        )
      );
      setEditTask({});
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Ajouter une tâche..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>Ajouter</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTask.id === task.id ? (
              <input
                type="text"
                value={editTask.text}
                onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <div>
              {editTask.id === task.id ? (
                <button onClick={handleUpdateTask}>Enregistrer</button>
              ) : (
                <button onClick={() => handleEditTask(task)}>Modifier</button>
              )}
              <button onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
