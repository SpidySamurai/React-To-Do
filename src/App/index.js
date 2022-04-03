import React from "react";
import { TodoProvider } from "../TodoContext";
import { AppUI } from "./AppUI";
// import "./App.css";

// const defaultTodos = [
//   { text: "TODO test 1", completed: false },
//   { text: "TODO test 2", completed: false },
//   { text: "TODO test 3", completed: false },
//   { text: "TODO test 4", completed: false },
// ];

function App() {
  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}

export default App;
