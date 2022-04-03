import React from "react";
import "./TodoForm.css";

function TodoForm() {
  return (
    <div className="TodoForm">
      <h2>Add a new task</h2>
      <input placeholder="New task text"></input>
      <div>
        <button>Add task</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}
export { TodoForm };
