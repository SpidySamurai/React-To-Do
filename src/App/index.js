import React from "react";
import { AppUI } from "./AppUI";
// import "./App.css";

// const defaultTodos = [
//   { text: "Cortar cebolla", completed: false },
//   { text: "Estudiar en platzi", completed: false },
//   { text: "Contestarle a Fernanda", completed: true },
//   { text: "TODO test 1", completed: true },
//   { text: "TODO test 2", completed: true },
//   { text: "TODO test 3", completed: true },
//   { text: "TODO test 4", completed: true },
// ];

function useLocalStorage() {}

function App() {
  const localStorageTodos = localStorage.getItem("TODOS_V1");
  let parsedTodos;

  if (!localStorageTodos) {
    localStorage.setItem("TODOS_V1", JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
  }

  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState("");

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const searchText = searchValue.toLocaleLowerCase();
      const todoText = todo.text.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem("TODOS_V1", stringifiedTodos);
    setTodos(newTodos);
  };

  const toggleCompleteTodo = (todoText) => {
    const todoIndex = todos.findIndex((todo) => todo.text === todoText);

    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (todoText) => {
    const todoIndex = todos.findIndex((todo) => todo.text === todoText);

    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      toggleCompleteTodo={toggleCompleteTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
