import React from "react";
import "./TodoCounter.css";

function TodoCounter({ totalTodos, completedTodosText, loading }) {
  return (
    <div className="TodoCounter">
      <h1>Todos</h1>
      {!loading && (
        <h2>
          Completed: {completedTodosText}/{totalTodos}
        </h2>
      )}
    </div>
  );
}

export { TodoCounter };
