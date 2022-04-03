import React from "react";
import "./TodoForm.css";
import { TodoContext } from "../TodoContext/";

function TodoForm(props) {
  const [newTodoValue, setNewTodoValue] = React.useState("");
  const { addTodo } = React.useContext(TodoContext);

  const onChange = (ev) => {
    setNewTodoValue(ev.target.value);
  };
  const onCancel = () => {
    props.setOpenModal((prevState) => !prevState);
  };
  const onSubmit = () => {
    addTodo(newTodoValue);
    props.setOpenModal((prevState) => !prevState);
  };
  return (
    <div className="TodoForm">
      <h2>Add a new task</h2>
      <input
        value={newTodoValue}
        onChange={onChange}
        placeholder="New task text"
      ></input>
      <div>
        <button onClick={() => onSubmit()}>Add task</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
export { TodoForm };
