import React from "react";
import { useLocalStorage } from "./useLocalStorage";

// {Provider,Consumer} TodoContext.Provider and TodoContext.Consumer
function* newTodoId(id) {
  while (true) {
    yield id++;
  }
}

const filterTodoByText = (todoList, searchValue) => {
  return todoList.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    return todoText.includes(searchValue);
  });
};

const orderTodos = (todoList) => {
  todoList.sort((todoA, todoB) => todoA.text.localeCompare(todoB.text));
};


function useTodos() {
  const initialData = [
    { text: "Buy groceries", completed: false, id: 1 },
    { text: "Study japanese 3hrs", completed: false, id: 2 },
    { text: "Train Karate and Katas", completed: false, id: 3 },
    { text: "Improve my code skills", completed: false, id: 4 },
    { text: "Take React Router course", completed: false, id: 5 },
    { text: "Do skincare routine", completed: false, id: 6 },
    { text: "Sleep", completed: false, id: 7 }
  ]

  const initialDataComplete = [
    { text: "Eat a balanced healthy meal", completed: true, id: 8 },
  ]

  const highInitialId = initialData.length + initialDataComplete.length + 1;
  const idGeneratorRef = React.useRef(newTodoId(highInitialId));

  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V2", initialData);

  const {
    item: completedTodos,
    saveItem: saveCompletedTodos,
    sincronizeItem: sincronizeCompletedTodos,
  } = useLocalStorage("TODOS_COMPLETED_V2",
    initialDataComplete
  );

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
    const searchText = searchValue.toLowerCase();
    searchedTodos = filterTodoByText(todos, searchText);
    searchedCompletedTodos = filterTodoByText(completedTodos, searchText);
  }

  const addTodo = (todoText) => {
    let id = idGeneratorRef.current.next().value;
    const newTodo = { text: todoText, completed: false, id };
    saveTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const moveTodo = (todoId, isCompleted, source, target) => {
    const todoIndex = source.findIndex(todo => todo.id === todoId);
    const newItem = { ...source[todoIndex], completed: isCompleted }

    const newSource = [...source.slice(0, todoIndex), ...source.slice(todoIndex + 1)]
    const newTarget = [...target, newItem];

    orderTodos(newSource)
    orderTodos(newTarget)

    return { newSource, newTarget }
  }

  const toggleCompleteTodo = (todoId, todoCompleted) => {
    if (todoCompleted) {
      saveTodos((prevTodos) => {
        const { newSource, newTarget } = moveTodo(todoId, false, completedTodos, prevTodos);
        saveCompletedTodos((prevCompleted) => newSource);
        return newTarget;
      });
    } else {
      saveTodos((prevTodos) => {
        const { newSource, newTarget } = moveTodo(todoId, true, prevTodos, completedTodos);
        saveCompletedTodos((prevCompleted) => newTarget);
        return newSource;
      });
    }
  };

  const deleteTodo = (todoId, todoCompleted) => {
    let todoIndex;
    if (todoCompleted) {
      saveCompletedTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
    } else {
      saveTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
    }
  };

  const editTodo = (todoId, editedTodoText, todoCompleted) => {
    let todoIndex;
    if (todoCompleted) {
      todoIndex = completedTodos.findIndex((todo) => todo.id === todoId);
      const newCompletedTodos = [...completedTodos];
      let TodoItem = { ...newCompletedTodos[todoIndex] };
      TodoItem.text = editedTodoText;
      newCompletedTodos[todoIndex] = TodoItem;
      saveCompletedTodos((prevTodos) => {});
    } else {
      todoIndex = todos.findIndex((todo) => todo.id === todoId);
      const newTodos = [...todos];
      let TodoItem = { ...newTodos[todoIndex] };
      TodoItem.text = editedTodoText;
      newTodos[todoIndex] = TodoItem;
      saveTodos((prevTodos) => {});
    }
  }

  return {
    error,
    loading,
    searchedTodos,
    searchedCompletedTodos,
    toggleCompleteTodo,
    deleteTodo,
    editTodo,
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
