import React from "react";
import "./TodoForm.css";

function TodoForm({ addTodo, setOpenModal }) {
  const [newTodoValue, setNewTodoValue] = React.useState("");

  const onChange = (ev) => {
    setNewTodoValue(ev.target.value);
  };
  const onCancel = () => {
    setOpenModal((prevState) => !prevState);
  };
  const onSubmit = () => {
    addTodo(newTodoValue);
    setOpenModal((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    onSubmit();
  }

  const handleInvalid = (event) => {
    event.target.setCustomValidity('Please enter a new task');
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <h2>Add a new task</h2>
      <input
        value={newTodoValue}
        onChange={onChange}
        placeholder="New task text"
        required
        onInvalid={handleInvalid}
      ></input>
      <div>
        <button type="submit">Add task</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
export { TodoForm };
