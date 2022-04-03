import React from "react";
import "./TodoCounter.css";
import { TodoContext } from "../TodoContext";

function TodoCounter() {
  const { completedTodos, totalTodos } = React.useContext(TodoContext);
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
