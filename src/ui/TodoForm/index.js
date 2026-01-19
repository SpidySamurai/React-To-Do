import React from "react";
import "./TodoForm.css";
import "./TodoForm.css";
// import { useNavigate } from "react-router-dom";

function TodoForm(props) {
  const [newTodoValue, setNewTodoValue] = React.useState(props.defaultTodoText || "");
  const [newTodoPriority, setNewTodoPriority] = React.useState(props.defaultTodoPriority || "low");
  const [newTodoDate, setNewTodoDate] = React.useState(props.defaultTodoDate || "");
  
  // No navigation needed here anymore, handled by parent or just removed
  // const navigate = useNavigate();


  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };
  
  const onPriorityChange = (event) => {
    setNewTodoPriority(event.target.value);
  };

  const onDateChange = (event) => {
    setNewTodoDate(event.target.value);
  };

  const onCancel = () => {
    // navigate('/');
    if(props.onCancel) props.onCancel();
  };
  
  const onSubmit = () => {
    props.submitEvent({
      text: newTodoValue,
      priority: newTodoPriority,
      dueDate: newTodoDate
    });
    // navigate('/');
    if(props.onCancel) props.onCancel(); // Close modal on submit
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }



  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <h2>{props.label}</h2>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="Escribe tu nueva tarea..."
        required
      />
      
      <div className="TodoForm-options">
        <label>
          <span className="label-text">Prioridad</span>
          <select 
            value={newTodoPriority} 
            onChange={onPriorityChange}
            className="TodoForm-select"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </label>

        <label>
          <span className="label-text">Fecha límite</span>
          <input 
            type="date" 
            value={newTodoDate} 
            onChange={onDateChange}
            className="TodoForm-date"
          />
        </label>
      </div>

      <div className="TodoForm-buttonContainer">
        <button type="submit">{props.submitText}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
export { TodoForm };
