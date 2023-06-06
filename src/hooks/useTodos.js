import React from "react";
import { useLocalStorage } from "./useLocalStorage";

// {Provider,Consumer} TodoContext.Provider and TodoContext.Consumer

function useTodos() {
  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", [
    { text: "Buy groceries", completed: false },
    { text: "Study japanese 3hrs", completed: false },
    { text: "Train Karate and Katas", completed: false },
    { text: "Improve my code skills", completed: false },
    { text: "Take React Router course", completed: false },
    { text: "Do skincare routine", completed: false },
    { text: "Sleep", completed: false },
  ]);
  const {
    item: completedTodos,
    saveItem: saveCompletedTodos,
    sincronizeItem: sincronizeCompletedTodos,
  } = useLocalStorage("TODOS_COMPLETED_V1", [
    { text: "Eat a balanced healthy meal", completed: true },
  ]);
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodosText = completedTodos.filter(
    (todo) => todo.completed
  ).length;
  const totalTodos = todos.length + completedTodos.length;

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
    sincronizeTodos,
    sincronizeCompletedTodos,
  };
}

export { useTodos };
