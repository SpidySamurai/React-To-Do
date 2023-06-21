import React from "react";
import "./TodoForm.css";
import { useNavigate } from "react-router-dom";

function TodoForm(props) {
  const [newTodoText, setNewTodoText] = React.useState(props.defaultTodoText ||"");
  const navigate = useNavigate();

  const onChange = (ev) => {
    setNewTodoText(ev.target.value);
    console.log(newTodoText); 
  };
  const onCancel = () => {
    // setOpenModal((prevState) => !prevState);
    navigate('/');
  };
  const onSubmit = () => {
    navigate('/');
    props.submitEvent(newTodoText)
    // setOpenModal((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }

  const handleInvalid = (event) => {
    event.target.setCustomValidity('Please enter a text');
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <h2>{props.label}</h2>
      <input
        value={newTodoText}
        onChange={onChange}
        placeholder="New task"
        required
        onInvalid={handleInvalid}
      ></input>
      <div>
        <button type="submit">{props.submitText}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
export { TodoForm };
