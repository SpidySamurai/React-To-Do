import React from "react";
import "./TodoCounter.css";

function TodoCounter({ totalTodos, completedTodosText }) {
  return (
    <div className="TodoCounter">
      <h1>TODO APP</h1>
      <h2>
        C: {completedTodosText}/{totalTodos}
      </h2>
    </div>
  );
}

export { TodoCounter };
