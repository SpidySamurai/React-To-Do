import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoHeader } from "../TodoHeader";
import { TodoSearch } from "../TodoSearch";
import { TodoCounter } from "../TodoCounter";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoForm } from "../TodoForm";
import { Modal } from "../Modal";
function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    toggleCompleteTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
  } = React.useContext(TodoContext);
  return (
    <React.Fragment>
      <main>
        <TodoHeader>
          <TodoCounter
            totalTodos={totalTodos}
            completedTodos={completedTodos}
          />
          <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </TodoHeader>
        <TodoList>
          {error && <p>Hubo un error...</p>}
          {loading && <p>Estamos cargando las tareas...</p>}
          {!loading && !searchedTodos.lenght && (
            <p>Crea tu primera tarea... o borra estas... no sé!</p>
          )}
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
        {openModal && (
          <Modal>
            <TodoForm setOpenModal={setOpenModal} />
          </Modal>
        )}
        <CreateTodoButton setOpenModal={setOpenModal} />
      </main>
    </React.Fragment>
  );
}

export { AppUI };
