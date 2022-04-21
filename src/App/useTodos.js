import React from "react";
import { useLocalStorage } from "./useLocalStorage";

// {Provider,Consumer} TodoContext.Provider and TodoContext.Consumer

function useTodos() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", [
    { text: "TODO test 1", completed: false },
    { text: "TODO test 2", completed: false },
    { text: "TODO test 3", completed: false },
    { text: "TODO test 4", completed: false },
    { text: "TODO test 5", completed: false },
    { text: "TODO test 6", completed: false },
    { text: "TODO test 7", completed: false },
  ]);
  const { item: completedTodos, saveItem: saveCompletedTodos } =
    useLocalStorage("TODOS_COMPLETED_V1", [
      { text: "TODO test 8", completed: true },
    ]);
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodosText = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];
  let searchedCompletedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
    searchedCompletedTodos = completedTodos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const searchText = searchValue.toLocaleLowerCase();
      const todoText = todo.text.toLowerCase();
      return todoText.includes(searchText);
    });
    searchedCompletedTodos = completedTodos.filter((todo) => {
      const searchText = searchValue.toLocaleLowerCase();
      const todoText = todo.text.toLowerCase();
      return todoText.includes(searchText);
    });
  }
  const orderTodos = (todoList) => {
    todoList.sort((todoA, todoB) => todoA.text.localeCompare(todoB.text));
  };

  const addTodo = (todoText) => {
    const newTodos = [...todos];
    newTodos.push({ text: todoText, completed: false });
    saveTodos(newTodos);
  };

  const disCompleteTodo = (todoText, newTodos, newCompletedTodos) => {
    let todoIndex = completedTodos.findIndex((todo) => todo.text === todoText);
    newCompletedTodos[todoIndex].completed = false;
    newTodos.push(newCompletedTodos[todoIndex]);
    newCompletedTodos.splice(todoIndex, 1);
  };

  const completeTodo = (todoText, newTodos, newCompletedTodos) => {
    let todoIndex = todos.findIndex((todo) => todo.text === todoText);
    newTodos[todoIndex].completed = true;
    newCompletedTodos.push(newTodos[todoIndex]);
    newTodos.splice(todoIndex, 1);
  };

  const toggleCompleteTodo = (todoText, todoCompleted) => {
    const newTodos = [...todos];
    const newCompletedTodos = [...completedTodos];
    if (todoCompleted) {
      disCompleteTodo(todoText, newTodos, newCompletedTodos);
      orderTodos(newTodos);
    } else {
      completeTodo(todoText, newTodos, newCompletedTodos);
      orderTodos(newCompletedTodos);
    }

    saveCompletedTodos(newCompletedTodos);
    saveTodos(newTodos);
  };

  const deleteTodo = (todoText, todoCompleted) => {
    let todoIndex;
    if (todoCompleted) {
      todoIndex = completedTodos.findIndex((todo) => todo.text === todoText);
      const newCompletedTodos = [...completedTodos];
      newCompletedTodos.splice(todoIndex, 1);
      saveCompletedTodos(newCompletedTodos);
    } else {
      todoIndex = todos.findIndex((todo) => todo.text === todoText);
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos);
    }
  };

  return {
    error,
    loading,
    searchedTodos,
    searchedCompletedTodos,
    toggleCompleteTodo,
    deleteTodo,
    addTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodosText,
    searchValue,
    setSearchValue,
  };
}

export { useTodos };
