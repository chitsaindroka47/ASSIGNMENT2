import React, { useState, useEffect } from "react";
import "../index.css";

export default function TodoList() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return alert("Please enter a task.");
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) =>
    setTasks(tasks.filter((t) => t.id !== id));

  const filtered = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const sorted = [...filtered].sort((a, b) =>
    sortAsc
      ? a.text.localeCompare(b.text)
      : b.text.localeCompare(a.text)
  );

  return (
    <>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filter-sort">
        <div>
          <button onClick={() => setFilter("all")}>All</button> |
          <button onClick={() => setFilter("active")}>Active</button> |
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort {sortAsc ? "A→Z" : "Z→A"}
        </button>
      </div>

      <ul>
        {sorted.length === 0 ? (
          <li>No tasks found.</li>
        ) : (
          sorted.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "completed" : ""}
            >
              <span>{task.text}</span>
              <button
                className="complete-btn"
                onClick={() => toggleComplete(task.id)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
