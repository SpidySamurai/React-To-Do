import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";

function AppUI({}) {
  return (
    <React.Fragment>
      <main>
        <TodoCounter />
        <TodoSearch />

        <TodoContext.Consumer>
          {({
            error,
            loading,
            searchedTodos,
            toggleCompleteTodo,
            deleteTodo,
          }) => (
            <TodoList>
              {error && <p>Hubo un error...</p>}
              {loading && <p>Cargando los todos!</p>}
              {!loading && !searchedTodos.lenght && <p>Crea tu primer todo!</p>}
              {searchedTodos.map((todo) => (
                <TodoItem
                  key={todo.text}
                  text={todo.text}
                  completed={todo.completed}
                  onToggleComplete={() => {
                    toggleCompleteTodo(todo.text);
                  }}
                  onDelete={() => {
                    deleteTodo(todo.text);
                  }}
                />
              ))}
            </TodoList>
          )}
        </TodoContext.Consumer>

        <CreateTodoButton />
      </main>
    </React.Fragment>
  );
}

export { AppUI };
