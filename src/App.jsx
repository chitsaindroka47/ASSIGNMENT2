import React from "react";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="container">
      <h1>📝To-Do List</h1>
      <TodoList />
       <footer className="footer">
        <hr />
        <p>Designed with ❤️ by Chitranjan Singh</p>
      </footer>
    </div>
  );
}
