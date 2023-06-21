import React from "react";
import { TodoForm } from "../ui/TodoForm";
import { useTodos } from "../hooks/useTodos";
import '../styles/NewTodoPage.css'


const NewTodoPage = () => {
  const {
    addTodo,
  } = useTodos();
  return (
    <div className="new-todo-container">
      <TodoForm
        label="Add new Task"
        submitText="Add"
        submitEvent={addTodo}
      />
    </div>
  );
};

export default NewTodoPage;
