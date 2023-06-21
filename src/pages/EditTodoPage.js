import React, { useEffect } from "react";
import { TodoForm } from "../ui/TodoForm";
import { useTodos } from "../hooks/useTodos";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../styles/NewTodoPage.css";

const EditTodoPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const id = Number(params.id);

  const { loading, getTodo, editTodo } = useTodos();
  const todo = getTodo(id);

  let todoText;
  let isCompleted;

  useEffect(() => {
    if (!loading && !getTodo(id)) {
      navigate('/Not-Found-404');
    }
  }, [loading, getTodo, navigate, id]);

  if (location.state?.todo) {
    todoText = location.state.todo.text;
    isCompleted = location.state.todo.completed;
  } else if (loading) {
    return (
      <div className="new-todo-container">
        <p>Loading todo...</p>
      </div>
    );
  } else if (getTodo(id)) {
    const todo = getTodo(id);
    todoText = todo.text;
    isCompleted = todo.completed;
  }

  return (
    <div className="new-todo-container">
      <TodoForm
        label="Edit task"
        defaultTodoText={todoText}
        submitText="Edit"
        submitEvent={(editedText) => editTodo(id, editedText, isCompleted)}
      />
    </div>
  );
};

export default EditTodoPage;
