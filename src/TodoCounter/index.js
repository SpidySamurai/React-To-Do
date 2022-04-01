import React from "react";
import "./TodoCounter.css";

function TodoCounter({ totalTodos, completedTodos }) {
  return (
    <header className="TodoCounter">
      <h1>TODO APP</h1>
      <h2>
        C: {completedTodos}/{totalTodos}
      </h2>
    </header>
  );
}

export { TodoCounter };
